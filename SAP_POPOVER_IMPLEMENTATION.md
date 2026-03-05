# SAP Data Popover Implementation Guide

## Overview
This document specifically addresses how SAP data is rendered in popover/info card interfaces when users interact with assets in the model-vue application.

---

## Popover Architecture

### Component Hierarchy
```
BasicSide.vue (Parent)
    ├─→ Manages SAP data loading
    ├─→ Controls info card visibility
    └─→ Dispatches to Vuex store
            ↓
    SideInfoCard / Popover Component (Consumer)
        ├─→ Receives SAP data from store
        ├─→ Renders SAP fields dynamically
        └─→ Displays in overlay/popover UI
```

### Visibility Control

The popover visibility is managed through Vuex actions in `BasicSide.vue`:

```javascript
// Line 693-700
methods: {
  ...mapActions(['toggleSideInfoCardVisibility']),
  
  closeSideInfoCard() {
    this.toggleSideInfoCardVisibility(false);
  }
}
```

**Key Points:**
- `toggleSideInfoCardVisibility` - Controls whether the info card/popover is shown
- Called when user clicks on an asset marker or closes the info panel
- State managed centrally through Vuex for consistency

---

## Data Preparation for Popover

### SAP Data Structure in Store

When SAP data is loaded, it's stored with the following structure:

```javascript
// Example SAP Asset Object
{
  Asset_code: "P-12345",
  Asset_description: "Centrifugal Pump",
  Asset_criticality: "A",
  Asset_Criticality_description: "Critical",
  Catalog_profile: "PUMP-001",
  Inactive: "No",
  Instrument_Make: "FlowTech",
  Instrument_Model_Number: "FT-2000X",
  Location: "Building A - Level 2",
  Maintenance_Plant: "Plant 001",
  Manufacturer: "FlowTech Industries",
  Manufacturer_part_number: "FT-PN-2000X-01",
  Manufacturer_serial_number: "SN-987654321",
  Object_type: "PUMP",
  Planner_group: "PM-GRP-01",
  Plant_section: "Production Area",
  SAP_Asset_Type: "Equipment",
  System_status_codes: "INST",
  System_status_description: "Installed",
  User_status_codes: "OPER",
  User_status_description: "Operational"
}
```

### Data Access Pattern

The popover component accesses SAP data through the Vuex store:

```javascript
// Typical pattern for accessing SAP data in popover
computed: {
  sapAssetData() {
    return this.$store.state.sap_item_values;
  },
  
  currentAsset() {
    const assetCode = this.selectedAssetCode;
    return this.sapAssetData.find(item => item.Asset_code === assetCode);
  }
}
```

---

## Popover Display Patterns

### Pattern 1: Field-by-Field Display

Display SAP fields individually with labels:

```vue
<template>
  <v-card class="sap-popover">
    <v-card-title>{{ currentAsset.Asset_description }}</v-card-title>
    
    <v-card-text>
      <div class="field-row">
        <span class="field-label">Asset Code:</span>
        <span class="field-value">{{ currentAsset.Asset_code }}</span>
      </div>
      
      <div class="field-row">
        <span class="field-label">Criticality:</span>
        <span class="field-value">{{ currentAsset.Asset_Criticality_description }}</span>
      </div>
      
      <div class="field-row">
        <span class="field-label">Location:</span>
        <span class="field-value">{{ currentAsset.Location }}</span>
      </div>
      
      <div class="field-row">
        <span class="field-label">Status:</span>
        <span class="field-value">{{ currentAsset.System_status_description }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>
```

### Pattern 2: Grouped Display

Group related SAP fields by category:

```vue
<template>
  <v-card class="sap-popover">
    <v-card-title>{{ currentAsset.Asset_description }}</v-card-title>
    
    <v-card-text>
      <!-- Basic Information -->
      <div class="field-group">
        <h4>Basic Information</h4>
        <div class="field-row">
          <span class="label">Code:</span>
          <span>{{ currentAsset.Asset_code }}</span>
        </div>
        <div class="field-row">
          <span class="label">Type:</span>
          <span>{{ currentAsset.SAP_Asset_Type }}</span>
        </div>
        <div class="field-row">
          <span class="label">Criticality:</span>
          <span>{{ currentAsset.Asset_criticality }} - {{ currentAsset.Asset_Criticality_description }}</span>
        </div>
      </div>
      
      <!-- Technical Details -->
      <div class="field-group">
        <h4>Technical Details</h4>
        <div class="field-row">
          <span class="label">Make:</span>
          <span>{{ currentAsset.Instrument_Make }}</span>
        </div>
        <div class="field-row">
          <span class="label">Model:</span>
          <span>{{ currentAsset.Instrument_Model_Number }}</span>
        </div>
        <div class="field-row">
          <span class="label">Serial:</span>
          <span>{{ currentAsset.Manufacturer_serial_number }}</span>
        </div>
      </div>
      
      <!-- Status Information -->
      <div class="field-group">
        <h4>Status</h4>
        <div class="field-row">
          <span class="label">System Status:</span>
          <span>{{ currentAsset.System_status_description }}</span>
        </div>
        <div class="field-row">
          <span class="label">User Status:</span>
          <span>{{ currentAsset.User_status_description }}</span>
        </div>
        <div class="field-row" v-if="currentAsset.Inactive === 'Yes'">
          <v-chip color="error" small>Inactive</v-chip>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
```

### Pattern 3: Dynamic Display Based on Selected Columns

Display only the columns selected by the user:

```vue
<template>
  <v-card class="sap-popover">
    <v-card-title>Asset Details</v-card-title>
    
    <v-card-text>
      <div 
        v-for="column in visibleColumns" 
        :key="column.value"
        class="field-row"
      >
        <span class="field-label">{{ column.text }}:</span>
        <span class="field-value">{{ currentAsset[column.value] }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    visibleColumns() {
      // Get selected columns from store
      return this.$store.state.selectedSapColumns || this.defaultColumns;
    },
    
    currentAsset() {
      const assetCode = this.selectedAssetCode;
      return this.$store.state.sap_item_values.find(
        item => item.Asset_code === assetCode
      );
    }
  }
}
</script>
```

---

## Styling the Popover

### Vuetify Card Styling

```vue
<style scoped>
.sap-popover {
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.field-group {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.field-group:last-child {
  border-bottom: none;
}

.field-group h4 {
  color: #1976d2;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.field-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 13px;
}

.field-label {
  color: #666;
  font-weight: 500;
  min-width: 140px;
}

.field-value {
  color: #333;
  text-align: right;
  flex: 1;
}
</style>
```

### Compact Popover Style

For smaller popovers with limited space:

```vue
<style scoped>
.sap-popover-compact {
  max-width: 300px;
  font-size: 12px;
}

.sap-popover-compact .field-row {
  padding: 2px 0;
}

.sap-popover-compact .field-label {
  min-width: 100px;
  font-size: 11px;
}

.sap-popover-compact .field-value {
  font-size: 11px;
}
</style>
```

---

## Popover Behavior

### Opening the Popover

The popover opens when users interact with an asset:

```javascript
// Triggered by asset marker click, row selection, etc.
methods: {
  showAssetPopover(assetCode) {
    // Set the selected asset
    this.$store.commit('setSelectedAsset', assetCode);
    
    // Show the info card/popover
    this.$store.dispatch('toggleSideInfoCardVisibility', true);
  }
}
```

### Closing the Popover

From BasicSide.vue (line 698-700):

```javascript
closeSideInfoCard() {
  this.toggleSideInfoCardVisibility(false);
}
```

Typically triggered by:
- Close button click
- Clicking outside the popover
- ESC key press
- Selecting a different asset

---

## Conditional Display Logic

### Showing/Hiding Fields

Display fields only when they have values:

```vue
<div 
  v-if="currentAsset.Manufacturer && currentAsset.Manufacturer !== 'N/A'"
  class="field-row"
>
  <span class="field-label">Manufacturer:</span>
  <span class="field-value">{{ currentAsset.Manufacturer }}</span>
</div>
```

### Highlighting Critical Assets

Add visual indicators for important information:

```vue
<div class="field-row">
  <span class="field-label">Criticality:</span>
  <v-chip
    :color="getCriticalityColor(currentAsset.Asset_criticality)"
    small
  >
    {{ currentAsset.Asset_Criticality_description }}
  </v-chip>
</div>

<script>
methods: {
  getCriticalityColor(criticality) {
    const colors = {
      'A': 'error',      // Critical - Red
      'B': 'warning',    // Important - Orange
      'C': 'info',       // Normal - Blue
      'D': 'success'     // Low - Green
    };
    return colors[criticality] || 'grey';
  }
}
</script>
```

### Status Indicators

```vue
<div class="field-row">
  <span class="field-label">Status:</span>
  <v-icon 
    :color="getStatusColor(currentAsset.System_status_codes)"
    small
  >
    mdi-circle
  </v-icon>
  <span class="field-value">
    {{ currentAsset.System_status_description }}
  </span>
</div>
```

---

## Integration with Map Markers

### Popover Trigger from Map

When a user clicks on a map marker representing a SAP asset:

```javascript
// In map component
methods: {
  onMarkerClick(marker) {
    const assetCode = marker.properties.assetCode;
    
    // Find SAP data for this asset
    const sapData = this.$store.state.sap_item_values.find(
      item => item.Asset_code === assetCode
    );
    
    if (sapData) {
      // Show popover with SAP data
      this.showSapPopover(sapData);
    }
  },
  
  showSapPopover(sapData) {
    this.$store.commit('setSelectedSapAsset', sapData);
    this.$store.dispatch('toggleSideInfoCardVisibility', true);
  }
}
```

---

## Advanced Features

### Popover with Tabs

For extensive SAP data, use tabbed interface:

```vue
<v-card class="sap-popover">
  <v-tabs v-model="activeTab">
    <v-tab>Overview</v-tab>
    <v-tab>Technical</v-tab>
    <v-tab>Maintenance</v-tab>
    <v-tab>Status</v-tab>
  </v-tabs>
  
  <v-tabs-items v-model="activeTab">
    <!-- Overview Tab -->
    <v-tab-item>
      <v-card-text>
        <div class="field-row">
          <span class="field-label">Asset Code:</span>
          <span>{{ currentAsset.Asset_code }}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Description:</span>
          <span>{{ currentAsset.Asset_description }}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Location:</span>
          <span>{{ currentAsset.Location }}</span>
        </div>
      </v-card-text>
    </v-tab-item>
    
    <!-- Technical Tab -->
    <v-tab-item>
      <v-card-text>
        <div class="field-row">
          <span class="field-label">Make:</span>
          <span>{{ currentAsset.Instrument_Make }}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Model:</span>
          <span>{{ currentAsset.Instrument_Model_Number }}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Serial Number:</span>
          <span>{{ currentAsset.Manufacturer_serial_number }}</span>
        </div>
      </v-card-text>
    </v-tab-item>
    
    <!-- Maintenance Tab -->
    <v-tab-item>
      <v-card-text>
        <div class="field-row">
          <span class="field-label">Plant:</span>
          <span>{{ currentAsset.Maintenance_Plant }}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Planner Group:</span>
          <span>{{ currentAsset.Planner_group }}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Plant Section:</span>
          <span>{{ currentAsset.Plant_section }}</span>
        </div>
      </v-card-text>
    </v-tab-item>
    
    <!-- Status Tab -->
    <v-tab-item>
      <v-card-text>
        <div class="field-row">
          <span class="field-label">System Status:</span>
          <span>{{ currentAsset.System_status_description }}</span>
        </div>
        <div class="field-row">
          <span class="field-label">User Status:</span>
          <span>{{ currentAsset.User_status_description }}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Active:</span>
          <span>{{ currentAsset.Inactive === 'Yes' ? 'No' : 'Yes' }}</span>
        </div>
      </v-card-text>
    </v-tab-item>
  </v-tabs-items>
</v-card>
```

### Popover with Actions

Add action buttons for common operations:

```vue
<v-card class="sap-popover">
  <v-card-title>{{ currentAsset.Asset_description }}</v-card-title>
  
  <v-card-text>
    <!-- SAP Fields Display -->
  </v-card-text>
  
  <v-card-actions>
    <v-btn small text color="primary" @click="viewDetails">
      View Full Details
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn small text color="primary" @click="assignLocation">
      Assign Location
    </v-btn>
    <v-btn small icon @click="close">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-card-actions>
</v-card>
```

---

## Performance Optimization

### Lazy Loading Popover Data

Only load SAP data when popover opens:

```javascript
data() {
  return {
    popoverData: null,
    loading: false
  }
},

methods: {
  async openPopover(assetCode) {
    this.loading = true;
    
    // Check if data is already in store
    let data = this.$store.state.sap_item_values.find(
      item => item.Asset_code === assetCode
    );
    
    if (!data) {
      // Fetch from API if not in store
      data = await this.fetchSapAsset(assetCode);
    }
    
    this.popoverData = data;
    this.loading = false;
    this.$store.dispatch('toggleSideInfoCardVisibility', true);
  }
}
```

### Memoization

Cache computed popover content:

```javascript
computed: {
  popoverContent() {
    if (!this.currentAsset) return null;
    
    // Memoize expensive computations
    return this.formatSapData(this.currentAsset);
  }
},

methods: {
  formatSapData: _.memoize(function(asset) {
    // Format and return popover content
    return {
      // ... formatted data
    };
  })
}
```

---

## Error Handling

### Missing SAP Data

Handle cases where SAP data is not available:

```vue
<v-card class="sap-popover">
  <v-card-text v-if="!currentAsset">
    <v-alert type="warning" text>
      SAP data not available for this asset.
    </v-alert>
  </v-card-text>
  
  <v-card-text v-else>
    <!-- Display SAP fields -->
  </v-card-text>
</v-card>
```

### Loading State

Show loading indicator while data loads:

```vue
<v-card class="sap-popover">
  <v-card-text v-if="loading">
    <div class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p class="mt-2">Loading SAP data...</p>
    </div>
  </v-card-text>
  
  <v-card-text v-else-if="currentAsset">
    <!-- Display SAP fields -->
  </v-card-text>
</v-card>
```

---

## Testing Popover Implementation

### Unit Test Example

```javascript
import { mount } from '@vue/test-utils';
import SapPopover from '@/components/SapPopover.vue';
import Vuex from 'vuex';

describe('SapPopover', () => {
  let store;
  
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        sap_item_values: [
          {
            Asset_code: 'TEST-001',
            Asset_description: 'Test Asset',
            Asset_criticality: 'A'
          }
        ],
        selectedAsset: 'TEST-001'
      }
    });
  });
  
  it('displays SAP asset data', () => {
    const wrapper = mount(SapPopover, { store });
    
    expect(wrapper.text()).toContain('TEST-001');
    expect(wrapper.text()).toContain('Test Asset');
  });
  
  it('shows criticality indicator', () => {
    const wrapper = mount(SapPopover, { store });
    const chip = wrapper.find('.v-chip');
    
    expect(chip.exists()).toBe(true);
    expect(chip.classes()).toContain('error'); // Criticality A = red
  });
});
```

---

## Summary

The SAP data popover implementation involves:

1. **Data Loading**: CSV parsed in BasicSide.vue, stored in Vuex
2. **Visibility Control**: Managed by `toggleSideInfoCardVisibility` action
3. **Data Access**: Components retrieve SAP data from Vuex store
4. **Display Options**: Field-by-field, grouped, or dynamic based on column selection
5. **Styling**: Vuetify cards with custom CSS for professional appearance
6. **Interactions**: Open on asset click, close via button/ESC/outside click
7. **Advanced Features**: Tabs, action buttons, status indicators
8. **Performance**: Lazy loading, memoization for optimization
9. **Error Handling**: Loading states, missing data alerts

The popover provides a clean, organized way to display detailed SAP asset information to users without cluttering the main interface.
