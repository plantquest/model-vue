<template>
  <div 
    class="stage" 
    :class="{ 'activated': isActive }"
    style="background-color:white;"
    @click="handleClick"
  >
    <h3 style="font-size: 13px;">STAGE {{ stageNumber }}</h3>
    <p>{{ stage.msg }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { StageMessage } from '@/types/navigation'

/**
 * NavStageItem Props
 */
interface Props {
  /** Stage data */
  stage: StageMessage
  /** Stage index */
  index: number
  /** Whether this stage is currently active */
  isActive: boolean
}

const props = defineProps<Props>()

/**
 * Component emits
 */
const emit = defineEmits<{
  /** Emitted when stage is selected */
  select: [map: number, index: number]
}>()

/**
 * Stage number for display (1-indexed)
 */
const stageNumber = computed(() => props.index + 1)

/**
 * Handle stage click
 */
const handleClick = () => {
  emit('select', props.stage.map, props.index)
}
</script>

<style lang="scss" scoped>
.stage {
  width: 95%;
  height: 85px;
  margin: 0px 4px 0px 7px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  h3 {
    position: relative;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-synthesis: none;
    font-weight: 700;
    top: 4px;
    left: 13px;
    font-size: 13px;
  }
  
  p {
    position: relative;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-synthesis: none;
    font-weight: 400;
    font-size: 15px;
    width: 94%;
    top: 3px;
    left: 13px;
  }
  
  &.activated {
    background-color: #C0E28B !important;
  }
}
</style>
