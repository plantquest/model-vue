# DEC-000008 - @plantquest/model-vue Component Library

## Summary
Use @plantquest/model-vue component library for core UI components (BasicNavStages, BasicSide, BasicHead, BasicMain) with strict state compatibility requirements.

## Status
**Implemented** - Core UI dependency

## Context
The PQS frontend requires standardized UI components across multiple @plantquest applications. The @plantquest/model-vue library provides:
- **BasicNavStages**: Stage-based navigation with progress tracking
- **BasicSide**: Collapsible side panel for content
- **BasicHead**: Toolbar with action buttons (go, clear, add, print, bookmark, filter)
- **BasicMain**: Main content area

These components have strict state requirements and must be compatible with Vuex store structure.

### Evidence
- User rules document extensive state requirements
- package.json: `@plantquest/model-vue` dependency
- store.js: `vxg` state object for component configuration
- Multiple components import from @plantquest/model-vue

## Decision
Use **@plantquest/model-vue** component library and maintain **strict state compatibility** through the `vxg` store object.

### Required State Structure

```javascript
state: {
  vxg: {
    ent: {
      meta: { name: 'Item' }
    },
    cmp: {
      BasicSide: {
        show: true
      },
      BasicMain: {
        show: false
      },
      BasicHead: {
        allow: {
          go: true, clear: true, add: true,
          remove: true, select: true, print: true,
          bookmark: true, collect: true
        },
        show: {
          go: true, clear: true, add: true,
          remove: true, search: true, filter: true,
          select: true, print: true, bookmark: true,
          collect: true
        }
      }
    }
  }
}
```

### Component State Rules (from user rules)

```javascript
// BasicNavStages
{
  allowedStates: ['currentStage', 'stages', 'stageConfig'],
  stateRules: {
    currentStage: { type: 'number', required: true },
    stages: { type: 'array', required: true },
    stageConfig: {
      type: 'object',
      properties: {
        allowSkip: 'boolean',
        showLabels: 'boolean'
      }
    }
  }
}

// BasicSide
{
  allowedStates: ['isOpen', 'content', 'width'],
  stateRules: {
    isOpen: { type: 'boolean', required: true },
    content: { type: 'object', required: true },
    width: { type: 'number', default: 280 }
  }
}
```

## Alternatives Considered

### Option 1: Custom Component Implementation
**Rejected** - Duplication across projects
- **Pros**: Full control, no dependency
- **Cons**: Duplicated effort, inconsistent UX across projects

### Option 2: Vuetify Components Only
**Rejected** - Doesn't provide domain-specific components
- **Pros**: Standard library, well-documented
- **Cons**: No stage navigation, no toolbar patterns, requires custom wrappers

### Option 3: Build Custom Library
**Rejected** - Time and maintenance cost
- **Pros**: Tailored to needs
- **Cons**: High development cost, maintenance burden

## Consequences

### Positive
✅ Consistent UI across @plantquest applications  
✅ Standardized navigation and toolbar patterns  
✅ Shared maintenance and bug fixes  
✅ Proven components (used in production)  

### Negative
⚠️ State compatibility requirements (strict structure)  
⚠️ Version dependency management  
⚠️ Breaking changes affect all dependent projects  
⚠️ Must follow library conventions  

## High-Risk Areas (from user rules)

1. **Map Level Management**
   - Changes affecting BasicNavStages navigation
   - Stage progression logic
   - Level data structure modifications

2. **Layout Changes**
   - BasicSide visibility and width
   - BasicHead control visibility
   - Map component positioning

3. **State Dependencies**
   - Filter state changes
   - Bookmark visibility
   - Asset selection state

## Compliance & Validation
- ❌ **VIOLATION**: Modifying `vxg` state structure without checking component compatibility
- ❌ **VIOLATION**: Breaking state rules for BasicNavStages/BasicSide/BasicHead
- ✅ **COMPLIANT**: Using `set_cmp_flags` action to update component flags
- ✅ **COMPLIANT**: Maintaining required state properties

## References
- .cursor/rules: Extensive model-vue component documentation
- store.js: Lines 143-183 (vxg state object)

## Tags
`component-library`, `ui`, `model-vue`, `dependencies`, `state-management`

## Version History
- **v1.0** (2026-02-06): Initial documentation of existing decision
