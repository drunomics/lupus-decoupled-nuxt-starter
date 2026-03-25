<template>
  <div
    :class="[
      'flex',
      classes.direction,
      classes.gap,
      classes.align,
      classes.justify,
      wrap ? 'flex-wrap' : '',
      classes.padding,
      classes.bg,
      classes.radius,
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * @description Flexible container for arranging items vertically or horizontally.
 */
const props = withDefaults(defineProps<{
  /**
   * Stack direction
   * @example column
   * @enumLabels {"row": "Horizontal", "column": "Vertical"}
   */
  direction?: 'row' | 'column'
  /**
   * Space between items
   * @example md
   * @enumLabels {"sm": "Small", "md": "Medium", "lg": "Large", "xl": "Extra large"}
   */
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Cross-axis alignment
   * @example start
   * @enumLabels {"start": "Start", "center": "Center", "end": "End", "stretch": "Stretch"}
   */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /**
   * Main-axis alignment
   * @example start
   * @enumLabels {"start": "Start", "center": "Center", "end": "End", "between": "Space between"}
   */
  justify?: 'start' | 'center' | 'end' | 'between'
  /**
   * Allow items to wrap
   */
  wrap?: boolean
  /**
   * Inner padding


   */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /**
   * Background color
   * @example default
   * @enumLabels {"default": "Default", "primary": "Primary", "secondary": "Secondary", "accent": "Accent", "muted": "Muted"}
   */
  background?: 'default' | 'primary' | 'secondary' | 'accent' | 'muted'
  /**
   * Rounded corners


   */
  rounded?: boolean
}>(), {
  direction: 'column',
  gap: 'md',
  align: 'start',
  justify: 'start',
  wrap: false,
  padding: 'none',
  rounded: false,
})

defineSlots<{
  /**
   * Stack items
   */
  default?(): unknown
}>()

const classes = computed(() => ({
  direction: props.direction === 'row' ? 'flex-row' : 'flex-col',
  gap: ({
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  })[props.gap] || '',
  align: ({
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  })[props.align] || '',
  justify: ({
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  })[props.justify] || '',
  padding: ({
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  })[props.padding] || '',
  bg: ({
    default: '',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    muted: 'bg-muted text-muted-foreground',
  })[props.background || 'default'] || '',
  radius: props.rounded ? 'rounded-lg' : '',
}))
</script>
