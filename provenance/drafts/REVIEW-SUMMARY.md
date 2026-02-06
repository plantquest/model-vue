# Provenance Review Summary - model-vue Library

**Date**: 2026-02-06  
**Reviewer**: AI Assistant  
**Scope**: model-vue library architectural decisions (backwards-looking)

---

## Executive Summary

I've reviewed the model-vue library codebase and the 17 existing provenance decisions for pqs-frontend. The model-vue library is a **Vue 2.6 component library** that provides reusable UI components for @plantquest applications.

### Key Finding

The existing decisions (DEC-000001 through DEC-000017) document **pqs-frontend's use** of model-vue, but **not the architectural decisions made when building model-vue itself**. This review provides backwards-looking documentation of those decisions.

---

## What is model-vue?

**@plantquest/model-vue** is a shared component library that provides:
- **9 Core Components**: BasicHead, BasicSide, BasicMain, BasicNavStages, BasicAdmin, BasicAuth, BasicFieldPick, BasicFoot, BasicLed
- **Plugin Architecture**: Vxg class for global component registration
- **Permission System**: Patrun-based pattern matching
- **State Integration**: Tight coupling with Vuex store
- **UI Foundation**: Built on Vuetify 2.5.1 Material Design

---

## 10 Architectural Decisions Documented

I've created a draft decision document (`DEC-MODEL-VUE-001-draft.md`) that captures:

### 1. **Vue 2.6 Options API**
   - All components built with Options API
   - Consistent with Vue 2 ecosystem
   - Will require migration to Vue 3

### 2. **Vuetify 2.x Foundation**
   - Material Design components (buttons, app bars, drawers)
   - Professional UI out of the box
   - Tied to Vuetify lifecycle

### 3. **Plugin Architecture (Vxg class)**
   - Standard Vue.use() pattern
   - Global component registration
   - Shared `$vxg` instance

### 4. **Patrun Pattern Matching**
   - Flexible permission/authorization rules
   - Memoization for performance
   - Consistent with Seneca backend

### 5. **Strict Vuex State Contract**
   - ⚠️ **HIGH RISK**: Consuming apps must maintain `state.vxg` structure
   - Breaking changes to state structure break all apps
   - No runtime validation

### 6. **Component Naming (Basic* / Vxg* prefix)**
   - Namespace collision prevention
   - Clear origin identification
   - Verbose but safe

### 7. **UMD Build**
   - Universal Module Definition
   - Browser, CommonJS, AMD support
   - No tree-shaking

### 8. **Moment.js Dependency**
   - ⚠️ **TECHNICAL DEBT**: 70KB bundle size
   - Maintenance mode library
   - Should migrate to day.js

### 9. **Component State Management**
   - Read from Vuex, dispatch actions
   - No local state for shared concerns
   - Predictable state flow

### 10. **Seneca Integration Mixin**
   - Optional backend integration
   - Assumes `$seneca` instance available
   - Consistent with pqs-frontend pattern

---

## Critical Insights

### 🔴 High-Risk Architecture Choices

#### 1. Strict Vuex State Contract (Biggest Risk)
The library requires consuming applications to maintain an exact Vuex state structure:

```javascript
state: {
  vxg: {
    cmp: {
      BasicHead: { allow: {...}, show: {...} },
      BasicSide: { show: true },
      BasicMain: { show: false }
    },
    ent: { meta: { name: 'Item' } }
  },
  trigger: {
    filter: { active: false },
    search: { term: '', a: '', b: '' },
    bookmark: { value: false, visible: false }
  }
}
```

**Problems**:
- ⚠️ **Tight Coupling**: Any state structure change breaks all consuming apps
- ⚠️ **No Validation**: No runtime checks if state structure is correct
- ⚠️ **Hidden Requirement**: Not documented in library, only in pqs-frontend rules
- ⚠️ **Version Lock**: Can't evolve state contract without breaking changes

**Impact on pqs-frontend** (from DEC-000008):
- Map level management
- Layout changes (BasicSide visibility, BasicHead controls)
- State dependencies (filter state, bookmark visibility, asset selection)

**Recommendations**:
1. Add runtime validation of state structure
2. Create versioned state schemas
3. Document state contract in library README
4. Consider prop-based API as alternative to state coupling

---

### ⚠️ Technical Debt

#### 1. Moment.js (70KB)
- Library is in maintenance mode
- Moment.js team recommends alternatives
- Should migrate to day.js (2KB, compatible API)

#### 2. Large Component Files
- BasicHead.vue: 1100+ lines (two implementations!)
- BasicNavStages.vue: 392 lines
- Should be split into smaller components

#### 3. No TypeScript
- No type safety
- No IntelliSense support
- Should add .d.ts files or migrate to TypeScript

#### 4. No Component Documentation
- No Storybook
- No API docs
- Hard for new developers to use library

#### 5. Global Registration Only
- No tree-shaking
- Entire library bundled even if only using 1 component
- Should provide individual component exports

---

## Relationship to pqs-frontend Decisions

The existing 17 decisions document pqs-frontend, which **consumes** model-vue:

| pqs-frontend Decision | Relevance to model-vue |
|----------------------|------------------------|
| DEC-000002 (Vue 2.x) | model-vue also Vue 2.6.12 |
| DEC-000003 (Promise-based) | model-vue components use Promises |
| DEC-000004 (Vuex State) | model-vue **requires** specific Vuex state |
| DEC-000008 (model-vue dependency) | **Documents consumer perspective** |
| DEC-000017 (Vue 3 Migration) | **Both** libraries must migrate together |

---

## Recommendations

### Immediate Actions

1. **Document State Contract**
   - Add to README.md what Vuex state structure is required
   - Document all required actions (`set_cmp_flags`, `trigger_select`, etc.)
   - Add examples of correct state structure

2. **Add Runtime Validation**
   - Validate state structure on plugin installation
   - Warn if required state properties missing
   - Fail fast with helpful error messages

3. **Create Migration Plan**
   - Document how to evolve state contract without breaking changes
   - Consider semantic versioning for state structure
   - Plan migration to prop-based API

### Short-Term (IMMEDIATE - Week 1)

1. **Start Vue 3 Migration** (see DEC-MODEL-VUE-002)
   - Setup monorepo with 4 agent branches
   - Run 3-4 Cursor agents in parallel
   - Complete in 6-8 weeks (vs 16-22 weeks manual)
   - Cost: $30-40K (vs $120-160K manual)

2. **Replace Moment.js** (During migration - Agent 2, Week 4)
   - Migrate to day.js (2KB, compatible API)
   - Reduces bundle size by 70KB
   - Part of parallel agent workflow

3. **Add TypeScript** (During migration - Agent 3, Week 1)
   - All new code uses TypeScript
   - Complete type definitions
   - Better DX for consumers

4. **Split Large Components** (During migration - Agent 3 & 4, Week 2)
   - BasicHead: Split into sub-components (Agent 4)
   - BasicNavStages: Split into sub-components (Agent 3)
   - Makes migration easier and code more maintainable

### Long-Term (Week 9+)

1. **Consumer Migration** (pqs-frontend)
   - Wait for model-vue@1.0.0 stable
   - Use pqs-frontend DEC-000017 plan
   - Also use parallel agents for 6-8 week migration

2. **Decouple from Vuex** (Already in migration plan)
   - Support both Vuex and Pinia via adapters
   - Part of Vue 3 migration

3. **Tree-Shakeable Exports** (Already in migration plan)
   - Export individual components
   - Part of Vue 3 migration
   - Reduce bundle size significantly

---

## Next Steps

### For You (Decision Maker)

1. **Review DEC-MODEL-VUE-001-draft.md**
   - Validate architectural decisions documented
   - Add any missing context or rationale
   - Correct any misunderstandings

2. **Formalize Decisions**
   - Move from drafts/ to decisions/model-vue/
   - Create decision.json for each decision
   - Update provenance.md rules

3. **Document State Contract**
   - Update README.md with required Vuex state
   - Create examples of correct integration
   - Add runtime validation

4. **Plan Technical Debt Cleanup**
   - Prioritize Moment.js replacement (quick win)
   - Schedule TypeScript definitions work
   - Plan Storybook setup

### For Development Team

1. **Create State Validation**
   - Add validation function to Vxg plugin
   - Check required state properties on install
   - Provide helpful error messages

2. **Document Components**
   - Add JSDoc comments to all components
   - Document props, events, slots
   - Create usage examples

3. **Setup CI/CD**
   - Add automated tests
   - Add bundle size checks
   - Add compatibility tests with pqs-frontend

---

## Questions to Consider

1. **State Contract Evolution**
   - How do we evolve the state contract without breaking existing apps?
   - Should we version the state schema?
   - Can we provide migration helpers?

2. **Prop vs. State API**
   - Should we move toward prop-based API instead of Vuex coupling?
   - How to maintain backward compatibility during transition?
   - What's the migration path for existing consumers?

3. **Component Granularity**
   - Are BasicHead/BasicSide too large and monolithic?
   - Should we split into smaller, composable components?
   - How to maintain backward compatibility?

4. **Vue 3 Migration**
   - When should we migrate to Vue 3?
   - How to coordinate with pqs-frontend migration?
   - Should we maintain Vue 2 version separately?

5. **Library Scope**
   - Should model-vue stay UI-focused or expand functionality?
   - Should we extract non-UI utilities to separate package?
   - How to manage dependencies as library grows?

---

## Files Created

1. **`provenance/drafts/DEC-MODEL-VUE-001-draft.md`**
   - Comprehensive architectural decision documentation
   - 10 core decisions with rationale, consequences, alternatives
   - Technical debt and migration path

2. **`provenance/drafts/REVIEW-SUMMARY.md`** (this file)
   - Executive summary of findings
   - Recommendations and next steps
   - Questions to consider

---

## Contact

If you have questions or need clarification on any of these findings, please let me know. I can:
- Expand on specific architectural decisions
- Create additional decision documents
- Help formalize and structure these decisions
- Assist with creating validation code or documentation

---

**Last Updated**: 2026-02-06  
**Next Review**: After formalizing decisions and implementing validation
