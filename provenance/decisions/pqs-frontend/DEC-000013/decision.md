# DEC-000013 - Environment-Based Configuration

## Summary
Use VUE_APP_* prefixed environment variables for feature flags and configuration with Webpack DefinePlugin injection.

## Status
**Implemented** - Configuration pattern

## Context
PQS requires environment-specific configuration for:
- Feature flags (session management, debug modes)
- API endpoints (baseUrl)
- OAuth configuration (Kinde)
- Session timeouts
- Browser security settings

## Decision
Use **VUE_APP_*** prefix for environment variables with **Webpack DefinePlugin** for compile-time injection.

### Implementation
```javascript
// .env
VUE_APP_SESSION_MANAGEMENT_ENABLED=true
VUE_APP_SESSION_EXPIRY_MINUTES=15
VUE_APP_SESSION_DEBUG=false
VUE_APP_KINDE_DOMAIN=https://your-domain.kinde.com
VUE_APP_KINDE_CLIENT_ID=your_client_id

// vue.config.js
new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    ...Object.keys(process.env)
      .filter(key => key.startsWith('VUE_APP_'))
      .reduce((env, key) => {
        env[key] = JSON.stringify(process.env[key]);
        return env;
      }, {})
  }
})

// Usage
if (process.env.VUE_APP_SESSION_MANAGEMENT_ENABLED === 'true') {
  sessionManager.start();
}
```

## Feature Flags
- `VUE_APP_SESSION_MANAGEMENT_ENABLED`: Enable/disable session system (default: false)
- `VUE_APP_SESSION_EXPIRY_MINUTES`: Session timeout (default: 15)
- `VUE_APP_SESSION_BROWSER_SECURITY`: Multi-window detection (default: true)
- `VUE_APP_SESSION_DEBUG`: Debug logging (default: false)

## Consequences
### Positive
✅ Environment-specific configuration  
✅ Feature flags for gradual rollout  
✅ Type-safe compile-time constants  
✅ No sensitive data in code  

### Negative
⚠️ Requires rebuild for config changes  
⚠️ Must manage multiple .env files  

## Tags
`configuration`, `environment-variables`, `feature-flags`

## Version History
- **v1.0** (2026-02-06): Initial documentation
