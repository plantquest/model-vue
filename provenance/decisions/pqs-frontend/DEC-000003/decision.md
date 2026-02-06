# DEC-000003 - Promise-Based Async Operations

## Summary
All asynchronous operations must use Promise chains (`.then()`, `.catch()`) instead of `async/await` syntax throughout the codebase.

## Status
**Implemented** - Enforced across entire codebase

## Context
The PQS frontend requires consistent asynchronous code patterns that are:
- Compatible with Vue 2.x runtime environment
- Transpilable by Babel to target browsers ("> 1%, last 2 versions")
- Readable and maintainable by the development team
- Consistent with existing codebase patterns

### Technical Constraints
- **Vue 2.x Compatibility**: Vue 2 build tools and runtime expect Promise-based patterns
- **Babel Transpilation**: `async/await` requires additional polyfills and regenerator-runtime
- **Browser Support**: Target browsers include older versions requiring Promise polyfills
- **Build Size**: Avoiding async/await reduces bundle size (no regenerator-runtime)

### Codebase Evidence
- **store.js**: 1660 lines of Promise-based async patterns
- **SessionManager.js**: 2244 lines mixing both patterns (technical debt)
- **Components**: Consistent `.then()/.catch()` usage in API calls

## Decision
**Mandate Promise-based async operations** using `.then()` and `.catch()` chains. **Prohibit `async/await` syntax** in all new code.

### Required Pattern

```javascript
// ✅ CORRECT: Promise chains
methods: {
  fetchData() {
    return this.$http.get('/api/data')
      .then(response => {
        this.data = response.data;
        return this.processData(this.data);
      })
      .then(processedData => {
        this.updateUI(processedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.$toast.error('Failed to load data');
      });
  }
}
```

### Prohibited Pattern

```javascript
// ❌ WRONG: async/await syntax
methods: {
  async fetchData() {
    try {
      const response = await this.$http.get('/api/data');
      this.data = response.data;
      const processedData = await this.processData(this.data);
      this.updateUI(processedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      this.$toast.error('Failed to load data');
    }
  }
}
```

## Alternatives Considered

### Option 1: async/await Throughout
**Rejected** - Incompatible with Vue 2 and increases bundle size
- **Pros**: More readable, modern JavaScript, better error handling
- **Cons**: Requires regenerator-runtime polyfill (+30KB), Vue 2 compatibility issues, inconsistent with existing codebase

### Option 2: Mixed Approach (case-by-case)
**Rejected** - Creates inconsistency and confusion
- **Pros**: Flexibility for complex async flows
- **Cons**: Inconsistent patterns, harder to maintain, team confusion

### Option 3: Callback Hell (pre-Promise)
**Rejected** - Outdated pattern, poor readability
- **Pros**: No polyfills needed, maximum browser support
- **Cons**: Callback hell, poor error handling, unmaintainable code

## Consequences

### Positive
✅ Consistent async pattern across entire codebase  
✅ Full Vue 2.x compatibility without issues  
✅ Smaller bundle size (no regenerator-runtime)  
✅ Better browser support with simple Promise polyfill  
✅ Clear migration path (can add async/await with Vue 3)  
✅ Babel transpilation is simpler and faster  

### Negative
⚠️ More verbose than async/await (especially for error handling)  
⚠️ Nested `.then()` chains can become complex (promise chaining depth)  
⚠️ Less familiar to developers from other modern frameworks  
⚠️ Harder to debug compared to async/await stack traces  
⚠️ Sequential async operations require chaining  

### Technical Debt
- **Migration to async/await**: Can be done when migrating to Vue 3
- **SessionManager.js**: Already uses async/await (pre-existing technical debt)
- **Refactoring Effort**: Estimated 2-3 weeks to convert all code to async/await when Vue 3 migration happens

## Implementation Guidelines

### Vuex Actions

```javascript
// ✅ CORRECT: Promise-based Vuex action
actions: {
  async save_main_asset({commit, dispatch}, {item, changeControl}) {
    let asset = null == item.id ? null :
        await seneca.entity('pqs/asset').load$(item.id)
    
    // ... implementation
    
    return asset.save$()
      .then(savedAsset => {
        commit('update_asset', savedAsset);
        return dispatch('list_main_asset', {vitems: []});
      })
      .then(() => {
        return dispatch('set_cmp_flags', { 
          name: 'BasicMain', 
          flags: { show: false } 
        });
      })
      .catch(error => {
        console.error('Error saving asset:', error);
        throw error;
      });
  }
}
```

### Component Methods

```javascript
// ✅ CORRECT: Promise chains in component
methods: {
  loadUserData() {
    this.$store.dispatch('load_current_user')
      .then(userRes => {
        if (userRes && userRes.ok) {
          return this.$store.dispatch('list_main_asset', {
            vitems: [],
            values: {}
          });
        }
        throw new Error('User not found');
      })
      .then(() => {
        this.isLoading = false;
      })
      .catch(error => {
        console.error('Error loading user:', error);
        this.isLoading = false;
      });
  }
}
```

### Sequential Operations

```javascript
// ✅ CORRECT: Sequential async operations
methods: {
  saveAndRefresh() {
    return this.saveItem()
      .then(() => this.refreshList())
      .then(() => this.updateUI())
      .then(() => {
        this.$toast.success('Saved successfully');
      })
      .catch(error => {
        this.$toast.error('Save failed');
        console.error(error);
      });
  }
}
```

## Impact on Architecture

### Related Decisions
- **DEC-000002**: Vue 2.x Framework Selection (requires Promise pattern)
- **DEC-000004**: Vuex State Management (actions use Promises)
- **DEC-000006**: Session Management System (technical debt - uses async/await)
- **DEC-000012**: Babel Transpilation Strategy (simpler without async/await)

### Code Patterns
All asynchronous code must:
- Use `.then()` for success handling
- Use `.catch()` for error handling
- Return Promises for chainability
- Avoid `async` function keyword
- Avoid `await` operator

### Code Comments
Promise chains should reference this decision when complex:

```javascript
/**
 * Load and process asset data
 * Uses Promise chains per DEC-000003 (Vue 2 compatibility)
 * @see provenance/decisions/DEC-000003/decision.md
 */
methods: {
  loadAssetData() {
    return this.fetchAssets()
      .then(assets => this.processAssets(assets))
      .then(processed => this.renderAssets(processed));
  }
}
```

## Compliance & Validation
- ❌ **VIOLATION**: Using `async function` keyword
- ❌ **VIOLATION**: Using `await` operator
- ❌ **VIOLATION**: Using `try/catch` with async/await
- ✅ **COMPLIANT**: Promise chains with `.then()/.catch()`
- ✅ **COMPLIANT**: Returning Promises for chaining
- ⚠️ **EXCEPTION**: SessionManager.js (pre-existing code, migration pending)

## Migration Path
When Vue 3 migration is approved:
1. Update Babel configuration to support async/await
2. Add regenerator-runtime if needed
3. Convert Promise chains to async/await gradually
4. Update ESLint rules to allow async/await
5. Document new async/await patterns

## References
- [Promise MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Vue 2 Async Best Practices](https://v2.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)
- src/plugins/store.js: Lines 1094-1336 (extensive Promise usage)
- .cursor/rules: "Use Promise-based async operations instead of async/await"

## Known Technical Debt
- **SessionManager.js**: Uses async/await throughout (2244 lines)
  - Reason: Written after codebase established, complex async flows
  - Impact: Works but violates pattern
  - Resolution: Accept as technical debt, convert during Vue 3 migration

## Tags
`javascript`, `async`, `promises`, `code-style`, `vue2-compatibility`

## Version History
- **v1.0** (2026-02-06): Initial documentation of existing decision
