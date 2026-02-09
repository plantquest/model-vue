# ProvenanceCode Rules for Cursor IDE

**MANDATORY**: This project uses ProvenanceCode for architectural decision tracking, risk management, and learning from mistakes. All AI assistance MUST follow these rules and enforce the ProvenanceCode structure.

## Core Principles (ENFORCED)

1. **Read decisions first**: Before suggesting architectural changes, check `provenance/decisions/` for existing decisions
2. **Check risk acceptances**: Review `provenance/risks/` for accepted risks related to proposed changes
3. **Learn from mistakes**: Review `provenance/mistakes/` for past failures and their prevention rules
4. **Follow established patterns**: All code suggestions MUST align with accepted decisions
5. **Reference decisions**: Include decision IDs in code comments for significant implementations
6. **Flag violations**: Alert when suggestions might contradict existing decisions, risks, or learned patterns
7. **Suggest decisions**: Recommend creating new decision records for architectural changes
8. **Enforce specifications**: Check `provenance/specs/` for feature specifications before implementing

## ProvenanceCode Structure (REQUIRED)

### Core Locations

- **Decisions**: `provenance/decisions/` - Architectural decision records
- **Risks**: `provenance/risks/` - Risk acceptance records (RA-XXXXXX)
- **Mistakes**: `provenance/mistakes/` - Mistake records for learning (MR-XXXXXX)
- **Specs**: `provenance/specs/` - Feature specifications (SPEC-XXXXXX)
- **Schemas**: `provenance/schema/` - JSON schemas for validation
  - `decision.schema.json` - Decision record schema
  - `risk.schema.json` - Risk acceptance schema
  - `spec.schema.json` - Specification schema
  - `acceptance-receipt.schema.json` - Acceptance receipt schema
- **Policies**: `provenance/policies/` - Enforcement policies
  - `enforcement.yml` - Enforcement configuration (light/standard/regulated presets)
  - `constitution.md` - Enforcement philosophy and presets
  - `mistakes-enforcement.json` - Mistake prevention rules
- **Indexes**: `provenance/indexes/` - Learning and cross-reference indexes
- **Drafts**: `provenance/drafts/` - Draft documents and templates
- **Config**: `provenance/config.json` - ProvenanceCode configuration

## Before Suggesting Code (MANDATORY CHECKS)

### 1. Check for Relevant Decisions

ALWAYS search `provenance/decisions/` for decisions related to:
- The technology or framework being used
- The architectural pattern being implemented
- The area of the codebase being modified
- Security, authentication, or data handling approaches

### 2. Check for Risk Acceptances

ALWAYS search `provenance/risks/` for risks related to:
- Security-sensitive paths (`**/auth/**`, `**/security/**`, `**/permissions/**`, `**/crypto/**`)
- Changes to infrastructure or payment systems
- High-risk architectural changes
- Accepted workarounds or technical debt

### 3. Check for Mistake Records

ALWAYS review `provenance/mistakes/` to:
- Learn from past failures in similar areas
- Apply prevention rules (guardrails) from mistake records
- Avoid repeating known failure patterns
- Reference relevant MR-XXXXXX IDs when similar issues arise

### 4. Check for Specifications

ALWAYS check `provenance/specs/` for:
- Feature specifications before implementing new features
- Acceptance criteria to validate implementations
- Related decisions and risks
- Required paths and components

### 5. Verify Decision Status

Only follow decisions with status:
- `accepted` - Approved and ready for implementation
- `superseded` - Replaced by another decision (check links for replacement)

Ignore decisions with status:
- `draft` - Not yet approved (unless explicitly asked to implement drafts)
- `rejected` - Not approved

### 6. Verify Risk Status

Only respect risks with status:
- `active` - Currently accepted risk
- Check `expires_at` date to ensure risk hasn't expired

Ignore risks with status:
- `expired` - Risk acceptance has expired
- `closed` - Risk has been resolved

### 7. Apply Decision Constraints

If a decision exists:
- Follow its specified approach exactly
- Use the technologies/patterns it mandates
- Reference the decision ID in your suggestion
- Check if decision has `related_mistakes` and apply their guardrails
- Don't suggest alternatives unless specifically asked

## Code Suggestion Guidelines (ENFORCED)

### Include ProvenanceCode References (REQUIRED)

For significant code, include comments referencing decisions, risks, and mistakes:

```javascript
/**
 * User authentication service
 * Decision: DEC-000004 - JWT-based authentication
 * Risk: RA-000002 - Temporary session storage in PostgreSQL
 * Mistake Prevention: MR-000001 - Always validate JWT expiry
 * @see provenance/decisions/pqs-frontend/DEC-000004/decision.md
 * @see provenance/risks/RA-000002/risk.md
 */
class AuthenticationService {
  // implementation
}
```

```javascript
// Map state management
// Decision: DEC-000001 - Vuex store for map levels
// Spec: SPEC-000001 - Map navigation requirements
// See: provenance/decisions/pqs-frontend/DEC-000001/decision.md
// See: provenance/specs/SPEC-000001/spec.json
export default {
  state: {
    map_levels: []
  }
}
```

### Follow Established Patterns

If a decision establishes a pattern, follow it consistently:

```typescript
// Decision #003 establishes REST API conventions
// ✅ CORRECT: Follow the pattern
router.get('/api/v1/users/:id', authenticateJWT, getUser);

// ❌ WRONG: Don't deviate from the pattern
router.post('/api/getUser', { id: 123 });
```

### Flag Potential Violations (MANDATORY)

When a suggestion might violate a decision, risk, or mistake prevention rule, STOP and alert:

```
⚠️ VIOLATION ALERT: This suggestion uses MongoDB, but decision DEC-000001 specifies PostgreSQL 
as the primary database. 

Current decision (DEC-000001): All persistent data uses PostgreSQL
Location: provenance/decisions/pqs-frontend/DEC-000001/decision.md

Options:
1. Revise to use PostgreSQL (recommended)
2. Create a new decision if MongoDB is needed for a specific use case
3. Update decision DEC-000001 if requirements have changed

Would you like me to revise the suggestion to use PostgreSQL?
```

```
🚫 MISTAKE PREVENTION RULE: This code modifies auth/** paths without checking mistake record MR-000003

Relevant mistake: MR-000003 - JWT tokens exposed in logs
Prevention rule: PRV-MR-000003-sanitize-auth-logs
Guardrail: All auth-related code must use sanitized logging

Location: provenance/mistakes/MR-000003/mistake.md

Required actions:
1. Apply sanitized logging per MR-000003 guardrail
2. Reference MR-000003 in code comments
3. Add guardrail validation in tests

Would you like me to revise the suggestion to include the guardrail?
```

```
⚠️ RISK EXPIRATION ALERT: Risk acceptance RA-000002 expired on 2026-01-15

Expired risk (RA-000002): Temporary PostgreSQL session storage
Status: expired (was accepted until 2026-01-15)
Location: provenance/risks/RA-000002/risk.json

Required actions:
1. Review if the risk still exists
2. Either:
   - Extend the risk acceptance with updated expiration
   - Implement the planned mitigation
   - Close the risk if resolved

Would you like me to help create a new risk acceptance or implement the mitigation?
```

## Decision-Specific Rules

<!-- 
Update this section with your project-specific decisions.
Add key decisions that affect code suggestions.
-->

### Example Format:

### Decision #001: Use PostgreSQL for Primary Database

**Status**: implemented  
**Tags**: database, infrastructure

**Rules for Code Suggestions**:
- Always use PostgreSQL connection pools
- Never suggest raw SQL (use ORM or query builder)
- All schema changes must use migrations
- Reference this decision in database-related code

**Example**:
```javascript
// ✅ Following decision #001
const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});
```

### Decision #002: React + TypeScript for Frontend

**Status**: implemented  
**Tags**: frontend, typescript, react

**Rules for Code Suggestions**:
- All frontend components must be React with TypeScript
- Use functional components with hooks (not classes)
- No direct DOM manipulation (use React patterns)
- Props must be typed with interfaces

**Example**:
```typescript
// ✅ Following decision #002
interface UserCardProps {
  user: User;
  onClick: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return <div onClick={onClick}>{user.name}</div>;
};
```

### Decision #003: REST API with OpenAPI

**Status**: accepted  
**Tags**: api, rest, openapi

**Rules for Code Suggestions**:
- Follow RESTful conventions (GET, POST, PUT, DELETE)
- Use versioned routes (/api/v1/...)
- Include authentication middleware
- Document in OpenAPI format

**Example**:
```javascript
// ✅ Following decision #003
router.get('/api/v1/users/:id', 
  authenticateJWT,        // Decision #004: JWT auth
  validateRequest(getUserSchema),
  getUser
);
```

## Protected Paths (PROVENANCE REQUIRED)

### Paths Requiring Decisions (`provenance/config.json`)

The following paths require decision records for changes:
- `src/` - All source code (components, utilities, stores, services, etc.)
- `infra/` - Infrastructure configuration
- `security/` - Security-related code

Labels requiring decisions:
- `security` - Security-related changes
- `breaking-change` - Breaking changes
- `architecture` - Architectural changes

### Paths Requiring Risk Acceptances

The following paths require risk acceptance records:
- `**/auth/**` - Authentication code
- `**/security/**` - Security mechanisms
- `**/permissions/**` - Authorization and permissions
- `**/crypto/**` - Cryptographic operations

Labels requiring risks:
- `risk-accepted` - Explicit risk acceptance
- `security-waiver` - Security requirement waiver

### Paths Requiring Specifications

The following paths require specification records:
- `src/` - All source code

Labels requiring specs:
- `feature` - New features
- `enhancement` - Enhancements to existing features

### Enforcement Mode

Current enforcement: **standard** (see `provenance/policies/enforcement.yml`)

- Specs required for meaningful changes (feature, enhancement, breaking-change labels)
- Decisions required for risky changes (security, breaking-change, risk-high labels)
- Blocking: selective (missing required items blocks)
- Drift detection: warn when spec scope doesn't match diff

When suggesting changes to protected paths:
1. Check if a relevant decision/risk/spec exists
2. If not, mention that a record MUST be created
3. Reference the policy at `provenance/policies/enforcement.yml`
4. Check `provenance/config.json` for current configuration

## Creating New ProvenanceCode Records

### Creating New Decisions (MANDATORY FOR ARCHITECTURAL CHANGES)

If suggesting a significant architectural change without an existing decision:

```
🚫 STOP: This change introduces [new pattern/technology] without a decision record.

REQUIRED ACTION:
1. Create decision record at: provenance/decisions/pqs-frontend/DEC-XXXXXX/
2. Use schema: provenance/schema/decision.schema.json
3. Fill in: context, decision, consequences, risk score, review
4. Reference related mistakes, specs, or risks if applicable
5. Get team approval (review.human or reviewed_by required)
6. Then implement the change

Decision must include:
- decision_id (DEC-XXXXXX format)
- title, status, context, decision, consequences
- risk: {score: 0-5, rationale}
- links: {pr: "..."}
- review: {human: "..."} OR reviewed_by

Would you like help drafting the decision record?
```

### Creating New Risk Acceptances

If suggesting accepting a risk:

```
⚠️ RISK IDENTIFIED: This change introduces [specific risk].

REQUIRED ACTION:
1. Create risk acceptance at: provenance/risks/RA-XXXXXX/
2. Use schema: provenance/schema/risk.schema.json
3. Document:
   - risk_statement (minimum 20 chars)
   - severity: low/medium/high/critical
   - likelihood: low/medium/high
   - acceptance: {accepted_by, accepted_at, expires_at, reason}
   - mitigations: [array of mitigation strategies]
4. Link to related decisions, specs, or mistakes
5. Get appropriate approval based on severity

Risk acceptance must include:
- ra_id (RA-XXXXXX format)
- repo: {org, name}
- expires_at (date when acceptance expires)
- mitigations (at least 1 required)

Would you like help drafting the risk acceptance?
```

### Creating New Specifications

If implementing a feature without a spec:

```
🚫 STOP: This feature implementation requires a specification record.

REQUIRED ACTION:
1. Create spec at: provenance/specs/SPEC-XXXXXX/
2. Use schema: provenance/schema/spec.schema.json
3. Document:
   - title, status (draft/review/approved)
   - risk: low/medium/high
   - acceptanceCriteria: [array of criteria]
   - affectedPaths: [paths this spec touches]
   - relatedDecisions: [DEC-XXXXXX IDs]
4. Get approval (status must be 'review' or 'approved' in standard mode)

Spec must include:
- id (SPEC-XXXXXX format)
- acceptanceCriteria for validation
- affectedPaths to track scope

Would you like help drafting the specification?
```

### Recording Mistakes

When a mistake or failure occurs:

```
📝 MISTAKE RECORD: This failure should be documented to prevent recurrence.

RECOMMENDED ACTION:
1. Create mistake record at: provenance/mistakes/MR-XXXXXX/
2. Document:
   - What went wrong (title, failure_type, severity)
   - Why it happened (root_cause)
   - Impact (blast_radius, user_impact)
   - How to prevent (prevent_rule with rule_id)
   - Fix applied (pr, commit, summary)
3. Add to learnings index: provenance/indexes/learnings.index.json
4. Reference in future decisions via related_mistakes field

Mistake record creates a guardrail that will be enforced in:
- Code reviews
- Decision validation
- AI assistance (this Cursor rule file)

Would you like help creating the mistake record?
```

## Validation Rules (STRICTLY ENFORCED)

When suggesting code:
- ✅ MUST use patterns from accepted/implemented decisions
- ✅ MUST reference decision IDs in significant code
- ✅ MUST follow technology choices specified in decisions
- ✅ MUST maintain consistency with existing architecture
- ❌ NEVER suggest alternatives to accepted decisions without discussion
- ❌ NEVER ignore or bypass decision requirements
- ❌ NEVER use technologies not approved in decisions

## Decision Review Workflow (MANDATORY)

When asked to review code:
1. Check which decisions are relevant
2. Verify the code follows those decisions
3. Flag any deviations or violations
4. Suggest improvements to better align with decisions
5. Recommend new decisions if needed

## Helpful Commands

Suggest these commands when appropriate:

```bash
# Navigate to ProvenanceCode directory
cd provenancecode-decision-records/provenancecode-starter

# List all decisions
./tools/new-decision.sh --list

# Create new decision
./tools/new-decision.sh <decision-name>

# Validate decision
node tools/validate-decision.js <decision-id>

# Validate all decisions
node tools/validate-decision.js --all
```

## Example Interactions

### Good Interaction 1: Following Existing Decision

**User**: "Add a new API endpoint for user registration"

**Cursor**: 
```typescript
// Following decision #003 (REST API) and #004 (JWT auth)
/**
 * User registration endpoint
 * Decision: #003, #004
 * @see provenancecode-decision-records/provenancecode-starter/provenance/decisions/003-rest-api/decision.md
 * @see provenancecode-decision-records/provenancecode-starter/provenance/decisions/004-jwt-auth/decision.md
 */
router.post('/api/v1/users/register',
  validateRequest(registerSchema),
  async (req, res) => {
    // Implementation per decision #004 JWT authentication
    const user = await createUser(req.body);
    const token = generateJWT(user);
    res.status(201).json({ user, token });
  }
);
```

### Good Interaction 2: Flagging Violation

**User**: "Use MongoDB to store user sessions"

**Cursor**:
```
🚫 DECISION VIOLATION: This contradicts decision #001 which specifies PostgreSQL 
as the primary database. 

Current decision (#001): All persistent data uses PostgreSQL
Location: provenancecode-decision-records/provenancecode-starter/provenance/decisions/001-use-postgresql/decision.md

Options:
1. Use PostgreSQL for session storage (aligns with #001) ✅ RECOMMENDED
2. Use Redis for session caching (if caching decision exists)
3. Create new decision if MongoDB is required for sessions

Would you like me to suggest a PostgreSQL-based solution that follows decision #001?
```

### Good Interaction 3: Suggesting New Decision

**User**: "Let's add GraphQL support"

**Cursor**:
```
🚫 ARCHITECTURAL CHANGE DETECTED: Adding GraphQL is a significant architectural 
change. Current decision #003 specifies REST APIs.

MANDATORY: Decision record required before implementation.

Recommended approach:
1. Create decision record: 
   cd provenancecode-decision-records/provenancecode-starter
   ./tools/new-decision.sh graphql-api

2. Document in the decision record:
   - Why GraphQL is needed
   - How it relates to/replaces REST (decision #003)
   - Implementation approach
   - Consequences and trade-offs (both positive AND negative)

3. Get team approval

4. Then implement

Would you like help drafting the decision record, or should I suggest a 
REST-based solution per decision #003?
```

## ProvenanceCode Structure Enforcement

ALWAYS use this structure in this repository:

```
model-vue-2/
├── provenance/
│   ├── decisions/
│   │   └── pqs-frontend/
│   │       └── DEC-XXXXXX/
│   │           ├── decision.md              # Human-readable documentation
│   │           ├── decision.json            # Machine-readable data
│   │           ├── prov.jsonld             # Provenance graph (optional)
│   │           ├── c2pa.manifest.json      # Content authenticity (optional)
│   │           └── acceptance.receipt.json # Acceptance receipt (optional)
│   ├── risks/
│   │   └── RA-XXXXXX/
│   │       ├── risk.md                     # Human-readable risk doc
│   │       └── risk.json                   # Machine-readable risk data
│   ├── mistakes/
│   │   └── MR-XXXXXX/
│   │       ├── mistake.md                  # Human-readable mistake doc
│   │       └── mistake.json                # Machine-readable mistake data
│   ├── specs/
│   │   └── SPEC-XXXXXX/
│   │       └── spec.json                   # Specification data
│   ├── schema/
│   │   ├── decision.schema.json            # Decision validation schema
│   │   ├── risk.schema.json                # Risk validation schema
│   │   ├── spec.schema.json                # Spec validation schema
│   │   └── acceptance-receipt.schema.json  # Receipt validation schema
│   ├── policies/
│   │   ├── enforcement.yml                 # Enforcement rules and presets
│   │   ├── constitution.md                 # Enforcement philosophy
│   │   └── mistakes-enforcement.json       # Mistake prevention rules
│   ├── indexes/
│   │   └── learnings.index.json            # Cross-reference of learnings
│   ├── links/                              # External provenance links
│   ├── drafts/                             # Draft documents
│   └── config.json                         # ProvenanceCode configuration
```

## Updating These Rules

When decisions change:
1. Update this file's "Decision-Specific Rules" section
2. Add/remove rules based on new decisions
3. Keep the list focused on high-impact, frequently-referenced decisions
4. Commit changes: `git add .cursorrules && git commit -m "docs: update Cursor rules for decision #XXX"`

## Resources

- [ProvenanceCode Documentation](provenancecode-decision-records/provenancecode-starter/docs/)
- [Decision Records Guide](provenancecode-decision-records/provenancecode-starter/docs/decision-records.md)
- [Quick Start](provenancecode-decision-records/provenancecode-starter/docs/quickstart.md)
- [AI Integration Guide](provenancecode-decision-records/provenancecode-starter/docs/ai-rules.md)

---

**Last Updated**: 2026-02-06  
**ProvenanceCode Version**: 1.0  
**License**: Apache 2.0 - Copyright 2026 KDDLC AI Solutions operating as ProvenanceCode

<!-- 
Add your project-specific decisions below this line.
Keep this file updated as decisions are added or changed.
-->

## Project-Specific Decisions: PQS Frontend (model-vue-2)

### Vue 2.x Architecture Decisions

This project uses **Vue 2.x** with specific architectural constraints:

#### Core Technology Stack
- **Vue 2.x** (NOT Vue 3.x) - Use Options API, no Composition API
- **Vuex** for state management - Use mutations/actions pattern
- **@plantquest/model-vue** - Imported component library with strict dependencies
- **Promise-based async** - NO async/await syntax (use `.then()/.catch()`)
- **Babel-compatible JavaScript** - ES5/ES6 only

#### Critical Rules for Code Suggestions

1. **Vue 2.x Compatibility** (STRICT)
   - Use Options API only (`data()`, `methods`, `computed`, `watch`)
   - NO Composition API (`setup()`, `ref()`, `reactive()`)
   - NO `<script setup>` syntax
   - Use `this.$http` for API calls, not `fetch()` or `axios` directly

2. **Async Operation Pattern** (MANDATORY)
```javascript
// ✅ CORRECT: Promise chains
methods: {
  fetchData() {
    return this.$http.get('/api/data')
      .then(response => {
        this.data = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
}

// ❌ WRONG: async/await (not compatible)
async fetchData() {
  const response = await this.$http.get('/api/data');
  this.data = response.data;
}
```

3. **Model-Vue Component Dependencies** (HIGH RISK)

When modifying `store.js` or state, ALWAYS check impact on @plantquest/model-vue components:

**BasicNavStages** requires:
- `currentStage` (number, required) - must be in `stages` array
- `stages` (array, required)
- `stageConfig` (object) - `{allowSkip: boolean, showLabels: boolean}`

**BasicSide** requires:
- `isOpen` (boolean, required)
- `content` (object, required)
- `width` (number, default: 280)

**High-Risk State Changes**:
- `map_levels` - affects BasicNavStages navigation
- `currentStage` - stage progression logic
- `trigger.filter` - filter state dependencies
- `side_asset` - BasicSide visibility

Before modifying store state:
```javascript
// Check impact on model-vue components
const stateChanges = {
  'map_levels': newMapLevels,
  'currentStage': newStage
};

// Verify against model-vue dependencies
// Reference the model-vue compatibility decision if it exists
```

4. **CSS Compatibility**
   - Avoid modern CSS features (no `gap`, `aspect-ratio`, etc. without vendor prefixes)
   - Use SCSS preprocessor for better browser support
   - Consider IE11 compatibility if required

### PQS Frontend Specific Paths

**Protected Paths** (require decisions/risks):
- `src/store/store.js` - Vuex state affecting model-vue components
- `src/components/PqsOneView.vue` - Main view with model-vue layout
- `src/*/map/**` - Map-related components and utilities
- `src/*/auth/**` - Authentication (requires risk acceptance)

**State Access Patterns**:
- Read state: `this.$store.state.map_levels`
- Mutations: `this.$store.commit('SET_MAP_LEVELS', levels)`
- Actions: `this.$store.dispatch('loadMapLevels')`

### Model-Vue Component Validation

Before suggesting changes that affect model-vue components:

```
⚠️ MODEL-VUE IMPACT ALERT: This change affects imported @plantquest/model-vue components.

Component: BasicNavStages
Required State: currentStage, stages, stageConfig
Your Change: Modifying 'currentStage' type from number to string

Impact Assessment:
❌ BREAKING: BasicNavStages expects currentStage to be a number
✅ Safe: Change maintains type compatibility

Actions Required:
1. Verify type compatibility with model-vue component expectations
2. Test navigation flows after changes
3. Check responsive layout implications
4. Reference model-vue compatibility decision if exists

Would you like me to suggest a compatible approach?
```

---

## 🚨 ACTIVE: Vue 2 to Vue 3 Migration

**URGENT**: This repository is undergoing Vue 2 to Vue 3 migration. Vue 2 reached EOL on December 31, 2023 (2+ years ago).

### Migration Provenance Records

**Decision**: [DEC-000018](provenance/decisions/model-vue/DEC-000018/decision.md) - Vue 3 Migration with Parallel Agent Approach  
**Specification**: [SPEC-000002](provenance/specs/SPEC-000002/spec.json) - Technical migration specification  
**Risk (CRITICAL)**: [RA-000002](provenance/risks/RA-000002/risk.md) - Risk of staying on Vue 2 (expires Q1 2026)  
**Risk (MEDIUM)**: [RA-000003](provenance/risks/RA-000003/risk.json) - Migration execution risks  
**Status**: Draft (pending approval), Timeline: 6-8 weeks

### Migration Components Schedule

Do NOT suggest Vue 2 improvements to these components - they are scheduled for migration:

**Agent 1 (Week 2-3)**: BasicLed, BasicFoot, BasicFieldPick  
**Agent 2 (Week 2-3)**: BasicAuth, BasicAdmin, BasicSide  
**Agent 3 (Week 2-3)**: BasicNavStages, BasicMain  
**Agent 4 (Week 2-3)**: BasicHead (1100+ lines)

### Migration Rules (MANDATORY)

1. **Before Suggesting Vue 2 Changes**:
   ```
   🚫 STOP: Component scheduled for Vue 3 migration
   
   Component: [name]
   Scheduled: Week [X], Agent [Y]
   Decision: DEC-000018
   
   DO NOT: Add Vue 2 features, refactor Vue 2 code
   INSTEAD: Make minimal bug fixes only if critical
   ```

2. **Vue 3 Code Pattern** (use during migration):
   ```vue
   <script setup lang="ts">
   import { ref, computed, onMounted } from 'vue'
   import { useVxgStore } from '@/composables/useVxgStore'
   
   // Composables (not direct store access)
   const { componentState, setComponentFlags } = useVxgStore()
   
   // Local state
   const localState = ref('')
   
   // Computed
   const isOpen = computed(() => componentState('Name').value?.show)
   
   // Methods
   const handleAction = () => {
     setComponentFlags('Name', { show: true })
   }
   
   // Lifecycle
   onMounted(() => {
     // Init
   })
   </script>
   ```

3. **Provenance Comments Required**:
   ```javascript
   /**
    * Migrated to Vue 3 Composition API
    * Decision: DEC-000018
    * Spec: SPEC-000002
    * Risk: RA-000003
    * @see provenance/decisions/model-vue/DEC-000018/decision.md
    */
   ```

4. **Testing Requirements**:
   - >80% coverage required (SPEC-000002)
   - Unit + integration tests
   - Both Vuex and Pinia adapter tests

5. **Consumer Impact**:
   ```
   ⚠️ CONSUMER IMPACT: Affects pqs-frontend
   
   Related: DEC-000017 (pqs-frontend migration)
   Required: Document in migration guide
   Action: Notify pqs-frontend team
   ```

6. **Parallel Agent Coordination**:
   - Work only on assigned components
   - Commit to agent-specific branch
   - Daily senior dev review required
   - NO cross-agent file modifications

### Quick Reference

- **Full Migration Plan**: `provenance/drafts/DEC-MODEL-VUE-002-vue3-migration-plan.md`
- **Risk Analysis**: `provenance/drafts/VUE2-RISK-ANALYSIS.md`
- **Quick Start**: `provenance/drafts/MIGRATION-QUICKSTART.md`
- **Library vs App**: `provenance/drafts/LIBRARY-VS-APP-MIGRATION.md`

---

**ENFORCEMENT LEVEL: STRICT**

This .cursorrules file enforces the ProvenanceCode methodology. All AI assistance must:
- Check for decisions before suggesting code
- Check migration schedule before suggesting Vue 2 changes
- Reference decision IDs in all significant code
- Flag violations immediately
- Recommend decision creation for architectural changes
- Follow Vue 3 migration patterns when migration is active
- Never bypass the decision-making process