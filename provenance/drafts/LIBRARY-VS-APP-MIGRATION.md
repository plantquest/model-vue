# Library vs. Application Migration: Key Differences

**Date**: 2026-02-06

## Critical Understanding

Migrating **model-vue (library)** to Vue 3 is fundamentally different from migrating **pqs-frontend (application)**.

---

## Comparison Table

| Aspect | model-vue (Library) | pqs-frontend (Application) |
|--------|-------------------|--------------------------|
| **Scope** | 9 components, plugin system | 100+ components, full app |
| **Consumers** | Multiple apps (pqs-frontend, others) | End users only |
| **Breaking Changes** | ⚠️ Affects ALL consumers | ✅ Affects only this app |
| **Version Strategy** | 🔴 MUST maintain both versions | ✅ Direct migration |
| **Timeline** | 12-15 weeks (can't break consumers) | 6-8 weeks (more flexible) |
| **Coordination** | 🔴 MUST coordinate with consumers | ✅ Independent |
| **Rollback** | 🔴 HARD (multiple apps affected) | ✅ EASY (single app) |
| **Testing** | Integration tests with consumers | E2E tests with users |
| **Risk Level** | 🔴 HIGH (library changes affect many) | 🟡 MEDIUM (isolated impact) |

---

## Key Constraint: You Must Migrate Library FIRST

```
┌─────────────────────────────────────────────────────┐
│              MIGRATION SEQUENCE                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Step 1: Migrate model-vue (THIS LIBRARY)          │
│  ├─ Create Vue 3 version                           │
│  ├─ Maintain Vue 2 version                         │
│  ├─ Test with pqs-frontend                         │
│  └─ Release v1.0.0                                  │
│                                                      │
│  Step 2: Migrate pqs-frontend (CONSUMER)           │
│  ├─ Update to model-vue@1.0.0                      │
│  ├─ Migrate application components                 │
│  ├─ Test end-to-end                                │
│  └─ Deploy                                          │
│                                                      │
│  ⚠️  Cannot do Step 2 before Step 1 completes!     │
└─────────────────────────────────────────────────────┘
```

**Why?**
- pqs-frontend **depends** on model-vue
- pqs-frontend can't use Vue 3 while model-vue is Vue 2
- Multiple apps depend on model-vue (coordination needed)

---

## Library-Specific Challenges

### 1. Dual Version Maintenance (Library Only)

**Library**:
```
@plantquest/model-vue-v2@0.18.x (Vue 2) - maintain during transition
@plantquest/model-vue@1.0.0 (Vue 3) - new version
```

**Application**:
- No dual version needed
- Direct migration on single branch
- Simpler deployment

### 2. Backward Compatibility (Critical for Library)

**Library**:
- ⚠️ Can't break existing consumers during migration
- Must maintain API contracts
- Need comprehensive changelog
- Deprecation warnings months in advance

**Application**:
- Can make breaking changes freely
- Only affects internal code
- No external API to maintain

### 3. Build System (More Complex for Library)

**Library**:
```javascript
// Must produce multiple formats
dist/
├── vxg.es.js      // ESM (tree-shakeable)
├── vxg.umd.js     // UMD (browser)
├── vxg.cjs.js     // CommonJS (Node)
└── types/
    └── index.d.ts // TypeScript definitions
```

**Application**:
```javascript
// Single build for deployment
dist/
├── index.html
├── assets/
│   ├── index.js
│   └── index.css
```

### 4. Documentation (More Extensive for Library)

**Library**:
- API documentation
- Migration guide for consumers
- TypeScript definitions
- Component examples (Storybook)
- Integration guides (Vuex, Pinia)

**Application**:
- User documentation
- Internal dev docs
- Deployment guides

---

## Resource Comparison

| Resource | Library Migration | App Migration |
|----------|------------------|---------------|
| **Duration** | 12-15 weeks | 6-8 weeks |
| **Senior Dev** | 1 full-time | 1 full-time |
| **Testing** | Integration + unit | E2E + unit |
| **Coordination** | High (multiple consumers) | Low (single app) |
| **Risk** | 🔴 High | 🟡 Medium |
| **Cost** | ~$75-90K | ~$50-70K |

---

## Testing Differences

### Library Testing (More Complex)

```typescript
// 1. Unit tests (component behavior)
describe('BasicHead', () => {
  it('renders correctly', () => {...})
})

// 2. Integration tests (with Vuex)
describe('BasicHead + Vuex', () => {
  it('reads from store correctly', () => {...})
})

// 3. Integration tests (with Pinia)
describe('BasicHead + Pinia', () => {
  it('works with Pinia store', () => {...})
})

// 4. Consumer integration tests
describe('model-vue in pqs-frontend', () => {
  it('works in real consumer app', () => {...})
})

// 5. Build verification
describe('Build outputs', () => {
  it('produces valid ESM', () => {...})
  it('produces valid UMD', () => {...})
  it('tree-shaking works', () => {...})
})
```

### Application Testing (Simpler)

```typescript
// 1. Unit tests (component behavior)
describe('AssetList', () => {
  it('displays assets', () => {...})
})

// 2. E2E tests (user flows)
describe('Asset Management', () => {
  it('user can add asset', () => {...})
})
```

---

## State Management Differences

### Library Challenge: Support Multiple Patterns

```typescript
// Library must support both:

// Option 1: Vuex (current pqs-frontend)
import { VuexAdapter } from '@plantquest/model-vue'
app.use(new Vxg({ stateAdapter: new VuexAdapter(store) }))

// Option 2: Pinia (future consumers)
import { PiniaAdapter } from '@plantquest/model-vue'
app.use(new Vxg({ stateAdapter: new PiniaAdapter(useVxgStore) }))
```

### Application: Single Choice

```typescript
// pqs-frontend just picks one:
import { createStore } from 'vuex'
const store = createStore({...})

// OR (after migration)
import { createPinia } from 'pinia'
const pinia = createPinia()
```

---

## Breaking Change Impact

### Library Breaking Change

```typescript
// Change in model-vue:
// ❌ Breaking: Rename prop
<VxgBasicHead logo="..." />  // Old
<VxgBasicHead logo-url="..." />  // New

// ⚠️ Breaks ALL consumers:
- pqs-frontend (production app)
- pqs-mobile (if exists)
- Future apps
- Example apps
```

**Impact**: 10x-100x more severe than app change

### Application Breaking Change

```typescript
// Change in pqs-frontend:
// ✅ Internal only
<AssetList sortOrder="..." />  // Old
<AssetList :sort="..." />  // New

// ✅ Only affects this app
- No external consumers
- Can fix in same commit
- Deploy when ready
```

**Impact**: Isolated, controllable

---

## Timeline Comparison

### Library Migration Timeline

```
Week 1-5:   Phase 1 - Setup dual build
Week 6-11:  Phase 2 - Migrate components
Week 12-15: Phase 3 - Testing & documentation
            └─ Publish v1.0.0-alpha.1

Week 16-17: Consumer testing (pqs-frontend)
Week 18-19: Bug fixes, beta release
Week 20:    Stable v1.0.0 release

Total: 20 weeks (5 months)
```

### Application Migration Timeline

```
Week 1-2:  Phase 1 - Setup
Week 3-4:  Phase 2 - Core framework
Week 5-6:  Phase 3 - Component migration
Week 7-8:  Phase 4 - Testing

Total: 8 weeks (2 months)
```

**Why slower for library?**
- Can't break consumers
- Must maintain both versions
- More coordination needed
- Integration testing with consumers
- More comprehensive documentation

---

## Rollback Scenarios

### Library Rollback (HARD)

```bash
# If v1.0.0 has critical bug:

1. pqs-frontend is broken (production down)
2. Other consumers affected
3. Need to:
   - Revert all consumers to v0.18.x
   - Or fix bug urgently in v1.0.1
   - Coordinate with all consumers
   - Emergency deployment

⚠️ Downtime: Hours to days
⚠️ Coordination: Multiple teams
⚠️ Risk: HIGH
```

### Application Rollback (EASY)

```bash
# If pqs-frontend deploy fails:

1. Revert deployment
2. Back to previous version
3. Fix bug
4. Redeploy when ready

✅ Downtime: Minutes
✅ Coordination: Single team
✅ Risk: LOW
```

---

## Recommendations

### For model-vue (Library)

1. **Conservative Approach**
   - Thorough testing before release
   - Alpha/beta testing with consumers
   - Maintain both versions for 12 months
   - Clear deprecation timeline

2. **Communication**
   - Regular updates to consumers
   - Migration guide in advance
   - Breaking change warnings
   - Support channel for consumers

3. **Backward Compatibility**
   - Maintain API contracts where possible
   - Provide migration helpers
   - Deprecate gradually (not abruptly)

### For pqs-frontend (Application)

1. **Wait for Library**
   - Don't start until model-vue@1.0.0 stable
   - Use alpha/beta for early testing
   - Provide feedback to library team

2. **Aggressive Timeline**
   - Can move faster (6-8 weeks)
   - More flexibility with breaking changes
   - Less coordination overhead

---

## Key Takeaways

1. ⚠️ **Library migration is 2-3x more complex** than application migration
2. ⚠️ **Library must migrate first** - consumers depend on it
3. ⚠️ **Dual version maintenance required** for library (not for app)
4. ⚠️ **Breaking changes have 10-100x more impact** in library
5. ⚠️ **Rollback is much harder** for library than application
6. ✅ **But library migration enables all consumers** to modernize

---

## Next Steps

### Immediate Priority: Migrate Library

1. **Approve model-vue migration plan** (DEC-MODEL-VUE-002)
2. **Allocate resources** (1 senior dev, 12-15 weeks)
3. **Setup monorepo** for dual version
4. **Begin Phase 1** (infrastructure)

### Secondary: Prepare Application

1. **Review pqs-frontend plan** (DEC-000017)
2. **Align timelines** with library migration
3. **Prepare test environment**
4. **Train team on Vue 3**

### Timeline

```
Month 1-4:  Migrate model-vue library
Month 5:    Alpha/beta testing with pqs-frontend
Month 6-7:  Migrate pqs-frontend
Month 8+:   Both in production, deprecate old versions
```

**Total Time**: 7-8 months for complete migration

---

## Questions?

- **Which should we migrate first?** → model-vue (library) - pqs-frontend depends on it
- **Can we do both in parallel?** → No - library must complete first
- **What if we only have one Vue 3 app?** → Still migrate library first for future apps
- **Can we skip dual versioning?** → Not recommended - too risky for consumers
- **How long to maintain Vue 2 version?** → 12 months after Vue 3 release minimum

---

**Last Updated**: 2026-02-06
