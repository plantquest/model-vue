# DEC-000009 - Leaflet Mapping Library

## Summary
Use Leaflet 1.7.1 with vue2-leaflet for 2D interactive maps displaying assets, rooms, and navigation paths.

## Status
**Implemented** - Core visualization

## Context
PQS requires interactive 2D floor plans showing:
- Asset markers with custom icons
- Room polygons with boundaries
- Marker clustering for dense areas
- Zoom/pan controls
- Printing capabilities
- Path visualization for navigation

## Decision
Use **Leaflet 1.7.1** with **vue2-leaflet 2.7.0** and plugins: markercluster, browser.print, toolbar.

### Core Implementation
```javascript
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LPolygon } from 'vue2-leaflet'
import 'leaflet.markercluster'
import 'leaflet.browser.print'
```

## Alternatives Considered
- **Mapbox GL JS**: Rejected - 3D not needed, cost
- **Google Maps**: Rejected - licensing cost, overkill
- **OpenLayers**: Rejected - more complex API

## Consequences
### Positive
✅ Lightweight, mature library  
✅ Vue 2 integration via vue2-leaflet  
✅ Extensive plugin ecosystem  
✅ Custom icons and markers  
✅ Room polygon support  

### Negative
⚠️ 2D only (3D requires WebGL libraries)  
⚠️ Custom coordinate system requires transforms  
⚠️ Plugin maintenance (some outdated)  

## References
- package.json: Lines 33-36 (leaflet dependencies)
- src/components/PqsViewMap.vue: Map implementation

## Tags
`mapping`, `leaflet`, `visualization`, `2d-maps`

## Version History
- **v1.0** (2026-02-06): Initial documentation
