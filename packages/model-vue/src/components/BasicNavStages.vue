<template>
  <div 
    v-if="routeMsg.length > 1" 
    class="basic-nav-stages"
    style="position: absolute;z-index:99; height:300px;left:7px;top: 250px;max-width: calc(100% - 11px);"
  >
    <v-expansion-panels v-model="panelIndex" class="mb-12">
      <NavStagePanel 
        :model-value="isPanelExpanded"
        :public-path="publicPath"
        @update:model-value="handlePanelToggle"
      >
        <NavStageItem
          v-for="(stage, index) in routeMsg"
          :key="index"
          :stage="stage"
          :index="index"
          :is-active="activeStage === index"
          @select="handleStageSelect"
        />
      </NavStagePanel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useNavStages } from '@/composables/useNavStages'
import { usePathParser } from '@/composables/usePathParser'
import { useMapAssets } from '@/composables/useMapAssets'
import NavStagePanel from './NavStagePanel.vue'
import NavStageItem from './NavStageItem.vue'
import type { StageMessage } from '@/types/navigation'

/**
 * BasicNavStages Component
 * Multi-level stage navigation for routes with multiple floors/levels
 */

// Constants
const publicPath = ref(process.env.BASE_URL || '/')
const showNav = ref(true)
const panelIndex = ref(0)

// Composables
const { activeStage, selectStage } = useNavStages()
const { getMapName } = useMapAssets()
const { routeMassages, isLoading } = usePathParser(getMapName)

// Alias for template
const routeMsg = routeMassages

// Computed
const isPanelExpanded = computed(() => panelIndex.value === 0)

/**
 * Component emits
 */
const emit = defineEmits<{
  /** Emitted when a stage is selected */
  stageSelected: [map: number]
}>()

/**
 * Handle stage selection from NavStageItem
 * @param map - Map index
 * @param index - Stage index
 */
const handleStageSelect = (map: number, index: number) => {
  console.log('Stage selected:', index, 'map:', map)
  selectStage(index, map)
  emit('stageSelected', map)
}

/**
 * Handle panel expand/collapse
 * @param expanded - Whether panel is expanded
 */
const handlePanelToggle = (expanded: boolean) => {
  panelIndex.value = expanded ? 0 : -1
}

/**
 * Toggle navigation visibility
 * Used by event bus (legacy compatibility)
 */
const toggleshowNav = () => {
  showNav.value = !showNav.value
}

/**
 * Clear/reset navigation state
 */
const clearState = () => {
  panelIndex.value = -1
}

// Lifecycle hooks
onMounted(() => {
  console.log('BasicNavStages mounted')
  console.log('Current Stage on mount:', activeStage.value)
  
  // Note: Vue 3 removed $root.$on event bus
  // If event bus is needed, use mitt or provide/inject
  // For now, exposing toggleshowNav via defineExpose for parent access
})

onBeforeUnmount(() => {
  console.log('BasicNavStages unmounting')
})

// Expose methods for external access
defineExpose({
  toggleshowNav,
  clearState,
  activeStage,
  routeMsg
})
</script>

<style lang="scss">
.basic-nav-stages {
  .v-expansion-panel-content__wrap {
    // Custom styling preserved from Vue 2
  }

  .v-expansion-panel.v-expansion-panel--active.v-item--active {
    border-top-left-radius: 10px !important;
    border-top-right-radius: 10px !important;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
  }

  .v-divider {
    border-color: rgb(var(--vxg-ct2)) !important;
    margin: 16px 8px;
    height: 22px;
  }
}
</style>
