# Week 1 Task Assignments - Vue 3.0 Migration

**Week**: 1 of 11  
**Phase**: Infrastructure Setup  
**Duration**: Feb 17-21, 2026 (5 days)  
**Goal**: Complete foundation for Vue 3 migration  

---

## Overview

Week 1 establishes the infrastructure foundation for the entire migration. All 4 tasks must complete successfully before Week 2 component migration can begin.

**Success Criteria**:
- ✅ Monorepo structure working
- ✅ Vue 3 builds successfully (ESM/UMD/CJS)
- ✅ TypeScript compiling without errors
- ✅ Test framework running
- ✅ All 4 agents' work integrated

---

## Task 1.1: Monorepo Structure Setup

**Assigned To**: fullstack-coder  
**Duration**: 2-3 days  
**Branch**: `feature/week1-monorepo-setup`  
**Priority**: 🔴 CRITICAL (blocks all other work)

### Description
Create monorepo structure to maintain both Vue 2 (v0.x maintenance) and Vue 3 (v1.x active) versions during transition period.

### Tasks
1. **Create monorepo structure**:
   ```
   @plantquest/model-vue/
   ├── packages/
   │   ├── model-vue/              # Vue 3 version (v1.0.0-alpha)
   │   │   ├── package.json
   │   │   ├── src/
   │   │   ├── dist/
   │   │   └── README.md
   │   │
   │   └── model-vue-v2/           # Vue 2 version (v0.18.x)
   │       ├── package.json
   │       ├── src/
   │       ├── dist/
   │       └── README.md
   │
   ├── pnpm-workspace.yaml
   ├── package.json (root)
   └── README.md
   ```

2. **Setup pnpm workspaces**:
   ```yaml
   # pnpm-workspace.yaml
   packages:
     - 'packages/*'
   ```

3. **Configure root package.json**:
   ```json
   {
     "name": "@plantquest/model-vue-workspace",
     "private": true,
     "workspaces": [
       "packages/*"
     ],
     "scripts": {
       "build:all": "pnpm -r build",
       "test:all": "pnpm -r test"
     }
   }
   ```

4. **Copy Vue 2 code to maintenance package**:
   - Move current `src/` to `packages/model-vue-v2/src/`
   - Update package.json to `@plantquest/model-vue-v2`
   - Set version to `0.18.240`
   - Keep existing Vue CLI build

5. **Create Vue 3 package skeleton**:
   - Create `packages/model-vue/src/` structure
   - Setup package.json with `@plantquest/model-vue`
   - Set version to `1.0.0-alpha.1`
   - Add Vue 3 peer dependencies

### Acceptance Criteria
- [ ] Monorepo structure created successfully
- [ ] pnpm workspaces configured
- [ ] Vue 2 version still builds: `cd packages/model-vue-v2 && npm run vue-build`
- [ ] Vue 3 package structure ready
- [ ] `pnpm install` works at root
- [ ] No broken dependencies

### Deliverables
- `pnpm-workspace.yaml`
- `packages/model-vue/package.json`
- `packages/model-vue-v2/package.json`
- Updated root `package.json`
- Both packages have separate `README.md`

### Dependencies
**None** - First task, can start immediately

### Risks & Mitigations
- ⚠️ **Risk**: pnpm workspace conflicts
  - **Mitigation**: Test `pnpm install` after each change
- ⚠️ **Risk**: Breaking Vue 2 build
  - **Mitigation**: Verify Vue 2 build still works before committing

---

## Task 1.2: Vite Build System Configuration

**Assigned To**: fullstack-coder  
**Duration**: 2-3 days  
**Branch**: `feature/week1-vite-build`  
**Priority**: 🔴 HIGH (enables development workflow)

### Description
Configure Vite for library mode to produce optimized ESM, UMD, and CJS outputs for the Vue 3 package.

### Dependencies
- 🔗 **Requires**: Task 1.1 (Monorepo) must be complete

### Tasks
1. **Install Vite and plugins**:
   ```bash
   cd packages/model-vue
   pnpm add -D vite @vitejs/plugin-vue
   ```

2. **Create vite.config.js**:
   ```javascript
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
         external: ['vue', 'vuetify', 'vue-router', 'vuex'],
         output: {
           globals: {
             vue: 'Vue',
             vuetify: 'Vuetify',
             'vue-router': 'VueRouter',
             vuex: 'Vuex'
           },
           exports: 'named'
         }
       }
     }
   })
   ```

3. **Update package.json exports**:
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
     "files": ["dist", "src"]
   }
   ```

4. **Create initial src/index.js**:
   ```javascript
   // Temporary placeholder for testing build
   export const version = '1.0.0-alpha.1'
   export default {
     install(app, options) {
       console.log('Vxg Vue 3 plugin installed')
     }
   }
   ```

5. **Test all build outputs**:
   ```bash
   pnpm build
   ls -la dist/
   # Should see: vxg.es.js, vxg.umd.js, vxg.cjs.js
   ```

### Acceptance Criteria
- [ ] Vite configuration created
- [ ] Build produces 3 formats: ESM, UMD, CJS
- [ ] External dependencies not bundled (vue, vuetify)
- [ ] Build outputs are valid JavaScript
- [ ] Package.json exports configured correctly
- [ ] `pnpm build` command works

### Deliverables
- `packages/model-vue/vite.config.js`
- `packages/model-vue/src/index.js` (placeholder)
- `packages/model-vue/dist/` (build outputs)
- Updated `package.json` with build scripts

### Risks & Mitigations
- ⚠️ **Risk**: Vite config complexity
  - **Mitigation**: Use standard library mode pattern from Vite docs
- ⚠️ **Risk**: External dependencies bundled incorrectly
  - **Mitigation**: Test build output size (<50KB without deps)

---

## Task 1.3: TypeScript Configuration

**Assigned To**: fullstack-coder  
**Duration**: 2-3 days  
**Branch**: `feature/week1-typescript-setup`  
**Priority**: 🟡 MEDIUM (enables type safety)

### Description
Setup TypeScript for type definitions, composables, and Vue component props. This provides IntelliSense and prevents bugs.

### Dependencies
- 🔗 **Requires**: Task 1.1 (Monorepo) must be complete

### Tasks
1. **Install TypeScript dependencies**:
   ```bash
   cd packages/model-vue
   pnpm add -D typescript vue-tsc @types/node
   ```

2. **Create tsconfig.json**:
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "ESNext",
       "lib": ["ES2020", "DOM"],
       "moduleResolution": "bundler",
       "declaration": true,
       "declarationDir": "./dist/types",
       "emitDeclarationOnly": true,
       "strict": true,
       "skipLibCheck": true,
       "jsx": "preserve"
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist"]
   }
   ```

3. **Create type definition structure**:
   ```
   packages/model-vue/src/types/
   ├── index.ts          # Main exports
   ├── vxg.ts            # Vxg class types
   ├── components.ts     # Component prop types
   └── composables.ts    # Composable return types
   ```

4. **Create initial type definitions**:
   ```typescript
   // src/types/vxg.ts
   import { App, Plugin } from 'vue'

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
   }

   export class Vxg implements Plugin {
     install(app: App, options?: VxgConfig): void
   }
   ```

5. **Setup Vue type augmentation**:
   ```typescript
   // src/types/vue-augmentation.ts
   import { Vxg } from './vxg'

   declare module 'vue' {
     interface ComponentCustomProperties {
       $vxg: Vxg
     }
   }

   declare module '@vue/runtime-core' {
     export interface GlobalComponents {
       VxgBasicHead: typeof import('../components/BasicHead.vue').default
       VxgBasicSide: typeof import('../components/BasicSide.vue').default
       // More components will be added in Week 2-3
     }
   }
   ```

6. **Add TypeScript build to package.json**:
   ```json
   {
     "scripts": {
       "build": "vite build && vue-tsc --declaration --emitDeclarationOnly",
       "type-check": "vue-tsc --noEmit"
     }
   }
   ```

### Acceptance Criteria
- [ ] TypeScript configuration created
- [ ] Type definitions compile without errors
- [ ] `dist/types/` directory generated
- [ ] Vue augmentation working
- [ ] IntelliSense works for Vxg types
- [ ] `pnpm type-check` passes

### Deliverables
- `tsconfig.json`
- `src/types/index.ts`
- `src/types/vxg.ts`
- `src/types/components.ts`
- `src/types/composables.ts`
- `src/types/vue-augmentation.ts`
- `dist/types/` (generated)

### Risks & Mitigations
- ⚠️ **Risk**: TypeScript configuration complexity
  - **Mitigation**: Start with strict: false, enable gradually
- ⚠️ **Risk**: Vue 3 type compatibility issues
  - **Mitigation**: Use @vue/runtime-core augmentation pattern

---

## Task 1.4: Vitest Testing Infrastructure

**Assigned To**: fullstack-coder  
**Duration**: 2-3 days  
**Branch**: `feature/week1-vitest-setup`  
**Priority**: 🟡 MEDIUM (enables quality assurance)

### Description
Setup Vitest with Vue Test Utils v3 for component testing. Must achieve >80% coverage requirement from SPEC-000002.

### Dependencies
- 🔗 **Requires**: Task 1.1 (Monorepo) must be complete
- 🔗 **Requires**: Task 1.3 (TypeScript) for type safety in tests

### Tasks
1. **Install Vitest and testing utilities**:
   ```bash
   cd packages/model-vue
   pnpm add -D vitest @vue/test-utils@next jsdom @vitest/ui @vitest/coverage-v8
   ```

2. **Create vitest.config.js**:
   ```javascript
   import { defineConfig } from 'vitest/config'
   import vue from '@vitejs/plugin-vue'

   export default defineConfig({
     plugins: [vue()],
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: ['./src/__tests__/setup.ts'],
       coverage: {
         provider: 'v8',
         reporter: ['text', 'html', 'lcov'],
         include: ['src/**/*.{js,ts,vue}'],
         exclude: ['src/__tests__/**', '**/*.spec.ts'],
         threshold: {
           lines: 80,
           functions: 80,
           branches: 80,
           statements: 80
         }
       }
     }
   })
   ```

3. **Create test setup file**:
   ```typescript
   // src/__tests__/setup.ts
   import { config } from '@vue/test-utils'
   import { vi } from 'vitest'

   // Mock Vuetify (will be properly configured in Week 4)
   config.global.stubs = {
     VBtn: true,
     VIcon: true,
     VNavigationDrawer: true,
     VAppBar: true
   }

   // Mock Vue Router
   config.global.mocks = {
     $router: {
       push: vi.fn(),
       replace: vi.fn()
     },
     $route: {
       params: {},
       query: {}
     }
   }
   ```

4. **Create test templates**:
   ```typescript
   // src/__tests__/example.spec.ts
   import { describe, it, expect } from 'vitest'
   import { mount } from '@vue/test-utils'

   describe('Example Test', () => {
     it('should pass', () => {
       expect(true).toBe(true)
     })
   })
   ```

5. **Add test scripts to package.json**:
   ```json
   {
     "scripts": {
       "test": "vitest",
       "test:ui": "vitest --ui",
       "test:coverage": "vitest --coverage",
       "test:run": "vitest run"
     }
   }
   ```

6. **Create test documentation**:
   Create `.cursor/TEST-TEMPLATES.md` with patterns for:
   - Component testing
   - Composable testing
   - Integration testing

### Acceptance Criteria
- [ ] Vitest configuration created
- [ ] Test setup file working
- [ ] Sample test passes
- [ ] Coverage reporting configured
- [ ] Coverage thresholds set to 80%
- [ ] `pnpm test` command works
- [ ] Test UI accessible via `pnpm test:ui`

### Deliverables
- `vitest.config.js`
- `src/__tests__/setup.ts`
- `src/__tests__/example.spec.ts`
- `.cursor/TEST-TEMPLATES.md`
- Updated `package.json` with test scripts

### Risks & Mitigations
- ⚠️ **Risk**: jsdom compatibility issues
  - **Mitigation**: Use latest @vue/test-utils@next
- ⚠️ **Risk**: Vuetify mocking complexity
  - **Mitigation**: Start with simple stubs, enhance in Week 4

---

## Week 1 Integration & Review

### Daily Schedule

**Daily Review Cycle** (Junior Developer):
- **9:00-10:00 AM**: Review previous day's commits from all agents
- **12:00-1:00 PM**: Merge approved changes, resolve conflicts
- **3:00-5:00 PM**: Integration testing, build validation

**CTO Review Schedule**:
- **Monday**: Review monorepo architecture (2 hours)
- **Wednesday**: Review build & TypeScript configuration (3 hours)
- **Friday**: Review testing setup & approve Week 1 completion (3 hours)

### End of Week 1 Integration Test

**Test Checklist**:
1. [ ] Monorepo installs without errors: `pnpm install`
2. [ ] Vue 2 version still builds: `cd packages/model-vue-v2 && npm run vue-build`
3. [ ] Vue 3 version builds: `cd packages/model-vue && pnpm build`
4. [ ] TypeScript compiles: `cd packages/model-vue && pnpm type-check`
5. [ ] Tests run: `cd packages/model-vue && pnpm test:run`
6. [ ] All 3 build outputs exist: `ls packages/model-vue/dist/`
7. [ ] Type definitions exist: `ls packages/model-vue/dist/types/`

### Success Criteria (Week 1 Complete)
- ✅ All 4 tasks completed
- ✅ Integration test passes
- ✅ CTO approval received
- ✅ Documentation updated
- ✅ Ready for Week 2 component migration

---

## Next Steps (Week 2)

Once Week 1 completes:
1. Create migration patterns document (`.cursor/MIGRATION-PATTERNS.md`)
2. Begin parallel component migration (4 agents)
3. Start with simple components (BasicLed, BasicFoot, BasicFieldPick)

---

**Prepared By**: Team Lead  
**Date**: February 9, 2026  
**Status**: Ready for Agent Assignment  
**Related**: VUE3-MIGRATION-TASK-SPEC.md, DEC-000018, SPEC-000002
