# DEC-000005 - Kinde OAuth Authentication

## Summary
Adopt Kinde as the OAuth authentication provider using PKCE (Proof Key for Code Exchange) flow for secure user authentication and authorization.

## Status
**Implemented** - Production authentication system

## Context
The PQS application requires secure, enterprise-grade authentication with:
- **OAuth 2.0 Standards**: Industry-standard authentication protocol
- **PKCE Security**: Protection against authorization code interception attacks
- **User Management**: Centralized user database with profile management
- **Role-Based Access**: Different permission levels (gea, sea, eo, ob - observer)
- **Session Management**: Long-lived sessions with refresh tokens
- **Multi-Device Support**: Users accessing from multiple browsers/devices

### Security Requirements
- No credentials stored in frontend code
- Protection against XSS attacks
- Protection against CSRF attacks
- Secure token storage (HttpOnly cookies)
- Long-lived refresh tokens (1 year)
- Automatic token refresh on expiration

### Evidence
- **PqsKindeAuth.vue**: Main authentication component
- **SessionManager.js**: Token refresh and re-authentication logic
- **router.js**: OAuth callback route handling
- **package.json**: `@plantquest/kinde-auth-pkce-js` dependency

## Decision
Use **Kinde OAuth with PKCE flow** via the **@plantquest/kinde-auth-pkce-js** library for all authentication and authorization.

### Authentication Flow

```javascript
// 1. User initiates login
kindeAuth.login() // Redirects to Kinde login page

// 2. Kinde callback (after successful login)
const code = urlParams.get('code');
await kindeAuth.handleCallback(code);

// 3. Get user info and token
const user = await kindeAuth.getUser();
const token = await kindeAuth.getToken();
const isAuth = await kindeAuth.isAuthenticated();

// 4. Backend authentication
await seneca.post('aim:web,on:auth,signin:user', {
  email: user.email
});

// 5. Session creation (if session management enabled)
await sessionManager.createSession({
  windowId: window_id,
  kindeSessionId: token
});
```

### Token Management

```javascript
// Automatic token refresh (SessionManager.js)
if (response.status === 401) {
  // Check if Kinde session still valid
  const isAuth = await kindeAuth.isAuthenticated();
  
  if (isAuth) {
    // Get fresh token (auto-refreshes if needed)
    const kindeToken = await kindeAuth.getToken();
    
    // Re-authenticate with backend
    await fetch('/api/kinde/auth', {
      headers: {
        'Authorization': `Bearer ${kindeToken}`
      }
    });
    
    // Retry original request
    return fetch(url, options);
  }
}
```

## Alternatives Considered

### Option 1: Custom JWT Authentication
**Rejected** - High maintenance, security risks
- **Pros**: Full control, no external dependency
- **Cons**: Must maintain auth infrastructure, security vulnerabilities, no user management UI

### Option 2: Auth0
**Rejected** - Cost prohibitive at scale
- **Pros**: Mature, well-documented, extensive features
- **Cons**: Expensive for large user base, vendor lock-in

### Option 3: AWS Cognito
**Rejected** - Complex setup, limited features
- **Pros**: AWS integration, scalable
- **Cons**: Complex configuration, poor UX, limited user management

### Option 4: Firebase Auth
**Rejected** - Firebase dependency required
- **Pros**: Simple setup, good documentation
- **Cons**: Requires Firebase dependency, limited enterprise features

## Consequences

### Positive
✅ Enterprise-grade OAuth 2.0 authentication  
✅ PKCE flow protects against authorization code attacks  
✅ Centralized user management with Kinde dashboard  
✅ Long-lived refresh tokens (1 year) for better UX  
✅ Automatic token refresh in SessionManager  
✅ Role-based access control (profile attribute)  
✅ Multi-device support with session management  
✅ HttpOnly cookies prevent XSS token theft  
✅ No credentials stored in frontend code  

### Negative
⚠️ External dependency on Kinde service availability  
⚠️ Vendor lock-in (migration to other OAuth provider requires refactoring)  
⚠️ Network latency for authentication callbacks  
⚠️ PKCE flow requires proper storage (cookies, sessionStorage)  
⚠️ Token refresh logic adds complexity (SessionManager)  
⚠️ Cost scales with user count  

### Security Considerations
- **XSS Protection**: HttpOnly cookies prevent JavaScript access
- **CSRF Protection**: State parameter validation in PKCE flow
- **Token Theft**: Short-lived access tokens with long-lived refresh tokens
- **Replay Attacks**: PKCE code verifier prevents reuse
- **Man-in-the-Middle**: HTTPS required for all communication

## Implementation Details

### Kinde Configuration

```javascript
// Environment variables (.env)
VUE_APP_KINDE_DOMAIN=https://your-domain.kinde.com
VUE_APP_KINDE_CLIENT_ID=your_client_id
VUE_APP_KINDE_REDIRECT_URI=http://localhost:8080/callback
VUE_APP_KINDE_LOGOUT_REDIRECT_URI=http://localhost:8080/
```

### User Profile Structure

```javascript
{
  id: 'kinde|xxx',
  email: 'user@example.com',
  name: 'John Doe',
  given_name: 'John',
  family_name: 'Doe',
  picture: 'https://...',
  attributes: {
    profile: 'gea' | 'sea' | 'eo' | 'ob',  // Role
    phone_number: '+1234567890',
    job_title: 'Engineer'
  }
}
```

### Role-Based Access

```javascript
// Router guard (router.js)
router.beforeEach((to, from, next) => {
  const userRole = VueCookies.get('user');
  
  // Observer (ob) restricted to pqview only
  if (userRole && userRole.profile === 'ob') {
    if (to.name !== 'pqview' && to.name !== 'callback') {
      return next({ name: 'pqview' });
    }
  }
  
  next();
});
```

### Dual Authentication System

```javascript
// 1. Kinde OAuth (frontend)
const kindeUser = await kindeAuth.getUser();
const kindeToken = await kindeAuth.getToken();

// 2. Seneca Backend Authentication
const senecaAuth = await seneca.post('aim:web,on:auth,signin:user', {
  email: kindeUser.email
});

// Result: Two authentication layers
// - Kinde: User identity and OAuth tokens
// - Seneca: Backend session cookie for API access
```

## Integration with Session Management

### Session Creation (DESKTOP-794)

```javascript
// After successful Kinde auth, create backend session
await sessionManager.createSession({
  windowId: this.windowId,
  kindeSessionId: kindeToken,
  session_id: existingSessionId // For session transfer
});

// Backend creates session with Kinde validation
// - Validates Kinde token
// - Creates/transfers Seneca session
// - Returns session_id and expires_at
```

### Token Refresh on 401

```javascript
// SessionManager automatically refreshes on 401
async fetchWithTokenRefresh(url, options) {
  let response = await fetch(url, options);
  
  if (response.status === 401) {
    // Kinde token refresh (automatic via SDK)
    const freshToken = await kindeAuth.getToken();
    
    // Re-authenticate backend
    await fetch('/api/kinde/auth', {
      headers: { 'Authorization': `Bearer ${freshToken}` }
    });
    
    // Retry request
    response = await fetch(url, options);
  }
  
  return response;
}
```

## Impact on Architecture

### Related Decisions
- **DEC-000006**: Session Management System (uses Kinde tokens)
- **DEC-000007**: Seneca Backend (dual auth layer)
- **DEC-000011**: Vue Router History Mode (callback route)
- **DEC-000014**: HttpOnly Cookie Security (token storage)

### Protected Patterns
- **OAuth Flow**: Must use PKCE, no implicit flow
- **Token Storage**: HttpOnly cookies only, never localStorage for sensitive tokens
- **Backend Auth**: Always validate with both Kinde and Seneca
- **Role Checking**: Use user.attributes.profile for access control

### Code Comments

```javascript
/**
 * Kinde authentication component
 * Implements OAuth 2.0 PKCE flow per DEC-000005
 * @see provenance/decisions/DEC-000005/decision.md
 */
export default {
  name: 'PqsKindeAuth',
  methods: {
    async login() {
      // Kinde OAuth login
    }
  }
}
```

## Compliance & Validation
- ❌ **VIOLATION**: Storing Kinde tokens in localStorage
- ❌ **VIOLATION**: Using implicit OAuth flow instead of PKCE
- ❌ **VIOLATION**: Not validating tokens on backend
- ✅ **COMPLIANT**: Using @plantquest/kinde-auth-pkce-js library
- ✅ **COMPLIANT**: HttpOnly cookies for sensitive tokens
- ✅ **COMPLIANT**: Dual authentication (Kinde + Seneca)
- ✅ **COMPLIANT**: Role-based access via profile attribute

## Migration Path
If migrating to different OAuth provider:
1. Implement OAuth 2.0 PKCE flow with new provider
2. Map user attributes to existing profile structure
3. Update environment variables
4. Maintain dual-auth pattern with Seneca
5. Test role-based access extensively
6. Migrate user database from Kinde

## References
- [OAuth 2.0 PKCE Specification](https://tools.ietf.org/html/rfc7636)
- [Kinde Documentation](https://kinde.com/docs/)
- src/components/PqsKindeAuth.vue: Main auth component
- src/services/SessionManager.js: Token refresh logic
- src/router/router.js: OAuth callback handling

## Tags
`authentication`, `oauth`, `kinde`, `security`, `pkce`, `user-management`

## Version History
- **v1.0** (2026-02-06): Initial documentation of existing decision
