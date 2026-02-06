# DEC-000012 - Babel Transpilation Strategy

## Summary
Use Babel with @vue/cli-plugin-babel preset targeting "> 1%, last 2 versions, not dead" with special handling for AWS SDK.

## Status
**Implemented** - Build configuration

## Context
PQS requires browser compatibility for:
- Modern browsers (last 2 versions)
- Market share > 1%
- Exclude dead browsers
- AWS SDK requires special transpilation
- Optional chaining and nullish coalescing support

## Decision
Use **@vue/cli-plugin-babel/preset** with custom browserslist and AWS SDK transpilation rules.

### Configuration
```javascript
// babel.config.js
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset']
}

// package.json browserslist
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not dead"
]

// vue.config.js - AWS SDK transpilation
module: {
  rules: [{
    test: /\.js$/,
    include: [/node_modules\/@aws-sdk/, /node_modules\/@smithy/],
    use: {
      loader: 'babel-loader',
      options: {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
        plugins: [
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-proposal-nullish-coalescing-operator'
        ]
      }
    }
  }]
}
```

## Consequences
### Positive
✅ Modern JavaScript features transpiled for older browsers  
✅ Reasonable browser support (96%+ coverage)  
✅ AWS SDK works in target browsers  
✅ Optional chaining and nullish coalescing supported  

### Negative
⚠️ Build time increased by transpilation  
⚠️ Bundle size larger than native ES6  

## Tags
`babel`, `transpilation`, `browser-compatibility`, `build`

## Version History
- **v1.0** (2026-02-06): Initial documentation
