# DEC-MODEL-VUE-002 - Vue 3 Migration Plan for model-vue Library

## Summary
Comprehensive plan for migrating @plantquest/model-vue component library from Vue 2.6.12 to Vue 3.x while maintaining backward compatibility for consuming applications.

## Status
**Proposed** - Pending approval and resourcing

## Context
Vue 2 reached End of Life on December 31, 2023. The model-vue library requires migration to Vue 3 to:
- **Support Modern Apps**: New @plantquest applications need Vue 3
- **Security Updates**: Critical patches only available for Vue 3
- **Long-term Viability**: Vue 2 support ending across ecosystem
- **Enable Consumer Migration**: pqs-frontend and other apps can't migrate until library migrates

### Critical Constraint: Library vs. Application

Unlike pqs-frontend (DEC-000017), model-vue is a **library** consumed by multiple applications:
- **pqs-frontend** (primary consumer)
- **pqs-mobile** (potential consumer)
- **Future @plantquest applications**

**This means**:
- ⚠️ **Breaking changes affect all consumers simultaneously**
- ⚠️ **Must coordinate migration with all consuming apps**
- ⚠️ **Need versioning strategy** (maintain Vue 2 version while building Vue 3)
- ⚠️ **Can't break consuming apps** during migration

---

## Decision: Dual-Version Strategy

**Adopt parallel versioning** to support both Vue 2 and Vue 3 consumers during transition period.

### Version Strategy

```
@plantquest/model-vue@0.x.x (Vue 2) - maintenance mode
@plantquest/model-vue@1.x.x (Vue 3) - active development

OR

@plantquest/model-vue-v2@0.x.x (Vue 2) - maintenance mode
@plantquest/model-vue@1.x.x (Vue 3) - active development
```

**Recommendation**: Use major version bump (0.x → 1.x) with clear documentation.

---

## Migration Approach: 3 Phases (PARALLEL HYBRID)

### Phase 1: Preparation & Dual Build (2-3 weeks)
Setup infrastructure to maintain both Vue 2 and Vue 3 versions.
- **Senior Dev**: Architecture, setup, patterns
- **Agent 1**: Repository scaffolding, build config
- **Agent 2**: TypeScript setup, composable templates
- **Agent 3**: Testing infrastructure
- **Agent 4**: Documentation templates

### Phase 2: Component Migration (2-3 weeks - PARALLEL)
Convert all 9 components to Vue 3 Composition API **in parallel**.
- **Agent 1**: BasicLed, BasicFoot, BasicFieldPick
- **Agent 2**: BasicAuth, BasicAdmin, BasicSide
- **Agent 3**: BasicMain, BasicNavStages (split first)
- **Agent 4**: BasicHead (split into sub-components)
- **Senior Dev**: Review, merge, handle complex decisions

### Phase 3: Ecosystem & Stabilization (2-3 weeks)
Update dependencies, testing, documentation, coordinate with consumers.
- **Agent 1**: Vuetify 3 migration
- **Agent 2**: Day.js migration, tree-shaking
- **Agent 3**: Integration tests, consumer tests
- **Agent 4**: Documentation, migration guides
- **Senior Dev**: Final review, publishing, coordination

**Total Duration**: 6-9 weeks (1.5-2 months) with parallel agents

---

## Phase 1: Preparation & Dual Build (4-6 weeks)

### 1.1 Repository Structure

**Option A: Monorepo with Workspaces (Recommended)**

```
@plantquest/model-vue/
├── packages/
│   ├── model-vue-v2/          # Vue 2 version (maintenance)
│   │   ├── package.json       # @plantquest/model-vue-v2
│   │   ├── src/
│   │   ├── dist/
│   │   └── README.md
│   │
│   └── model-vue/             # Vue 3 version (active)
│       ├── package.json       # @plantquest/model-vue@1.0.0
│       ├── src/
│       ├── dist/
│       └── README.md
│
├── package.json               # Root workspace config
├── pnpm-workspace.yaml        # Workspace definition
└── README.md                  # Migration guide
```

**Option B: Separate Branches**

```
main branch:      Vue 2 (maintenance)
vue3 branch:      Vue 3 (active development)
```

**Recommendation**: Use **Option A (Monorepo)** for:
- ✅ Share common code during transition
- ✅ Easier to maintain both versions
- ✅ Single repository for CI/CD
- ✅ Clear versioning and publishing

### 1.2 Versioning Strategy

```json
// packages/model-vue-v2/package.json
{
  "name": "@plantquest/model-vue-v2",
  "version": "0.18.240",
  "description": "Vue 2 version (maintenance mode)",
  "peerDependencies": {
    "vue": "^2.6.12"
  }
}

// packages/model-vue/package.json
{
  "name": "@plantquest/model-vue",
  "version": "1.0.0-alpha.1",
  "description": "Vue 3 version",
  "peerDependencies": {
    "vue": "^3.3.0"
  }
}
```

### 1.3 Build System Migration

**Current (Vue 2)**: Vue CLI
**Future (Vue 3)**: Vite (recommended)

#### Why Vite?

- ⚡ **10-100x faster** than webpack/Vue CLI
- 🎯 **Modern**: Built for Vue 3 (by Evan You)
- 📦 **Better tree-shaking**: Smaller bundles
- 🔧 **Better DX**: Instant HMR, better errors
- 🚀 **Standard**: Recommended for Vue 3 libraries

#### Vite Configuration

```javascript
// packages/model-vue/vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'Vxg',
      fileName: (format) => `vxg.${format}.js`,
      formats: ['es', 'umd', 'cjs']
    },
    rollupOptions: {
      external: ['vue', 'vuetify'],
      output: {
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify'
        },
        exports: 'named'
      }
    }
  }
})
```

#### Build Outputs

```
dist/
├── vxg.es.js          # ESM (modern, tree-shakeable)
├── vxg.umd.js         # UMD (universal)
├── vxg.cjs.js         # CommonJS (Node.js)
├── vxg.css            # Component styles
└── types/             # TypeScript definitions
    └── index.d.ts
```

### 1.4 Package.json Updates

```json
{
  "name": "@plantquest/model-vue",
  "version": "1.0.0-alpha.1",
  "type": "module",
  "main": "./dist/vxg.cjs.js",
  "module": "./dist/vxg.es.js",
  "exports": {
    ".": {
      "import": "./dist/vxg.es.js",
      "require": "./dist/vxg.cjs.js",
      "types": "./dist/types/index.d.ts"
    },
    "./dist/style.css": "./dist/vxg.css"
  },
  "types": "./dist/types/index.d.ts",
  "files": [
    "dist",
    "src"
  ],
  "scripts": {
    "dev": "vite",
    "build": "vite build && vue-tsc --declaration --emitDeclarationOnly",
    "preview": "vite preview"
  }
}
```

---

## Phase 2: Component Migration (6-8 weeks)

### 2.1 Migration Order (Low Risk → High Risk)

**Priority 1: Simple Components (Week 1-2)**
1. BasicLed (minimal logic)
2. BasicFoot (minimal logic)
3. BasicFieldPick (simple state)

**Priority 2: Medium Components (Week 3-4)**
4. BasicAuth (moderate logic)
5. BasicAdmin (moderate complexity)
6. BasicSide (state management)

**Priority 3: Complex Components (Week 5-8)**
7. BasicMain (state dependencies)
8. **BasicHead** (1100+ lines, complex search logic)
9. **BasicNavStages** (392 lines, complex routing logic)

### 2.2 Component Conversion Pattern

#### Before (Vue 2 Options API)

```vue
<!-- BasicSide.vue (Vue 2) -->
<template>
  <v-navigation-drawer v-model="isOpen">
    <div>{{ title }}</div>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'BasicSide',
  props: {
    title: String
  },
  data() {
    return {
      localState: ''
    }
  },
  computed: {
    isOpen() {
      return this.$store.state.vxg.cmp.BasicSide.show
    }
  },
  methods: {
    toggle() {
      this.$store.dispatch('set_cmp_flags', {
        name: 'BasicSide',
        flags: { show: !this.isOpen }
      })
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>
```

#### After (Vue 3 Composition API)

```vue
<!-- BasicSide.vue (Vue 3) -->
<template>
  <v-navigation-drawer v-model="isOpen">
    <div>{{ title }}</div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

// Props
interface Props {
  title?: string
}
const props = withDefaults(defineProps<Props>(), {
  title: ''
})

// Composables
const store = useStore()

// Local state
const localState = ref('')

// Computed
const isOpen = computed(() => store.state.vxg.cmp.BasicSide.show)

// Methods
const toggle = () => {
  store.dispatch('set_cmp_flags', {
    name: 'BasicSide',
    flags: { show: !isOpen.value }
  })
}

// Lifecycle
onMounted(() => {
  loadData()
})
</script>
```

### 2.3 Extract Composables for Shared Logic

Create reusable composables to avoid duplication:

```typescript
// packages/model-vue/src/composables/useVxgStore.ts
import { computed } from 'vue'
import { useStore } from 'vuex'

/**
 * Access Vxg-specific store state
 */
export function useVxgStore() {
  const store = useStore()
  
  const vxgState = computed(() => store.state.vxg)
  
  const componentState = (name: string) => 
    computed(() => store.state.vxg?.cmp?.[name])
  
  const setComponentFlags = (name: string, flags: Record<string, any>) => {
    store.dispatch('set_cmp_flags', { name, flags })
  }
  
  return {
    vxgState,
    componentState,
    setComponentFlags
  }
}
```

```typescript
// packages/model-vue/src/composables/useVxgPermissions.ts
import { inject, computed } from 'vue'

/**
 * Access Vxg permission system
 */
export function useVxgPermissions() {
  const vxg = inject('$vxg')
  
  const allow = (action: string) => {
    return computed(() => {
      const allowed = store.state.vxg?.cmp?.BasicHead?.allow?.[action]
      return allowed ?? true
    })
  }
  
  const show = (action: string) => {
    return computed(() => {
      return allow(action).value && 
             store.state.vxg?.cmp?.BasicHead?.show?.[action]
    })
  }
  
  return {
    allow,
    show
  }
}
```

**Usage in Components**:

```vue
<script setup>
import { useVxgStore } from '@/composables/useVxgStore'
import { useVxgPermissions } from '@/composables/useVxgPermissions'

const { componentState, setComponentFlags } = useVxgStore()
const { allow, show } = useVxgPermissions()

const sideState = componentState('BasicSide')
const canEdit = allow('edit')
</script>
```

### 2.4 Plugin API Migration

#### Before (Vue 2)

```javascript
// packages/model-vue-v2/src/vxg.js
class Vxg {
  install(Vue, options) {
    // Global components
    Vue.component('VxgBasicHead', BasicHead)
    
    // Global property
    Object.defineProperty(Vue.prototype, '$vxg', {
      get: () => this
    })
  }
}

export default Vxg

// Usage in consuming app
import Vxg from '@plantquest/model-vue-v2'
Vue.use(vxg)
```

#### After (Vue 3)

```typescript
// packages/model-vue/src/vxg.ts
import { App, Plugin } from 'vue'
import type { VxgConfig } from './types'

class Vxg {
  install(app: App, options?: VxgConfig) {
    // Global components
    app.component('VxgBasicHead', BasicHead)
    
    // Global properties
    app.config.globalProperties.$vxg = this
    
    // Provide/inject
    app.provide('$vxg', this)
  }
}

export default Vxg as Plugin

// Usage in consuming app (Vue 3)
import { createApp } from 'vue'
import Vxg from '@plantquest/model-vue'

const app = createApp(App)
app.use(new Vxg(config))
```

### 2.5 TypeScript Migration

Add TypeScript for type safety:

```typescript
// packages/model-vue/src/types/index.ts
export interface VxgConfig {
  allow?: {
    match?: Array<Record<string, any>>
    modify?: (x: any) => any
  }
}

export interface VxgState {
  cmp: {
    [componentName: string]: {
      show?: boolean
      allow?: Record<string, boolean>
      [key: string]: any
    }
  }
  ent: {
    meta: {
      name: string
    }
  }
}

export interface ComponentFlags {
  show?: boolean
  allow?: Record<string, boolean>
  [key: string]: any
}

// Component prop types
export interface BasicHeadProps {
  logo?: string
}

export interface BasicSideProps {
  title?: string
  width?: number
}

// Augment Vue types
declare module 'vue' {
  interface ComponentCustomProperties {
    $vxg: Vxg
  }
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VxgBasicHead: typeof import('./components/BasicHead.vue').default
    VxgBasicSide: typeof import('./components/BasicSide.vue').default
    // ... other components
  }
}
```

---

## Phase 3: Ecosystem & Stabilization (4-6 weeks)

### 3.1 Dependency Updates

```json
{
  "peerDependencies": {
    "vue": "^3.3.0",
    "vuetify": "^3.4.0",    // Vuetify 3
    "vue-router": "^4.0.0"   // Vue Router 4 (if used)
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.0.0",
    "vue-tsc": "^1.8.0",
    "typescript": "^5.3.0",
    "@types/node": "^20.0.0"
  },
  "dependencies": {
    "dayjs": "^1.11.10"      // Replace moment.js ✅
  }
}
```

### 3.2 Vuetify 3 Migration

**Breaking Changes**:

```vue
<!-- Vue 2 + Vuetify 2 -->
<v-btn outlined>Button</v-btn>
<v-icon>mdi-account</v-icon>

<!-- Vue 3 + Vuetify 3 -->
<v-btn variant="outlined">Button</v-btn>
<v-icon icon="mdi-account"></v-icon>
```

**Component Renames**:
- `v-navigation-drawer` → mostly unchanged
- `v-app-bar` → mostly unchanged
- `v-expansion-panels` → syntax changes
- Colors/theming → new system

**Vuetify 3 Setup**:

```typescript
// packages/model-vue/src/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light'
  }
})
```

### 3.3 Replace Moment.js with Day.js

**Before (Moment.js)**:
```javascript
import moment from 'moment'

const formatted = moment(date).format('YYYY-MM-DD')
const ago = moment(date).fromNow()
```

**After (Day.js)**:
```javascript
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const formatted = dayjs(date).format('YYYY-MM-DD')
const ago = dayjs(date).fromNow()
```

**Benefits**:
- 📉 **2KB vs 70KB** (97% size reduction)
- ⚡ **Faster**: No locale loading overhead
- 🔌 **Plugin-based**: Import only what you need
- 🔄 **API compatible**: Drop-in replacement for most use cases

### 3.4 Tree-Shakeable Exports (NEW FEATURE)

Enable consuming apps to import only what they need:

```typescript
// packages/model-vue/src/index.ts

// Plugin (global registration)
export { default as Vxg } from './vxg'

// Individual components (tree-shakeable)
export { default as BasicHead } from './components/BasicHead.vue'
export { default as BasicSide } from './components/BasicSide.vue'
export { default as BasicMain } from './components/BasicMain.vue'
export { default as BasicNavStages } from './components/BasicNavStages.vue'
export { default as BasicAdmin } from './components/BasicAdmin.vue'
export { default as BasicAuth } from './components/BasicAuth.vue'
export { default as BasicFieldPick } from './components/BasicFieldPick.vue'
export { default as BasicFoot } from './components/BasicFoot.vue'
export { default as BasicLed } from './components/BasicLed.vue'

// Composables
export * from './composables'

// Types
export * from './types'
```

**Usage Options**:

```typescript
// Option 1: Global plugin (backward compatible)
import { createApp } from 'vue'
import Vxg from '@plantquest/model-vue'

const app = createApp(App)
app.use(new Vxg(config))

// Option 2: Individual imports (tree-shakeable)
import { BasicHead, BasicSide } from '@plantquest/model-vue'

app.component('BasicHead', BasicHead)
app.component('BasicSide', BasicSide)

// Option 3: Composables only
import { useVxgStore, useVxgPermissions } from '@plantquest/model-vue'
```

---

## State Management: Vuex vs. Pinia

### Current Approach (Vuex Coupling)

Components tightly coupled to Vuex store structure:

```javascript
// Component reads from $store directly
computed: {
  isOpen() {
    return this.$store.state.vxg.cmp.BasicSide.show
  }
}

methods: {
  toggle() {
    this.$store.dispatch('set_cmp_flags', {
      name: 'BasicSide',
      flags: { show: !this.isOpen }
    })
  }
}
```

### Option 1: Continue Vuex Coupling (Easier)

**Pros**:
- ✅ Maintains backward compatibility
- ✅ Less refactoring needed
- ✅ Consumers continue using Vuex

**Cons**:
- ⚠️ Vuex 4 is in maintenance mode (Pinia recommended)
- ⚠️ Tight coupling continues
- ⚠️ Limits flexibility for consumers

### Option 2: Abstract State Management (Recommended)

Provide adapters for both Vuex and Pinia:

```typescript
// packages/model-vue/src/state/adapter.ts
export interface StateAdapter {
  getComponentState(name: string): any
  setComponentFlags(name: string, flags: Record<string, any>): void
  getVxgState(): any
}

// Vuex adapter
export class VuexAdapter implements StateAdapter {
  constructor(private store: any) {}
  
  getComponentState(name: string) {
    return this.store.state.vxg?.cmp?.[name]
  }
  
  setComponentFlags(name: string, flags: Record<string, any>) {
    this.store.dispatch('set_cmp_flags', { name, flags })
  }
  
  getVxgState() {
    return this.store.state.vxg
  }
}

// Pinia adapter
export class PiniaAdapter implements StateAdapter {
  constructor(private useVxgStore: any) {}
  
  getComponentState(name: string) {
    const store = this.useVxgStore()
    return store.cmp?.[name]
  }
  
  setComponentFlags(name: string, flags: Record<string, any>) {
    const store = this.useVxgStore()
    store.setComponentFlags(name, flags)
  }
  
  getVxgState() {
    return this.useVxgStore()
  }
}
```

**Usage**:

```typescript
// Consuming app (Vuex)
import { createApp } from 'vue'
import { createStore } from 'vuex'
import Vxg, { VuexAdapter } from '@plantquest/model-vue'

const store = createStore({...})
const vxg = new Vxg({
  stateAdapter: new VuexAdapter(store)
})

app.use(store)
app.use(vxg)

// Consuming app (Pinia)
import { createPinia } from 'pinia'
import Vxg, { PiniaAdapter } from '@plantquest/model-vue'
import { useVxgStore } from './stores/vxg'

const pinia = createPinia()
const vxg = new Vxg({
  stateAdapter: new PiniaAdapter(useVxgStore)
})

app.use(pinia)
app.use(vxg)
```

### Option 3: Props-Based API (Future)

Long-term: Move away from store coupling entirely:

```vue
<template>
  <VxgBasicSide
    :is-open="sideOpen"
    @update:is-open="sideOpen = $event"
  />
</template>
```

**Migration Path**: Support both patterns during transition.

---

## Testing Strategy

### 3.5 Component Testing

```typescript
// packages/model-vue/src/components/__tests__/BasicSide.spec.ts
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import BasicSide from '../BasicSide.vue'

describe('BasicSide', () => {
  let vuetify: any
  
  beforeEach(() => {
    vuetify = createVuetify()
  })
  
  it('renders correctly', () => {
    const wrapper = mount(BasicSide, {
      global: {
        plugins: [vuetify]
      },
      props: {
        title: 'Test'
      }
    })
    
    expect(wrapper.text()).toContain('Test')
  })
  
  it('toggles drawer', async () => {
    const wrapper = mount(BasicSide, {
      global: {
        plugins: [vuetify]
      }
    })
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:isOpen')).toBeTruthy()
  })
})
```

### 3.6 Compatibility Testing

Test library with different consumer scenarios:

```typescript
// tests/integration/vuex-consumer.spec.ts
describe('Vuex Consumer Integration', () => {
  it('works with Vuex store', () => {
    const app = createApp(TestApp)
    const store = createStore({
      state: { vxg: {...} }
    })
    
    app.use(store)
    app.use(new Vxg({ stateAdapter: new VuexAdapter(store) }))
    
    // Test component behavior
  })
})

// tests/integration/pinia-consumer.spec.ts
describe('Pinia Consumer Integration', () => {
  it('works with Pinia store', () => {
    // Similar test for Pinia
  })
})
```

---

## Documentation Updates

### 3.7 Migration Guide

Create comprehensive migration guide for consumers:

```markdown
# Migration Guide: model-vue v0.x (Vue 2) → v1.x (Vue 3)

## Quick Start

### Install Vue 3 Version

```bash
# Remove Vue 2 version
npm uninstall @plantquest/model-vue-v2

# Install Vue 3 version
npm install @plantquest/model-vue@^1.0.0
```

## Breaking Changes

### 1. Vue 3 Required
- **Before**: Vue 2.6.12
- **After**: Vue 3.3.0+

### 2. Vuetify 3 Required
- **Before**: Vuetify 2.5.1
- **After**: Vuetify 3.4.0+

### 3. Plugin Installation
```javascript
// Before (Vue 2)
import Vue from 'vue'
import Vxg from '@plantquest/model-vue-v2'
Vue.use(vxg)

// After (Vue 3)
import { createApp } from 'vue'
import Vxg from '@plantquest/model-vue'
const app = createApp(App)
app.use(new Vxg(config))
```

### 4. Component Access
```vue
<!-- Before (Vue 2) -->
<script>
export default {
  computed: {
    vxg() {
      return this.$vxg
    }
  }
}
</script>

<!-- After (Vue 3 Composition API) -->
<script setup>
import { inject } from 'vue'
const vxg = inject('$vxg')
</script>
```

## New Features

### Tree-Shakeable Imports
```typescript
// Import only what you need
import { BasicHead, BasicSide } from '@plantquest/model-vue'

app.component('BasicHead', BasicHead)
app.component('BasicSide', BasicSide)
```

### Composables
```typescript
import { useVxgStore, useVxgPermissions } from '@plantquest/model-vue'

const { componentState } = useVxgStore()
const { allow, show } = useVxgPermissions()
```

### TypeScript Support
Full TypeScript definitions included.

## Component-by-Component Changes

### BasicHead
- Search logic refactored
- New `search` event emitted
- Props now typed

### BasicNavStages
- Routing logic updated for Vue Router 4
- Stage selection API unchanged

(... detailed changes for each component ...)
```

---

## Coordination with Consumers

### 4.1 Consumer Migration Timeline (PARALLEL HYBRID)

```
Week 1-3: Library Development (PARALLEL)
├─ Phase 1: Setup dual build (Week 1)
├─ Phase 2: Component migration (Week 2-3, 4 agents in parallel)
└─ All 9 components migrated simultaneously

Week 4-5: Library Completion (PARALLEL)
├─ Phase 3: Ecosystem updates (4 agents in parallel)
├─ Testing & documentation
└─ Release v1.0.0-alpha.1 (End of Week 5)

Week 6-7: Consumer Testing
├─ pqs-frontend: Test alpha version
├─ Bug fixes and adjustments (agents assist)
└─ Release v1.0.0-beta.1

Week 8-13: Consumer Migration (PARALLEL)
├─ pqs-frontend: Full Vue 3 migration (using DEC-000017 plan with agents)
├─ Test in production-like environment
└─ Release v1.0.0 (stable) - Week 13

Week 14+: Maintenance
├─ Bug fixes
├─ Feature additions
└─ Deprecate v0.x (Vue 2 version) after 12 months
```

**Total Time to Stable Release**: 13 weeks (3 months) vs 20+ weeks sequential

---

### Parallel Agent Visual Timeline

```
┌────────────────────────────────────────────────────────────────┐
│                   PARALLEL AGENT TIMELINE                       │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Week 1: Infrastructure Setup                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │ Agent 1  │ │ Agent 2  │ │ Agent 3  │ │ Agent 4  │         │
│  │ Repo     │ │ Build    │ │TypeScript│ │ Testing  │         │
│  │ Setup    │ │ Config   │ │ Setup    │ │ Setup    │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
│       ↓             ↓             ↓             ↓              │
│  [Senior Dev Reviews & Merges Daily]                           │
│                                                                 │
│  Week 2-3: Component Migration (MASSIVE PARALLELISM)           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │ Agent 1  │ │ Agent 2  │ │ Agent 3  │ │ Agent 4  │         │
│  │ 3 Simple │ │ 3 Medium │ │BasicNav  │ │BasicHead │         │
│  │Components│ │Components│ │ +Split   │ │ +Split   │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
│       ↓             ↓             ↓             ↓              │
│  [All 9 components done in 2-3 weeks vs 8-10 weeks sequential]│
│                                                                 │
│  Week 4-5: Ecosystem & Publishing                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │ Agent 1  │ │ Agent 2  │ │ Agent 3  │ │ Agent 4  │         │
│  │ Vuetify3 │ │ Day.js   │ │Integration│ │ Docs &   │         │
│  │Migration │ │Migration │ │ Tests    │ │ Alpha    │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
│                                                                 │
│  Week 6-13: Consumer Migration (pqs-frontend)                  │
│  ┌────────────────────────────────────────────────────┐       │
│  │  Alpha Testing → Beta → Stable v1.0.0              │       │
│  │  (Agents assist with pqs-frontend migration)       │       │
│  └────────────────────────────────────────────────────┘       │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

Total: 13 weeks (3 months) to stable release
vs. 20+ weeks (5 months) sequential approach
```

### 4.2 Version Support Policy

```
@plantquest/model-vue-v2 (Vue 2)
├─ Maintenance: 12 months after v1.0.0 release
├─ Security fixes only
└─ Sunset: After all consumers migrated

@plantquest/model-vue (Vue 3)
├─ Active development
├─ New features
└─ Long-term support
```

---

## Resource Estimation

### Team Requirements (HYBRID PARALLEL APPROACH)

**Core Team**:
- **1 Senior Vue Developer** (full-time, 6-8 weeks)
  - Architecture decisions & patterns
  - Agent orchestration & coordination
  - Complex component decisions
  - Code review & validation
  - Integration & testing

**Cursor AI Agents** (3-4 agents in parallel):
- **Agent 1**: Component migration (Components 1-3)
- **Agent 2**: Component migration (Components 4-6)
- **Agent 3**: Component migration (Components 7-9)
- **Agent 4**: Testing, documentation, tooling

**Why This Works**:
- ✅ **Parallel Execution**: 3-4 agents work simultaneously
- ✅ **No Idle Time**: Senior dev reviews while agents work
- ✅ **Automated Tasks**: Agents handle repetitive conversion
- ✅ **Human Expertise**: Senior dev handles architecture & complex decisions

### Effort Breakdown (Parallel Hybrid)

| Task | Manual | AI-Assisted Sequential | **AI Parallel Hybrid** | Speedup |
|------|--------|----------------------|---------------------|---------|
| Phase 1: Setup | 4-6 weeks | 4-5 weeks | **2-3 weeks** | 2x |
| Phase 2: Components | 8-10 weeks | 5-6 weeks | **2-3 weeks** | 3-4x |
| Phase 3: Ecosystem | 4-6 weeks | 3-4 weeks | **2-3 weeks** | 2x |
| **Total** | **16-22 weeks** | **12-15 weeks** | **6-9 weeks** | **2.5-3x** |

**With Parallel Agents**: ~6-8 weeks (1.5-2 months) vs 16-22 weeks manual

**Cost Reduction**: ~$30-40K (vs $75-90K sequential AI-assisted, vs $120-160K manual)

---

## Risk Mitigation

### High Risks

**1. Breaking Consuming Applications**
- **Risk**: Library changes break pqs-frontend and other consumers
- **Mitigation**:
  - Alpha/beta testing with pqs-frontend
  - Maintain Vue 2 version during transition
  - Comprehensive integration tests
  - Clear migration documentation

**2. Vuetify 3 Breaking Changes**
- **Risk**: Vuetify 3 has significant API changes
- **Mitigation**:
  - Start with Vuetify 3 migration guide
  - Test each component thoroughly
  - Create compatibility layer if needed

**3. State Management Coupling**
- **Risk**: Vuex coupling makes migration harder
- **Mitigation**:
  - Create state adapter pattern
  - Support both Vuex and Pinia
  - Document state requirements clearly

### Medium Risks

**1. Component API Changes**
- **Risk**: Composition API changes component interfaces
- **Mitigation**:
  - Maintain prop/event contracts
  - Add new features without breaking old ones
  - Comprehensive changelog

**2. Build System Changes**
- **Risk**: Vite configuration issues
- **Mitigation**:
  - Test build outputs thoroughly
  - Verify UMD/ESM/CJS all work
  - Check tree-shaking works correctly

---

## Success Criteria

---

## Parallel Agent Orchestration Strategy

### How to Run 3-4 Cursor Agents Simultaneously

**Setup** (Day 1):
```bash
# 1. Create separate branches for each agent
git checkout -b agent-1-components-simple
git checkout -b agent-2-components-medium
git checkout -b agent-3-components-complex
git checkout -b agent-4-testing-docs

# 2. Open 4 Cursor windows/instances
# Each window works on a different branch
```

### Agent Task Division (Week-by-Week)

#### Week 1: Infrastructure Setup (PARALLEL)

**Agent 1 - Repository Structure**:
```
Tasks:
- Create monorepo structure (packages/model-vue, packages/model-vue-v2)
- Setup pnpm workspaces
- Configure package.json for both versions
- Copy existing code to v2 package

Deliverable: Monorepo structure working
```

**Agent 2 - Build Configuration**:
```
Tasks:
- Setup Vite config for Vue 3 build
- Configure rollup options (ESM, UMD, CJS)
- Setup external dependencies (vue, vuetify)
- Test build outputs

Deliverable: Vite build working, outputs valid
```

**Agent 3 - TypeScript & Composables**:
```
Tasks:
- Setup TypeScript configuration
- Create type definitions (types/index.ts)
- Create composable templates (useVxgStore, useVxgPermissions)
- Setup type augmentation for Vue

Deliverable: TypeScript infrastructure ready
```

**Agent 4 - Testing Infrastructure**:
```
Tasks:
- Setup Vitest configuration
- Create test templates
- Setup Vue Test Utils for Vue 3
- Configure coverage reporting

Deliverable: Testing framework ready
```

**Senior Dev - Coordination**:
- Define standards & patterns (2-3 hours)
- Review each agent's output (4-6 hours)
- Merge approved changes (1-2 hours)
- Resolve conflicts (1-2 hours)
- **Total Time**: ~10-15 hours/week

---

#### Week 2-3: Component Migration (HIGHLY PARALLEL)

**Agent 1 - Simple Components** (Branch: agent-1-simple):
```
Tasks:
1. BasicLed.vue (50 lines)
   - Convert to Composition API
   - Extract composables
   - Write tests

2. BasicFoot.vue (80 lines)
   - Convert to Composition API
   - Extract composables
   - Write tests

3. BasicFieldPick.vue (120 lines)
   - Convert to Composition API
   - Extract composables
   - Write tests

Parallel Execution: ~2-3 days (vs 6-8 days sequential)
```

**Agent 2 - Medium Components** (Branch: agent-2-medium):
```
Tasks:
1. BasicAuth.vue (200 lines)
   - Convert to Composition API
   - Handle authentication logic
   - Write tests

2. BasicAdmin.vue (250 lines)
   - Convert to Composition API
   - Extract admin composables
   - Write tests

3. BasicSide.vue (180 lines)
   - Convert to Composition API
   - Handle drawer state
   - Write tests

Parallel Execution: ~3-4 days (vs 8-10 days sequential)
```

**Agent 3 - Complex Components Part 1** (Branch: agent-3-complex):
```
Tasks:
1. BasicNavStages.vue (392 lines)
   - FIRST: Split into sub-components
     - NavStagesExpansion.vue
     - NavStageItem.vue
     - useNavStagesLogic composable
   
   - THEN: Convert to Composition API
   - Extract routing logic to composable
   - Write tests for each sub-component

Parallel Execution: ~4-5 days (vs 10-12 days sequential)
```

**Agent 4 - Complex Components Part 2** (Branch: agent-4-head):
```
Tasks:
1. BasicHead.vue (1100+ lines - LARGEST)
   - FIRST: Split into sub-components
     - HeadToolbar.vue (toolbar actions)
     - HeadSearch.vue (search/combobox logic)
     - useHeadSearch composable
     - useHeadActions composable
   
   - THEN: Convert to Composition API
   - Extract search logic (MiniSearch integration)
   - Write tests for each sub-component

Parallel Execution: ~5-6 days (vs 12-15 days sequential)

After BasicHead: Start BasicMain.vue (300 lines)
```

**Senior Dev - Daily Review Cycle**:
```
Morning (9-10am):
- Review Agent 1 output from previous day
- Review Agent 2 output from previous day
- Flag issues, request fixes

Midday (12-1pm):
- Review Agent 3 output
- Review Agent 4 output
- Merge approved components

Afternoon (3-4pm):
- Test integrated components
- Run full test suite
- Deploy to test environment

Total Time: ~3-4 hours/day review + 1-2 hours integration = ~25-30 hours/week
```

**Coordination Protocol**:
```
1. Each agent commits to their branch
2. Senior dev reviews in sequence
3. Approved changes merged to main
4. Failed reviews: agent fixes immediately
5. Daily standup (async via comments)
```

---

#### Week 4-5: Ecosystem & Testing (PARALLEL)

**Agent 1 - Vuetify 3 Migration**:
```
Tasks:
- Update all Vuetify 2 syntax → Vuetify 3
  - v-btn outlined → variant="outlined"
  - v-icon → icon="mdi-*"
  - Color system updates
- Test all components with Vuetify 3
- Document breaking changes

Parallel Execution: ~3-4 days
```

**Agent 2 - Day.js Migration & Optimization**:
```
Tasks:
- Replace Moment.js with Day.js
- Setup tree-shakeable exports
- Verify bundle size reduction
- Update imports across components

Parallel Execution: ~2-3 days
```

**Agent 3 - Testing & Integration**:
```
Tasks:
- Write integration tests
- Test with Vuex consumer
- Test with Pinia consumer
- Setup CI/CD pipeline
- Run full regression suite

Parallel Execution: ~4-5 days
```

**Agent 4 - Documentation & Publishing**:
```
Tasks:
- Write migration guide
- Update README.md
- Create component API docs
- Setup Storybook (optional)
- Prepare alpha release

Parallel Execution: ~3-4 days
```

**Senior Dev - Final Review & Publishing**:
```
Tasks:
- Review all documentation
- Test full build pipeline
- Verify tree-shaking works
- Test npm package locally
- Publish alpha version
- Coordinate with pqs-frontend team

Total Time: ~20-25 hours/week
```

---

### Agent Coordination Workflow

```
┌─────────────────────────────────────────────────────────┐
│          PARALLEL AGENT WORKFLOW (Daily)                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  8:00 AM  - Senior Dev: Review previous day's work      │
│             └─ Check Agent 1-4 branches                 │
│                                                          │
│  9:00 AM  - Agents Start (4 parallel sessions)          │
│             ├─ Agent 1: Component A → Branch agent-1    │
│             ├─ Agent 2: Component B → Branch agent-2    │
│             ├─ Agent 3: Component C → Branch agent-3    │
│             └─ Agent 4: Tests/Docs → Branch agent-4     │
│                                                          │
│  12:00 PM - Senior Dev: Midday review                   │
│             └─ Approve/merge ready components           │
│                                                          │
│  1:00 PM  - Agents Resume (incorporate feedback)        │
│             └─ Fix any issues from review               │
│                                                          │
│  5:00 PM  - Senior Dev: End of day review               │
│             ├─ Final merge of approved work             │
│             ├─ Integration testing                      │
│             └─ Deploy to test environment               │
│                                                          │
│  Next Day - Repeat with new tasks                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Agent Task Assignment Matrix

| Week | Agent 1 | Agent 2 | Agent 3 | Agent 4 | Senior Dev Focus |
|------|---------|---------|---------|---------|------------------|
| **1** | Repo structure | Build config | TypeScript | Testing | Architecture, review |
| **2** | Simple components (3) | Medium components (3) | NavStages split | BasicHead split | Review, merge, test |
| **3** | Complete simple | Complete medium | Complete NavStages | Complete BasicHead + BasicMain | Integration testing |
| **4** | Vuetify 3 | Day.js + tree-shake | Integration tests | Documentation | Final review |
| **5** | Polish & fixes | Polish & fixes | CI/CD | Alpha release prep | Publishing |

---

### Communication & Coordination

**Daily Async Standup** (via Git commit messages):
```bash
# Each agent commits with structured messages

git commit -m "
[Agent 1] BasicLed migration complete
- ✅ Converted to Composition API
- ✅ Tests passing (95% coverage)
- ⚠️ Need review: useVxgStore integration
- ⏳ Next: BasicFoot

@senior-dev please review useVxgStore pattern
"
```

**Senior Dev Review Template**:
```markdown
## Agent 1 Review - BasicLed Component

✅ **Approved**
- Composition API conversion correct
- Tests comprehensive
- TypeScript types complete

⚠️ **Minor Changes Requested**
- Line 42: Use computed() instead of ref()
- Add JSDoc comment for props

📝 **Notes**
- Pattern looks good, use for remaining components
- Merge after fixes

**Estimated Fix Time**: 15 minutes
```

### Conflict Resolution Strategy

**When Agents Overlap**:
1. **Prevention**: Assign non-overlapping files
2. **Detection**: Senior dev reviews before merging
3. **Resolution**: Senior dev merges with conflict resolution
4. **Communication**: Update all agents on shared patterns

**Example**:
```bash
# Agent 1 and Agent 2 both modify useVxgStore.ts

Senior Dev:
1. Review both implementations
2. Choose best approach or merge both
3. Merge to main
4. Notify both agents: "useVxgStore updated, pull latest"
```

---

### Success Metrics (Parallel Hybrid)

### Phase 1 Complete (Week 1)
- ✅ Monorepo setup working
- ✅ Dual build system functional
- ✅ Vue 2 version still publishing
- ✅ Vue 3 build produces valid output
- ✅ All 4 agents productive

### Phase 2 Complete (Week 2-3)
- ✅ All 9 components migrated to Vue 3 **in parallel**
- ✅ All components use Composition API
- ✅ Composables extracted and tested
- ✅ TypeScript definitions complete
- ✅ Unit tests passing (>80% coverage)
- ✅ ~60-70% time saved vs sequential

### Phase 3 Complete (Week 4-5)
- ✅ Vuetify 3 integration complete
- ✅ Day.js replaces Moment.js
- ✅ Tree-shakeable exports working
- ✅ Integration tests passing
- ✅ Documentation complete
- ✅ Alpha version published

### Consumer Migration Complete (Week 6-8)
- ✅ pqs-frontend successfully migrated
- ✅ No regressions detected
- ✅ Performance improved or maintained
- ✅ Stable v1.0.0 released

---

## Alternatives Considered

### Option 1: Big Bang Migration
**Rejected** - Too risky for library
- **Pros**: Faster, cleaner
- **Cons**: Breaks all consumers immediately, no rollback

### Option 2: Compatibility Build (@vue/compat)
**Rejected** - Technical debt, performance penalty
- **Pros**: Gradual migration, less breaking
- **Cons**: Larger bundle, maintenance overhead, temporary solution

### Option 3: Rewrite from Scratch
**Rejected** - Too expensive, risky
- **Pros**: Clean slate, modern architecture
- **Cons**: 6-12 months, reintroduces bugs, loses institutional knowledge

### Option 4: Stay on Vue 2 Forever
**Rejected** - Technical debt grows
- **Pros**: No migration effort
- **Cons**: EOL, security risk, ecosystem left behind, can't hire Vue 2 developers

---

## Next Steps

### Immediate (Week 1)

1. **Decision Approval**
   - Review this migration plan
   - Approve budget and timeline
   - Allocate team resources

2. **Repository Setup**
   - Create monorepo structure
   - Setup workspaces (pnpm/yarn)
   - Configure Vite for Vue 3 build

3. **Coordinate with pqs-frontend**
   - Review pqs-frontend DEC-000017
   - Align timelines
   - Establish communication channel

### Short-Term (Week 2-8)

1. **Phase 1: Infrastructure**
   - Complete dual build system
   - Setup CI/CD for both versions
   - Create migration documentation

2. **Begin Phase 2: Components**
   - Migrate simple components first
   - Extract composables
   - Write tests

### Medium-Term (Week 9-15)

1. **Complete Phase 2**
   - Migrate all components
   - Complete TypeScript definitions
   - Integration testing

2. **Phase 3: Ecosystem**
   - Vuetify 3 migration
   - Replace Moment.js
   - Documentation

3. **Alpha Release**
   - Publish v1.0.0-alpha.1
   - Begin pqs-frontend testing

### Long-Term (Week 16-20)

1. **Consumer Testing**
   - pqs-frontend integration
   - Bug fixes
   - Beta release

2. **Stable Release**
   - v1.0.0 release
   - Deprecation notices for v0.x
   - Long-term support begins

---

## Recommendation

**Approve Vue 3 migration with PARALLEL HYBRID approach over 6-8 weeks.**

### Key Success Factors
1. **Parallel Agent Orchestration**: 3-4 Cursor agents working simultaneously
2. **Senior Dev Coordination**: Daily review, merge, and integration cycles
3. **Testing**: Comprehensive test coverage before and during migration
4. **Clear Task Division**: Non-overlapping component assignments
5. **Daily Integration**: Merge approved work daily to prevent conflicts
6. **Documentation**: Update decisions and docs throughout

### Why Parallel Hybrid Approach?
- ⚡ **3-4x Faster**: 6-8 weeks vs 16-22 weeks manual
- 💰 **70-75% Cost Reduction**: $30-40K vs $120-160K manual
- 🚀 **Massive Parallelism**: 9 components migrated in 2-3 weeks (vs 8-10 weeks)
- ✅ **Consistent Quality**: All agents use same patterns defined by senior dev
- 🎯 **Human Expertise**: Senior dev handles architecture, agents handle execution
- 📊 **Continuous Integration**: Daily merges prevent big-bang integration issues
- 📝 **Automated Documentation**: Agents generate docs while converting code

### Parallel vs Sequential Comparison

| Metric | Manual | Sequential AI | **Parallel Hybrid** |
|--------|--------|--------------|-------------------|
| **Duration** | 16-22 weeks | 12-15 weeks | **6-8 weeks** |
| **Cost** | $120-160K | $75-90K | **$30-40K** |
| **Component Migration** | 8-10 weeks | 5-6 weeks | **2-3 weeks** |
| **Parallelism** | 1 dev | 1 dev + 1 agent | **1 dev + 4 agents** |
| **Risk** | High | Medium | **Low** (daily integration) |
| **Speedup** | 1x | 1.5x | **3-4x** |

### Go/No-Go Criteria (Parallel Hybrid Approach)
- ✅ 1 senior Vue developer allocated (full-time, 6-8 weeks)
- ✅ Cursor IDE with agent orchestration capability
- ✅ 4 parallel agent sessions can run simultaneously
- ✅ Git workflow supports parallel branches
- ✅ Test coverage >70% before migration
- ✅ Daily senior dev review time available (3-4 hours/day)
- ✅ 6-8 week timeline approved by stakeholders
- ✅ pqs-frontend team aligned on timeline (Week 6+ testing)
- ✅ Monorepo infrastructure approved
- ✅ Code review process established for agent-generated code

---

## References

- **Vue 3 Migration Guide**: https://v3-migration.vuejs.org/
- **Vuetify 3 Migration**: https://vuetifyjs.com/en/getting-started/upgrade-guide/
- **Vite Library Mode**: https://vitejs.dev/guide/build.html#library-mode
- **pqs-frontend DEC-000017**: Vue 3 migration plan for consumer
- **model-vue DEC-000001**: Original architecture decisions

## Tags
`vue3`, `migration`, `component-library`, `breaking-changes`, `modernization`

## Version History
- **v1.0** (2026-02-06): Initial Vue 3 migration plan for library
