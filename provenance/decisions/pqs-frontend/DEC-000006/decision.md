# DEC-000006 - Session Management System (DESKTOP-794)

## Summary
Implement comprehensive session management with multi-window conflict detection, inactivity timeout, automatic token refresh, and connection pool management.

## Status
**Implemented** - Production feature (DESKTOP-794)

## Context
The PQS application requires enterprise-grade session management to:
- **Prevent Conflicts**: Detect when users open multiple browser windows/devices
- **Security**: Automatic logout after inactivity period (15 minutes default)
- **User Experience**: Warn users before auto-logout (60-second countdown)
- **Performance**: Manage browser connection pool (4 concurrent requests max)
- **Reliability**: Auto-refresh expired tokens, retry failed requests
- **Multi-Device**: Support multiple tabs in same browser, conflict detection across different browsers

### Business Requirements
- **DESKTOP-794**: Session management system for enterprise deployment
- **Security**: PCI/SOC2 compliance requires inactivity timeout
- **UX**: Users shouldn't be suddenly logged out without warning
- **Support**: Reduce support tickets for "unexpectedly logged out"
- **Audit**: Track session activity for security audits

### Technical Challenges
- Browser connection pool limitations (6-10 connections per domain)
- Multi-window detection without polling
- Token refresh without user interruption
- Balancing security (auto-logout) with UX (warning dialog)

### Evidence
- **SessionManager.js**: 2244 lines implementing session system
- **PqsSessionConflict.vue**: Conflict resolution dialog
- **PqsInactivityWarning.vue**: Inactivity countdown dialog
- **store.js**: Session state management (lines 257-275, 514-566)

## Decision
Implement **SessionManager service** with:
1. **Multi-window conflict detection** via BroadcastChannel
2. **Inactivity timeout** (15 min default) with 60-second warning
3. **Automatic token refresh** on 401 errors
4. **Connection pool management** (4 concurrent max)
5. **Environment-based feature flags** for opt-in deployment

### System Architecture

```javascript
class SessionManager {
  constructor(store, kindeAuth, baseUrl) {
    // Configuration
    this.enabled = process.env.VUE_APP_SESSION_MANAGEMENT_ENABLED;
    this.inactivityTimeout = 15 * 60 * 1000; // 15 minutes
    this.warningTime = 14 * 60 * 1000; // 14 minutes
    this.browserSecurityEnabled = true;
    
    // Connection pool
    this.connectionPool = {
      maxConcurrent: 4,
      activeConnections: new Map(),
      queue: []
    };
    
    // Multi-window communication
    this.broadcastChannel = new BroadcastChannel('pqs-session');
    this.windowId = this.generateWindowId();
  }
}
```

### Feature Flags

```bash
# .env configuration
VUE_APP_SESSION_MANAGEMENT_ENABLED=true    # Enable/disable (default: false - opt-in)
VUE_APP_SESSION_EXPIRY_MINUTES=15         # Session expiry (0 = disabled)
VUE_APP_SESSION_BROWSER_SECURITY=true     # Multi-window detection
VUE_APP_SESSION_DEBUG=false               # Debug logging
```

## Core Features

### 1. Multi-Window Conflict Detection

```javascript
// Window ID shared across tabs (localStorage)
generateWindowId() {
  let windowId = localStorage.getItem('pqs_window_id');
  if (!windowId) {
    windowId = 'win_' + Date.now() + '_' + Math.random();
    localStorage.setItem('pqs_window_id', windowId);
  }
  return windowId;
}

// BroadcastChannel for cross-window communication
initBroadcastChannel() {
  this.broadcastChannel = new BroadcastChannel('pqs-session');
  this.broadcastChannel.onmessage = (event) => {
    if (event.data.type === 'session_created') {
      // Another window took over - show conflict dialog
      this.checkSession();
    }
  };
}

// Session check with conflict detection
async checkSession() {
  const response = await fetch('/api/private/session/check', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      session_id: this.sessionId,
      window_id: this.windowId
    })
  });
  
  if (response.status === 409) {
    // Conflict: Another window has the session
    this.store.commit('SET_SESSION_CONFLICT', {
      active: true,
      message: 'Another browser/window is using your session'
    });
  }
}
```

### 2. Inactivity Timeout

```javascript
// Activity tracking
startActivityTracking() {
  const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'click'];
  events.forEach(event => {
    document.addEventListener(event, () => this.updateActivity());
  });
  
  // Batch backend updates (every minute if activity detected)
  setInterval(() => this.checkAndUpdateActivity(), 60000);
}

// Inactivity timer with warning
resetInactivityTimer() {
  clearTimeout(this.inactivityTimer);
  
  // Show warning at 14 minutes
  this.inactivityTimer = setTimeout(() => {
    this.showInactivityWarning();
    
    // Auto-logout after 60-second countdown
    this.warningCountdownTimer = setTimeout(() => {
      this.handleDualLogout('inactivity_timeout');
    }, 60000);
  }, this.warningTime);
}

// User chooses to stay logged in
async handleStayLoggedIn() {
  this.lastActivity = Date.now();
  
  // Update backend session immediately
  await fetch('/api/private/session/update', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ session_id: this.sessionId })
  });
  
  this.hideInactivityWarning();
  this.resetInactivityTimer();
}
```

### 3. Automatic Token Refresh

```javascript
// Fetch with automatic 401 handling
async fetchWithTokenRefresh(url, options, retryOn401 = true) {
  let response = await fetch(url, options);
  
  if (response.status === 401 && retryOn401) {
    // Check if Kinde session still valid
    const isAuth = await this.kindeAuth.isAuthenticated();
    if (!isAuth) return response;
    
    // Get fresh token (auto-refreshes via Kinde SDK)
    const kindeToken = await this.kindeAuth.getToken();
    
    // Re-authenticate backend
    await fetch('/api/kinde/auth', {
      headers: { 'Authorization': `Bearer ${kindeToken}` },
      credentials: 'include'
    });
    
    // Retry original request
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${kindeToken}`
    };
    response = await fetch(url, options);
  }
  
  return response;
}
```

### 4. Connection Pool Management

```javascript
// Prevent browser connection pool exhaustion
async acquireConnection(requestId, url, priority = 0) {
  const pool = this.connectionPool;
  
  if (pool.activeConnections.size < pool.maxConcurrent) {
    pool.activeConnections.set(requestId, { url, startTime: Date.now() });
    return true;
  }
  
  // Queue request with priority
  return new Promise((resolve) => {
    pool.queue.push({ id: requestId, url, priority, resolve });
    pool.queue.sort((a, b) => b.priority - a.priority);
  });
}

releaseConnection(requestId) {
  this.connectionPool.activeConnections.delete(requestId);
  this.processConnectionQueue();
}

// Cleanup stale connections (every 30s)
cleanupStaleConnections() {
  const maxConnectionTime = 30000; // 30 seconds
  for (const [id, conn] of this.connectionPool.activeConnections) {
    if (Date.now() - conn.startTime > maxConnectionTime) {
      this.releaseConnection(id);
    }
  }
}
```

## Alternatives Considered

### Option 1: No Session Management
**Rejected** - Security and UX issues
- **Pros**: Simple, no additional code
- **Cons**: No inactivity timeout, no multi-window detection, poor security

### Option 2: Backend-Only Session Management
**Rejected** - Poor UX, no conflict detection
- **Pros**: Simpler frontend
- **Cons**: No warning dialog, sudden logouts, no multi-window detection

### Option 3: Polling-Based Conflict Detection
**Rejected** - Performance overhead
- **Pros**: Works in older browsers
- **Cons**: Constant polling waste, network overhead, battery drain

### Option 4: Always Enforce (No Feature Flag)
**Rejected** - Risky deployment
- **Pros**: Consistent behavior
- **Cons**: Can't disable if issues found, no gradual rollout

## Consequences

### Positive
✅ Multi-window conflict detection prevents session conflicts  
✅ Inactivity warning prevents unexpected logouts  
✅ Auto-refresh reduces "session expired" errors  
✅ Connection pool prevents browser stalls  
✅ Environment flags allow opt-in deployment  
✅ BroadcastChannel is performant (no polling)  
✅ Activity batching reduces backend load  
✅ Configurable timeouts for different environments  

### Negative
⚠️ Complex implementation (2244 lines)  
⚠️ BroadcastChannel not supported in IE11  
⚠️ Connection pool adds latency for queued requests  
⚠️ Additional backend API endpoints required  
⚠️ Must coordinate state between frontend and backend  
⚠️ Debugging multi-window interactions is complex  

### User Experience Impact
- **Positive**: Warning before logout, graceful conflict resolution
- **Negative**: Additional dialogs (conflict, inactivity warning)
- **Security**: Better (auto-logout after inactivity)
- **Support**: Fewer "unexpectedly logged out" tickets

## Technical Debt & Known Issues

### Known Issues
1. **SessionManager uses async/await** (violates DEC-000003)
   - Reason: Complex async flows, written after codebase established
   - Resolution: Accept as technical debt, convert during Vue 3 migration

2. **Connection pool max is conservative (4)**
   - Browsers allow 6-10, using 4 to be safe
   - May increase after production testing

3. **Session check/update use fetch directly**
   - Not using Vuex actions
   - Reason: SessionManager is standalone service
   - Resolution: Acceptable for service pattern

## Impact on Architecture

### Related Decisions
- **DEC-000005**: Kinde OAuth (token refresh integration)
- **DEC-000007**: Seneca Backend (session API endpoints)
- **DEC-000004**: Vuex State (session state storage)
- **DEC-000014**: HttpOnly Cookies (session token storage)

### New State (store.js)

```javascript
state: {
  session_id: null,
  session_expires_at: null,
  window_id: null,
  session_check_in_progress: false,
  session_conflict: {
    active: false,
    message: null,
    active_window_id: null,
    conflict_type: null
  },
  inactivityWarning: {
    active: false,
    message: null,
    countdown: 60
  }
}
```

### New Components
- **PqsSessionConflict.vue**: Conflict resolution dialog
- **PqsInactivityWarning.vue**: Inactivity countdown dialog

### Code Comments

```javascript
/**
 * Session management service
 * Implements DESKTOP-794 session system per DEC-000006
 * @see provenance/decisions/DEC-000006/decision.md
 */
class SessionManager {
  // Implementation
}
```

## Compliance & Validation
- ❌ **VIOLATION**: Disabling session management in production without approval
- ❌ **VIOLATION**: Increasing inactivity timeout beyond 30 minutes
- ❌ **VIOLATION**: Storing session_id in localStorage (use HttpOnly cookie)
- ✅ **COMPLIANT**: Using environment flags for configuration
- ✅ **COMPLIANT**: HttpOnly cookies for session tokens
- ✅ **COMPLIANT**: BroadcastChannel for multi-window communication
- ✅ **COMPLIANT**: 60-second warning before auto-logout

## Deployment Strategy
1. **Phase 1**: Deploy with `VUE_APP_SESSION_MANAGEMENT_ENABLED=false` (default)
2. **Phase 2**: Enable for internal testing
3. **Phase 3**: Enable for pilot customers
4. **Phase 4**: Enable for all users (after 2 weeks of testing)
5. **Rollback**: Set feature flag to `false` if issues detected

## References
- [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel)
- [Browser Connection Limits](https://developer.mozilla.org/en-US/docs/Web/HTTP/Connection_management_in_HTTP_1.x)
- src/services/SessionManager.js: Complete implementation (2244 lines)
- JIRA: DESKTOP-794 (Session management system)

## Tags
`session-management`, `security`, `authentication`, `multi-window`, `inactivity-timeout`, `connection-pool`

## Version History
- **v1.0** (2023-09-01): Initial implementation (DESKTOP-794)
- **v1.1** (2026-02-06): Documented existing decision
