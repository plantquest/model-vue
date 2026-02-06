# DEC-000004 - Vuex State Management Architecture

## Summary
Adopt Vuex 3.4.0 as the centralized state management solution with a single store managing all application state including session, assets, UI, and NavVis positioning.

## Status
**Implemented** - Core application architecture

## Context
The PQS application requires centralized state management for:
- **Complex State**: User sessions, asset collections, UI state, map levels, NavVis positioning
- **Component Communication**: Cross-component data sharing without prop drilling
- **State Persistence**: Session management, bookmark state, asset selections
- **Time Travel Debugging**: State history for debugging complex interactions
- **Predictable Mutations**: Clear patterns for state changes

### Application State Complexity
- **User State**: Authentication, profiles, permissions, session management
- **Asset State**: 1000+ assets, rooms, devices, collections, search results
- **UI State**: Side panels, filters, navigation stages, modals, loading states
- **Map State**: Levels, coordinates, markers, halos, paths
- **NavVis State**: 3D positioning modes, pending coordinates, viewport data

### Evidence
- **store.js**: 1660 lines of centralized state, 50+ mutations, 40+ actions
- **100+ State Properties**: Extensive state tree with nested objects
- **Model-Vue Integration**: State must be compatible with @plantquest/model-vue components

## Decision
Use **Vuex 3.4.0** with a **single centralized store** containing all application state, following strict mutation/action patterns.

### Store Structure

```javascript
const store = new Vuex.Store({
  state: {
    // Session Management (DESKTOP-794)
    current_user: null,
    session_id: null,
    session_expires_at: null,
    window_id: null,
    
    // Asset Management
    main_asset: [],
    found_assets: [],
    halo_assets: [],
    selected_assets: {},
    fresh_asset: null,
    side_asset: {},
    
    // Map & Navigation
    currentStage: 1,
    map_levels: [],
    coordinates: {},
    pathData: {},
    
    // NavVis Positioning
    navvisPositioning: {
      activeMode: null,
      pendingCoordinates: null,
      targetAssetId: null,
      isActive: false
    },
    
    // UI State
    vxg: {
      cmp: {
        BasicSide: { show: true },
        BasicMain: { show: false },
        BasicHead: { allow: {}, show: {} }
      }
    },
    
    // Trigger System
    trigger: {
      filter: { active: false },
      search: { term: '', a: '', b: '' },
      bookmark: { value: false, visible: false }
    }
  },
  
  mutations: {
    // Synchronous state changes only
  },
  
  actions: {
    // Asynchronous operations, API calls
  }
})
```

## Alternatives Considered

### Option 1: Component-Local State Only
**Rejected** - Unmanageable for complex state
- **Pros**: Simple, no library needed, less boilerplate
- **Cons**: Prop drilling, no central source of truth, hard to debug, component coupling

### Option 2: Event Bus Pattern
**Rejected** - Hard to track state changes
- **Pros**: Simple pub/sub, decoupled components
- **Cons**: No state history, hard to debug, event spaghetti, no time travel

### Option 3: Pinia (Vue 3 Store)
**Rejected** - Requires Vue 3
- **Pros**: Better TypeScript, simpler API, better devtools
- **Cons**: Vue 3 required, not compatible with Vue 2.6

### Option 4: Redux
**Rejected** - Too heavyweight, not Vue-native
- **Pros**: Mature, well-documented, time travel debugging
- **Cons**: Boilerplate heavy, not Vue-optimized, steeper learning curve

## Consequences

### Positive
✅ Single source of truth for all application state  
✅ Predictable state changes through mutations  
✅ Time travel debugging with Vue DevTools  
✅ Clear separation of sync (mutations) and async (actions)  
✅ Reactive state updates automatically propagate to components  
✅ Compatible with @plantquest/model-vue component expectations  
✅ Easy to persist state to localStorage/sessionStorage  
✅ Clear audit trail for state changes (DESKTOP-794 sessions)  

### Negative
⚠️ Large single store (1660 lines) can be hard to navigate  
⚠️ Boilerplate for simple state changes  
⚠️ Learning curve for Vuex patterns (mutations vs actions)  
⚠️ Must migrate to Pinia when moving to Vue 3  
⚠️ No module namespacing (flat store structure)  
⚠️ TypeScript support limited in Vuex 3  

### Technical Debt
- **Store Size**: 1660 lines in single file (should be split into modules)
- **No Namespacing**: Flat structure without module organization
- **Migration to Pinia**: Required when migrating to Vue 3 (est. 2-3 weeks)

## Implementation Patterns

### State Access in Components

```javascript
// ✅ CORRECT: Computed properties for reactivity
computed: {
  currentUser() {
    return this.$store.state.current_user;
  },
  isAuthenticated() {
    return this.$store.state.current_user !== null;
  },
  foundAssets() {
    return this.$store.state.found_assets;
  }
}
```

### Mutations (Synchronous Only)

```javascript
// ✅ CORRECT: Synchronous state mutation
mutations: {
  set_current_user(state, current_user) {
    state.current_user = current_user;
  },
  
  SET_SESSION(state, session) {
    state.session_id = session.session_id;
    state.session_expires_at = session.expires_at;
    state.window_id = session.window_id;
  },
  
  set_found_assets(state, {assets, whence}) {
    if(assets) {
      assets.forEach(asset => {
        asset.active$ = null == asset.active$ ? false : asset.active$;
      });
      state.found_assets = assets;
    }
  }
}
```

### Actions (Async Operations)

```javascript
// ✅ CORRECT: Async action with Promise chain
actions: {
  async list_main_asset({commit, state}, {vitems, values}) {
    let assets = await seneca.entity('pqs/asset').list$({
      custom$: { lister: true },
      fields$: ['id', 'tag', 'xco', 'yco', ...]
    });
    
    return Promise.resolve(assets)
      .then(assets => {
        // Process assets
        commit('list_main_asset', vitems);
        commit('load_main_room', {items: rooms});
        commit('set_values', values);
      });
  },
  
  async save_main_asset({commit, dispatch}, {item, changeControl}) {
    let asset = await seneca.entity('pqs/asset').data$(item).save$();
    return dispatch('set_cmp_flags', { 
      name: 'BasicMain', 
      flags: { show: false } 
    });
  }
}
```

### Dispatching Actions in Components

```javascript
// ✅ CORRECT: Dispatch actions, commit mutations
methods: {
  loadData() {
    this.$store.dispatch('list_main_asset', {
      vitems: [],
      values: { tag: [], atype: [] }
    })
    .then(() => {
      this.isLoading = false;
    })
    .catch(error => {
      console.error('Error loading assets:', error);
    });
  },
  
  updateUser(user) {
    this.$store.commit('set_current_user', user);
  }
}
```

## State Organization

### Session Management State (DESKTOP-794)

```javascript
state: {
  current_user: null,
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

### NavVis Three-Mode Asset Positioning State

```javascript
state: {
  navvisPositioning: {
    activeMode: null,  // 'position-asset' | 'reposition-asset' | 'add-asset'
    pendingCoordinates: null,  // { x, y, z }
    targetAssetId: null,
    viewport: null,
    isActive: false
  },
  navvisUserLocation: { x: null, y: null, z: null },
  navvisCoordinate: { xco: '', yco: '', zco: '' },
  navvisEvent: {
    action: null,
    timestamp: null,
    data: null
  }
}
```

### Model-Vue Component State (BasicNavStages, BasicSide, BasicHead)

```javascript
state: {
  vxg: {
    ent: {
      meta: { name: 'Item' }
    },
    cmp: {
      BasicSide: { show: true },
      BasicMain: { show: false },
      BasicHead: {
        allow: {
          go: true, clear: true, add: true,
          remove: true, select: true, print: true,
          bookmark: true, collect: true
        },
        show: {
          go: true, clear: true, add: true,
          remove: true, search: true, filter: true,
          select: true, print: true, bookmark: true,
          collect: true
        }
      }
    }
  }
}
```

## Impact on Architecture

### Related Decisions
- **DEC-000002**: Vue 2.x Framework (Vuex 3 for Vue 2)
- **DEC-000003**: Promise-Based Async (actions use Promises)
- **DEC-000006**: Session Management (state stored in Vuex)
- **DEC-000007**: Seneca Backend (actions call Seneca entities)
- **DEC-000008**: Model-Vue Components (state compatibility)

### Protected State Patterns
- **Mutations**: Must be synchronous, commit from actions
- **Actions**: Async operations, must return Promises
- **State Access**: Always through computed properties
- **Direct Mutation**: Never mutate state directly in components

### Code Comments

```javascript
/**
 * Load assets from backend and update store
 * Per DEC-000004: Use Vuex action for async operations
 * @see provenance/decisions/DEC-000004/decision.md
 */
actions: {
  async list_main_asset({commit}, {vitems, values}) {
    // Implementation
  }
}
```

## Compliance & Validation
- ❌ **VIOLATION**: Mutating state directly in components (`this.$store.state.user = ...`)
- ❌ **VIOLATION**: Async operations in mutations
- ❌ **VIOLATION**: Not returning Promises from actions
- ✅ **COMPLIANT**: Committing mutations for state changes
- ✅ **COMPLIANT**: Dispatching actions for async operations
- ✅ **COMPLIANT**: Using computed properties for state access

## Migration Path
When Vue 3 migration is approved:
1. Migrate Vuex 3 to Pinia (Vue 3 store)
2. Split large store into smaller stores
3. Add TypeScript support
4. Convert to Composition API with `useStore()`
5. Remove mutation pattern (Pinia allows direct state mutation)

## References
- [Vuex 3 Documentation](https://v3.vuex.vuejs.org/)
- [Vue DevTools Time Travel](https://devtools.vuejs.org/)
- src/plugins/store.js: Complete store implementation (1660 lines)
- [Pinia Migration Guide](https://pinia.vuejs.org/cookbook/migration-vuex.html)

## Tags
`vuex`, `state-management`, `vue`, `architecture`, `core-dependency`

## Version History
- **v1.0** (2026-02-06): Initial documentation of existing decision
