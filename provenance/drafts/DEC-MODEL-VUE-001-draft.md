# DEC-MODEL-VUE-001 - model-vue Component Library Architecture (Backwards-Looking)

## Summary
Document the architectural decisions made in building @plantquest/model-vue as a reusable Vue 2 component library for @plantquest applications.

## Status
**Documented** - Backwards-looking analysis of existing implementation

## Context
The @plantquest/model-vue library was created to provide standardized UI components across multiple @plantquest applications (pqs-frontend, pqs-mobile, etc.). This decision documents the architectural choices that were made.

### Library Purpose
- **Reusable Components**: BasicHead, BasicSide, BasicMain, BasicNavStages, BasicAdmin, BasicAuth, BasicFieldPick, BasicFoot, BasicLed
- **Consistent UX**: Standardized patterns across all @plantquest applications
- **Vuex Integration**: Tight integration with consuming application's Vuex store
- **Permission System**: Pattern-based authorization using Patrun

### Evidence from Codebase
- **package.json**: Vue 2.6.12, Vuetify 2.5.1, Vue Router 3.5.2
- **src/vxg.js**: Plugin architecture with Vxg class (100 lines)
- **src/components/**: 9 Vue 2 components (BasicHead, BasicSide, etc.)
- **package.json**: `"main": "./dist/Vxg.umd.js"` - UMD build
- **dependencies**: moment, patrun, @jsonic/jsonic-next

---

## Core Architectural Decisions

### 1. Vue 2.6 Options API for All Components

**Decision**: Build all library components using Vue 2.6.12 with Options API pattern.

**Rationale**:
- **Stability**: Vue 2 was stable and proven (vs. Vue 3 newly released)
- **Ecosystem**: Vuetify 2.x, vue2-leaflet, and other dependencies were Vue 2 only
- **Consistency**: All @plantquest applications standardized on Vue 2
- **Team Expertise**: Development team familiar with Options API

**Code Pattern**:
```javascript
// All components follow this pattern
export default {
  name: 'BasicHead',
  data() {
    return {
      search: '',
      select: ''
    }
  },
  computed: {
    drawerOpen() {
      return this.$store.state.vxg.cmp.BasicSide.show
    }
  },
  methods: {
    openDrawer() {
      this.$store.dispatch('set_cmp_flags', {
        name: 'BasicSide',
        flags: { show: true }
      })
    }
  }
}
```

**Consequences**:
- ✅ Consistent with Vue 2 ecosystem
- ✅ Straightforward for team to maintain
- ⚠️ Will require migration effort when moving to Vue 3
- ⚠️ Cannot use Composition API features

---

### 2. Vuetify 2.x as UI Foundation

**Decision**: Build all components on Vuetify 2.5.1 Material Design framework.

**Rationale**:
- **Complete UI System**: Buttons, app bars, drawers, expansion panels, tooltips
- **Material Design**: Consistent, professional design language
- **Vue 2 Mature**: Vuetify 2.x stable for Vue 2.6.12
- **Rich Components**: Reduces custom component development

**Implementation**:
```vue
<template>
  <v-app-bar app class="vxg-app-bar">
    <v-btn @click="action">
      <v-icon left medium>mdi-map-marker-path</v-icon>
      Add Item
    </v-btn>
    <v-divider vertical></v-divider>
    <v-combobox ref="search" v-model="search"></v-combobox>
  </v-app-bar>
</template>
```

**Consequences**:
- ✅ Professional, polished UI out of the box
- ✅ Extensive component library (data tables, forms, navigation)
- ✅ Material Design icons (mdi-*)
- ⚠️ Dependency on Vuetify lifecycle (must migrate to Vuetify 3 with Vue 3)
- ⚠️ Bundle size increased by Vuetify

---

### 3. Plugin Architecture with Vxg Class

**Decision**: Implement library as Vue plugin with `Vxg` class for global registration and shared utilities.

**Rationale**:
- **Vue Plugin Pattern**: Standard Vue.use() registration
- **Global Components**: All components registered globally
- **Shared State**: `$vxg` instance accessible in all components
- **Permission System**: Centralized pattern matching for authorization

**Implementation** (src/vxg.js):
```javascript
class Vxg {
  constructor(config) {
    this.match = {
      allow: new Patrun({ gex: true })
    }
    this.cmp = {}
    this.config(config)
  }

  install(Vue, options) {
    const components = {
      VxgBasicHead,
      VxgBasicSide,
      VxgBasicMain,
      // ... other components
    }

    Object.entries(components).forEach(([name, component]) => {
      Vue.component(name, component)
      this.cmp[name] = component
    })

    Object.defineProperty(Vue.prototype, '$vxg', {
      get: () => this
    })
  }
}

export default Vxg
```

**Usage**:
```javascript
// In consuming application (pqs-frontend)
import Vxg from '@plantquest/model-vue'

const vxg = new Vxg({
  allow: {
    match: [
      { role: 'admin', action: 'edit' },
      { role: 'user', action: 'view' }
    ]
  }
})

Vue.use(vxg)
```

**Consequences**:
- ✅ Standard Vue plugin pattern
- ✅ All components globally available (VxgBasicHead, VxgBasicSide)
- ✅ Shared `$vxg` instance for utilities
- ⚠️ Global registration increases bundle size (no tree-shaking)
- ⚠️ Plugin API will change in Vue 3

---

### 4. Patrun Pattern Matching for Permissions

**Decision**: Use Patrun library for flexible permission/authorization pattern matching.

**Rationale**:
- **Flexible Matching**: Pattern-based rules vs. rigid role checks
- **Seneca Integration**: Patrun used by Seneca backend (consistent pattern)
- **Extensible**: Easy to add new permission rules without code changes
- **Memoization**: Built-in caching for performance

**Implementation**:
```javascript
// Vxg class setup
this.match.allow = new Patrun({ gex: true })
this.memoizedAllow = new Map()

for (let entry of this.config.allow.match) {
  this.match.allow.add(entry, { allow: true })
}

// Permission checking with memoization
allow(match) {
  const key = JSON.stringify(match)
  if (this.memoizedAllow.has(key)) {
    return this.memoizedAllow.get(key)
  }

  let mm = Jsonic(match)
  let found = this.match.allow.find(mm)
  
  const result = found ? !!found.allow : false
  this.memoizedAllow.set(key, result)
  return result
}
```

**Usage in Components**:
```javascript
// BasicHead.vue
show(action) {
  return this.allow(action) &&
    this.$store.state.vxg.cmp.BasicHead.show[action]
}

allow(action) {
  let allowed = this.$store.state.vxg.cmp.BasicHead.allow[action]
  return null == allowed ? true : allowed
}
```

**Consequences**:
- ✅ Flexible pattern-based authorization
- ✅ Consistent with Seneca backend patterns
- ✅ Memoization improves performance
- ⚠️ Less common pattern than RBAC (team unfamiliarity)
- ⚠️ Patrun dependency adds bundle size

---

### 5. Strict Vuex State Contract

**Decision**: Require consuming applications to maintain specific Vuex state structure under `state.vxg`.

**Rationale**:
- **Component Communication**: Components need access to shared state
- **Layout Control**: Parent app controls visibility of library components
- **Consistent API**: All apps use same state structure
- **Predictable Behavior**: Components know where to find state

**Required State Structure**:
```javascript
// Consuming application must have this in Vuex store
state: {
  vxg: {
    ent: {
      meta: { name: 'Item' }  // Entity name
    },
    cmp: {
      BasicSide: {
        show: true  // Sidebar visibility
      },
      BasicMain: {
        show: false  // Detail panel visibility
      },
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
  },
  
  trigger: {
    filter: { active: false },
    search: { term: '', a: '', b: '' },
    select: { value: null },
    bookmark: { value: false, visible: false }
  }
}
```

**Component Usage**:
```javascript
// BasicHead.vue reads from state
computed: {
  drawerOpen() {
    return this.$store.state.vxg.cmp.BasicSide.show
  },
  detailOpen() {
    return !this.$store.state.vxg.cmp.BasicMain.show
  },
  itemName() {
    return this.$store.state.vxg.ent.meta.name
  }
}

// BasicHead.vue dispatches actions
methods: {
  openDrawer() {
    this.$store.dispatch('set_cmp_flags', {
      name: 'BasicSide',
      flags: { show: true }
    })
  }
}
```

**Consequences**:
- ✅ Predictable component behavior
- ✅ Central control of library component state
- ✅ Easy to debug (state visible in Vue DevTools)
- ⚠️ **Tight coupling**: Consuming apps must maintain exact state structure
- ⚠️ **Breaking changes**: Any state structure change breaks all consuming apps
- ⚠️ **No validation**: No runtime validation of state structure
- ⚠️ **Migration pain**: Hard to change state contract later

**High-Risk Areas** (from pqs-frontend docs):
1. **Map Level Management**: Changes affecting BasicNavStages navigation
2. **Layout Changes**: BasicSide visibility and width, BasicHead control visibility
3. **State Dependencies**: Filter state changes, bookmark visibility, asset selection state

---

### 6. Component Naming Convention

**Decision**: Prefix all components with "Basic" and register globally with "Vxg" prefix.

**Rationale**:
- **Namespace Collision**: Avoid conflicts with consuming app components
- **Clear Origin**: Easy to identify library components vs. app components
- **Semantic Grouping**: "Basic" indicates foundational UI components
- **Vue DevTools**: Easy to filter library components in debugger

**Naming Pattern**:
```javascript
// File: src/components/BasicHead.vue
export default {
  name: 'BasicHead'
}

// Registered as: VxgBasicHead
Vue.component('VxgBasicHead', BasicHead)

// Used in templates:
<template>
  <VxgBasicHead></VxgBasicHead>
</template>
```

**All Components**:
- BasicHead → VxgBasicHead (toolbar with search, actions)
- BasicSide → VxgBasicSide (collapsible sidebar)
- BasicMain → VxgBasicMain (main content area)
- BasicNavStages → VxgBasicNavStages (multi-level navigation)
- BasicFoot → VxgBasicFoot (footer)
- BasicAdmin → VxgBasicAdmin (admin panel)
- BasicAuth → VxgBasicAuth (authentication)
- BasicFieldPick → VxgBasicFieldPick (field selector)
- BasicLed → VxgBasicLed (data table/list)

**Consequences**:
- ✅ Clear namespace separation
- ✅ Easy to identify library components
- ✅ No naming conflicts with app components
- ⚠️ Verbose component names in templates
- ⚠️ "Basic" may not accurately describe complex components (BasicNavStages is 392 lines)

---

### 7. UMD Build for Browser and Module Support

**Decision**: Build library as UMD (Universal Module Definition) for broad compatibility.

**Rationale**:
- **Universal**: Works in browser (script tag), CommonJS (Node.js), AMD (RequireJS)
- **Vue CLI Standard**: Vue CLI builds UMD by default for libraries
- **Backward Compatible**: Works with older build systems
- **NPM Distribution**: Easy to publish and consume

**Build Configuration** (package.json):
```json
{
  "name": "@plantquest/model-vue",
  "version": "0.18.240-demo-dev",
  "main": "./dist/Vxg.umd.js",
  "scripts": {
    "vue-build": "vue-cli-service build --target lib --name Vxg --mode production ./src/vxg.js"
  },
  "files": [
    "dist/*",
    "src/*",
    "public/*"
  ]
}
```

**Output**:
```
dist/
├── Vxg.umd.js           # UMD build (all environments)
├── Vxg.umd.min.js       # Minified UMD
├── Vxg.common.js        # CommonJS build (Node.js)
└── Vxg.css              # Component styles
```

**Usage**:
```javascript
// ES Module (modern)
import Vxg from '@plantquest/model-vue'

// CommonJS (Node.js)
const Vxg = require('@plantquest/model-vue')

// Browser (script tag)
<script src="node_modules/@plantquest/model-vue/dist/Vxg.umd.js"></script>
```

**Consequences**:
- ✅ Universal compatibility
- ✅ Works in any environment
- ✅ Standard Vue library pattern
- ⚠️ UMD builds are larger than ESM
- ⚠️ No tree-shaking (entire library bundled)
- ⚠️ Global component registration increases bundle size

---

### 8. Moment.js for Date Handling

**Decision**: Include Moment.js as only runtime dependency for date/time operations.

**Rationale**:
- **Feature Complete**: Date formatting, parsing, manipulation
- **Mature**: Widely used, battle-tested
- **Simple API**: Easy for team to use
- **Available When Needed**: Only dependency besides Vue/Vuetify

**package.json**:
```json
{
  "dependencies": {
    "moment": "^2.30.1"
  }
}
```

**Consequences**:
- ✅ Rich date/time functionality
- ✅ Simple, intuitive API
- ⚠️ **Large bundle size**: Moment.js adds ~70KB minified
- ⚠️ **Maintenance mode**: Moment.js team recommends alternatives (day.js, date-fns, Luxon)
- ⚠️ **Not tree-shakeable**: Entire library imported
- ⚠️ **Migration needed**: Should move to modern alternative (day.js recommended)

**Technical Debt**:
- Consider migrating to day.js (2KB, moment.js-compatible API)
- Or date-fns (tree-shakeable, modular)

---

### 9. Component State Management Pattern

**Decision**: Components read from Vuex state and dispatch actions, no local state for shared concerns.

**Rationale**:
- **Single Source of Truth**: All shared state in Vuex
- **Predictable Updates**: State changes via actions/mutations
- **Debugging**: State changes visible in Vue DevTools
- **Cross-Component Sync**: Multiple components share same state

**Pattern**:
```javascript
export default {
  data() {
    return {
      // Only local, component-specific state
      internalSearchTerm: ''
    }
  },
  
  computed: {
    // Read shared state from Vuex
    drawerOpen() {
      return this.$store.state.vxg.cmp.BasicSide.show
    },
    currentUser() {
      return this.$store.state.current_user
    }
  },
  
  methods: {
    // Modify shared state via dispatch
    openDrawer() {
      this.$store.dispatch('set_cmp_flags', {
        name: 'BasicSide',
        flags: { show: true }
      })
    }
  }
}
```

**Consequences**:
- ✅ Predictable state flow
- ✅ Easy to debug
- ✅ Components stay in sync
- ⚠️ Tight coupling to Vuex store
- ⚠️ Requires consuming app to implement expected actions

---

### 10. Seneca Integration Mixin

**Decision**: Provide optional Seneca mixin for components that need backend integration.

**Evidence**:
```javascript
// src/components/senecaMixin.js
export default {
  methods: {
    async senecaCall(pattern, data) {
      // Seneca microservice call pattern
      return await this.$seneca.post(pattern, data)
    }
  }
}
```

**Usage**:
```javascript
// BasicHead.vue
async setupMiniSearch(items) {
  for(const item of items) {
    await this.$seneca.post('sys:search, cmd:add', { doc: item })
  }
}

async performSearch(term) {
  let out = await this.$seneca.post('sys:search, cmd:search', {
    query: term,
    params: this.search_config
  })
  // Process results...
}
```

**Consequences**:
- ✅ Optional integration (not required for all components)
- ✅ Consistent with pqs-frontend backend pattern
- ⚠️ Assumes consuming app provides `$seneca` instance
- ⚠️ No fallback if Seneca not available

---

## Alternatives Considered

### Option 1: Vue 3 from Start
**Rejected** - Too new, ecosystem immature (2020-2021 timeframe)
- **Pros**: Modern features, better performance
- **Cons**: Breaking changes, library incompatibility, migration risk

### Option 2: Bootstrap/Element UI instead of Vuetify
**Rejected** - Less Vue-native, less comprehensive
- **Pros**: Smaller bundle, more flexibility
- **Cons**: Less polished, fewer components, more custom work

### Option 3: Individual Component Exports (Tree-Shakeable)
**Rejected** - More complex for consuming apps
- **Pros**: Smaller bundle sizes, tree-shaking
- **Cons**: Manual component registration, no global $vxg, breaking change for existing apps

### Option 4: No Vuex State Requirements
**Rejected** - Component communication becomes complex
- **Pros**: Loose coupling, more flexible
- **Cons**: Prop drilling, event bus complexity, no single source of truth

---

## Technical Debt & Known Issues

### 1. Large Component Files
- **BasicHead.vue**: 1100+ lines (two implementations in same file)
- **BasicNavStages.vue**: 392 lines
- **Resolution**: Split into smaller components during Vue 3 migration

### 2. Moment.js Dependency
- **Issue**: 70KB bundle size, maintenance mode library
- **Resolution**: Migrate to day.js (2KB, compatible API)

### 3. No TypeScript
- **Issue**: No type safety, IntelliSense support
- **Resolution**: Add TypeScript definitions (.d.ts) or migrate to TypeScript

### 4. No Component Documentation
- **Issue**: No Storybook, no API docs
- **Resolution**: Add Storybook for component gallery and documentation

### 5. Global Component Registration
- **Issue**: No tree-shaking, large bundle size
- **Resolution**: Provide both global and individual component exports

### 6. Strict State Contract
- **Issue**: Breaking changes to state structure break all consuming apps
- **Resolution**: Add runtime validation, versioned state schemas

---

## Migration Path to Vue 3

When migrating to Vue 3:

### 1. Component Conversion
- Convert Options API → Composition API
- Update lifecycle hooks (mounted → onMounted)
- Update $listeners → $attrs

### 2. Dependencies
- Vue 2.6.12 → Vue 3.x
- Vuetify 2.5.1 → Vuetify 3.x
- Vue Router 3.5.2 → Vue Router 4.x

### 3. Plugin API
```javascript
// Vue 2 (current)
Vue.use(vxg)

// Vue 3 (future)
const app = createApp(App)
app.use(vxg)
```

### 4. State Management
- Vuex → Pinia integration
- Maintain backward compatibility with vxg state structure

---

## References
- package.json: Vue 2.6.12, Vuetify 2.5.1, dependencies
- src/vxg.js: Plugin architecture and Vxg class
- src/components/: All component implementations
- pqs-frontend DEC-000008: Consuming application perspective

## Tags
`component-library`, `vue2`, `vuetify`, `architecture`, `plugin`, `reusable-components`

## Version History
- **v1.0** (2026-02-06): Initial backwards-looking documentation
