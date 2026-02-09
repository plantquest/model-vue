# Vue 3.0 Migration - Task List & Specification for Team Lead

**Document Version**: 1.0  
**Date**: February 9, 2026  
**Status**: Ready for Task Assignment  
**Related**: DEC-000018, RA-000002, SPEC-000002

---

## Executive Summary

This document provides a complete breakdown of tasks for migrating @plantquest/model-vue from Vue 2 to Vue 3 using a parallel AI agent approach. The team-lead can use this to assign work to 4-5 AI agents working simultaneously under senior developer supervision.

**Key Metrics**:
- **Timeline**: 6-8 weeks (vs 16-22 weeks manual)
- **Cost**: $24-35K (vs $280K manual, 91% savings)
- **Approach**: AI-assisted with junior dev + CTO oversight (RECOMMENDED)
- **Agents**: 4-5 parallel AI agents + 1 junior developer (20 hrs/week) + CTO (8 hrs/week)
- **Risk Level**: Low (from CRITICAL if we stay on Vue 2)

---

## Migration Architecture

### Approach: Parallel Hybrid with Junior Dev + CTO Oversight

```
┌─────────────────────────────────────────────────────────────┐
│                  TEAM STRUCTURE                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Cursor Ultra AI Agents (Parallel Subagents)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Agent 1  │ │ Agent 2  │ │ Agent 3  │ │ Agent 4  │      │
│  │Infrastructure│Components│Components│ Ecosystem  │      │
│  └─────┬────┘ └─────┬────┘ └─────┬────┘ └─────┬────┘      │
│        │            │            │            │             │
│        └────────────┴────────────┴────────────┘             │
│                     ↓                                        │
│        ┌─────────────────────────────┐                      │
│        │   Junior Developer          │                      │
│        │   - Daily review (2-3 hrs)  │                      │
│        │   - Testing & validation    │                      │
│        │   - Build verification      │                      │
│        │   20 hrs/week               │                      │
│        └──────────┬──────────────────┘                      │
│                   ↓                                          │
│        ┌─────────────────────────────┐                      │
│        │   CTO / Senior Architect    │                      │
│        │   - Strategic decisions     │                      │
│        │   - Complex components      │                      │
│        │   - Final approvals         │                      │
│        │   8 hrs/week                │                      │
│        └─────────────────────────────┘                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Cost: $7,700 (Junior) + $13,200 (CTO) + $600 (Cursor Ultra) = $21,500
```

### Three-Phase Approach

**Phase 1: Library Migration** (Weeks 1-6)
- Setup monorepo structure
- Migrate all 9 components
- Update ecosystem (Vuetify 3, Day.js)
- Release stable v1.0.0

**Phase 2: Frontend Migration** (Weeks 7-9)
- Migrate pqs-frontend to Vue 3
- Use new model-vue v1.0.0

**Phase 3: Stabilization** (Weeks 10-11)
- Integration testing
- Production deployment
- Documentation finalization

---

## PHASE 1: Library Migration (6 weeks)

### Week 1: Infrastructure Setup

#### Agent 1: Repository & Monorepo Structure
**Assignee**: Cursor Ultra Subagent 1  
**Supervisor**: Junior Developer (daily review)  
**Duration**: 2-3 days  

**Tasks**:
1. Create monorepo structure
   ```
   @plantquest/model-vue/
   ├── packages/
   │   ├── model-vue/           # Vue 3 version (v1.x)
   │   └── model-vue-v2/        # Vue 2 version (v0.x maintenance)
   ├── pnpm-workspace.yaml
   └── package.json
   ```

2. Setup pnpm workspaces
   - Configure workspace dependencies
   - Setup shared configurations
   - Setup cross-package references

3. Copy Vue 2 code to maintenance package
   - Move current code to `packages/model-vue-v2`
   - Setup v0.x versioning
   - Configure Vue 2 build pipeline

4. Create Vue 3 package skeleton
   - Setup `packages/model-vue` structure
   - Configure v1.0.0-alpha versioning
   - Setup src/ and dist/ directories

**Acceptance Criteria**:
- ✅ Monorepo builds successfully
- ✅ Both packages have separate package.json
- ✅ Vue 2 version still builds and publishes
- ✅ Vue 3 package structure ready

**Deliverables**:
- `pnpm-workspace.yaml`
- `packages/model-vue/package.json`
- `packages/model-vue-v2/package.json`
- Updated root `package.json`

---

#### Agent 2: Build System (Vite)
**Assignee**: Cursor Ultra Subagent 2  
**Supervisor**: Junior Developer (daily review)  
**Duration**: 2-3 days  

**Tasks**:
1. Configure Vite for library mode
   ```javascript
   // vite.config.js
   export default defineConfig({
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
           globals: { vue: 'Vue', vuetify: 'Vuetify' }
         }
       }
     }
   })
   ```

2. Setup build outputs
   - ESM (modern, tree-shakeable)
   - UMD (universal, browser)
   - CJS (CommonJS, Node.js)

3. Configure external dependencies
   - Mark Vue as external
   - Mark Vuetify as external
   - Configure peer dependencies

4. Test build pipeline
   - Verify all three formats build
   - Check bundle sizes
   - Validate exports

**Acceptance Criteria**:
- ✅ Vite builds all three formats successfully
- ✅ Bundle sizes reasonable (<200KB unminified)
- ✅ External dependencies not bundled
- ✅ Build process documented

**Deliverables**:
- `packages/model-vue/vite.config.js`
- `dist/vxg.es.js`
- `dist/vxg.umd.js`
- `dist/vxg.cjs.js`
- Updated package.json with correct exports

---

#### Agent 3: TypeScript Configuration
**Assignee**: Cursor Ultra Subagent 3  
**Supervisor**: CTO (complex type decisions)  
**Duration**: 2-3 days  

**Tasks**:
1. Setup TypeScript configuration
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "ESNext",
       "lib": ["ES2020", "DOM"],
       "declaration": true,
       "declarationDir": "./dist/types",
       "strict": true
     }
   }
   ```

2. Create type definitions
   - `src/types/index.ts` - Core types
   - `src/types/components.ts` - Component prop types
   - `src/types/composables.ts` - Composable return types
   - `src/types/vxg.ts` - VXG class types

3. Create composable type templates
   ```typescript
   // useVxgStore composable types
   interface VxgStoreComposable {
     vxgState: ComputedRef<VxgState>
     componentState: (name: string) => ComputedRef<any>
     setComponentFlags: (name: string, flags: object) => void
   }
   ```

4. Setup Vue type augmentation
   - Global component types
   - App context types
   - Plugin types

**Acceptance Criteria**:
- ✅ TypeScript compiles without errors
- ✅ Type definitions generated in dist/types/
- ✅ Vue global types augmented correctly
- ✅ IntelliSense works in consuming apps

**Deliverables**:
- `tsconfig.json`
- `src/types/index.ts`
- `dist/types/index.d.ts`
- Type documentation

---

#### Agent 4: Testing Infrastructure
**Assignee**: Cursor Ultra Subagent 4  
**Supervisor**: Junior Developer (test setup)  
**Duration**: 2-3 days  

**Tasks**:
1. Configure Vitest
   ```javascript
   // vitest.config.js
   export default defineConfig({
     test: {
       globals: true,
       environment: 'jsdom',
       coverage: {
         provider: 'v8',
         reporter: ['text', 'html', 'lcov'],
         threshold: {
           lines: 80,
           functions: 80,
           branches: 80
         }
       }
     }
   })
   ```

2. Setup Vue Test Utils v3
   - Configure mount helpers
   - Create Vuetify test harness
   - Setup store mocking utilities

3. Create test templates
   - Component test template
   - Composable test template
   - Integration test template

4. Configure coverage reporting
   - Setup Istanbul/c8
   - Configure thresholds (80% minimum)
   - Setup CI integration

**Acceptance Criteria**:
- ✅ Vitest runs successfully
- ✅ Sample test passes
- ✅ Coverage reporting works
- ✅ Test templates documented

**Deliverables**:
- `vitest.config.js`
- `src/__tests__/setup.ts`
- Test templates in `.cursor/TEST-TEMPLATES.md`
- Coverage configuration

---

#### Junior Developer Week 1 Tasks
**Time Commitment**: 20 hours

**Daily Tasks** (2-3 hours/day):
1. Morning review (9-10am):
   - Review previous day's agent outputs
   - Check build status
   - Identify issues/blockers

2. Midday merge (12-1pm):
   - Merge approved agent changes
   - Resolve merge conflicts
   - Run integration tests

3. Afternoon validation (3-5pm):
   - Test monorepo structure
   - Verify build outputs
   - Validate TypeScript compilation
   - Run test suite

**End of Week 1**:
- Integration test: All 4 systems working together
- Document setup in `.cursor/SETUP-GUIDE.md`
- Create migration patterns document

---

#### CTO Week 1 Tasks
**Time Commitment**: 8 hours

**Tasks**:
1. Review architecture decisions (2 hours)
   - Approve monorepo structure
   - Validate build configuration
   - Review TypeScript strategy

2. Define migration patterns (3 hours)
   - Create `.cursor/MIGRATION-PATTERNS.md`
   - Define Options API → Composition API patterns
   - Define composable extraction patterns

3. Approve Week 1 deliverables (3 hours)
   - Final review of infrastructure
   - Approve progression to Week 2
   - Address any technical concerns

---

### Week 2-3: Component Migration (PARALLEL)

#### Component Distribution Strategy

**Agent 1: Simple Components** (Branch: `agent-1-simple`)
- BasicLed.vue (~50 lines)
- BasicFoot.vue (~80 lines)
- BasicFieldPick.vue (~120 lines)

**Agent 2: Medium Components** (Branch: `agent-2-medium`)
- BasicAuth.vue (~200 lines)
- BasicAdmin.vue (~250 lines)
- BasicSide.vue (~180 lines)

**Agent 3: Complex Component 1** (Branch: `agent-3-navstages`)
- BasicNavStages.vue (~392 lines)
- Split into sub-components first
- Extract routing composables

**Agent 4: Complex Component 2** (Branch: `agent-4-basichead`)
- BasicHead.vue (~1100+ lines - LARGEST)
- Split into sub-components first
- Extract search composables

---

#### Agent 1: Simple Components Migration
**Assignee**: Cursor Ultra Subagent 1  
**Supervisor**: Junior Developer (daily review)  
**Duration**: 5-7 days  

**Component 1: BasicLed.vue**

**Current (Vue 2)**:
```vue
<template>
  <v-icon :color="color">{{ icon }}</v-icon>
</template>

<script>
export default {
  name: 'BasicLed',
  props: {
    status: String
  },
  computed: {
    color() {
      return this.status === 'on' ? 'green' : 'grey'
    },
    icon() {
      return 'mdi-circle'
    }
  }
}
</script>
```

**Tasks**:
1. Convert to Composition API
   ```vue
   <script setup lang="ts">
   import { computed } from 'vue'
   
   interface Props {
     status?: 'on' | 'off'
   }
   
   const props = withDefaults(defineProps<Props>(), {
     status: 'off'
   })
   
   const color = computed(() => 
     props.status === 'on' ? 'green' : 'grey'
   )
   const icon = computed(() => 'mdi-circle')
   </script>
   ```

2. Add TypeScript types
3. Extract any reusable logic to composables
4. Write comprehensive tests
   ```typescript
   describe('BasicLed', () => {
     it('renders green when status is on', () => {
       const wrapper = mount(BasicLed, {
         props: { status: 'on' }
       })
       expect(wrapper.find('v-icon').props('color')).toBe('green')
     })
   })
   ```

5. Achieve >80% test coverage

**Component 2: BasicFoot.vue** (similar pattern)
**Component 3: BasicFieldPick.vue** (similar pattern)

**Acceptance Criteria per Component**:
- ✅ Converted to `<script setup>` with TypeScript
- ✅ Props properly typed
- ✅ Composables extracted where applicable
- ✅ Tests written with >80% coverage
- ✅ Vuetify 3 syntax updated
- ✅ Component builds without errors
- ✅ Visual regression test passes

**Deliverables**:
- 3 migrated components
- Composables (if any extracted)
- Test files for each component
- Migration notes in component comments

---

#### Agent 2: Medium Components Migration
**Assignee**: Cursor Ultra Subagent 2  
**Supervisor**: Junior Developer (daily review)  
**Duration**: 7-9 days  

**Component 1: BasicAuth.vue**

**Migration Steps**:
1. Analyze Options API structure
   - Data properties
   - Computed properties
   - Methods
   - Lifecycle hooks

2. Convert to Composition API
   ```vue
   <script setup lang="ts">
   import { ref, computed, onMounted } from 'vue'
   import { useRouter } from 'vue-router'
   import { useStore } from 'vuex'
   
   interface Props {
     redirectPath?: string
   }
   
   const props = withDefaults(defineProps<Props>(), {
     redirectPath: '/dashboard'
   })
   
   const store = useStore()
   const router = useRouter()
   
   const username = ref('')
   const password = ref('')
   const isAuthenticated = computed(() => store.state.auth.authenticated)
   
   const login = () => {
     store.dispatch('auth/login', {
       username: username.value,
       password: password.value
     }).then(() => {
       router.push(props.redirectPath)
     })
   }
   
   onMounted(() => {
     if (isAuthenticated.value) {
       router.push(props.redirectPath)
     }
   })
   </script>
   ```

3. Extract authentication composable
   ```typescript
   // src/composables/useAuth.ts
   export function useAuth() {
     const store = useStore()
     const router = useRouter()
     
     const isAuthenticated = computed(() => 
       store.state.auth.authenticated
     )
     
     const login = async (credentials: Credentials) => {
       await store.dispatch('auth/login', credentials)
     }
     
     const logout = async () => {
       await store.dispatch('auth/logout')
       router.push('/login')
     }
     
     return { isAuthenticated, login, logout }
   }
   ```

4. Write comprehensive tests
5. Update Vuetify 3 syntax

**Component 2: BasicAdmin.vue** (similar pattern)
**Component 3: BasicSide.vue** (similar pattern)

**Acceptance Criteria per Component**:
- ✅ Converted to Composition API
- ✅ Composables extracted for shared logic
- ✅ State management updated (Vuex 4 compatible)
- ✅ Tests achieve >80% coverage
- ✅ Vuetify 3 components used correctly
- ✅ TypeScript types complete

**Deliverables**:
- 3 migrated components
- Composables: `useAuth`, `useAdmin`, `useSide`
- Test suites for each
- State adapter integration tests

---

#### Agent 3: Complex Component 1 (BasicNavStages)
**Assignee**: Cursor Ultra Subagent 3  
**Supervisor**: CTO (complex routing decisions)  
**Duration**: 7-10 days  

**Component: BasicNavStages.vue (~392 lines)**

**Phase 1: Analysis & Planning** (Day 1)
1. Analyze current structure
   - Identify sub-components
   - Map state dependencies
   - Identify routing logic
   - Document breaking changes

2. Create splitting strategy
   ```
   BasicNavStages.vue (main)
   ├── NavStagesExpansion.vue (expansion panel)
   ├── NavStageItem.vue (individual stage)
   └── composables/
       ├── useNavStages.ts (stage logic)
       └── useStageRouting.ts (routing logic)
   ```

**Phase 2: Component Splitting** (Day 2-3)
1. Extract NavStagesExpansion.vue
   ```vue
   <template>
     <v-expansion-panels v-model="panel">
       <v-expansion-panel
         v-for="stage in stages"
         :key="stage.id"
       >
         <NavStageItem :stage="stage" />
       </v-expansion-panel>
     </v-expansion-panels>
   </template>
   
   <script setup lang="ts">
   import { ref } from 'vue'
   import type { Stage } from '@/types'
   
   interface Props {
     stages: Stage[]
   }
   
   const props = defineProps<Props>()
   const panel = ref(0)
   </script>
   ```

2. Extract NavStageItem.vue
3. Create main BasicNavStages.vue as orchestrator

**Phase 3: Composition API Conversion** (Day 4-6)
1. Convert each sub-component
2. Extract composables
   ```typescript
   // composables/useNavStages.ts
   export function useNavStages() {
     const store = useStore()
     
     const currentStage = computed(() => 
       store.state.vxg.cmp.BasicNavStages.currentStage
     )
     
     const stages = computed(() => 
       store.state.vxg.cmp.BasicNavStages.stages
     )
     
     const goToStage = (stageId: number) => {
       store.dispatch('set_cmp_flags', {
         name: 'BasicNavStages',
         flags: { currentStage: stageId }
       })
     }
     
     return { currentStage, stages, goToStage }
   }
   ```

3. Extract routing logic
   ```typescript
   // composables/useStageRouting.ts
   export function useStageRouting() {
     const router = useRouter()
     const route = useRoute()
     
     const navigateToStage = (stage: Stage) => {
       router.push({
         name: stage.route,
         params: { id: stage.id }
       })
     }
     
     const currentRoute = computed(() => route.name)
     
     return { navigateToStage, currentRoute }
   }
   ```

**Phase 4: Testing** (Day 7-10)
1. Unit tests for each sub-component
2. Integration tests for full component
3. Routing tests
4. State management tests
5. Visual regression tests

**Acceptance Criteria**:
- ✅ Split into logical sub-components
- ✅ All sub-components use Composition API
- ✅ Routing logic extracted to composable
- ✅ State logic extracted to composable
- ✅ Tests achieve >80% coverage
- ✅ No visual regressions
- ✅ Performance maintained or improved

**Deliverables**:
- `BasicNavStages.vue` (main orchestrator)
- `NavStagesExpansion.vue`
- `NavStageItem.vue`
- `composables/useNavStages.ts`
- `composables/useStageRouting.ts`
- Comprehensive test suite
- Migration documentation

---

#### Agent 4: Complex Component 2 (BasicHead)
**Assignee**: Cursor Ultra Subagent 4  
**Supervisor**: CTO (complex search logic decisions)  
**Duration**: 10-12 days  

**Component: BasicHead.vue (~1100+ lines - LARGEST)**

**Phase 1: Analysis & Planning** (Day 1-2)
1. Analyze 1100+ lines of code
   - Identify distinct features
   - Map dependencies
   - Document search integration (MiniSearch)
   - Plan splitting strategy

2. Create component architecture
   ```
   BasicHead.vue (main orchestrator)
   ├── HeadToolbar.vue (action buttons)
   ├── HeadSearch.vue (search/combobox)
   ├── HeadUser.vue (user menu)
   ├── HeadNotifications.vue (notifications)
   └── composables/
       ├── useHeadSearch.ts (search logic)
       ├── useHeadActions.ts (toolbar actions)
       └── useHeadPermissions.ts (action permissions)
   ```

**Phase 2: Component Splitting** (Day 3-5)
1. Extract HeadToolbar.vue
   ```vue
   <template>
     <v-toolbar>
       <v-btn
         v-for="action in allowedActions"
         :key="action.name"
         @click="handleAction(action)"
       >
         {{ action.label }}
       </v-btn>
     </v-toolbar>
   </template>
   
   <script setup lang="ts">
   import { useHeadActions } from '@/composables/useHeadActions'
   import { useHeadPermissions } from '@/composables/useHeadPermissions'
   
   const { actions, handleAction } = useHeadActions()
   const { allowedActions } = useHeadPermissions(actions)
   </script>
   ```

2. Extract HeadSearch.vue
   ```vue
   <template>
     <v-combobox
       v-model="searchQuery"
       :items="searchResults"
       :loading="isSearching"
       @update:search="handleSearch"
     />
   </template>
   
   <script setup lang="ts">
   import { useHeadSearch } from '@/composables/useHeadSearch'
   
   const {
     searchQuery,
     searchResults,
     isSearching,
     handleSearch
   } = useHeadSearch()
   </script>
   ```

3. Extract HeadUser.vue
4. Extract HeadNotifications.vue
5. Create main BasicHead.vue

**Phase 3: Composition API Conversion** (Day 6-8)
1. Convert search logic to composable
   ```typescript
   // composables/useHeadSearch.ts
   import MiniSearch from 'minisearch'
   
   export function useHeadSearch() {
     const store = useStore()
     const searchQuery = ref('')
     const searchResults = ref([])
     const isSearching = ref(false)
     
     const miniSearch = new MiniSearch({
       fields: ['name', 'id', 'type'],
       storeFields: ['name', 'id']
     })
     
     const handleSearch = async (query: string) => {
       if (!query) {
         searchResults.value = []
         return
       }
       
       isSearching.value = true
       try {
         const results = miniSearch.search(query)
         searchResults.value = results
       } finally {
         isSearching.value = false
       }
     }
     
     const indexAssets = (assets: Asset[]) => {
       miniSearch.addAll(assets)
     }
     
     return {
       searchQuery,
       searchResults,
       isSearching,
       handleSearch,
       indexAssets
     }
   }
   ```

2. Convert action logic to composable
   ```typescript
   // composables/useHeadActions.ts
   export function useHeadActions() {
     const store = useStore()
     const router = useRouter()
     
     const actions = computed(() => 
       store.state.vxg.cmp.BasicHead.actions
     )
     
     const handleAction = (action: Action) => {
       switch (action.type) {
         case 'navigate':
           router.push(action.route)
           break
         case 'dispatch':
           store.dispatch(action.event, action.payload)
           break
         case 'emit':
           // Handle custom emit
           break
       }
     }
     
     return { actions, handleAction }
   }
   ```

3. Convert permissions logic
   ```typescript
   // composables/useHeadPermissions.ts
   export function useHeadPermissions(actions: Ref<Action[]>) {
     const store = useStore()
     
     const allowedActions = computed(() => {
       return actions.value.filter(action => {
         const allowed = store.state.vxg.cmp.BasicHead.allow?.[action.name]
         return allowed !== false
       })
     })
     
     const canPerformAction = (actionName: string) => {
       return computed(() => {
         return store.state.vxg.cmp.BasicHead.allow?.[actionName] !== false
       })
     }
     
     return { allowedActions, canPerformAction }
   }
   ```

**Phase 4: Testing** (Day 9-12)
1. Unit tests for each sub-component
2. Search functionality tests
3. Action handling tests
4. Permission tests
5. Integration tests
6. Performance tests (search must be fast)
7. Visual regression tests

**Acceptance Criteria**:
- ✅ Split into 4+ logical sub-components
- ✅ All sub-components use Composition API
- ✅ Search logic fully functional (MiniSearch integration)
- ✅ Action system working correctly
- ✅ Permissions system intact
- ✅ Tests achieve >80% coverage
- ✅ Search performance maintained (<100ms)
- ✅ No visual regressions
- ✅ All actions working

**Deliverables**:
- `BasicHead.vue` (main orchestrator)
- `HeadToolbar.vue`
- `HeadSearch.vue`
- `HeadUser.vue`
- `HeadNotifications.vue`
- `composables/useHeadSearch.ts`
- `composables/useHeadActions.ts`
- `composables/useHeadPermissions.ts`
- Comprehensive test suite
- Performance benchmarks
- Migration documentation

---

#### Junior Developer Week 2-3 Tasks
**Time Commitment**: 40-45 hours (20-22.5 hrs/week × 2 weeks)

**Daily Tasks** (4-5 hours/day):
1. Morning review (9-10am):
   - Review all 4 agents' previous day outputs
   - Check test coverage reports
   - Flag issues/blockers

2. Midday testing (12-2pm):
   - Run integration tests
   - Test each migrated component
   - Verify Vuetify 3 rendering
   - Check TypeScript compilation

3. Afternoon merge (3-5pm):
   - Merge approved components
   - Resolve conflicts
   - Run full test suite
   - Update documentation

**Weekly Tasks**:
- Friday: Integration test of all completed components
- Document any patterns/issues discovered
- Report progress to CTO

---

#### CTO Week 2-3 Tasks
**Time Commitment**: 16 hours (8 hrs/week × 2 weeks)

**Week 2 Tasks** (8 hours):
1. Day 1-2: Review BasicNavStages splitting (2 hours)
2. Day 3-4: Review BasicHead splitting (3 hours)
3. Day 5: Approve composable patterns (2 hours)
4. Friday: Review integration (1 hour)

**Week 3 Tasks** (8 hours):
1. Monday: Review completed components (2 hours)
2. Wednesday: Deep dive on complex components (3 hours)
3. Thursday: Approve all Week 2-3 work (2 hours)
4. Friday: Plan Week 4 ecosystem work (1 hour)

---

### Week 4-5: Ecosystem & Integration

#### Agent 1: Vuetify 3 Migration
**Assignee**: Cursor Ultra Subagent 1  
**Supervisor**: Junior Developer (visual validation)  
**Duration**: 4-5 days  

**Tasks**:
1. Update all Vuetify 2 syntax to Vuetify 3
   ```vue
   <!-- Before (Vuetify 2) -->
   <v-btn outlined color="primary">Button</v-btn>
   <v-icon>mdi-account</v-icon>
   <v-expansion-panels>...</v-expansion-panels>
   
   <!-- After (Vuetify 3) -->
   <v-btn variant="outlined" color="primary">Button</v-btn>
   <v-icon icon="mdi-account"></v-icon>
   <v-expansion-panels>...</v-expansion-panels>
   ```

2. Update color system
   - Map old color names to new system
   - Update theme configuration
   - Test color accessibility

3. Update component props
   - Review Vuetify 3 breaking changes
   - Update all affected components
   - Document changes

4. Visual regression testing
   - Screenshot all components
   - Compare before/after
   - Fix visual issues

**Acceptance Criteria**:
- ✅ All Vuetify 3 syntax updated
- ✅ No Vuetify 2 syntax remains
- ✅ Visual regression tests pass
- ✅ Colors match design system
- ✅ All components render correctly

**Deliverables**:
- Updated components with Vuetify 3 syntax
- Visual regression test results
- Vuetify 3 migration notes
- Breaking changes documented

---

#### Agent 2: Day.js Migration & Tree-Shaking
**Assignee**: Cursor Ultra Subagent 2  
**Supervisor**: Junior Developer (bundle size validation)  
**Duration**: 3-4 days  

**Tasks**:
1. Replace Moment.js with Day.js
   ```javascript
   // Before (Moment.js - 70KB)
   import moment from 'moment'
   const formatted = moment(date).format('YYYY-MM-DD')
   const ago = moment(date).fromNow()
   
   // After (Day.js - 2KB)
   import dayjs from 'dayjs'
   import relativeTime from 'dayjs/plugin/relativeTime'
   dayjs.extend(relativeTime)
   
   const formatted = dayjs(date).format('YYYY-MM-DD')
   const ago = dayjs(date).fromNow()
   ```

2. Update all date formatting code
   - Find all moment() calls
   - Replace with dayjs()
   - Test date formatting

3. Setup tree-shakeable exports
   ```typescript
   // src/index.ts
   // Plugin (full bundle)
   export { default as Vxg } from './vxg'
   
   // Individual components (tree-shakeable)
   export { default as BasicHead } from './components/BasicHead.vue'
   export { default as BasicSide } from './components/BasicSide.vue'
   // ... all components
   
   // Composables (tree-shakeable)
   export * from './composables'
   
   // Types
   export * from './types'
   ```

4. Verify tree-shaking works
   - Test importing individual components
   - Verify unused code eliminated
   - Measure bundle size reduction

**Acceptance Criteria**:
- ✅ Moment.js completely removed
- ✅ Day.js working correctly
- ✅ Bundle size reduced by >50KB
- ✅ Tree-shaking verified working
- ✅ Individual imports work

**Deliverables**:
- Code with Day.js instead of Moment.js
- Tree-shakeable exports in index.ts
- Bundle size comparison report
- Import examples documented

---

#### Agent 3: Integration Testing
**Assignee**: Cursor Ultra Subagent 3  
**Supervisor**: Junior Developer (test execution)  
**Duration**: 4-5 days  

**Tasks**:
1. Write Vuex 4 adapter tests
   ```typescript
   describe('VuexAdapter', () => {
     it('integrates with Vuex 4 store', () => {
       const store = createStore({
         state: { vxg: { cmp: { BasicSide: { show: true } } } }
       })
       
       const adapter = new VuexAdapter(store)
       const state = adapter.getComponentState('BasicSide')
       
       expect(state.show).toBe(true)
     })
   })
   ```

2. Write Pinia adapter tests
   ```typescript
   describe('PiniaAdapter', () => {
     it('integrates with Pinia store', () => {
       const pinia = createPinia()
       const useVxgStore = defineStore('vxg', {
         state: () => ({ cmp: { BasicSide: { show: true } } })
       })
       
       const adapter = new PiniaAdapter(useVxgStore)
       const state = adapter.getComponentState('BasicSide')
       
       expect(state.show).toBe(true)
     })
   })
   ```

3. Cross-component integration tests
   - Test component interactions
   - Test state flow
   - Test event handling

4. Consumer simulation tests
   - Simulate pqs-frontend usage
   - Test global plugin registration
   - Test individual imports

**Acceptance Criteria**:
- ✅ Vuex 4 adapter fully tested
- ✅ Pinia adapter fully tested
- ✅ Cross-component tests pass
- ✅ Consumer simulation works
- ✅ >80% coverage on adapters

**Deliverables**:
- Adapter test suites
- Integration test suite
- Consumer simulation tests
- CI/CD configuration

---

#### Agent 4: Build, Documentation & Alpha Release
**Assignee**: Cursor Ultra Subagent 4  
**Supervisor**: CTO (final review)  
**Duration**: 4-5 days  

**Tasks**:
1. Verify all build outputs
   - Test ESM build
   - Test UMD build
   - Test CJS build
   - Verify types generated

2. Test npm package locally
   ```bash
   # In packages/model-vue
   npm pack
   
   # In test project
   npm install /path/to/plantquest-model-vue-1.0.0-alpha.1.tgz
   ```

3. Write migration guide
   ```markdown
   # Migration Guide: Vue 2 → Vue 3
   
   ## Quick Start
   
   ### Installation
   ```bash
   npm uninstall @plantquest/model-vue-v2
   npm install @plantquest/model-vue@^1.0.0
   ```
   
   ### Breaking Changes
   
   1. Vue 3 Required
   2. Vuetify 3 Required
   3. Plugin Installation Changed
   
   ### New Features
   
   1. Tree-shakeable imports
   2. TypeScript support
   3. Composables available
   ```

4. Create component API documentation
5. Write CHANGELOG.md
6. Prepare alpha release

**Acceptance Criteria**:
- ✅ All build formats validated
- ✅ npm package installable
- ✅ Migration guide complete
- ✅ API documentation complete
- ✅ CHANGELOG.md updated
- ✅ Alpha release prepared

**Deliverables**:
- `docs/migration-guide.md`
- `docs/api-documentation.md`
- `CHANGELOG.md`
- Alpha package v1.0.0-alpha.1
- Release notes

---

#### Junior Developer Week 4-5 Tasks
**Time Commitment**: 40-45 hours (20-22.5 hrs/week × 2 weeks)

**Daily Tasks** (4-5 hours/day):
1. Morning validation (9-11am):
   - Validate Vuetify 3 changes visually
   - Check bundle sizes
   - Run integration tests

2. Afternoon testing (2-5pm):
   - Test Vuex adapter
   - Test Pinia adapter
   - Test alpha package locally
   - Verify documentation accuracy

**End of Week 5**:
- Full integration test
- Alpha package published
- Coordinate with pqs-frontend team
- Document known issues

---

#### CTO Week 4-5 Tasks
**Time Commitment**: 16 hours (8 hrs/week × 2 weeks)

**Week 4 Tasks** (8 hours):
1. Monday: Review ecosystem updates (2 hours)
2. Wednesday: Review integration tests (2 hours)
3. Thursday: Review documentation (2 hours)
4. Friday: Approve alpha release (2 hours)

**Week 5 Tasks** (8 hours):
1. Monday: Final code review (3 hours)
2. Wednesday: Approve migration guide (2 hours)
3. Thursday: Final QA (2 hours)
4. Friday: Publish alpha release (1 hour)

---

### Week 6: Alpha Testing & Bug Fixes

#### All Agents: Bug Fix Sprint
**Assignees**: All 4 Cursor Ultra Subagents  
**Supervisor**: Junior Developer + CTO  
**Duration**: 5 days  

**Tasks**:
1. Publish alpha to npm
   ```bash
   cd packages/model-vue
   npm version 1.0.0-alpha.1
   npm publish --tag alpha
   ```

2. pqs-frontend integration
   - Install alpha version in pqs-frontend
   - Update plugin registration
   - Test all components
   - Document issues

3. Bug triage
   - P0: Critical bugs (breaks functionality)
   - P1: High priority (major issues)
   - P2: Medium priority (minor issues)
   - P3: Low priority (nice to have)

4. Parallel bug fixing
   - Agent 1: P0 bugs
   - Agent 2: P1 bugs
   - Agent 3: P2 bugs
   - Agent 4: Documentation updates

5. Daily deployments
   - v1.0.0-alpha.2 (Day 2)
   - v1.0.0-alpha.3 (Day 3)
   - v1.0.0-alpha.4 (Day 4)
   - v1.0.0-beta.1 (Day 5)

**Acceptance Criteria**:
- ✅ All P0 bugs fixed
- ✅ All P1 bugs fixed
- ✅ P2 bugs triaged
- ✅ pqs-frontend integration successful
- ✅ Beta release ready

---

## PHASE 2: Frontend Migration (Weeks 7-9)

This phase runs in parallel with model-vue v1.0 finalization.

### Week 7-9: pqs-frontend Vue 3 Migration

**Note**: This follows the patterns established in model-vue migration but applies to the pqs-frontend application.

#### Agent Distribution for pqs-frontend

**Agent 1**: Update dependencies & configuration
**Agent 2**: Migrate views/pages
**Agent 3**: Migrate UI components
**Agent 4**: Update Vuex store to be compatible

**Tasks per Agent**: Similar patterns to library migration but applied to application code.

---

## PHASE 3: Stabilization (Weeks 10-11)

### Week 10-11: Final Integration & Production

#### Tasks:
1. Integration testing (pqs-frontend + model-vue)
2. Performance testing
3. Security audit
4. Documentation finalization
5. Production deployment preparation
6. Stable v1.0.0 release

---

## Success Criteria & Testing Requirements

### Phase 1 Success (Library)
- ✅ All 9 components migrated to Vue 3
- ✅ >80% test coverage maintained
- ✅ ESM/UMD/CJS build outputs valid
- ✅ Tree-shaking verified (bundle size ≤ current)
- ✅ TypeScript definitions complete
- ✅ Vuex 4 AND Pinia adapters working
- ✅ Vuetify 3 integration complete
- ✅ Day.js replaces Moment.js (97% size reduction)
- ✅ Alpha testing: zero P0/P1 bugs
- ✅ Documentation complete
- ✅ Stable v1.0.0 published
- ✅ Vue 2 version maintained (v0.18.x)

### Phase 2 Success (Frontend)
- ✅ pqs-frontend upgraded to Vue 3
- ✅ Uses model-vue v1.0.0
- ✅ All features working
- ✅ No regressions
- ✅ Performance improved/maintained

### Phase 3 Success (Production)
- ✅ Deployed to production
- ✅ Monitoring in place
- ✅ Zero critical issues
- ✅ Rollback plan tested
- ✅ Documentation complete

---

## Risk Management

### High Risks

**1. Breaking Consuming Applications**
- **Risk**: Library changes break pqs-frontend
- **Mitigation**:
  - Alpha/beta testing phases
  - Maintain Vue 2 version
  - Comprehensive integration tests
  - Clear migration documentation

**2. AI Agent Code Quality**
- **Risk**: AI-generated code has subtle bugs
- **Mitigation**:
  - Junior dev reviews daily
  - CTO reviews complex decisions
  - >80% test coverage enforced
  - Integration testing throughout

**3. Timeline Overrun**
- **Risk**: Migration takes longer than planned
- **Mitigation**:
  - 5 agents = built-in buffer
  - Weekly checkpoints
  - Flexible scope (P2/P3 bugs can defer)

### Medium Risks

**1. Vuetify 3 Breaking Changes**
- **Risk**: Vuetify 3 has significant changes
- **Mitigation**:
  - Dedicated agent for Vuetify migration
  - Visual regression testing
  - Compatibility layer if needed

**2. State Management Coupling**
- **Risk**: Vuex coupling makes migration harder
- **Mitigation**:
  - State adapter pattern
  - Support both Vuex and Pinia
  - Clear state requirements documented

---

## Timeline & Dependencies

### Critical Path

```
Week 1: Infrastructure → Week 2-3: Components → Week 4-5: Ecosystem → Week 6: Alpha
                                                                              ↓
                                                             Week 7-9: Frontend Migration
                                                                              ↓
                                                          Week 10-11: Production Deploy
```

### Dependencies

**Week 1 → Week 2**:
- Monorepo must be working
- Build system must be functional
- TypeScript must compile
- Testing framework must be ready

**Week 2-3 → Week 4-5**:
- All components must be migrated
- Tests must be passing
- Composables must be extracted

**Week 4-5 → Week 6**:
- Vuetify 3 complete
- Day.js migration complete
- Build outputs validated
- Documentation ready

**Week 6 → Week 7-9**:
- Alpha tested successfully
- Known issues triaged
- Beta released
- Stable v1.0.0 ready

---

## Cost Breakdown

### Option 1: AI-Assisted with Junior Dev + CTO (RECOMMENDED) ⭐

**Team**:
- Junior Developer: 20 hrs/week × 11 weeks = 220 hours @ $35/hr = $7,700
- CTO Oversight: 8 hrs/week × 11 weeks = 88 hours @ $150/hr = $13,200
- Cursor Ultra: $200/month × 3 months = $600
- Buffer (10%): $2,150

**Total**: $23,650 (rounded to $24,000)

**ROI Year 1**: 325% ($67K productivity + $35K avoided costs)

---

### Option 2: Senior Dev + 4 Agents (ALTERNATIVE)

**Team**:
- Senior Developer: 35 hrs/week × 6 weeks = 210 hours @ $150/hr = $31,500
- Cursor Ultra: $200/month × 2 months = $400
- Buffer (10%): $3,190

**Total**: $35,090 (rounded to $35,000)

**ROI Year 1**: Still excellent, faster timeline

---

## Next Steps for Team Lead

### Immediate Actions (This Week)

**Monday** (Feb 10):
1. ✅ Present task list to stakeholders
2. ✅ Get decision: Junior+CTO or Senior+Agents
3. ✅ Approve budget ($24K or $35K)

**Tuesday** (Feb 11):
1. ✅ Allocate team resources
   - If Junior+CTO: Assign junior dev (20 hrs/week), book CTO time (8 hrs/week)
   - If Senior: Assign senior dev (35 hrs/week)
2. ✅ Purchase Cursor Ultra licenses
3. ✅ Notify pqs-frontend team

**Wednesday** (Feb 12):
1. ✅ Create 4 git branches (agent-1 through agent-4)
2. ✅ Setup project board with tasks
3. ✅ Create `.cursor/MIGRATION-PATTERNS.md`

**Thursday** (Feb 13):
1. ✅ Kickoff meeting
2. ✅ Open 4 Cursor Ultra sessions
3. ✅ Assign Week 1 tasks

**Friday** (Feb 14):
1. ✅ Agents begin infrastructure work
2. ✅ Daily review process starts

---

### Task Assignment Template

```markdown
## Agent 1: Infrastructure
**Assignee**: Cursor Ultra Subagent 1
**Branch**: agent-1-infrastructure
**Duration**: Week 1
**Tasks**: See "Week 1: Agent 1" section above
**Supervisor**: Junior Developer (2 hrs/day review)
**Acceptance**: Monorepo working, builds successful

## Agent 2: Build System
**Assignee**: Cursor Ultra Subagent 2
...
```

---

## Tools & Resources

### Required Tools
- Cursor IDE with Ultra subscription
- Git with branch management
- npm/pnpm for package management
- Vitest for testing
- Vue DevTools for debugging

### Documentation References
- Vue 3 Migration Guide: https://v3-migration.vuejs.org/
- Vuetify 3 Migration: https://vuetifyjs.com/en/getting-started/upgrade-guide/
- Vite Library Mode: https://vitejs.dev/guide/build.html#library-mode
- Day.js Documentation: https://day.js.org/

### ProvenanceCode References
- DEC-000018: Vue 3 Migration Decision
- RA-000002: Vue 2 Continuation Risk
- SPEC-000002: Technical Specification
- VUE2-RISK-ANALYSIS.md: Risk analysis
- GO-NO-GO-DECISION.md: Decision rationale
- DEC-MODEL-VUE-002-vue3-migration-plan.md: Detailed plan

---

## Summary for Team Lead

### Quick Reference

**Timeline**: 11-13 weeks total
- Weeks 1-6: Library migration
- Weeks 7-9: Frontend migration
- Weeks 10-11: Production deployment

**Team**: Junior Dev (20 hrs/week) + CTO (8 hrs/week) + 4 AI Agents

**Cost**: $24,000

**ROI**: 325% Year 1

**Risk**: Low (from CRITICAL if staying on Vue 2)

---

### Assignment Strategy

1. **Week 1**: All 4 agents work on infrastructure in parallel
2. **Week 2-3**: All 4 agents migrate components in parallel (maximize speed)
3. **Week 4-5**: All 4 agents work on ecosystem in parallel
4. **Week 6**: All 4 agents assist with bug fixes from alpha testing

**Key to Success**:
- Daily junior dev reviews (2-3 hours)
- CTO involvement on complex decisions
- Non-overlapping agent assignments
- Daily integration and testing
- Clear acceptance criteria per task

---

**Ready for Task Assignment**: ✅ Yes
**Approved By**: _[Pending]_
**Start Date**: _[February 17, 2026]_
**Target Completion**: _[May 5, 2026]_
