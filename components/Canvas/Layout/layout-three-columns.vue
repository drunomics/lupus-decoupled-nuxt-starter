<template>
  <div class="grid grid-cols-1 gap-4 sm:gap-6 w-full" :class="Object.values(classes)">
    <div>
      <slot name="col-1" />
    </div>
    <div>
      <slot name="col-2" />
    </div>
    <div>
      <slot name="col-3" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @description Three-column layout with configurable width ratios.
 */
const props = withDefaults(defineProps<{
  /**
   * Column layout
   * @example 33-33-33
   * @enumLabels {"33-33-33": "33 / 33 / 33", "25-50-25": "25 / 50 / 25", "50-25-25": "50 / 25 / 25", "25-25-50": "25 / 25 / 50"}
   */
  layout?: '33-33-33' | '25-50-25' | '50-25-25' | '25-25-50'
}>(), {
  layout: '33-33-33',
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
  /**
   * Third column
   */
  'col-3'?(): unknown
}>()

const classes = computed(() => ({
  layout: ({
    '33-33-33': 'sm:grid-cols-[1fr_1fr_1fr]',
    '25-50-25': 'sm:grid-cols-[1fr_2fr_1fr]',
    '50-25-25': 'sm:grid-cols-[2fr_1fr_1fr]',
    '25-25-50': 'sm:grid-cols-[1fr_1fr_2fr]',
  })[props.layout] || '',
}))
</script>
