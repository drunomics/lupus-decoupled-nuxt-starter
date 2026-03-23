<template>
  <div class="grid grid-cols-1 gap-4 sm:gap-6 w-full" :class="Object.values(classes)">
    <div v-if="$slots['col-1']">
      <slot name="col-1" />
    </div>
    <div v-if="$slots['col-2']">
      <slot name="col-2" />
    </div>
    <div v-if="$slots['col-3']">
      <slot name="col-3" />
    </div>
    <div v-if="$slots['col-4']">
      <slot name="col-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /**
   * Column layout
   * @example 50-50
   * @enumLabels {"50-50": "50 / 50", "67-33": "67 / 33", "33-67": "33 / 67", "75-25": "75 / 25", "25-75": "25 / 75", "33-33-33": "33 / 33 / 33", "25-50-25": "25 / 50 / 25", "50-25-25": "50 / 25 / 25", "25-25-50": "25 / 25 / 50", "25-25-25-25": "25 / 25 / 25 / 25"}
   */
  layout?: '50-50' | '67-33' | '33-67' | '75-25' | '25-75' | '33-33-33' | '25-50-25' | '50-25-25' | '25-25-50' | '25-25-25-25'
}>(), {
  layout: '50-50',
})

defineSlots<{
  /**
   * Column 1
   */
  'col-1'?(): unknown
  /**
   * Column 2
   */
  'col-2'?(): unknown
  /**
   * Column 3
   */
  'col-3'?(): unknown
  /**
   * Column 4
   */
  'col-4'?(): unknown
}>()

const classes = computed(() => ({
  layout: ({
    '50-50': 'sm:grid-cols-[1fr_1fr]',
    '67-33': 'sm:grid-cols-[2fr_1fr]',
    '33-67': 'sm:grid-cols-[1fr_2fr]',
    '75-25': 'sm:grid-cols-[3fr_1fr]',
    '25-75': 'sm:grid-cols-[1fr_3fr]',
    '33-33-33': 'sm:grid-cols-[1fr_1fr_1fr]',
    '25-50-25': 'sm:grid-cols-[1fr_2fr_1fr]',
    '50-25-25': 'sm:grid-cols-[2fr_1fr_1fr]',
    '25-25-50': 'sm:grid-cols-[1fr_1fr_2fr]',
    '25-25-25-25': 'sm:grid-cols-[1fr_1fr_1fr_1fr]',
  })[props.layout] || '',
}))
</script>
