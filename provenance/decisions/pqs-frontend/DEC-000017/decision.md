# DEC-000017 - Vue 3 Migration Plan

## Summary
Plan for migrating from Vue 2.6.12 to Vue 3.x, addressing impacts across 7 core architectural decisions and updating the entire frontend stack.

## Status
**Proposed** - Pending approval and resourcing

## Context
Vue 2 reached End of Life on December 31, 2023. The PQS frontend requires migration to Vue 3 for:
- **Long-term support**: Vue 2 is no longer officially supported
- **Security updates**: Critical security patches only available for Vue 3
- **Performance**: Vue 3 offers significant performance improvements (Proxy-based reactivity)
- **Ecosystem**: Modern libraries (Pinia, Vue Router 4, Vuetify 3) require Vue 3
- **Developer experience**: Composition API, better TypeScript support
- **Future features**: New Vue features only available in Vue 3

### Current State Analysis
Based on documented decisions (DEC-000002 through DEC-000016), the PQS frontend has:
- **26,000+ lines of Vue 2 code** (components, store, router)
- **Options API throughout** (100+ components)
- **1,660-line Vuex store** requiring Pinia migration
- **Promise-based async** (can adopt async/await with Vue 3)
- **@plantquest/model-vue dependency** (Vue 2 based)
- **2,793-line NavVis component** requiring refactoring
- **Leaflet/vue2-leaflet** requiring vue3-leaflet migration

## Decision
**Approve phased Vue 3 migration** over 12-16 weeks with the following approach:

### Phase 1: Preparation (2-3 weeks)
1. Audit all Vue 2 specific code
2. Update build tools and dependencies
3. Create migration testing strategy
4. Set up Vue 3 development environment

### Phase 2: Core Framework (3-4 weeks)
1. Vue 2 → Vue 3
2. Vuex → Pinia
3. Vue Router 3 → Vue Router 4
4. Vuetify 2 → Vuetify 3

### Phase 3: Code Migration (5-7 weeks)
1. Convert components to Composition API
2. Migrate Promise chains to async/await
3. Update @plantquest/model-vue or create wrappers
4. Refactor large components (NavVis, PqsOneView)

### Phase 4: Testing & Stabilization (2-3 weeks)
1. Comprehensive testing
2. Performance benchmarking
3. Bug fixes
4. Documentation updates

## Impact Analysis by Decision

### 🔴 HIGH IMPACT - Requires Significant Changes

#### DEC-000002: Vue 2.x Framework Selection → **SUPERSEDED**
**Migration Effort**: 6-8 weeks

**Changes Required**:
```javascript
// BEFORE (Vue 2 Options API)
export default {
  name: 'ComponentName',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    this.loadData()
  }
}

// AFTER (Vue 3 Composition API)
import { ref, onMounted } from 'vue'

export default {
  name: 'ComponentName',
  setup() {
    const count = ref(0)
    
    const increment = () => {
      count.value++
    }
    
    onMounted(() => {
      loadData()
    })
    
    return {
      count,
      increment
    }
  }
}
```

**Affected Files**: 100+ Vue components
- src/components/**/*.vue (24 components)
- All template syntax updates (`$listeners` → `$attrs`)
- Event handling changes

**Breaking Changes**:
- ❌ `this.$listeners` removed (merge with `$attrs`)
- ❌ `this.$children` removed (use refs or provide/inject)
- ❌ Filters removed (use computed properties or methods)
- ❌ Global event bus pattern no longer works

---

#### DEC-000003: Promise-Based Async Operations → **CAN BE UPDATED**
**Migration Effort**: 3-4 weeks

**Changes Required**:
```javascript
// BEFORE (Promise chains)
methods: {
  loadData() {
    return this.$http.get('/api/data')
      .then(response => {
        this.data = response.data;
        return this.processData(this.data);
      })
      .then(processedData => {
        this.updateUI(processedData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

// AFTER (async/await - Vue 3)
async loadData() {
  try {
    const response = await this.$http.get('/api/data');
    this.data = response.data;
    const processedData = await this.processData(this.data);
    this.updateUI(processedData);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

**Affected Files**: 
- src/plugins/store.js (1,660 lines - 40+ actions)
- 100+ component methods

**Decision**: Adopt async/await for cleaner code in Vue 3
- ✅ Better readability
- ✅ Better error handling
- ✅ Standard modern JavaScript
- ✅ No more regenerator-runtime concerns with modern build tools

---

#### DEC-000004: Vuex State Management → **MUST MIGRATE TO PINIA**
**Migration Effort**: 4-5 weeks (largest store in codebase)

**Changes Required**:
```javascript
// BEFORE (Vuex)
const store = new Vuex.Store({
  state: {
    current_user: null,
    main_asset: []
  },
  mutations: {
    set_current_user(state, user) {
      state.current_user = user
    }
  },
  actions: {
    async load_current_user({commit}) {
      const user = await seneca.post('aim:web,on:user,load:user')
      commit('set_current_user', user)
    }
  }
})

// AFTER (Pinia)
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    current_user: null,
    main_asset: []
  }),
  actions: {
    async loadCurrentUser() {
      const user = await seneca.post('aim:web,on:user,load:user')
      this.current_user = user
    }
  }
})

// Usage in components
import { useUserStore } from '@/stores/user'

setup() {
  const userStore = useUserStore()
  userStore.loadCurrentUser()
}
```

**Affected Files**:
- src/plugins/store.js (1,660 lines → split into multiple stores)
- All components using `this.$store` (100+ files)

**Store Splitting Strategy**:
```
stores/
├── user.js (session, auth, profile)
├── asset.js (assets, rooms, found_assets)
├── ui.js (vxg, trigger, side panels)
├── map.js (coordinates, paths, levels)
├── navvis.js (positioning, events)
└── session.js (session management state)
```

**Benefits**:
- ✅ No more mutations (direct state modification)
- ✅ Better TypeScript support
- ✅ Smaller, focused stores
- ✅ Better code organization
- ✅ Simpler API

---

#### DEC-000008: @plantquest/model-vue Component Library → **REQUIRES UPDATE OR WRAPPER**
**Migration Effort**: 2-3 weeks (coordination with library maintainers)

**Options**:
1. **Update @plantquest/model-vue to Vue 3** (recommended)
2. **Create compatibility wrappers** (temporary solution)
3. **Reimplement components** (last resort)

**Components Affected**:
- BasicNavStages
- BasicSide
- BasicHead
- BasicMain

**Migration Path**:
```javascript
// Option 1: Wait for Vue 3 version
import { BasicNavStages } from '@plantquest/model-vue-v3'

// Option 2: Compatibility wrapper
import { defineComponent, h } from 'vue'
import { BasicNavStages as Vue2Component } from '@plantquest/model-vue'
import { createCompatVue2Component } from '@vue/compat'

export default defineComponent({
  name: 'BasicNavStagesWrapper',
  setup(props) {
    return () => h(createCompatVue2Component(Vue2Component), props)
  }
})
```

---

### 🟡 MEDIUM IMPACT - Requires Moderate Changes

#### DEC-000011: Vue Router History Mode → **UPDATE TO VUE ROUTER 4**
**Migration Effort**: 1-2 weeks

**Changes Required**:
```javascript
// BEFORE (Vue Router 3)
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // Guard logic
  next()
})

// AFTER (Vue Router 4)
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  // Guard logic - no next() callback
  return true // or return { name: 'route' }
})
```

**Breaking Changes**:
- ❌ `next()` callback removed (return value instead)
- ❌ `mode` replaced with `history` functions
- ✅ Better TypeScript support
- ✅ Dynamic routing improvements

---

#### DEC-000009: Leaflet Mapping Library → **UPDATE TO VUE3-LEAFLET**
**Migration Effort**: 1-2 weeks

**Changes Required**:
```javascript
// BEFORE (vue2-leaflet)
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

// AFTER (vue3-leaflet or @vue-leaflet/vue-leaflet)
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
```

**Package Updates**:
- vue2-leaflet → @vue-leaflet/vue-leaflet
- Verify plugin compatibility (markercluster, browser.print)

---

#### DEC-000012: Babel Transpilation Strategy → **SIMPLIFY BUILD CONFIG**
**Migration Effort**: 1 week

**Changes**:
- Vite replaces Vue CLI (faster builds)
- Modern browser targets (ESM support)
- Reduced polyfills
- Native async/await support

---

### 🟢 LOW IMPACT - Minimal or No Changes

#### DEC-000005: Kinde OAuth Authentication → **NO CHANGES**
**Migration Effort**: None

- Kinde SDK is framework-agnostic
- OAuth flow remains the same
- May need to update @plantquest/kinde-auth-pkce-js if Vue-specific

---

#### DEC-000006: Session Management System → **MINIMAL CHANGES**
**Migration Effort**: 1 week

**Changes**:
- SessionManager.js is standalone (no changes)
- Update Vuex commit/dispatch to Pinia
- Components use Composition API with Pinia

```javascript
// BEFORE
this.$store.commit('SET_SESSION', session)

// AFTER
const sessionStore = useSessionStore()
sessionStore.setSession(session)
```

---

#### DEC-000007: Seneca Microservice Backend → **NO CHANGES**
**Migration Effort**: None

- Seneca entities unchanged
- Backend integration remains the same
- May use async/await in actions

---

#### DEC-000010: NavVis 3D Integration → **REFACTOR COMPONENT**
**Migration Effort**: 2-3 weeks

**PqsNavvisView.vue (2,793 lines)**:
- Convert to Composition API
- Split into smaller composables
- Extract state management logic

```javascript
// Extract composables
composables/
├── useNavvisPositioning.js
├── useNavvisEvents.js
└── useNavvisCoordinates.js
```

---

#### DEC-000013: Environment-Based Configuration → **NO CHANGES**
**Migration Effort**: None

- VITE_* prefix if using Vite (instead of VUE_APP_*)
- Same pattern, different build tool

---

#### DEC-000014: HttpOnly Cookie Authentication → **NO CHANGES**
**Migration Effort**: None

- Cookie handling unchanged
- fetch API remains the same

---

#### DEC-000015: Connection Pool Management → **NO CHANGES**
**Migration Effort**: None

- SessionManager unchanged
- May refactor to composable

---

#### DEC-000016: Multi-Window Session Handling → **NO CHANGES**
**Migration Effort**: None

- BroadcastChannel API unchanged
- localStorage strategy unchanged

---

## Migration Risks & Mitigation

### High Risks
1. **@plantquest/model-vue Dependency**
   - **Risk**: Library not updated to Vue 3
   - **Mitigation**: Create compatibility wrappers using @vue/compat
   - **Fallback**: Reimplement 4 core components

2. **Large Vuex Store (1,660 lines)**
   - **Risk**: Complex state management, many dependencies
   - **Mitigation**: Incremental migration, maintain store structure initially
   - **Testing**: Extensive state management testing

3. **NavVis Component (2,793 lines)**
   - **Risk**: Complex component, hard to refactor
   - **Mitigation**: Split into smaller composables first
   - **Testing**: Thorough 3D positioning testing

### Medium Risks
1. **100+ Components to Convert**
   - **Risk**: Consistency, missed edge cases
   - **Mitigation**: Create conversion checklist, automated tools
   - **Testing**: Component-by-component testing

2. **Promise → async/await Conversion**
   - **Risk**: Breaking error handling
   - **Mitigation**: Maintain try/catch patterns, test error cases
   - **Testing**: Error scenario testing

### Low Risks
1. **Router Navigation Guards**
   - **Risk**: Guard logic changes
   - **Mitigation**: Test all route transitions
   
2. **Build Configuration**
   - **Risk**: Build failures
   - **Mitigation**: Parallel Vue 3 branch, gradual migration

---

## Migration Checklist

### ✅ Pre-Migration
- [ ] Audit all Vue 2 specific patterns
- [ ] Check @plantquest/model-vue Vue 3 status
- [ ] Set up Vue 3 development environment
- [ ] Create comprehensive test suite
- [ ] Document current behavior

### ✅ Core Framework
- [ ] Update Vue 2.6.12 → Vue 3.x
- [ ] Update Vue Router 3 → Vue Router 4
- [ ] Migrate Vuex → Pinia
- [ ] Update Vuetify 2 → Vuetify 3
- [ ] Update vue2-leaflet → vue3-leaflet

### ✅ Code Migration
- [ ] Convert Options API → Composition API (100+ components)
- [ ] Convert Promise chains → async/await
- [ ] Split Vuex store into Pinia stores
- [ ] Update @plantquest/model-vue integration
- [ ] Refactor NavVis component
- [ ] Update event handling (`$listeners`, `$attrs`)
- [ ] Remove filters (convert to methods/computed)
- [ ] Update global event bus (use provide/inject)

### ✅ Build & Configuration
- [ ] Update babel.config.js → vite.config.js
- [ ] Update package.json dependencies
- [ ] Update environment variables (VUE_APP_* → VITE_*)
- [ ] Update build scripts
- [ ] Update ESLint configuration

### ✅ Testing
- [ ] Unit tests for all stores
- [ ] Component tests (100+ components)
- [ ] Integration tests (routing, auth, session)
- [ ] E2E tests (critical user flows)
- [ ] Performance benchmarks

### ✅ Documentation
- [ ] Update decision records (supersede DEC-000002, 000003, 000004)
- [ ] Update README.md
- [ ] Update developer documentation
- [ ] Update .cursor/rules

---

## Resource Estimation

### Hybrid Approach: Senior Developers + Cursor AI Agents

The migration will use **Cursor AI agents** for repetitive conversion tasks alongside senior developers for architecture and complex decisions.

### Team Requirements
- **1 Senior Vue Developer** (full-time) - Architecture, complex components, review
- **Cursor AI Agents** - Automated conversion, boilerplate, repetitive tasks
- **1 QA Engineer** (full-time) - Testing, validation
- **1 Backend Developer** (part-time, 20%) - Integration testing

### Timeline with AI Assistance
- **Total Duration**: 6-8 weeks (vs 12-16 weeks manual)
- **Phase 1** (Preparation): Weeks 1-2 (vs 2-3)
- **Phase 2** (Core Framework): Weeks 3-4 (vs 3-4)
- **Phase 3** (Code Migration with AI): Weeks 5-6 (vs 5-7)
- **Phase 4** (Testing & Stabilization): Weeks 7-8 (vs 2-3)

### Effort Breakdown with AI Agents

| Task | Manual Effort | AI-Assisted Effort | AI Contribution |
|------|---------------|-------------------|-----------------|
| Vue 2 → Vue 3 core | 1 week | 1 week | None (manual) |
| Vuex → Pinia | 4-5 weeks | 2-3 weeks | 40-50% reduction |
| Options API → Composition API | 6-8 weeks | 2-3 weeks | 60-70% reduction |
| Promise → async/await | 3-4 weeks | 1-2 weeks | 50-60% reduction |
| @plantquest/model-vue | 2-3 weeks | 2-3 weeks | None (complex) |
| NavVis refactor | 2-3 weeks | 1-2 weeks | 30-40% reduction |
| Router migration | 1-2 weeks | 1 week | 40% reduction |
| Leaflet migration | 1-2 weeks | 1 week | 40% reduction |
| Build config | 1 week | 0.5 weeks | 50% reduction |
| Testing | 2-3 weeks | 2-3 weeks | None (manual) |

**Total Manual**: 23-35 person-weeks  
**Total AI-Assisted**: 13-20 person-weeks  
**Efficiency Gain**: 40-45% reduction in effort

### AI Agent Capabilities

#### 1. Automated Component Conversion (60-70% reduction)
```javascript
// Cursor Agent can convert 100+ components from:
export default {
  name: 'Component',
  data() { return { count: 0 } },
  methods: { increment() { this.count++ } }
}

// To:
import { ref } from 'vue'
export default {
  name: 'Component',
  setup() {
    const count = ref(0)
    const increment = () => { count.value++ }
    return { count, increment }
  }
}
```

**AI Tasks**:
- ✅ Convert data() → ref/reactive
- ✅ Convert methods → setup functions
- ✅ Convert computed → computed()
- ✅ Convert lifecycle hooks (mounted → onMounted)
- ✅ Handle $refs, $emit, props
- ⚠️ Complex logic requires human review

**Human Tasks**:
- Review converted components
- Handle edge cases
- Optimize performance
- Architectural decisions

---

#### 2. Promise → async/await Conversion (50-60% reduction)
```javascript
// Cursor Agent converts:
loadData() {
  return this.$http.get('/api/data')
    .then(response => {
      this.data = response.data;
      return this.processData(this.data);
    })
    .then(processedData => {
      this.updateUI(processedData);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// To:
async loadData() {
  try {
    const response = await this.$http.get('/api/data');
    this.data = response.data;
    const processedData = await this.processData(this.data);
    this.updateUI(processedData);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

**AI Tasks**:
- ✅ Convert .then() chains → await
- ✅ Convert .catch() → try/catch
- ✅ Handle Promise.all scenarios
- ✅ Add async/await keywords
- ⚠️ Complex error handling needs review

**Human Tasks**:
- Review error handling strategies
- Verify async flow correctness
- Optimize concurrent operations

---

#### 3. Vuex → Pinia Migration (40-50% reduction)
```javascript
// Cursor Agent converts:
const store = new Vuex.Store({
  state: { user: null },
  mutations: {
    setUser(state, user) { state.user = user }
  },
  actions: {
    async loadUser({commit}) {
      const user = await api.getUser()
      commit('setUser', user)
    }
  }
})

// To:
export const useUserStore = defineStore('user', {
  state: () => ({ user: null }),
  actions: {
    async loadUser() {
      this.user = await api.getUser()
    }
  }
})
```

**AI Tasks**:
- ✅ Convert store structure
- ✅ Remove mutations (direct state access)
- ✅ Convert actions
- ✅ Update component usage ($store → useStore)
- ⚠️ Store splitting strategy needs human planning

**Human Tasks**:
- Design store split strategy (6 stores)
- Review state management patterns
- Validate inter-store dependencies

---

#### 4. Router Migration (40% reduction)
```javascript
// Cursor Agent converts:
router.beforeEach((to, from, next) => {
  if (requiresAuth) {
    next('/login')
  } else {
    next()
  }
})

// To:
router.beforeEach((to, from) => {
  if (requiresAuth) {
    return '/login'
  }
  return true
})
```

**AI Tasks**:
- ✅ Remove next() callback
- ✅ Convert to return statements
- ✅ Update route configuration
- ⚠️ Complex guard logic needs review

---

#### 5. Test Generation & Updates (30-40% reduction)
**AI Tasks**:
- ✅ Generate unit tests for new Pinia stores
- ✅ Update component test imports
- ✅ Generate test cases for converted components
- ⚠️ E2E tests need manual design

---

### Hybrid Workflow

```
┌─────────────────────────────────────────────────────┐
│ Phase 1: Preparation (Weeks 1-2)                    │
├─────────────────────────────────────────────────────┤
│ Human: Audit codebase, plan store split             │
│ AI Agent: Generate migration report, find patterns  │
│ Human: Design Pinia store structure                 │
│ AI Agent: Create migration scripts                  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Phase 2: Core Framework (Weeks 3-4)                 │
├─────────────────────────────────────────────────────┤
│ Human: Update dependencies, configure build         │
│ AI Agent: Update imports across codebase            │
│ Human: Test build, fix configuration                │
│ AI Agent: Generate compatibility shims              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Phase 3: Code Migration (Weeks 5-6)                 │
├─────────────────────────────────────────────────────┤
│ AI Agent: Convert 80+ simple components             │
│ Human: Review AI conversions (20% time)             │
│ Human: Convert 20 complex components                │
│ AI Agent: Convert Promise chains                    │
│ Human: Review error handling                        │
│ AI Agent: Convert Vuex → Pinia boilerplate         │
│ Human: Design store split, test integration         │
│ AI Agent: Update component store usage              │
│ Human: Refactor NavVis (2,793 lines)               │
│ AI Agent: Extract composables                       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Phase 4: Testing & Stabilization (Weeks 7-8)        │
├─────────────────────────────────────────────────────┤
│ AI Agent: Generate test cases                       │
│ Human + QA: Run tests, find bugs                    │
│ AI Agent: Fix simple bugs                           │
│ Human: Fix complex issues                           │
│ Human: Performance optimization                     │
└─────────────────────────────────────────────────────┘
```

---

### Work Distribution

**Cursor AI Agent (60-70% of repetitive work)**:
- Component conversion (80+ simple components)
- Promise → async/await (bulk conversion)
- Vuex → Pinia boilerplate
- Import updates across codebase
- Test generation
- Documentation updates

**Senior Developer (Architecture & Complex Logic)**:
- Store splitting strategy
- Complex component refactoring (NavVis, PqsOneView)
- @plantquest/model-vue integration
- Performance optimization
- Architectural decisions
- Review AI-generated code
- Fix edge cases and bugs

**QA Engineer**:
- Test plan creation
- Manual testing
- E2E test development
- Regression testing
- Bug validation

---

### Cost-Benefit Analysis

#### Manual Approach
- **Team**: 2 Senior Devs + 1 QA + 0.5 Backend
- **Duration**: 12-16 weeks
- **Cost**: ~$120K-$160K (labor)

#### AI-Assisted Approach
- **Team**: 1 Senior Dev + 1 QA + 0.2 Backend + Cursor AI
- **Duration**: 6-8 weeks
- **Cost**: ~$50K-$70K (labor) + $5K (AI subscription)
- **Savings**: ~$65K-$85K (55-65% reduction)

**Additional Benefits**:
- ✅ **Consistency**: AI applies patterns uniformly
- ✅ **Speed**: 2x faster completion
- ✅ **Less Human Error**: Automated conversions reduce mistakes
- ✅ **Documentation**: AI generates inline docs
- ✅ **Testing**: AI generates test cases

---

## Benefits of Migration

### Technical Benefits
✅ **Performance**: 30-50% faster rendering (Proxy-based reactivity)  
✅ **Bundle Size**: Smaller builds with tree-shaking  
✅ **TypeScript**: Better type inference  
✅ **Developer Experience**: Composition API, better devtools  
✅ **Modern JavaScript**: Native async/await, no polyfills  
✅ **Maintainability**: Smaller, focused stores and composables  

### Business Benefits
✅ **Long-term Support**: Vue 3 is actively maintained  
✅ **Security**: Regular security updates  
✅ **Ecosystem**: Access to modern libraries  
✅ **Recruitment**: Easier to hire Vue 3 developers  
✅ **Future-Proof**: Ready for future Vue features  

### Risk Reduction
✅ **No EOL Risk**: Vue 2 EOL already passed  
✅ **Security Patches**: Critical updates only for Vue 3  
✅ **Library Support**: New libraries Vue 3 only  

---

## Alternatives Considered

### Option 1: Stay on Vue 2 (Extended Support)
**Rejected** - Technical debt increases
- **Pros**: No migration effort, no disruption
- **Cons**: No new features, security risk, ecosystem left behind, harder to hire

### Option 2: Rewrite in Different Framework
**Rejected** - Too risky, too expensive
- **Pros**: Modern framework (React, Svelte)
- **Cons**: 6-12 months, complete rewrite, @plantquest/model-vue lost

### Option 3: Gradual Migration with @vue/compat
**Alternative** - Can use compatibility build initially
- **Pros**: Gradual migration, less disruptive
- **Cons**: Performance penalty, technical debt, extended timeline

---

## Recommendation

**Approve Vue 3 migration with AI-assisted hybrid approach over 6-8 weeks.**

### Key Success Factors
1. **@plantquest/model-vue**: Must have Vue 3 version or wrappers
2. **Testing**: Comprehensive test coverage before and during migration
3. **Incremental**: Phase migration, don't do everything at once
4. **AI Oversight**: Senior developer reviews all AI-generated code
5. **Documentation**: Update decisions and docs throughout
6. **Team Training**: Vue 3 Composition API + Cursor AI agent training

### Why AI-Assisted Approach?
- ⚡ **2x Faster**: 6-8 weeks vs 12-16 weeks manual
- 💰 **55-65% Cost Reduction**: $55-75K total vs $120-160K manual
- ✅ **Consistent**: AI applies patterns uniformly across 100+ components
- 🎯 **Senior Dev Focus**: Architect focuses on complex problems, not boilerplate
- 📊 **Better Testing**: AI generates comprehensive test cases
- 📝 **Documentation**: AI maintains inline docs during conversion

### Go/No-Go Criteria (AI-Assisted Approach)
- ✅ @plantquest/model-vue Vue 3 compatibility confirmed
- ✅ Test coverage >70% before migration
- ✅ 1 senior developer allocated (full-time, 6-8 weeks)
- ✅ Cursor AI agent access configured
- ✅ 6-8 week timeline approved (vs 12-16 manual)
- ✅ Stakeholder buy-in for AI-assisted approach
- ✅ Code review process for AI-generated code established

---

## Related Decisions

**Supersedes**:
- DEC-000002 (Vue 2.x Framework Selection)

**Updates**:
- DEC-000003 (Promise-Based Async) → Allow async/await
- DEC-000004 (Vuex State Management) → Migrate to Pinia
- DEC-000008 (@plantquest/model-vue) → Update integration
- DEC-000011 (Vue Router) → Update to v4

**Unaffected**:
- DEC-000005 (Kinde OAuth)
- DEC-000006 (Session Management)
- DEC-000007 (Seneca Backend)
- DEC-000009 (Leaflet Mapping)
- DEC-000010 (NavVis 3D)
- DEC-000013 (Environment Config)
- DEC-000014 (HttpOnly Cookies)
- DEC-000015 (Connection Pool)
- DEC-000016 (Multi-Window Sessions)

---

## References
- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Pinia Migration from Vuex](https://pinia.vuejs.org/cookbook/migration-vuex.html)
- [Vue Router 4 Migration](https://router.vuejs.org/guide/migration/)
- All documented decisions (DEC-000002 through DEC-000016)

## Tags
`vue3`, `migration`, `architecture`, `modernization`, `technical-debt`

## Version History
- **v1.0** (2026-02-06): Initial migration plan based on documented decisions
