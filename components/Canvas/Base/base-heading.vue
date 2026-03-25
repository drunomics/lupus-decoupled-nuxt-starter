<template>
  <component
    :is="url ? 'a' : `h${level}`"
    :href="url || undefined"
    :class="['font-bold', ...Object.values(classes)]"
  >
    <component :is="`h${level}`" v-if="url">
      {{ text }}
    </component>
    <template v-else>{{ text }}</template>
  </component>
</template>

<script setup lang="ts">
/**
 * @description A heading element with configurable level, size, color, and alignment.
 */
const props = withDefaults(defineProps<{
  /**
   * Heading text
   * @example Sample heading
   * @example Section title
   */
  text: string
  /**
   * Semantic heading level (h1-h6)
   * @example 2
   */
  level: 1 | 2 | 3 | 4 | 5 | 6
  /**
   * Visual text size override. When set to "default", the size follows the heading level naturally.
   * @example default
   * @enumLabels {"default": "Default (follows level)", "xl": "XL", "2xl": "2XL", "3xl": "3XL", "4xl": "4XL", "5xl": "5XL", "6xl": "6XL"}
   */
  size?: 'default' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  /**
   * Text color
   * @example default
   * @enumLabels {"default": "Default", "inverted": "Inverted", "primary": "Primary"}
   */
  textColor?: 'default' | 'inverted' | 'primary'
  /**
   * Text alignment
   * @example start
   * @enumLabels {"start": "Left", "center": "Center", "end": "Right"}
   */
  align?: 'start' | 'center' | 'end'
  /**
   * Optional link URL
   * @format uri-reference
   */
  url?: string
}>(), {
  size: 'default',
  textColor: 'default',
  align: 'start',
})

const classes = computed(() => ({
  size: props.size !== 'default'
    ? ({
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl',
      })[props.size] || ''
    : ({
        1: 'text-4xl md:text-5xl',
        2: 'text-3xl md:text-4xl',
        3: 'text-2xl md:text-3xl',
        4: 'text-xl md:text-2xl',
        5: 'text-lg md:text-xl',
        6: 'text-base md:text-lg',
      })[props.level] || '',
  color: ({
    default: '',
    inverted: 'text-inverted-foreground',
    primary: 'text-primary',
  })[props.textColor],
  align: ({
    start: 'text-start',
    center: 'text-center',
    end: 'text-end',
  })[props.align],
}))
</script>
