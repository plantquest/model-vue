# DEC-000011 - Vue Router History Mode

## Summary
Use Vue Router 3.5.2 with history mode for clean URLs and role-based route guards.

## Status
**Implemented** - Core routing

## Context
PQS requires:
- Clean URLs without hash (#) for professional appearance
- Dynamic routes from model configuration
- OAuth callback route for Kinde authentication
- Role-based access control (observer restrictions)

## Decision
Use **Vue Router 3.5.2** with **history mode** and dynamic route configuration from model.

### Implementation
```javascript
const router = new VueRouter({
  mode: 'history',  // No hash in URLs
  routes,
})

// Role-based guard
router.beforeEach((to, from, next) => {
  const userRole = VueCookies.get('user');
  
  if (userRole && userRole.profile === 'ob') {
    if (to.name !== 'pqview' && to.name !== 'callback') {
      return next({ name: 'pqview' });
    }
  }
  next();
});
```

### OAuth Callback Route
```javascript
routes.push({
  path: '/callback',
  beforeEnter: async (to, from, next) => {
    // Clear old session data
    // Extract OAuth code from query params
    // Store in cookies
    next();
  }
})
```

## Alternatives Considered
- **Hash Mode**: Rejected - unprofessional URLs
- **Vue Router 4**: Rejected - requires Vue 3

## Consequences
### Positive
✅ Clean URLs (no #)  
✅ SEO-friendly (if needed)  
✅ Dynamic route configuration  
✅ Role-based access control  

### Negative
⚠️ Server configuration required (fallback to index.html)  
⚠️ Migration to Vue Router 4 needed for Vue 3  

## References
- src/router/router.js: Complete router implementation

## Tags
`vue-router`, `routing`, `navigation`, `history-mode`

## Version History
- **v1.0** (2026-02-06): Initial documentation
