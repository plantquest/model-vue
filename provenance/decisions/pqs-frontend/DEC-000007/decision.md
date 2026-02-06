# DEC-000007 - Seneca Microservice Backend

## Summary
Use Seneca.js microservice framework with entity-based data model for backend API communication and data persistence.

## Status
**Implemented** - Core backend architecture

## Context
The PQS frontend requires a flexible backend integration that supports:
- **Entity-Based Data Model**: Assets, devices, users, rooms, groups, audits
- **Message Pattern Routing**: `aim:web,on:auth,signin:user` style endpoints
- **Backend Flexibility**: Easy to swap backend implementations
- **Real-Time Communication**: Potential for WebSocket support
- **Middleware**: Custom entity processing (e.g., device outdating on asset save)

### Backend Architecture Requirements
- **Microservices**: Different services for auth, assets, devices, users
- **Loose Coupling**: Frontend doesn't need to know backend structure
- **Pattern Matching**: Route messages by patterns, not URLs
- **Entity CRUD**: Standard load$/save$/list$/remove$ operations
- **Browser Support**: Must work in browser environment

### Evidence
- **store.js**: 40+ Seneca entity calls (`seneca.entity('pqs/asset').list$()`)
- **Seneca Patterns**: `aim:web,on:auth,signin:user` message patterns
- **Entity Middleware**: Custom interceptors for entity operations
- **package.json**: `seneca`, `seneca-browser`, `seneca-entity` dependencies

## Decision
Use **Seneca.js** with **entity-based data model** for all backend communication. Entities follow the pattern `base/name` (e.g., `pqs/asset`, `sys/user`).

### Entity Pattern

```javascript
// CRUD operations on entities
const seneca = await import('seneca')

// Load single asset by ID
const asset = await seneca.entity('pqs/asset').load$(assetId)

// List assets with query
const assets = await seneca.entity('pqs/asset').list$({
  custom$: { lister: true },
  fields$: ['id', 'tag', 'xco', 'yco', 'icon']
})

// Save (create or update)
const savedAsset = await seneca.entity('pqs/asset').data$(asset).save$()

// Remove
await seneca.entity('pqs/asset').remove$(assetId)
```

### Message Pattern API

```javascript
// Authentication
const authResult = await seneca.post('aim:web,on:auth,signin:user', {
  email: user.email,
  password: password
})

// User registration
const registerResult = await seneca.post('aim:web,on:user,cmd:registeruser', {
  data: {
    user: {
      email: user.email,
      name: user.name,
      profile: user.profile
    }
  }
})
```

### Entity Middleware

```javascript
// Intercept entity operations
seneca.add('role:entity,cmd:save,base:pqs,name:asset', async function(msg, reply) {
  // Custom logic before save
  if (msg.q && msg.q.directive$ && msg.q.directive$.ignoreDevice) {
    // Skip device outdating
  } else {
    await outdate_devices()
  }
  
  // Call original save
  return await this.prior(msg, reply)
})

// Sort groups on list
seneca.add('role:entity,cmd:list,base:pqs,name:group', function(msg, reply) {
  this.prior(msg, function(err, list) {
    if (err) return reply(err)
    list = list.sort((a, b) => a.order - b.order)
    reply(list)
  })
})
```

## Entity Schema

### Primary Entities

```javascript
// pqs/asset - Main assets (equipment, rooms, etc.)
{
  id: 'uuid',
  tag: 'ASSET-001',
  xco: 123.45,
  yco: 678.90,
  zco: 0,
  icon: 'valve',
  atype: 'Valve',
  discipline1: 'Mechanical',
  description: 'Asset description',
  manufacturer: 'Company',
  model: 'Model-X',
  serial: 'SN123',
  map: 'Floor 1',
  building: 'Building A',
  level: 'L1',
  room: 'Room-101',
  photocount: 3,
  archived: null,
  audit: {timestamp, user, action}
}

// pqs/device - Mobile devices
{
  id: 'uuid',
  tag: 'DEVICE-001',
  key: 'device-key-uuid',
  status: 'active' | 'outofdate',
  last: timestamp
}

// sys/user - Users
{
  id: 'email@example.com',
  email: 'email@example.com',
  name: 'John Doe',
  profile: 'gea' | 'sea' | 'eo' | 'ob',
  phone_number: '+1234567890',
  job_title: 'Engineer',
  active: true,
  xgroup: 'standard'
}

// pqs/collect - Work pack collections
{
  id: 'uuid',
  asset: ['asset-id-1', 'asset-id-2'],
  name: 'Work Pack Name',
  date: '01/15/2026'
}

// pqs/attach - Photo/document attachments
{
  id: 'uuid',
  asset_id: 'asset-uuid',
  kind: 'photo' | 'document',
  file: 's3://bucket/path/to/file.jpg'
}

// pqs/audit - Audit trail
{
  id: 'uuid',
  action: 'create' | 'update' | 'delete',
  entity_type: 'asset',
  entity_id: 'uuid',
  user: 'user-id',
  timestamp: 'iso-timestamp',
  changes: {}
}

// pqs/group - Asset groups/categories
{
  id: 'uuid',
  name: 'Group Name',
  order: 1,
  config: {}
}
```

## Alternatives Considered

### Option 1: REST API with Axios
**Rejected** - Too rigid, requires URL management
- **Pros**: Standard, well-known pattern, easy debugging
- **Cons**: URL management, versioning, rigid structure, no pattern matching

### Option 2: GraphQL
**Rejected** - Overkill, requires backend rewrite
- **Pros**: Flexible queries, typed schema, single endpoint
- **Cons**: Complex setup, backend rewrite needed, learning curve

### Option 3: Raw Fetch API
**Rejected** - Too low-level, no structure
- **Pros**: No dependencies, full control
- **Cons**: Manual serialization, error handling, no patterns, boilerplate

### Option 4: tRPC
**Rejected** - Requires TypeScript, modern stack
- **Pros**: Type-safe, modern, good DX
- **Cons**: Requires TypeScript, Vue 3, complete rewrite

## Consequences

### Positive
✅ Flexible message pattern routing (`aim:web,on:auth,signin:user`)  
✅ Entity-based data model is intuitive (CRUD operations)  
✅ Backend implementation can change without frontend changes  
✅ Custom middleware for cross-cutting concerns (device outdating)  
✅ Browser and Node.js compatible (seneca-browser)  
✅ Easy to add new entities without frontend refactoring  
✅ Pattern matching enables microservice architecture  
✅ No URL management or versioning needed  

### Negative
⚠️ Seneca.js is less common than REST/GraphQL (team unfamiliarity)  
⚠️ Limited ecosystem compared to REST (fewer tools, docs)  
⚠️ Pattern matching can be hard to debug ("where is this handler?")  
⚠️ Entity model lacks type safety (no TypeScript)  
⚠️ Browser bundle size increased by Seneca dependencies  
⚠️ Migration to REST would require significant refactoring  

### Technical Debt
- **No Type Safety**: Entity fields not typed (migration to TypeScript needed)
- **Large Store File**: 40+ entity calls in single file (1660 lines)
- **No API Documentation**: Seneca patterns not documented in OpenAPI/Swagger

## Implementation Patterns

### Vuex Actions with Seneca

```javascript
// ✅ CORRECT: Seneca entity in Vuex action
actions: {
  async list_main_asset({commit}, {vitems, values}) {
    const assets = await seneca.entity('pqs/asset').list$({
      custom$: {lister: true},
      fields$: ['id', 'tag', 'xco', 'yco', 'icon', 'atype']
    });
    
    commit('list_main_asset', vitems);
    commit('set_values', values);
  },
  
  async save_main_asset({commit}, {item, changeControl}) {
    let asset = await seneca.entity('pqs/asset').load$(item.id);
    
    if (!asset) {
      asset = clean_asset({...item});
      delete asset.id;
      asset.audit = changeControl;
    }
    
    return await seneca.entity('pqs/asset').data$(asset).save$();
  }
}
```

### Component Usage

```javascript
// ✅ CORRECT: Use Vuex actions, not direct Seneca calls
methods: {
  loadAssets() {
    this.$store.dispatch('list_main_asset', {
      vitems: [],
      values: {}
    })
    .then(() => {
      this.isLoading = false;
    });
  }
}

// ❌ WRONG: Direct Seneca calls in components
methods: {
  async loadAssets() {
    const assets = await seneca.entity('pqs/asset').list$();
    // Don't do this - use Vuex actions
  }
}
```

### Entity Field Filtering

```javascript
// System fields to exclude on save
const systemFields = {
  id: true,
  _version: true,
  _deleted: true,
  _lastChangedAt: true,
  createdAt: true,
  updatedAt: true
};

function clean_asset(asset) {
  for (let p in asset) {
    // Remove Seneca internal fields
    if (p.includes('$')) {
      delete asset[p];
    }
    // Remove system fields
    if (systemFields[p]) {
      delete asset[p];
    }
  }
  return asset;
}
```

## Impact on Architecture

### Related Decisions
- **DEC-000004**: Vuex State Management (actions use Seneca)
- **DEC-000003**: Promise-Based Async (entity methods return Promises)
- **DEC-000005**: Kinde OAuth (auth messages to Seneca)
- **DEC-000006**: Session Management (session APIs)

### Protected Patterns
- **Entity CRUD**: Always use `load$`, `save$`, `list$`, `remove$`
- **Vuex Integration**: Entity calls in actions, not components
- **Field Cleaning**: Remove `$` fields and system fields before save
- **Custom Middleware**: Use `seneca.add()` for entity interceptors

### Code Comments

```javascript
/**
 * Load asset entity from backend
 * Uses Seneca entity pattern per DEC-000007
 * @see provenance/decisions/DEC-000007/decision.md
 */
actions: {
  async load_main_asset({commit}, {id}) {
    const asset = await seneca.entity('pqs/asset').load$(id);
    return asset;
  }
}
```

## Compliance & Validation
- ❌ **VIOLATION**: Direct Seneca calls in Vue components
- ❌ **VIOLATION**: Not cleaning entity fields before save
- ❌ **VIOLATION**: Creating entity patterns without documentation
- ✅ **COMPLIANT**: Entity calls in Vuex actions
- ✅ **COMPLIANT**: Using `load$`, `save$`, `list$`, `remove$` methods
- ✅ **COMPLIANT**: Message patterns for non-CRUD operations

## Migration Path
If migrating to REST API:
1. Create REST endpoints matching entity operations
2. Create API client wrapper matching Seneca interface
3. Replace `seneca.entity()` with API client
4. Update Vuex actions to use new client
5. Test thoroughly (100+ entity calls to migrate)
6. Estimated effort: 4-6 weeks

## References
- [Seneca.js Documentation](https://senecajs.org/)
- [Seneca Entity Pattern](https://senecajs.org/docs/tutorials/understanding-data-entities.html)
- src/plugins/store.js: Extensive Seneca entity usage
- [Seneca Browser Adapter](https://github.com/senecajs/seneca-browser)

## Tags
`backend`, `seneca`, `microservices`, `entities`, `api`, `message-patterns`

## Version History
- **v1.0** (2026-02-06): Initial documentation of existing decision
