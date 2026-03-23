<template>
  <div :class="['grid grid-cols-1 w-full', classes.columns, classes.gap]">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /**
   * Number of columns
   * @example 3
   * @enumLabels {"2": "2 columns", "3": "3 columns", "4": "4 columns"}
   */
  columns?: '2' | '3' | '4'
  /**
   * Gap between items
   * @example md
   * @enumLabels {"sm": "Small", "md": "Medium", "lg": "Large", "xl": "Extra large"}
   */
  gap?: 'sm' | 'md' | 'lg' | 'xl'
}>(), {
  columns: '3',
  gap: 'md',
})

defineSlots<{
  /**
   * Grid items
   */
  default?(): unknown
}>()

const classes = computed(() => ({
  columns: ({
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
  })[props.columns] || '',
  gap: ({
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  })[props.gap] || '',
}))
</script>
