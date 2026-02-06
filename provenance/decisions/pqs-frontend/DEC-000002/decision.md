# DEC-000002 - Vue 2.x Framework Selection

## Summary
Adopt Vue 2.6.12 with Options API as the frontend framework for the PQS application, explicitly avoiding Vue 3 features and Composition API.

## Status
**Implemented** - In production since project inception

## Context
The PQS frontend requires a stable, mature framework with:
- Strong ecosystem support for mapping libraries (Leaflet, vue2-leaflet)
- Compatibility with existing component libraries (@plantquest/model-vue)
- Proven stability for enterprise applications
- Long-term support and gradual migration path

### Technology Landscape (2020-2021)
- Vue 3 was newly released (September 2020) with breaking changes
- Vue 2.x had mature ecosystem, extensive documentation, and proven stability
- Many critical libraries (Vuetify 2.x, vue2-leaflet) were Vue 2 only
- Migration to Vue 3 required significant refactoring

### Constraints
- Existing @plantquest/model-vue component library built for Vue 2
- Need for stable production deployment
- Team expertise in Vue 2 Options API
- Tight project timeline precluded Vue 3 migration risk

## Decision
Use **Vue 2.6.12** with **Options API pattern** for all components.

### Technical Implementation
- Vue 2.6.12 as core framework
- Vue Router 3.5.2 for routing
- Vuex 3.4.0 for state management
- Vuetify 2.5.1 for UI components
- Options API for all component definitions (no Composition API)

### Code Standards
All components must follow this pattern:

```javascript
export default {
  name: 'ComponentName',
  data() {
    return {
      // Component data
    }
  },
  computed: {
    // Computed properties
  },
  methods: {
    // Component methods
  },
  mounted() {
    // Lifecycle hooks
  }
}
```

## Alternatives Considered

### Option 1: Vue 3 with Composition API
**Rejected** - Too new, immature ecosystem, migration risk
- **Pros**: Modern features, better TypeScript support, performance improvements
- **Cons**: Breaking changes, library incompatibility, team learning curve, migration effort

### Option 2: React
**Rejected** - Would require complete rewrite
- **Pros**: Large ecosystem, strong TypeScript support
- **Cons**: Complete rewrite required, loss of existing component library investment

### Option 3: Angular
**Rejected** - Too heavyweight for requirements
- **Pros**: Enterprise features, strong TypeScript
- **Cons**: Steep learning curve, heavyweight framework, complete rewrite

## Consequences

### Positive
✅ Stable, mature framework with proven track record  
✅ Full compatibility with @plantquest/model-vue component library  
✅ Extensive ecosystem support (Vuetify, Leaflet, vue2-leaflet)  
✅ Team already experienced with Vue 2 Options API  
✅ Clear migration path to Vue 3 when ecosystem matures  
✅ Babel transpilation handles browser compatibility  

### Negative
⚠️ Vue 2 reaches End of Life on December 31, 2023 (extended support available)  
⚠️ Missing Vue 3 performance improvements (Proxy-based reactivity)  
⚠️ Cannot use Composition API features  
⚠️ Limited TypeScript support compared to Vue 3  
⚠️ Future migration effort required for Vue 3  

### Technical Debt
- **Migration to Vue 3**: Estimated 3-6 months effort when ecosystem matures
- **Component Refactoring**: All components will need Options API → Composition API conversion
- **Dependency Updates**: Vuetify 3, vue-router 4, vuex 4/pinia required for Vue 3

## Impact on Architecture

### Related Decisions
- **DEC-000003**: Promise-Based Async Operations (required for Vue 2 compatibility)
- **DEC-000004**: Vuex State Management (Vue 2 version)
- **DEC-000008**: @plantquest/model-vue Component Library (Vue 2 based)
- **DEC-000011**: Vue Router History Mode (Vue 2 version)

### Protected Code Patterns
All Vue components must:
- Use Options API (no Composition API)
- Follow Vue 2.x lifecycle hooks
- Use Vue 2.x reactive data patterns
- Avoid Vue 3-specific features

### Code Comments
Significant Vue 2 patterns should reference this decision:

```javascript
/**
 * User authentication component
 * Uses Vue 2 Options API per DEC-000002
 * @see provenance/decisions/DEC-000002/decision.md
 */
export default {
  name: 'PqsKindeAuth',
  // Options API implementation
}
```

## Compliance & Validation
- ❌ **VIOLATION**: Using Vue 3 Composition API (`setup()`, `ref()`, `reactive()`)
- ❌ **VIOLATION**: Importing from `vue` v3+ packages
- ✅ **COMPLIANT**: Options API with `data()`, `methods`, `computed`
- ✅ **COMPLIANT**: Vue 2.x lifecycle hooks (`mounted`, `created`, etc.)

## Migration Path
When Vue 3 migration is approved:
1. Update ecosystem dependencies (Vuetify 3, etc.)
2. Migrate Vuex to Pinia
3. Convert components to Composition API gradually
4. Update build configuration
5. Test thoroughly with @plantquest/model-vue compatibility

## References
- [Vue 2 Documentation](https://v2.vuejs.org/)
- [Vue 2 End of Life Policy](https://v2.vuejs.org/lts/)
- [Migration to Vue 3 Guide](https://v3-migration.vuejs.org/)
- package.json: Line 47 (`"vue": "2.6.12"`)
- .cursor/rules: Vue 2.x syntax requirements

## Tags
`frontend`, `framework`, `vue`, `architecture`, `core-dependency`

## Version History
- **v1.0** (2026-02-06): Initial documentation of existing decision
