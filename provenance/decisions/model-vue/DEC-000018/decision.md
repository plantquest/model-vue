# DEC-000018: Vue 3 Migration for model-vue Library with Parallel Agent Approach

## Status
**Draft** - Pending approval

## Context

### Problem Statement
Vue 2 reached End of Life on December 31, 2023. As of February 2026, we are **2+ years past EOL**, exposing the model-vue library and all consuming applications to:
- No official security patches for 2+ years
- Ecosystem abandonment (libraries moving to Vue 3 only)
- Shrinking talent pool (developers learning Vue 3, not Vue 2)
- Compounding technical debt

### Why This Matters
model-vue is a **component library** consumed by multiple applications:
- pqs-frontend (primary consumer)
- pqs-mobile (potential consumer)
- Future @plantquest applications

**Critical Constraint**: Library migration **must complete first** before any consumer can migrate to Vue 3.

### Current State
- Vue 2.6.12 (2+ years outdated)
- 9 components (BasicHead, BasicNav Stages, BasicSide, BasicMain, BasicAuth, BasicAdmin, BasicFieldPick, BasicFoot, BasicLed)
- Vue CLI build system
- Options API
- Vuetify 2
- Moment.js for dates
- Tightly coupled to Vuex store

### Alternatives Considered

1. **Big Bang Migration** - REJECTED
   - Too risky for library
   - Breaks all consumers immediately
   - No rollback path

2. **Compatibility Build (@vue/compat)** - REJECTED
   - Technical debt
   - Performance penalty
   - Larger bundle size
   - Temporary solution only

3. **Rewrite from Scratch** - REJECTED
   - Too expensive (6-12 months)
   - Reintroduces bugs
   - Loses institutional knowledge

4. **Stay on Vue 2 Forever** - REJECTED
   - Critical security risk (2+ years unpatched)
   - Ecosystem abandonment
   - Cannot hire Vue 2 developers
   - Blocks all consumer migrations

5. **Sequential AI-Assisted Migration** - REJECTED
   - Takes 12-15 weeks
   - Slower than parallel approach

## Decision

**Adopt AI-Assisted Migration with Junior Developer + CTO Oversight**

### Migration Strategy

1. **AI-Powered Parallel Execution** (with human validation)
   - Use Cursor Ultra with parallel subagents (within single account)
   - Junior Vue developer reviews AI output daily (20 hrs/week)
   - CTO provides strategic oversight and key decisions (8 hrs/week)
   - Continuous integration and testing

2. **Dual-Version Support**
   - Maintain `@plantquest/model-vue-v2@0.18.x` (Vue 2) in maintenance mode
   - Create `@plantquest/model-vue@1.x.x` (Vue 3) as new active version
   - Use monorepo structure with pnpm workspaces

3. **Technical Approach**
   - **Build System**: Migrate from Vue CLI to Vite
   - **API**: Convert from Options API to Composition API
   - **Types**: Add TypeScript definitions
   - **UI**: Upgrade from Vuetify 2 to Vuetify 3
   - **Dates**: Replace Moment.js with Day.js (97% size reduction)
   - **Exports**: Add tree-shakeable exports
   - **State**: Support both Vuex and Pinia via adapter pattern

4. **Timeline**: 11-13 weeks (both library & frontend)

   ```
   MODEL-VUE LIBRARY:
   Week 1-4:   Library migration (AI + junior dev review)
   Week 5-6:   Alpha/beta testing & stable release
   
   PQS-FRONTEND APPLICATION:
   Week 7-9:   Application migration (AI + junior dev review)
   Week 10-11: Integration testing & deployment
   
   Complete: Early May 2026
   ```

5. **Team Structure**:
   - **Cursor Ultra AI**: Generates code via parallel subagents
   - **Junior Developer**: Daily review, testing, documentation (20 hrs/week)
   - **CTO**: Architecture decisions, complex issues, deployment approval (8 hrs/week)

### AI Subagent Task Division (Cursor Composer)

**Week 1-2: model-vue Infrastructure & Simple Components**
- Cursor spawns parallel subagents for:
  - Repository structure, monorepo setup
  - Vite build configuration
  - TypeScript & composables
  - BasicLed, BasicFoot, BasicFieldPick
- Junior dev reviews daily, runs tests
- CTO reviews architecture setup

**Week 3-4: model-vue Complex Components**
- Parallel subagents handle:
  - BasicAuth, BasicAdmin, BasicSide (medium complexity)
  - BasicNavStages + split into sub-components
  - BasicHead (1100 lines) + split
  - BasicMain conversion
- Junior dev validates each component
- CTO reviews complex component decisions

**Week 5-6: model-vue Ecosystem & Release**
- Parallel subagents:
  - Vuetify 3 migration
  - Day.js migration, tree-shaking
  - Integration tests
  - Documentation
- Alpha/beta testing
- CTO approves stable v1.0.0 release

**Week 7-9: pqs-frontend Migration**
- Parallel subagents migrate 100+ components
- Junior dev reviews and tests
- CTO oversees integration

**Week 10-11: pqs-frontend Deployment**
- Final testing
- CTO approves production deployment

### Success Criteria

- All 9 components migrated to Vue 3 Composition API
- >80% test coverage maintained
- Build produces valid ESM, UMD, and CJS outputs
- Tree-shaking verified working
- Integration tests passing with both Vuex and Pinia
- pqs-frontend successfully consuming new version
- Bundle size maintained or reduced
- No P0/P1 bugs in stable release

## Consequences

### Positive

1. **Speed**: 3-4x faster than manual (6-8 weeks vs 16-22 weeks)
2. **Cost**: 70-75% reduction ($30-40K vs $120-160K manual)
3. **Security**: Access to Vue 3 security patches immediately
4. **Ecosystem**: Access to modern libraries and tooling
5. **Performance**: Proxy-based reactivity improvements
6. **Hiring**: Easier to hire Vue 3 developers
7. **Team Morale**: Working with modern, maintained technology
8. **Future-Proof**: No migration needed for 5+ years
9. **Productivity**: 20-30% development speed improvement
10. **Bundle Size**: 97% reduction from Moment.js → Day.js alone

### Negative

1. **Learning Curve**: 1-2 weeks for team to learn Composition API
2. **Dual Maintenance**: Must maintain both versions for 12 months
3. **Coordination**: Must coordinate with pqs-frontend and other consumers
4. **Risk**: Library bugs affect all consumers
5. **Complexity**: Parallel agent coordination requires discipline

### Risks

See risk acceptances:
- **RA-000002**: Risk of staying on Vue 2 (CRITICAL - 2+ years past EOL)
- **RA-000003**: Risk of migration execution (MEDIUM - mitigated by testing)

## Implementation Plan

### Phase 1: Preparation (Week 1)

1. **Repository Setup**
   - Create monorepo structure
   - Configure pnpm workspaces
   - Setup dual build system
   - Create 4 git branches for parallel agents

2. **Build Configuration**
   - Configure Vite for library mode
   - Setup ESM/UMD/CJS outputs
   - Configure TypeScript
   - Setup testing with Vitest

3. **Define Patterns**
   - Create `.cursor/MIGRATION-PATTERNS.md`
   - Define Composition API patterns
   - Define composable patterns
   - Define test patterns

### Phase 2: Component Migration (Week 2-3)

**4 Agents Working Simultaneously**:

Each agent follows this pattern:
1. Copy component from v2 package
2. Convert Options API → Composition API
3. Extract reusable logic to composables
4. Add TypeScript types
5. Write/update tests (>80% coverage)
6. Commit to agent-specific branch
7. Senior dev reviews and merges daily

### Phase 3: Ecosystem (Week 4-5)

1. **Vuetify 3 Migration**
   - Update all Vuetify 2 syntax to Vuetify 3
   - Test all components with new Vuetify

2. **Dependency Updates**
   - Replace Moment.js with Day.js
   - Update to Vue Router 4 (if needed)
   - Setup tree-shakeable exports

3. **Testing**
   - Integration tests with Vuex
   - Integration tests with Pinia
   - Consumer integration tests
   - CI/CD pipeline

4. **Documentation**
   - Migration guide for consumers
   - API documentation
   - Component examples
   - TypeScript definitions

5. **Publishing**
   - Publish v1.0.0-alpha.1
   - Share with pqs-frontend for testing

### Phase 4: Consumer Testing (Week 6-8)

1. **Alpha Testing** (Week 6)
   - pqs-frontend integrates alpha version
   - Bug identification and fixes

2. **Beta Release** (Week 7)
   - Publish v1.0.0-beta.1
   - Extended testing in production-like environment

3. **Stable Release** (Week 8)
   - Address all P0/P1 issues
   - Publish v1.0.0
   - Update documentation
   - Announce to all consumers

## Guardrails

1. **Testing**: All components must have >80% test coverage
2. **Daily Reviews**: Senior dev must review and merge agent work daily
3. **API Compatibility**: No breaking changes without deprecation warnings
4. **Consumer Testing**: Alpha/beta testing with pqs-frontend required
5. **Dual Support**: Maintain Vue 2 version for 12 months minimum
6. **Pattern Consistency**: All agents must follow `.cursor/MIGRATION-PATTERNS.md`
7. **Integration Testing**: Both Vuex and Pinia adapters must be tested
8. **Build Verification**: Verify ESM/UMD/CJS outputs and tree-shaking work
9. **Documentation**: Migration guide must be complete before stable release
10. **No Solo Deployment**: At least 2 people must approve stable release

## Related Documents

- **Specification**: SPEC-000002 - Vue 3 Migration Technical Specification
- **Risk Analysis**: RA-000002 - Risk of Staying on Vue 2 (CRITICAL)
- **Risk Acceptance**: RA-000003 - Migration Execution Risks
- **Related Decision**: DEC-000017 - pqs-frontend Vue 3 Migration (consumer)
- **Draft**: provenance/drafts/DEC-MODEL-VUE-002-vue3-migration-plan.md (full details)
- **Quick Start**: provenance/drafts/MIGRATION-QUICKSTART.md
- **Risk Analysis**: provenance/drafts/VUE2-RISK-ANALYSIS.md
- **Library vs App**: provenance/drafts/LIBRARY-VS-APP-MIGRATION.md

## Next Steps

1. **Immediate** (This Week):
   - Review and approve this decision
   - Secure budget approval ($35K)
   - Allocate 1 senior Vue developer (full-time, 6-8 weeks)
   - Review PARALLEL-AGENT-GUIDE.md for execution details

2. **Week 1**:
   - Setup 4 Cursor IDE instances
   - Create 4 git branches
   - Define migration patterns
   - Kick off infrastructure setup (4 agents in parallel)

3. **Week 2-3**:
   - Execute component migration (4 agents in parallel)
   - Daily reviews and merges
   - Continuous integration testing

4. **Week 4-5**:
   - Ecosystem migration (4 agents in parallel)
   - Alpha release preparation
   - Documentation completion

5. **Week 6-8**:
   - Consumer testing with pqs-frontend
   - Bug fixes
   - Stable v1.0.0 release

## Approval Required From

- [ ] Senior Vue Developer (technical feasibility)
- [ ] Engineering Manager (resource allocation)
- [ ] pqs-frontend Team Lead (consumer readiness)
- [ ] CTO/VP Engineering (budget and timeline approval)

## Tags

`vue3`, `migration`, `component-library`, `parallel-agents`, `modernization`, `security`, `architecture`

---

**Decision Date**: 2026-02-09  
**Last Updated**: 2026-02-09  
**Review Date**: TBD  
**Supersedes**: None  
**Superseded By**: None
