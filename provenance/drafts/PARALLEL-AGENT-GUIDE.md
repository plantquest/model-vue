# Parallel Cursor Agent Orchestration Guide

**For**: model-vue Vue 3 Migration  
**Approach**: 1 Senior Dev + 3-4 Cursor Agents in Parallel  
**Duration**: 6-8 weeks (vs 16-22 weeks manual)

---

## 🎯 Quick Overview

**What**: Run 3-4 Cursor agents simultaneously on different tasks  
**Who**: 1 senior dev orchestrates + reviews + merges  
**Why**: 3-4x faster than sequential, 70-75% cost reduction  
**Result**: All 9 components migrated in 2-3 weeks instead of 8-10 weeks

---

## 🚀 Day 1: Setup (2-3 hours)

### Step 1: Create Branch Structure

```bash
# From main branch
git checkout -b agent-1-simple-components
git push -u origin agent-1-simple-components

git checkout main
git checkout -b agent-2-medium-components
git push -u origin agent-2-medium-components

git checkout main
git checkout -b agent-3-complex-components
git push -u origin agent-3-complex-components

git checkout main
git checkout -b agent-4-head-testing-docs
git push -u origin agent-4-head-testing-docs
```

### Step 2: Open 4 Cursor Windows

**Window 1** (Agent 1):
```bash
cd /path/to/model-vue
git checkout agent-1-simple-components
# Open Cursor in this window
```

**Window 2** (Agent 2):
```bash
cd /path/to/model-vue
git checkout agent-2-medium-components
# Open Cursor in this window
```

**Window 3** (Agent 3):
```bash
cd /path/to/model-vue
git checkout agent-3-complex-components
# Open Cursor in this window
```

**Window 4** (Agent 4):
```bash
cd /path/to/model-vue
git checkout agent-4-head-testing-docs
# Open Cursor in this window
```

### Step 3: Define Standards (Senior Dev)

Create pattern documents that all agents will follow:

**File: `.cursor/MIGRATION-PATTERNS.md`**
```markdown
# Vue 3 Migration Patterns

## Component Conversion Template

### Before (Vue 2)
```vue
<script>
export default {
  name: 'ComponentName',
  data() { return { count: 0 } },
  computed: { double() { return this.count * 2 } },
  methods: { increment() { this.count++ } },
  mounted() { this.init() }
}
</script>
```

### After (Vue 3)
```vue
<script setup>
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
const increment = () => { count.value++ }

onMounted(() => {
  init()
})
</script>
```

## Required: Use Composables

Always extract store logic to composables:
```typescript
import { useVxgStore } from '@/composables/useVxgStore'
const { componentState, setComponentFlags } = useVxgStore()
```

## Required: TypeScript

All new code must use TypeScript with proper types.

## Required: Tests

Each component must have >80% test coverage.
```

---

## 📋 Week 1: Infrastructure Setup (Parallel)

### Agent 1 Task: Repository Structure

**Prompt for Agent 1**:
```
Create monorepo structure for Vue 2 and Vue 3 versions:

1. Create packages/model-vue-v2/ directory
2. Move all current src/ files to packages/model-vue-v2/src/
3. Copy package.json to packages/model-vue-v2/package.json
4. Update name to "@plantquest/model-vue-v2"

5. Create packages/model-vue/ directory for Vue 3
6. Setup packages/model-vue/package.json for Vue 3
   - Use vue@^3.3.0
   - Use vuetify@^3.4.0
   - Add dayjs instead of moment

7. Create root package.json with workspaces
8. Create pnpm-workspace.yaml

Deliverable: Monorepo structure with both versions
```

### Agent 2 Task: Build Configuration

**Prompt for Agent 2**:
```
Setup Vite build system for Vue 3 package:

1. Create packages/model-vue/vite.config.js
   - Configure library mode
   - Entry: src/index.ts
   - Outputs: ESM, UMD, CJS
   - External: vue, vuetify
   - Name: Vxg

2. Create packages/model-vue/tsconfig.json
   - Target: ES2020
   - Module: ESNext
   - Include: src/**/*

3. Add build scripts to package.json
4. Test build produces valid outputs

Deliverable: Working Vite build that produces dist/vxg.es.js, dist/vxg.umd.js, dist/vxg.cjs.js
```

### Agent 3 Task: TypeScript & Composables

**Prompt for Agent 3**:
```
Setup TypeScript infrastructure and composables:

1. Create packages/model-vue/src/types/index.ts
   - Define VxgConfig interface
   - Define VxgState interface
   - Define component prop types
   - Augment Vue types for $vxg

2. Create packages/model-vue/src/composables/useVxgStore.ts
   - Function to access vxg store state
   - Function to get component state
   - Function to set component flags

3. Create packages/model-vue/src/composables/useVxgPermissions.ts
   - Function to check permissions
   - Function to check visibility

4. Create packages/model-vue/src/composables/index.ts
   - Export all composables

Deliverable: TypeScript types and composable templates ready
```

### Agent 4 Task: Testing Infrastructure

**Prompt for Agent 4**:
```
Setup testing infrastructure:

1. Install Vitest and Vue Test Utils for Vue 3
   - @vue/test-utils@next
   - vitest
   - @vitest/ui

2. Create vitest.config.ts
   - Configure test environment
   - Setup coverage reporting
   - Configure globals

3. Create test template at src/components/__tests__/Component.spec.ts
   - Example test structure
   - Vuetify 3 setup
   - Store mock setup

4. Create test utilities at src/test-utils/index.ts
   - createWrapper helper
   - mockStore helper

Deliverable: Testing framework ready with example test
```

### Senior Dev: Daily Review (End of Week 1)

**Review Checklist**:
- [ ] Agent 1: Monorepo builds successfully?
- [ ] Agent 2: Vite outputs valid files?
- [ ] Agent 3: TypeScript compiles without errors?
- [ ] Agent 4: Tests run and pass?
- [ ] Merge all approved changes to main
- [ ] All agents pull latest main

**Integration Test**:
```bash
git checkout main
pnpm install
pnpm build
# Verify both packages build
```

---

## 📋 Week 2-3: Component Migration (MASSIVE PARALLEL)

### Agent 1: Simple Components (3 components)

**Day 1 - BasicLed.vue**:
```
Migrate BasicLed.vue to Vue 3:

1. Copy from packages/model-vue-v2/src/components/BasicLed.vue
2. Convert to Composition API using <script setup>
3. Use useVxgStore composable for store access
4. Add TypeScript types for props
5. Update Vuetify 2 → Vuetify 3 syntax
6. Write tests at __tests__/BasicLed.spec.ts
7. Verify tests pass (>80% coverage)

Deliverable: BasicLed.vue fully migrated and tested

When complete, commit with message:
"[Agent 1] BasicLed migration complete - tests passing"
```

**Day 2 - BasicFoot.vue**: (Similar prompt)

**Day 3 - BasicFieldPick.vue**: (Similar prompt)

### Agent 2: Medium Components (3 components)

**Day 1 - BasicAuth.vue**:
```
Migrate BasicAuth.vue to Vue 3:

1. Copy from packages/model-vue-v2/src/components/BasicAuth.vue
2. Convert to Composition API
3. Handle Kinde auth integration
4. Use composables for state management
5. Add TypeScript types
6. Update Vuetify syntax
7. Write comprehensive tests (auth flows)

Deliverable: BasicAuth.vue migrated with auth tests
```

**Day 2-3**: BasicAdmin.vue, BasicSide.vue (similar process)

### Agent 3: Complex Component - BasicNavStages

**Day 1-2 - Split Component**:
```
Split BasicNavStages.vue (392 lines) into smaller components:

1. Create NavStagesExpansion.vue
   - Handles expansion panel UI
   - Props: stages, activeStage
   - Events: stage-selected

2. Create NavStageItem.vue
   - Single stage item UI
   - Props: stage, isActive
   - Events: click

3. Create useNavStagesLogic.ts composable
   - Route parsing logic
   - Stage selection logic
   - Map name resolution

4. Update BasicNavStages.vue to use sub-components
   - Import sub-components
   - Use composable for logic
   - Maintain same external API

Deliverable: BasicNavStages split into 3 files with same functionality
```

**Day 3-4 - Convert to Vue 3**:
```
Convert split BasicNavStages to Vue 3:

1. Convert all sub-components to Composition API
2. Use useVxgStore for store access
3. Update Vuetify 3 syntax
4. Add TypeScript types
5. Write tests for each sub-component
6. Write integration test for full component

Deliverable: BasicNavStages fully migrated and tested
```

### Agent 4: Complex Component - BasicHead

**Day 1-3 - Split Component**:
```
Split BasicHead.vue (1100+ lines!) into manageable pieces:

1. Create HeadToolbar.vue
   - Toolbar actions (add, remove, etc.)
   - Props: tools, permissions
   - Events: action-clicked

2. Create HeadSearch.vue
   - Search combobox
   - MiniSearch integration
   - Props: items, searchConfig
   - Events: search-changed

3. Create useHeadSearch.ts composable
   - MiniSearch setup
   - Search logic
   - Tag filtering

4. Create useHeadActions.ts composable
   - Action handlers
   - Store dispatches

5. Update BasicHead.vue to orchestrate sub-components
   - Much simpler main component
   - Delegates to sub-components

Deliverable: BasicHead split into 5 files
```

**Day 4-5 - Convert to Vue 3**:
```
Convert split BasicHead to Vue 3:

1. Convert all sub-components to Composition API
2. Migrate MiniSearch integration
3. Update Vuetify 3 syntax (v-combobox changes)
4. Add TypeScript types throughout
5. Write tests for each sub-component
6. Test search functionality end-to-end

Deliverable: BasicHead fully migrated and tested

THEN: Migrate BasicMain.vue (simpler, ~300 lines)
```

### Senior Dev: Daily Review Cycle

**Morning (9-10am)**:
```bash
# Check Agent 1
git checkout agent-1-simple-components
git pull
# Review code, run tests, approve or request changes

# Check Agent 2
git checkout agent-2-medium-components
git pull
# Review code, run tests, approve or request changes

# ... repeat for Agent 3 and 4
```

**Midday (12-1pm)**:
```bash
# Merge approved work
git checkout main
git merge agent-1-simple-components  # If approved
git merge agent-2-medium-components  # If approved
git push

# Notify agents to pull latest
```

**End of Day (5pm)**:
```bash
# Run full integration test
pnpm install
pnpm build
pnpm test

# Deploy to test environment
# Review overall progress
```

---

## 📊 Progress Tracking

### Component Migration Checklist

**Agent 1 (Simple)**:
- [ ] Day 1: BasicLed.vue - DONE
- [ ] Day 2: BasicFoot.vue - DONE
- [ ] Day 3: BasicFieldPick.vue - DONE

**Agent 2 (Medium)**:
- [ ] Day 1: BasicAuth.vue - DONE
- [ ] Day 2: BasicAdmin.vue - DONE
- [ ] Day 3: BasicSide.vue - DONE

**Agent 3 (Complex)**:
- [ ] Day 1-2: Split BasicNavStages - DONE
- [ ] Day 3-4: Migrate BasicNavStages - DONE

**Agent 4 (Most Complex)**:
- [ ] Day 1-3: Split BasicHead - DONE
- [ ] Day 4-5: Migrate BasicHead - DONE
- [ ] Day 6: Migrate BasicMain - DONE

**Total**: 9 components in ~2-3 weeks (vs 8-10 weeks sequential)

---

## 🔄 Week 4-5: Ecosystem (Parallel)

### Agent 1: Vuetify 3 Migration

**Prompt**:
```
Update all components from Vuetify 2 to Vuetify 3:

1. Update all v-btn: outlined → variant="outlined"
2. Update all v-icon: icon content → icon="mdi-*" prop
3. Update color system: color="primary" still works
4. Update v-expansion-panels syntax changes
5. Test each component with Vuetify 3
6. Document breaking changes

Deliverable: All components working with Vuetify 3
```

### Agent 2: Day.js & Tree-Shaking

**Prompt**:
```
1. Replace all Moment.js imports with Day.js
   - Find all moment() calls
   - Replace with dayjs()
   - Setup plugins (relativeTime, etc.)
   
2. Setup tree-shakeable exports in src/index.ts
   - Export plugin (Vxg)
   - Export individual components
   - Export composables
   - Export types

3. Verify bundle size reduction
4. Test tree-shaking works

Deliverable: 70KB reduction, tree-shaking verified
```

### Agent 3: Testing & Integration

**Prompt**:
```
1. Write integration tests
   - Test with Vuex consumer
   - Test with Pinia consumer
   - Test component interactions

2. Setup CI/CD pipeline
   - GitHub Actions workflow
   - Run tests on PR
   - Run build verification

3. Run full regression suite
4. Document test coverage

Deliverable: >80% test coverage, CI/CD working
```

### Agent 4: Documentation & Publishing

**Prompt**:
```
1. Write MIGRATION.md guide
   - Breaking changes
   - Installation steps
   - Component-by-component changes
   - Examples

2. Update README.md
   - Vue 3 installation
   - Usage examples
   - Tree-shakeable imports

3. Create API documentation
   - Component props
   - Events
   - Composables

4. Prepare alpha release
   - Update CHANGELOG.md
   - Version bump to 1.0.0-alpha.1
   - Create release notes

Deliverable: Complete documentation, alpha ready
```

---

## 🎯 Success Metrics

### Week 1 Complete:
- ✅ Monorepo functional
- ✅ All 4 agents productive
- ✅ Build system working
- ✅ TypeScript compiling
- ✅ Tests running

### Week 2-3 Complete:
- ✅ All 9 components migrated (PARALLEL!)
- ✅ Tests passing (>80% coverage)
- ✅ Components split appropriately
- ✅ Composables extracted
- ✅ TypeScript throughout

### Week 4-5 Complete:
- ✅ Vuetify 3 integrated
- ✅ Day.js replaces Moment (-70KB)
- ✅ Tree-shaking works
- ✅ Documentation complete
- ✅ Alpha published (v1.0.0-alpha.1)

### Week 6-8: Consumer Testing
- ✅ pqs-frontend testing alpha
- ✅ Bug fixes applied
- ✅ Beta published
- ✅ Stable v1.0.0 released

---

## 💬 Agent Communication Template

### Daily Standup Format (Via Commit Messages)

```bash
git commit -m "
[Agent 1] BasicLed migration - Day 1 complete

✅ DONE:
- Converted to Composition API
- Added useVxgStore composable
- Tests written (92% coverage)
- Tests passing

⚠️ NEEDS REVIEW:
- Line 45: Should we use computed() or ref() here?
- Store integration pattern - is this correct?

📝 NOTES:
- Pattern works well, will apply to BasicFoot
- Found minor Vuetify 3 breaking change in v-data-table

⏳ NEXT:
- BasicFoot.vue migration (Day 2)

@senior-dev please review store pattern before I continue
"
```

### Senior Dev Review Template

```markdown
## Agent 1 Review - BasicLed

✅ **APPROVED FOR MERGE**

Excellent work! Changes look good:
- Composition API conversion: ✅ Correct
- Composable usage: ✅ Good pattern
- Tests: ✅ Comprehensive (92% coverage)
- TypeScript: ✅ Types complete

💡 **MINOR SUGGESTION**:
- Line 45: Use computed() for derived values
- This pattern should be used for all components

🎯 **NEXT STEPS**:
- Apply same pattern to BasicFoot
- Merge approved, pull latest main

**Merge Command**:
```bash
git checkout main
git merge agent-1-simple-components
git push
```

**Agent 1: Pull latest and continue with BasicFoot**
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: Merge Conflicts

**Problem**: Two agents modified same composable

**Solution**:
```bash
# Senior dev resolves
git checkout main
git merge agent-1-simple-components
# Conflict in useVxgStore.ts

# Choose best implementation or merge both
# Test that it works
git commit
git push

# Notify agents
# Agent 2, Agent 3: pull latest main
```

### Issue 2: Agent Blocked

**Problem**: Agent 3 can't proceed without Agent 2's composable

**Solution**:
```bash
# Temporarily merge Agent 2's work
git checkout main
git merge agent-2-medium-components
git push

# Agent 3 pulls and continues
git checkout agent-3-complex-components
git pull origin main
# Now has composable, can continue
```

### Issue 3: Pattern Mismatch

**Problem**: Agents using different patterns

**Solution**:
1. Stop all agents
2. Senior dev defines canonical pattern
3. Update .cursor/MIGRATION-PATTERNS.md
4. All agents pull and follow new pattern
5. Resume work

---

## 🎉 Final Checklist

### Before Publishing Alpha

- [ ] All 9 components migrated
- [ ] All tests passing (>80% coverage)
- [ ] Build produces valid outputs
- [ ] TypeScript compiles without errors
- [ ] Documentation complete
- [ ] Migration guide written
- [ ] Changelog updated
- [ ] Version bumped to 1.0.0-alpha.1
- [ ] npm publish --tag alpha successful
- [ ] pqs-frontend team notified

---

## 📞 Quick Reference Commands

```bash
# Check progress across all agents
git checkout agent-1-simple-components && git pull && echo "Agent 1 latest"
git checkout agent-2-medium-components && git pull && echo "Agent 2 latest"
git checkout agent-3-complex-components && git pull && echo "Agent 3 latest"
git checkout agent-4-head-testing-docs && git pull && echo "Agent 4 latest"

# Merge all approved work
git checkout main
git merge agent-1-simple-components
git merge agent-2-medium-components  
git merge agent-3-complex-components
git merge agent-4-head-testing-docs
git push

# Run full test suite
pnpm install
pnpm build
pnpm test

# Publish alpha
cd packages/model-vue
npm version 1.0.0-alpha.1
npm publish --tag alpha
```

---

**Result**: Complete Vue 3 migration in 6-8 weeks with 3-4x speedup! 🚀
