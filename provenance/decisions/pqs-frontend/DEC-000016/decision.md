# DEC-000016 - Multi-Window Session Handling

## Summary
Use localStorage for shared window_id across browser tabs with BroadcastChannel for cross-window communication to support multi-tab sessions while detecting cross-browser conflicts.

## Status
**Implemented** - Session management feature

## Context
PQS users need to:
- **Open multiple tabs** in same browser (should share session)
- **Prevent conflicts** when opening different browser/device (should detect conflict)
- **Session transfer** when switching between tabs
- **Real-time sync** when session changes in another window

### Multi-Tab Requirements
- Same browser, multiple tabs = Share session (no conflict)
- Different browsers/devices = Conflict detection and resolution
- Session ownership transfer between tabs
- Real-time notification when session moved

## Decision
Use **localStorage for window_id** (shared across tabs) and **BroadcastChannel** for cross-window communication.

### Window ID Strategy
```javascript
// Generate unique window ID (shared across tabs via localStorage)
generateWindowId() {
  let windowId = localStorage.getItem('pqs_window_id');
  if (!windowId) {
    windowId = 'win_' + Date.now() + '_' + Math.random();
    localStorage.setItem('pqs_window_id', windowId);
  }
  return windowId;
}
```

### BroadcastChannel Communication
```javascript
// Cross-window messaging
this.broadcastChannel = new BroadcastChannel('pqs-session');

this.broadcastChannel.onmessage = (event) => {
  if (event.data.type === 'session_created') {
    // Another tab created session - check our status
    this.checkSession();
  }
};

// Notify other windows
this.broadcastChannel.postMessage({
  type: 'session_created',
  window_id: this.windowId,
  session_id: this.sessionId
});
```

### Session Transfer
```javascript
// Backend session creation with existing session_id
await fetch('/api/private/session/create', {
  body: JSON.stringify({
    window_id: this.windowId,
    session_id: existingSessionId  // Transfer ownership
  })
});

// Backend response
{
  transferred: true,  // Session ownership transferred
  session: { session_id, expires_at, window_id }
}
```

## How It Works

### Scenario 1: Multiple Tabs in Same Browser
1. Tab 1 logs in, gets `window_id` (saved to localStorage)
2. Tab 2 opens, reads same `window_id` from localStorage
3. Both tabs share `window_id` = Backend treats as same window
4. Result: **No conflict, session shared**

### Scenario 2: Different Browser/Device
1. Browser A logs in with `window_id_A`
2. Browser B opens (different `window_id_B` in its localStorage)
3. Browser B tries to use session
4. Backend detects `window_id` mismatch
5. Result: **Conflict detected, dialog shown**

### Scenario 3: Session Transfer Between Tabs
1. Tab 1 has active session
2. Tab 2 (same browser) creates new session with existing `session_id`
3. Backend transfers ownership to Tab 2
4. Tab 1 receives BroadcastChannel message
5. Tab 1 checks session, gets 409 conflict
6. Result: **Graceful transfer, Tab 1 shows conflict dialog**

## Alternatives Considered
- **sessionStorage for window_id**: Rejected - each tab gets unique ID, breaks multi-tab
- **No cross-window communication**: Rejected - no real-time sync
- **Polling for conflicts**: Rejected - performance overhead

## Consequences
### Positive
✅ Multiple tabs in same browser work seamlessly  
✅ Different browsers/devices trigger conflict detection  
✅ Real-time sync via BroadcastChannel (no polling)  
✅ Session transfer between tabs  
✅ Graceful conflict resolution with user dialog  

### Negative
⚠️ BroadcastChannel not supported in IE11  
⚠️ localStorage shared state can be confusing  
⚠️ Complex conflict scenarios to test  

## Fallback for Older Browsers
```javascript
if (typeof BroadcastChannel === 'undefined') {
  // Fall back to storage events
  window.addEventListener('storage', (event) => {
    if (event.key === 'pqs-session-conflict') {
      this.handleSessionConflict(JSON.parse(event.newValue));
    }
  });
}
```

## References
- src/services/SessionManager.js: Lines 182-285 (window ID and BroadcastChannel)
- [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel)

## Tags
`multi-window`, `session-management`, `broadcastchannel`, `localstorage`

## Version History
- **v1.0** (2026-02-06): Initial documentation
