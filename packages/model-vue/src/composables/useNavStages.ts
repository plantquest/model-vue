/**
 * useNavStages Composable
 * Manages stage selection and navigation state
 */

import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

/**
 * Composable for managing navigation stages
 */
export function useNavStages() {
  const store = useStore()
  
  // Local state
  const activeStage = ref(0)
  const selectedStage = ref(0)
  
  // Computed from store
  const currentStage = computed(() => store.state.currentStage)
  const storeActiveStage = computed(() => store.state.activeStage)
  
  // Watch for current stage changes from store
  watch(currentStage, (newVal) => {
    if (newVal !== undefined && newVal !== null) {
      console.log('Current Stage changed:', newVal)
      activeStage.value = newVal - 1
      store.dispatch('setCurrentStage', newVal)
    }
  })
  
  // Watch for trigger select changes
  watch(
    () => store.state.trigger?.select?.value,
    (value) => {
      console.log('Trigger select value:', value)
      // Additional logic can be added here if needed
    }
  )
  
  /**
   * Select a specific stage
   * @param index - Stage index
   * @param map - Map index
   */
  const selectStage = (index: number, map?: number) => {
    console.log('Selecting stage:', index, 'map:', map)
    selectedStage.value = index
    activeStage.value = index
    
    // Update store
    store.commit('setCurrentStage', index + 1)
    store.dispatch('setCurrentStage', index)
    
    return { index, map }
  }
  
  /**
   * Get currently selected stage
   */
  const getSelectedStage = () => {
    console.log('Current selected stage:', selectedStage.value)
    return selectedStage.value
  }
  
  /**
   * Go to next stage
   */
  const nextStage = (totalStages: number) => {
    if (activeStage.value < totalStages - 1) {
      selectStage(activeStage.value + 1)
    }
  }
  
  /**
   * Go to previous stage
   */
  const prevStage = () => {
    if (activeStage.value > 0) {
      selectStage(activeStage.value - 1)
    }
  }
  
  /**
   * Reset to first stage
   */
  const resetStages = () => {
    selectStage(0)
  }
  
  return {
    activeStage,
    selectedStage,
    currentStage,
    selectStage,
    getSelectedStage,
    nextStage,
    prevStage,
    resetStages
  }
}
