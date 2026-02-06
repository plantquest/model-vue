# Vue 3 Migration Quick Start Guide

**For**: model-vue library maintainers  
**Date**: 2026-02-06

---

## 🎯 Goal

Migrate @plantquest/model-vue from Vue 2.6 to Vue 3.x while maintaining backward compatibility for existing consumers.

---

## ⏱️ Timeline

**6-8 weeks** with PARALLEL HYBRID (3-4 Cursor agents simultaneously)

```
Week 1:     Infrastructure setup (4 agents in parallel)
Week 2-3:   Component migration (4 agents, 9 components in parallel!)
Week 4-5:   Ecosystem & testing (4 agents in parallel)
Week 6-8:   Consumer testing & stable release
```

**Key Difference**: 3-4x faster by running agents in parallel vs sequential

---

## 🚀 Week 1: Immediate Actions

### Day 1-2: Decision & Planning

**✅ Tasks**:
1. Review migration plan (DEC-MODEL-VUE-002-vue3-migration-plan.md)
2. Get stakeholder approval
3. Allocate resources (1 senior dev, 1 part-time developer)
4. Schedule kickoff meeting

**📋 Checklist**:
- [ ] Read full migration plan
- [ ] Review LIBRARY-VS-APP-MIGRATION.md (understand library constraints)
- [ ] Approve budget (~$75-90K over 15 weeks)
- [ ] Assign team members
- [ ] Create project board/Jira tickets

---

### Day 3-5: Repository Setup

**✅ Tasks**:
1. Create monorepo structure
2. Setup package workspaces
3. Configure Vite for Vue 3 build
4. Setup dual publishing

**📁 Create Structure**:
```bash
# 1. Create monorepo
mkdir -p packages/model-vue-v2 packages/model-vue

# 2. Copy current code to v2 package
cp -r src packages/model-vue-v2/
cp package.json packages/model-vue-v2/
cp -r test packages/model-vue-v2/

# 3. Update root package.json
cat > package.json << 'EOF'
{
  "name": "@plantquest/model-vue-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build:v2": "cd packages/model-vue-v2 && npm run vue-build",
    "build:v3": "cd packages/model-vue && npm run build",
    "build": "npm run build:v2 && npm run build:v3"
  }
}
EOF

# 4. Create workspace file (pnpm)
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'packages/*'
EOF

# 5. Install pnpm (if not installed)
npm install -g pnpm

# 6. Install dependencies
pnpm install
```

**🔧 Configure Vite** (packages/model-vue/vite.config.js):
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
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
        }
      }
    }
  }
})
```

**📦 Update package.json** (packages/model-vue/package.json):
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
      "require": "./dist/vxg.cjs.js"
    }
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "peerDependencies": {
    "vue": "^3.3.0",
    "vuetify": "^3.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.0.0",
    "vue": "^3.3.0",
    "vuetify": "^3.4.0"
  },
  "dependencies": {
    "dayjs": "^1.11.10"
  }
}
```

**📋 Checklist**:
- [ ] Monorepo structure created
- [ ] Workspaces configured (pnpm/yarn)
- [ ] Vite config working
- [ ] Both versions build successfully
- [ ] Git repository updated

---

## 🎯 Week 2-3: First Component Migration

### Practice with Simple Component

**Choose**: BasicLed or BasicFoot (simplest components)

**Steps**:

1. **Copy component to Vue 3 package**:
```bash
cp packages/model-vue-v2/src/components/BasicLed.vue \
   packages/model-vue/src/components/BasicLed.vue
```

2. **Convert to Composition API**:
```vue
<!-- Before (Vue 2) -->
<script>
export default {
  name: 'BasicLed',
  data() {
    return {
      localState: ''
    }
  },
  computed: {
    items() {
      return this.$store.state.items
    }
  },
  methods: {
    handleClick() {
      this.$store.dispatch('action')
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<!-- After (Vue 3) -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// Local state
const localState = ref('')

// Computed
const items = computed(() => store.state.items)

// Methods
const handleClick = () => {
  store.dispatch('action')
}

// Lifecycle
onMounted(() => {
  init()
})
</script>
```

3. **Create composable for shared logic**:
```typescript
// packages/model-vue/src/composables/useVxgStore.ts
import { computed } from 'vue'
import { useStore } from 'vuex'

export function useVxgStore() {
  const store = useStore()
  
  const vxgState = computed(() => store.state.vxg)
  
  const componentState = (name: string) => 
    computed(() => store.state.vxg?.cmp?.[name])
  
  const setComponentFlags = (name: string, flags: any) => {
    store.dispatch('set_cmp_flags', { name, flags })
  }
  
  return {
    vxgState,
    componentState,
    setComponentFlags
  }
}
```

4. **Write test**:
```typescript
// packages/model-vue/src/components/__tests__/BasicLed.spec.ts
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import BasicLed from '../BasicLed.vue'

describe('BasicLed', () => {
  it('renders correctly', () => {
    const wrapper = mount(BasicLed, {
      global: {
        plugins: [createVuetify()]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
```

5. **Test build**:
```bash
cd packages/model-vue
npm run build

# Verify outputs
ls -la dist/
# Should see: vxg.es.js, vxg.umd.js, vxg.cjs.js
```

**📋 Checklist**:
- [ ] First component migrated
- [ ] Composables created
- [ ] Tests passing
- [ ] Build working

---

## 🔄 Week 4-11: Migrate All Components

### Migration Priority

**Week 4-5: Simple Components**
- [ ] BasicLed
- [ ] BasicFoot
- [ ] BasicFieldPick

**Week 6-7: Medium Components**
- [ ] BasicAuth
- [ ] BasicAdmin
- [ ] BasicSide
- [ ] BasicMain

**Week 8-11: Complex Components**
- [ ] BasicHead (1100 lines - split into sub-components)
- [ ] BasicNavStages (392 lines)

### Tips

**Use Cursor AI** to speed up conversion:
- 60-70% time reduction for simple components
- 40-50% reduction for complex components

**Pattern**:
1. Convert one component at a time
2. Test immediately
3. Commit after each component
4. Don't batch migrations

---

## 🧪 Week 12-15: Testing & Documentation

### Alpha Release Checklist

**Code Complete**:
- [ ] All 9 components migrated
- [ ] All composables extracted
- [ ] TypeScript definitions complete
- [ ] Unit tests passing (>80% coverage)

**Dependencies**:
- [ ] Vuetify 3 integration working
- [ ] Day.js replaces Moment.js (-70KB bundle!)
- [ ] Tree-shakeable exports working

**Documentation**:
- [ ] Migration guide complete
- [ ] API documentation updated
- [ ] Component examples working
- [ ] README updated

**Build & Publish**:
- [ ] Build produces valid outputs
- [ ] Tree-shaking verified
- [ ] npm publish --tag alpha
- [ ] Version: 1.0.0-alpha.1

---

## 📦 Publishing Strategy

### Alpha Release (Week 15)

```bash
cd packages/model-vue
npm version 1.0.0-alpha.1
npm publish --tag alpha

# Consumers install with:
npm install @plantquest/model-vue@alpha
```

### Beta Release (Week 18)

After pqs-frontend testing and bug fixes:

```bash
npm version 1.0.0-beta.1
npm publish --tag beta
```

### Stable Release (Week 20)

After production testing:

```bash
npm version 1.0.0
npm publish --tag latest
```

---

## 🔗 Coordinate with pqs-frontend

### Communication Plan

**Week 1**: Notify pqs-frontend team of migration start
**Week 10**: Share alpha build for early testing
**Week 15**: Release alpha, request integration testing
**Week 16-17**: Joint bug fixing
**Week 18**: Beta release
**Week 19-20**: Final testing, stable release

### Integration Testing

pqs-frontend should test:
- [ ] All model-vue components render correctly
- [ ] State management integration works
- [ ] No regressions in functionality
- [ ] Performance maintained or improved
- [ ] Bundle size impact acceptable

---

## 🚨 Common Pitfalls to Avoid

### ❌ Don't Do This

1. **Breaking all consumers at once**
   - ✅ Instead: Maintain Vue 2 version during transition

2. **Big bang migration**
   - ✅ Instead: Migrate one component at a time

3. **Ignoring TypeScript**
   - ✅ Instead: Add TypeScript from the start

4. **No tests**
   - ✅ Instead: Write tests as you migrate

5. **Skipping documentation**
   - ✅ Instead: Document as you go

---

## 📊 Success Metrics

### Phase 1 Complete
- ✅ Dual build working
- ✅ Can publish both versions

### Phase 2 Complete
- ✅ All components migrated
- ✅ Tests passing
- ✅ Build size reasonable

### Phase 3 Complete
- ✅ Alpha released
- ✅ Documentation complete
- ✅ pqs-frontend testing started

### Project Complete
- ✅ Stable v1.0.0 released
- ✅ pqs-frontend migrated
- ✅ No P0/P1 bugs
- ✅ Performance improved

---

## 🆘 Need Help?

### Resources

- **Full Plan**: DEC-MODEL-VUE-002-vue3-migration-plan.md
- **Comparison**: LIBRARY-VS-APP-MIGRATION.md
- **Vue 3 Docs**: https://v3-migration.vuejs.org/
- **Vuetify 3**: https://vuetifyjs.com/en/getting-started/upgrade-guide/
- **Vite Library Mode**: https://vitejs.dev/guide/build.html#library-mode

### Questions to Ask

- How do we handle state management coupling?
- Should we support both Vuex and Pinia?
- What's our backward compatibility policy?
- When do we deprecate Vue 2 version?

---

## 🎯 Quick Decision Points

Need to decide early:

1. **Monorepo vs. Separate Repos?**
   - ✅ Recommend: Monorepo (easier to maintain)

2. **Vuex, Pinia, or Both?**
   - ✅ Recommend: Support both via adapter pattern

3. **TypeScript from Start?**
   - ✅ Recommend: Yes (better DX, prevents bugs)

4. **Maintain Vue 2 for How Long?**
   - ✅ Recommend: 12 months after Vue 3 release

5. **Tree-Shakeable Exports?**
   - ✅ Recommend: Yes (big bundle size win)

---

## ✅ Next Action

**Right now**:
1. Read DEC-MODEL-VUE-002-vue3-migration-plan.md (full plan)
2. Read PARALLEL-AGENT-GUIDE.md (execution guide)
3. Approve budget ($30-40K) and timeline (6-8 weeks)
4. Allocate 1 senior Vue developer (full-time)
5. Setup 4 Cursor IDE instances for parallel agents

**Day 1**:
- Create 4 git branches (agent-1, agent-2, agent-3, agent-4)
- Open 4 Cursor windows on different branches
- Define migration patterns (.cursor/MIGRATION-PATTERNS.md)
- Kick off all 4 agents simultaneously

**Week 1**:
- 4 agents setup infrastructure in parallel
- Senior dev reviews and merges daily
- By end of week: Monorepo working, build system ready

**Week 2-3** (THE BIG WIN):
- Agent 1: 3 simple components
- Agent 2: 3 medium components  
- Agent 3: BasicNavStages (split & migrate)
- Agent 4: BasicHead (split & migrate) + BasicMain
- **All 9 components done in 2-3 weeks!** 🚀 (vs 8-10 weeks sequential)

**Week 4-5**:
- 4 agents handle ecosystem in parallel
- Alpha release by end of week 5

**Week 6-8**:
- Consumer testing (pqs-frontend)
- Bug fixes with agent assistance
- Stable v1.0.0 release

---

**Let's get started! 🚀**

**Pro Tip**: The PARALLEL-AGENT-GUIDE.md has exact prompts for each agent on each day. Follow it step-by-step for maximum efficiency.

