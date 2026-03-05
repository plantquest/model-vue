# SAP Data Display Documentation

## Overview
This document describes how SAP (Systems, Applications, and Products) data is loaded, processed, and displayed in the model-vue application, specifically in the popover/info card interface.

## Table of Contents
1. [Data Loading](#data-loading)
2. [Data Structure](#data-structure)
3. [Display Components](#display-components)
4. [User Interface](#user-interface)
5. [Data Flow](#data-flow)

---

## Data Loading

### Source File
SAP data is loaded from a CSV file located at:
```
/BIOCORK_SAP_DATA_POC_7K.csv
```

### Loading Process
The data is loaded in `BasicSide.vue` during the component's `created()` lifecycle:

```javascript
// Location: src/components/BasicSide.vue, lines 342-358
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

### Store Integration
The parsed SAP data is stored in Vuex state via the `set_sap_item_values` action, making it available throughout the application.

---

## Data Structure

### SAP Asset Fields
The SAP data structure includes the following fields (as defined in `BasicHead.vue`):

| Field Name | Display Label | Order |
|------------|---------------|-------|
| `Asset_code` | Asset Code | 1 |
| `Asset_description` | Asset Description | 2 |
| `Asset_criticality` | Asset Criticality | 3 |
| `Asset_Criticality_description` | Criticality Description | 4 |
| `Catalog_profile` | Catalog Profile | 5 |
| `Inactive` | Inactive | 6 |
| `Instrument_Make` | Instrument Make | 7 |
| `Instrument_Model_Number` | Instrument Model Number | 8 |
| `Location` | Location | 9 |
| `Maintenance_Plant` | Maintenance Plant | 10 |
| `Manufacturer` | Manufacturer | 11 |
| `Manufacturer_part_number` | Manufacturer Part Number | 12 |
| `Manufacturer_serial_number` | Manufacturer Serial Number | 13 |
| `Object_type` | Object Type | 14 |
| `Planner_group` | Planner Group | 15 |
| `Plant_section` | Plant Section | 16 |
| `SAP_Asset_Type` | SAP Asset Type | 17 |
| `System_status_codes` | System Status Codes | 18 |
| `System_status_description` | System Status Description | 19 |
| `User_status_codes` | User Status Codes | 20 |
| `User_status_description` | User Status Description | 21 |

### CSV Format
The CSV file follows this structure:
- **Header Row**: Contains field names (e.g., Asset_code, Asset_description, etc.)
- **Data Rows**: Each subsequent row represents one SAP asset with values corresponding to the headers

---

## Display Components

### Asset Type Selector
Located in `BasicHead.vue` (lines 536-546), users can switch between different asset data sources:

```vue
<v-select
  v-if="$route.name == 'asset'"
  style="max-width:20%;display:inline-block;margin: 0 10px;"
  v-model="selectedSap"
  :items="sapData"
  :return-object="true"
  solo
  dense
  hide-details
>
</v-select>
```

**Available Options:**
- PlantQuest Assets (default)
- SAP PM Assets
- Aucxis Assets

### Column Visibility Control
Users can customize which SAP columns are displayed through a dropdown menu in `BasicHead.vue` (lines 618-664):

```vue
<v-menu
  v-model="isColumnVisibility"
  :close-on-content-click="false"
  offset-y
>
  <template v-slot:activator="{ on, attrs }">
    <v-btn>Column Visibility</v-btn>
  </template>
  
  <v-card>
    <!-- SAP Column Checkboxes -->
    <div v-if="selectedSap == 'SAP PM Assets'" v-for="(item, index) in sapHeaders">
      <v-checkbox
        v-model="selectedSapColumns"
        @change="handleSapColumnChange"
        :label="item.text"
        :value="item"
      ></v-checkbox>
    </div>
  </v-card>
</v-menu>
```

### Default Visible Columns
When SAP PM Assets is selected, all 21 SAP fields are visible by default (lines 863-885):

```javascript
selectedSapColumns: [
  { value: 'Asset_code', text: 'Asset Code', order: 1 },
  { value: 'Asset_description', text: 'Asset Description', order: 2 },
  { value: 'Asset_criticality', text: 'Asset Criticality', order: 3 },
  // ... all 21 fields
]
```

---

## User Interface

### Popover/Info Card Display
The SAP data is displayed in an information card/popover interface when users interact with assets on the map or in the asset list. The display is managed through:

1. **Side Info Card Visibility**: Controlled by the `toggleSideInfoCardVisibility` action in BasicSide.vue (line 693)
2. **Info Card Toggle**: Triggered when closing or opening asset information
```javascript
closeSideInfoCard() {
  this.toggleSideInfoCardVisibility(false);
}
```

### Search Integration
SAP asset codes are integrated into the search functionality:

```javascript
// Location: BasicSide.vue, lines 369-374
const assetCodes = lines.slice(1).map(line => {
  const values = line.split(',').map(v => v.trim());
  const obj = {};
  headers.forEach((header, i) => {
    obj[header] = values[i];
  });
  return obj.Asset_code || null;
}).filter(Boolean);

this.sapItems = assetCodes;
```

These SAP asset codes are then merged with the standard search items:
```javascript
this.tag_items = [
  ...this.items.filter(v => v && v.tag).map(v => v.tag_alias).filter(Boolean),
  ...assetCodes
];
```

### Dynamic Button Text
The "Add Asset" button changes its text based on whether SAP PM Assets is selected (lines 700-702):

```vue
<span v-if="selectedSap !== 'SAP PM Assets'">
  Add {{ itemName == 'Asset' ? 'Asset' : itemName }}
</span>
<span v-else>Assign Asset Location</span>
```

---

## Data Flow

### Complete Data Flow Diagram

```
┌─────────────────────────────────┐
│  BIOCORK_SAP_DATA_POC_7K.csv   │
└────────────┬────────────────────┘
             │
             │ fetch()
             ▼
      ┌──────────────┐
      │  CSV Parsing │
      │  (BasicSide) │
      └──────┬───────┘
             │
             │ this.$store.dispatch('set_sap_item_values', data)
             ▼
      ┌──────────────┐
      │  Vuex Store  │
      │   (State)    │
      └──────┬───────┘
             │
             ├─────────────────────────────┐
             │                             │
             ▼                             ▼
    ┌────────────────┐           ┌─────────────────┐
    │  Search Items  │           │  BasicHead.vue  │
    │  Integration   │           │   (Display)     │
    └────────────────┘           └─────────────────┘
             │                             │
             │                             │
             ▼                             ▼
    ┌────────────────┐           ┌─────────────────┐
    │  Asset Search  │           │ Data Table with │
    │  (tag_items)   │           │ SAP Columns     │
    └────────────────┘           └─────────────────┘
                                          │
                                          ▼
                                 ┌─────────────────┐
                                 │  Column Filter  │
                                 │  & Visibility   │
                                 └─────────────────┘
```

### Step-by-Step Flow

1. **Initialization** (BasicSide.vue created hook)
   - Fetch CSV file from `/BIOCORK_SAP_DATA_POC_7K.csv`
   - Parse CSV into JavaScript objects
   - Extract asset codes for search integration

2. **Store Update**
   - Dispatch `set_sap_item_values` action with parsed data
   - Data becomes available globally via Vuex store

3. **Search Enhancement**
   - SAP asset codes added to `tag_items` array
   - Enables users to search for SAP assets alongside PlantQuest assets

4. **Display Selection** (BasicHead.vue)
   - User selects asset type from dropdown (PlantQuest/SAP PM/Aucxis)
   - Selection triggers `setShowAssetType` dispatch

5. **Column Management**
   - User can toggle column visibility via "Column Visibility" menu
   - Changes trigger `updateSelectedColumns` dispatch
   - Data table updates to show/hide selected columns

6. **Popover/Info Card Display**
   - When user interacts with an asset, info card displays
   - SAP data fields shown based on selected columns
   - Info card visibility managed by `toggleSideInfoCardVisibility`

---

## Implementation Notes

### Vue 2.x Compatibility
All SAP data handling uses Vue 2.x patterns:
- Promise-based async operations (no async/await)
- Options API (no Composition API)
- Vuex state management

### Performance Considerations
- CSV parsing happens once during component initialization
- Data is cached in Vuex store for efficient access
- Search items are pre-processed and filtered to avoid null values

### Error Handling
The code includes null-safety checks throughout:
```javascript
// Example from BasicSide.vue
.filter(v => v && v.tag)
.map(v => v.tag_alias)
.filter(Boolean)
```

---

## Related Files

| File | Purpose |
|------|---------|
| `src/components/BasicSide.vue` | SAP data loading and search integration |
| `src/components/BasicHead.vue` | Asset type selector, column visibility, SAP headers definition |
| `src/components/BasicLed.vue` | Data table display with filtering |
| `/BIOCORK_SAP_DATA_POC_7K.csv` | Source CSV file containing SAP asset data |

---

## Future Enhancements

Potential improvements for SAP data display:

1. **Lazy Loading**: Load SAP data on-demand rather than at initialization
2. **API Integration**: Replace CSV loading with real-time API calls
3. **Caching**: Implement client-side caching for frequently accessed SAP data
4. **Export**: Add ability to export filtered SAP data
5. **Customization**: Allow users to save their column visibility preferences
6. **Validation**: Add data validation for SAP asset codes and fields

---

## Support

For questions or issues related to SAP data display, please refer to:
- Main project README: `/README.md`
- Component source code in `/src/components/`
- Project user rules in `.cursor/rules/`
