# DEC-000014 - HttpOnly Cookie Authentication

## Summary
Use HttpOnly cookies for backend session tokens to prevent XSS attacks while maintaining dual-token system with Kinde JWT.

## Status
**Implemented** - Security architecture

## Context
PQS requires secure authentication with:
- **XSS Protection**: JavaScript cannot access auth cookies
- **CSRF Protection**: SameSite cookie policy
- **Dual Authentication**: Kinde JWT (frontend) + Seneca session (backend)
- **Token Refresh**: Automatic refresh without exposing tokens

## Decision
Use **HttpOnly cookies** for Seneca backend session tokens. Kinde JWT in memory. **Never** store sensitive tokens in localStorage.

### Implementation
```javascript
// Backend session request (credentials: 'include')
await fetch('/api/private/session/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',  // ✅ Send HttpOnly cookies
  body: JSON.stringify({ window_id, kinde_session_id })
});

// Backend sets HttpOnly cookie (cannot be accessed by JavaScript)
Set-Cookie: seneca-token=xyz123; HttpOnly; Secure; SameSite=Strict
```

### Dual-Token System
1. **Kinde JWT** (in memory): OAuth access token, short-lived
2. **Seneca Session** (HttpOnly cookie): Backend API access, longer-lived

### Security Benefits
- **XSS Prevention**: `HttpOnly` flag prevents `document.cookie` access
- **CSRF Prevention**: `SameSite=Strict` prevents cross-site requests
- **Secure Transmission**: `Secure` flag requires HTTPS
- **Token Theft**: Even if XSS exploit exists, cannot steal HttpOnly cookies

## Alternatives Considered
- **localStorage**: Rejected - vulnerable to XSS
- **sessionStorage**: Rejected - vulnerable to XSS
- **Memory only**: Rejected - lost on page refresh

## Consequences
### Positive
✅ XSS protection (HttpOnly)  
✅ CSRF protection (SameSite)  
✅ Secure transmission (HTTPS)  
✅ Automatic inclusion in requests  

### Negative
⚠️ Cannot access from JavaScript (by design)  
⚠️ Server configuration required  
⚠️ CORS complexity for cross-origin  

## Compliance
- ❌ **VIOLATION**: Storing auth tokens in localStorage
- ❌ **VIOLATION**: Storing auth tokens in sessionStorage
- ❌ **VIOLATION**: Not using `credentials: 'include'` in fetch
- ✅ **COMPLIANT**: HttpOnly cookies for backend session
- ✅ **COMPLIANT**: In-memory Kinde JWT
- ✅ **COMPLIANT**: Automatic token refresh via SessionManager

## References
- src/services/SessionManager.js: All fetch calls use `credentials: 'include'`
- [HttpOnly Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies)

## Tags
`security`, `authentication`, `httponly`, `cookies`, `xss-protection`

## Version History
- **v1.0** (2026-02-06): Initial documentation
