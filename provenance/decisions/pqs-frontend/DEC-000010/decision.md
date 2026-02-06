# DEC-000010 - NavVis 3D Integration

## Summary
Integrate NavVis IVION 3D viewer for immersive facility navigation and three-mode asset positioning system.

## Status
**Implemented** - Production feature

## Context
PQS requires 3D facility visualization with:
- **Immersive Navigation**: Virtual walkthrough of facilities
- **Asset Positioning**: Place/reposition assets in 3D space
- **Coordinate Capture**: Get XYZ coordinates from 3D viewer
- **Three Modes**: position-asset, reposition-asset, add-asset

### Three-Mode Positioning System
1. **position-asset**: First-time positioning of new asset
2. **reposition-asset**: Move existing asset to new location
3. **add-asset**: Quick-add asset at clicked location

## Decision
Integrate **NavVis IVION SDK** with **three-mode asset positioning** state management in Vuex.

### State Structure
```javascript
state: {
  navvisPositioning: {
    activeMode: null,  // 'position-asset' | 'reposition-asset' | 'add-asset'
    pendingCoordinates: null,  // { x, y, z }
    targetAssetId: null,
    viewport: null,
    isActive: false
  },
  navvisEvent: {
    action: null,
    timestamp: null,
    data: null
  }
}
```

### Components
- **PqsNavvisView.vue**: 2793 lines - Main 3D viewer integration
- **navvisPositioning.js**: 185 lines - Positioning logic

## Alternatives Considered
- **Matterport**: Rejected - licensing cost
- **Custom WebGL**: Rejected - development time
- **Mapbox 3D**: Rejected - not facility-focused

## Consequences
### Positive
✅ Immersive 3D facility navigation  
✅ Accurate asset positioning in 3D space  
✅ Three-mode system for different workflows  
✅ Coordinate integration with 2D maps  

### Negative
⚠️ Large component file (2793 lines)  
⚠️ NavVis SDK dependency and licensing  
⚠️ Complex state management  
⚠️ Performance considerations for large facilities  

## References
- src/components/PqsNavvisView.vue: 2793 lines
- src/utils/navvisPositioning.js: 185 lines
- store.js: Lines 119-132 (navvisPositioning state)

## Tags
`navvis`, `3d-visualization`, `asset-positioning`, `coordinate-capture`

## Version History
- **v1.0** (2026-02-06): Initial documentation
