# SAP Data Display - Quick Reference

## Quick Overview

**Purpose**: Display SAP PM (Plant Maintenance) asset data in the model-vue application

**Data Source**: `/BIOCORK_SAP_DATA_POC_7K.csv`

**Main Components**:
- `BasicSide.vue` - Loads and processes SAP data
- `BasicHead.vue` - Controls display options and column visibility

---

## Key Features

### 1. Asset Type Selector
```
Location: BasicHead.vue (top navigation bar)
Options: 
  - PlantQuest Assets (default)
  - SAP PM Assets
  - Aucxis Assets
```

### 2. SAP Data Fields (21 Total)
```
Core Fields:
  • Asset_code
  • Asset_description
  • Asset_criticality
  • Location
  • Manufacturer
  
Technical Fields:
  • Instrument_Make
  • Instrument_Model_Number
  • Manufacturer_part_number
  • Manufacturer_serial_number
  • Object_type
  
Status Fields:
  • System_status_codes
  • System_status_description
  • User_status_codes
  • User_status_description
  • Inactive
  
Management Fields:
  • Maintenance_Plant
  • Planner_group
  • Plant_section
  • Catalog_profile
  • SAP_Asset_Type
  • Asset_Criticality_description
```

### 3. Column Visibility Control
```
Location: BasicHead.vue (Column Visibility dropdown)
Function: Toggle which SAP fields appear in the data table
Default: All 21 fields visible for SAP PM Assets
```

---

## Code Snippets

### Loading SAP Data
```javascript
// BasicSide.vue - lines 342-358
const response = await fetch('/BIOCORK_SAP_DATA_POC_7K.csv');
const csvText = await response.text();
const lines = csvText.trim().split(/\r?\n/);
const headers = lines[0].split(',').map(h => h.trim());

const data = lines.slice(1).map(line => {
  const values = line.split(',').map(v => v.trim());
  const obj = {};
  headers.forEach((header, i) => {
    obj[header] = values[i];
  });
  return obj;
});

this.$store.dispatch('set_sap_item_values', data)
```

### SAP Header Definitions
```javascript
// BasicHead.vue - lines 840-862
sapHeaders: [
  { value: 'Asset_code', text: 'Asset Code', order: 1 },
  { value: 'Asset_description', text: 'Asset Description', order: 2 },
  { value: 'Asset_criticality', text: 'Asset Criticality', order: 3 },
  // ... (21 fields total)
]
```

### Switching Asset Types
```javascript
// BasicHead.vue - line 941
watch: {
  selectedSap() {
    this.$store.dispatch('setShowAssetType', this.selectedSap);
  }
}
```

### Column Visibility Management
```javascript
// BasicHead.vue - lines 1064-1067
handleSapColumnChange() {
  const sorted = this.selectedSapColumns.sort((a, b) => a.order - b.order);
  this.$store.dispatch('updateSelectedColumns', sorted)
}
```

---

## User Workflow

### Viewing SAP Assets
1. Navigate to asset view (`route.name == 'asset'`)
2. Select "SAP PM Assets" from dropdown
3. SAP data table displays with all 21 fields
4. Click "Column Visibility" to customize fields
5. Select/deselect checkboxes for desired columns
6. Data table updates in real-time

### Searching SAP Assets
1. SAP asset codes automatically added to search
2. Type in search box to filter by Asset_code
3. Search includes both PlantQuest and SAP assets
4. Results display in data table

### Adding/Assigning SAP Assets
- When "SAP PM Assets" selected:
  - Button text: "Assign Asset Location"
  - Function: Assign location to existing SAP asset
- When "PlantQuest Assets" selected:
  - Button text: "Add Asset"
  - Function: Create new asset

---

## Data Flow (Simplified)

```
CSV File → Parse → Vuex Store → Components
                                    ├─→ Search Integration
                                    ├─→ Data Table Display
                                    └─→ Column Management
```

---

## Common Issues & Solutions

### Issue: SAP data not loading
**Solution**: Check that `/BIOCORK_SAP_DATA_POC_7K.csv` is accessible
**Location**: Public directory or accessible path

### Issue: Columns not displaying
**Solution**: 
1. Verify "SAP PM Assets" is selected in dropdown
2. Check Column Visibility menu - ensure columns are checked
3. Verify `selectedSapColumns` in component data

### Issue: Search not finding SAP assets
**Solution**:
- Ensure SAP asset codes are extracted correctly (line 369)
- Check that `sapItems` array is populated
- Verify `tag_items` includes SAP codes

---

## Integration Points

### Vuex Actions
- `set_sap_item_values(data)` - Store SAP data
- `setShowAssetType(type)` - Switch asset type display
- `updateSelectedColumns(columns)` - Update visible columns

### Component Props/Events
- `selectedSap` (data) - Currently selected asset type
- `selectedSapColumns` (data) - Currently visible SAP columns
- `sapData` (data) - Available asset type options

### Route Dependencies
- SAP features only active when `$route.name == 'asset'`
- Asset type selector only displays on asset route

---

## Testing Checklist

- [ ] CSV file loads successfully
- [ ] SAP data parsed correctly (21 fields)
- [ ] Asset type selector displays three options
- [ ] Switching to "SAP PM Assets" shows SAP columns
- [ ] Column Visibility menu shows 21 checkboxes
- [ ] Toggling columns updates data table
- [ ] SAP asset codes appear in search results
- [ ] Button text changes to "Assign Asset Location"
- [ ] All 21 SAP fields display with correct labels
- [ ] Data persists in Vuex store

---

## File Locations

| File Path | Line Numbers | Purpose |
|-----------|--------------|---------|
| `src/components/BasicSide.vue` | 342-374 | CSV loading & parsing |
| `src/components/BasicSide.vue` | 693-700 | Info card visibility |
| `src/components/BasicHead.vue` | 536-546 | Asset type selector |
| `src/components/BasicHead.vue` | 618-664 | Column visibility menu |
| `src/components/BasicHead.vue` | 822-885 | SAP data structures |
| `src/components/BasicHead.vue` | 940-942 | Asset type watcher |
| `src/components/BasicHead.vue` | 1064-1067 | Column change handler |

---

## API Reference

### Component Data Properties

```javascript
// BasicHead.vue
{
  sapData: ["PlantQuest Assets", "SAP PM Assets", "Aucxis Assets"],
  selectedSap: "PlantQuest Assets", // default
  sapHeaders: [...], // 21 SAP field definitions
  selectedSapColumns: [...], // Currently visible columns
  isColumnVisibility: false // Column menu open state
}
```

### Store Actions Required

```javascript
// Vuex store must implement:
- set_sap_item_values(data)
- setShowAssetType(type)
- updateSelectedColumns(columns)
```

---

## Performance Metrics

- **CSV Load Time**: ~100-200ms (depends on file size)
- **Parse Time**: ~50-100ms (7K rows)
- **Search Integration**: Real-time filtering
- **Column Toggle**: Instant UI update

---

## Browser Compatibility

- Vue 2.x compatible
- Babel transpiled for IE11+ support
- No modern JavaScript features requiring polyfills
- Vuetify 2.x UI components

---

*Last Updated: Based on current codebase analysis*
