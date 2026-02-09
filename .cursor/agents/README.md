# PQS Agent Team Structure

This directory contains specialized agent definitions for the PlantQuest System (PQS) development team. Each agent is an expert in their domain and works collaboratively with others.

## Team Roster

### 🎯 team-lead
**Role**: Coordinator and task planner  
**Use when**: Breaking down complex tasks, assigning work, tracking progress  
**Capabilities**:
- Plans and sequences work
- Assigns tasks to appropriate specialist agents
- Tracks dependencies and risks
- Ensures ProvenanceCode compliance

### 🏗️ solutions-architect
**Role**: System design and technical architecture  
**Use when**: New features, integrations, architectural decisions, risk assessment  
**Capabilities**:
- Designs system architecture
- Defines API contracts and data flows
- Evaluates technical tradeoffs
- Assesses risks and mitigations

### 🔧 fullstack-coder
**Role**: Full-stack implementation (Vue 2.x + Seneca.js)  
**Use when**: Features spanning frontend and backend  
**Capabilities**:
- Implements Vue 2.x frontend with Options API
- Implements Seneca.js backend with pattern-based routing
- Ensures frontend-backend integration
- Works with model-driven architecture

### 💻 backend-coder
**Role**: Backend microservices specialist  
**Use when**: Pure backend work (Seneca patterns, DynamoDB, Lambda)  
**Capabilities**:
- Implements Seneca.js message patterns
- Works with DynamoDB via seneca-dynamo-store
- Develops Lambda functions and ECS services
- Manages model-driven entities (model.json)

### 🎨 frontend-coder
**Role**: Frontend UI specialist  
**Use when**: Pure frontend work (Vue 2.x, components, Vuex)  
**Capabilities**:
- Implements Vue 2.x components (Options API only)
- Works with @plantquest/model-vue component library
- Manages Vuex store state
- Ensures connection pool compliance (max 4 concurrent)

### ☁️ devops-engineer
**Role**: Infrastructure and deployment specialist  
**Use when**: CloudFormation, ECS/Lambda deployment, DynamoDB setup  
**Capabilities**:
- Manages two-stack CloudFormation (VPC + Application)
- Deploys ECS services and Lambda functions
- Configures DynamoDB tables and IAM
- Sets up S3 + CloudFront hosting

## Agent Collaboration Matrix

| Task Type | Primary Agent | Supporting Agents | Workflow |
|-----------|---------------|-------------------|----------|
| **New Feature (Full-Stack)** | fullstack-coder | solutions-architect → fullstack-coder | Architect designs, fullstack implements |
| **Backend Service** | backend-coder | solutions-architect (if complex) | Architect defines patterns, backend implements |
| **UI Component** | frontend-coder | - | Frontend implements standalone |
| **Infrastructure Change** | devops-engineer | backend-coder (env vars) | DevOps deploys, backend configures |
| **Complex Project** | team-lead | All agents | Team lead breaks down, assigns to specialists |
| **Architecture Decision** | solutions-architect | team-lead | Architect proposes, team lead plans execution |
| **Integration** | solutions-architect | fullstack-coder or backend-coder | Architect designs, coder implements |

## Technology Stack Overview

### Frontend (main/frontend/)
- **Framework**: Vue 2.x with Options API
- **State**: Vuex store
- **Components**: @plantquest/model-vue
- **Async**: Promise chains (NO async/await)
- **HTTP**: Axios with connection pool (max 4 concurrent)
- **Hosting**: S3 + CloudFront

### Backend (main/backend/)
- **Runtime**: Node.js + TypeScript
- **Framework**: Seneca.js microservices
- **Model**: @voxgig/system (model-driven from model.json)
- **Database**: DynamoDB with seneca-dynamo-store
- **Deployment**: AWS Lambda + ECS Docker
- **IoT**: MQTT transport

### Infrastructure (AWS)
- **IaC**: CloudFormation (two-stack: VPC + Application)
- **Compute**: ECS (private subnets) + Lambda
- **Networking**: VPC, NLB, API Gateway with VPC Link
- **Database**: DynamoDB (on-demand billing)
- **CDN**: CloudFront + S3 website

## Example Workflows

### Scenario 1: New Asset Filter Feature

```
1. team-lead
   └─ Breaks down task into architecture + implementation

2. solutions-architect
   ├─ Defines API contract: role:asset,cmd:filter
   ├─ Designs entity query pattern
   └─ Proposes Vuex state structure

3. backend-coder
   ├─ Implements Seneca pattern: role:asset,cmd:filter
   ├─ Adds DynamoDB query with GSI
   └─ Tests with local.ts

4. frontend-coder
   ├─ Adds filter UI component (Vue 2 Options API)
   ├─ Updates Vuex store with filter state
   └─ Validates model-vue compatibility

5. devops-engineer
   └─ Deploys updated Lambda/ECS services
```

### Scenario 2: Backend API Change Only

```
1. backend-coder (standalone)
   ├─ Updates Seneca message pattern
   ├─ Modifies entity schema in model.json
   ├─ Tests locally
   └─ Reports changes
```

### Scenario 3: New Customer Deployment

```
1. team-lead
   └─ Plans deployment sequence

2. devops-engineer (parallel)
   ├─ Deploys VPC stack (new or shared)
   └─ Deploys application stack

3. backend-coder
   └─ Configures .env.{CLIENT_SITE}

4. frontend-coder
   └─ Configures .env.{CLIENT_SITE} for frontend

5. fullstack-coder
   └─ Integration testing
```

### Scenario 4: Architecture Redesign

```
1. solutions-architect
   ├─ Analyzes current architecture
   ├─ Proposes improvements
   ├─ Assesses risks
   └─ Recommends approach

2. team-lead
   ├─ Creates implementation plan
   ├─ Assigns tasks to agents
   └─ Tracks progress

3. {Specialist agents}
   └─ Execute assigned tasks
```

## Key Architectural Constraints

All agents must follow these PQS-specific constraints:

### Frontend
- ✅ Vue 2.x Options API ONLY (no Vue 3 Composition API)
- ✅ Promise chains (no async/await)
- ✅ Max 4 concurrent HTTP requests
- ✅ @plantquest/model-vue component compatibility
- ✅ Babel-compatible JavaScript

### Backend
- ✅ Seneca pattern-based routing (no direct REST)
- ✅ All entities defined in model.json
- ✅ Stateless plugins (Lambda compatibility)
- ✅ DynamoDB with `id` partition key (UUID)
- ✅ Multi-environment: local, docker, lambda

### Infrastructure
- ✅ Two-stack CloudFormation (VPC + Application)
- ✅ ECS in private subnets, NLB in public
- ✅ DynamoDB on-demand billing
- ✅ Multi-tenant table isolation (stage suffix)
- ✅ VPC Link for API Gateway → NLB

## ProvenanceCode Integration

All agents are trained to follow ProvenanceCode decisions:

- **Backend Decisions**: `main/backend/provenance/decisions/pqs-backend/`
  - DEC-000031: Seneca Microservices
  - DEC-000033: DynamoDB with seneca-dynamo-store
  - DEC-000041: @voxgig/system Framework

- **Frontend Decisions**: `main/frontend/provenance/decisions/pqs-frontend/`
  - DEC-000015: Connection Pool Management

- **Architecture**: `main/docs/deployment/TWO_STACK_ARCHITECTURE.md`

## When to Use Which Agent

### Use **team-lead** when:
- Task is complex and needs breakdown
- Multiple agents required
- Need to track progress across workstreams
- Unclear which agent to assign

### Use **solutions-architect** when:
- Designing new features or integrations
- Evaluating technical approaches
- Need architecture guidance
- Assessing risks or tradeoffs

### Use **fullstack-coder** when:
- Feature spans frontend AND backend
- Need tight frontend-backend integration
- Working on API contracts
- Full-stack testing required

### Use **backend-coder** when:
- Pure backend service work
- Seneca pattern implementation
- DynamoDB entity changes
- Lambda/ECS service updates

### Use **frontend-coder** when:
- Pure UI/component work
- Vuex store changes
- @plantquest/model-vue integration
- No backend changes needed

### Use **devops-engineer** when:
- Infrastructure deployment
- CloudFormation changes
- ECS/Lambda configuration
- DynamoDB table setup
- S3/CloudFront configuration

## Communication Protocols

### Agent-to-Agent Handoffs

1. **Architecture → Implementation**
   ```
   solutions-architect defines:
   - API contracts
   - Entity schemas
   - Data flow
   
   → Hands off to backend-coder/frontend-coder/fullstack-coder
   ```

2. **Implementation → Deployment**
   ```
   backend-coder/frontend-coder completes:
   - Code changes
   - Tests
   - Configuration updates
   
   → Hands off to devops-engineer for deployment
   ```

3. **Coordination → Execution**
   ```
   team-lead creates:
   - Task breakdown
   - Assignments
   - Dependencies
   
   → Distributes to specialist agents
   ```

### Output Standards

All agents provide:
- ✅ Summary of changes
- ✅ ProvenanceCode decisions followed
- ✅ Tests run and results
- ✅ Next steps or blockers

## Quick Reference

| Need | Agent | Command Example |
|------|-------|-----------------|
| Plan complex task | team-lead | "Break down new audit feature implementation" |
| Design architecture | solutions-architect | "Design integration with SAP system" |
| Full-stack feature | fullstack-coder | "Add asset filtering across frontend and backend" |
| Backend service | backend-coder | "Implement new Seneca pattern for asset sync" |
| UI component | frontend-coder | "Create asset detail modal component" |
| Deploy changes | devops-engineer | "Deploy updated backend to production" |

---

**Last Updated**: 2026-02-09  
**Maintained by**: PQS Development Team
