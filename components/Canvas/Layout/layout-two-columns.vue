<template>
  <div class="grid grid-cols-1 gap-4 sm:gap-6 w-full" :class="Object.values(classes)">
    <div>
      <slot name="col-1" />
    </div>
    <div>
      <slot name="col-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @description Two-column layout with configurable width ratios.
 */
const props = withDefaults(defineProps<{
  /**
   * Column layout
   * @example 50-50
   * @enumLabels {"50-50": "50 / 50", "67-33": "67 / 33", "33-67": "33 / 67", "75-25": "75 / 25", "25-75": "25 / 75"}
   */
  layout?: '50-50' | '67-33' | '33-67' | '75-25' | '25-75'
}>(), {
  layout: '50-50',
})

defineSlots<{
  /**
   * First column
   */
  'col-1'?(): unknown
  /**
   * Second column
   */
  'col-2'?(): unknown
}>()

const classes = computed(() => ({
  layout: ({
    '50-50': 'sm:grid-cols-[1fr_1fr]',
    '67-33': 'sm:grid-cols-[2fr_1fr]',
    '33-67': 'sm:grid-cols-[1fr_2fr]',
    '75-25': 'sm:grid-cols-[3fr_1fr]',
    '25-75': 'sm:grid-cols-[1fr_3fr]',
  })[props.layout] || '',
}))
</script>
