<template>
  <component
    :is="url ? 'a' : 'div'"
    :href="url || undefined"
    :class="[
      'flex h-full overflow-hidden no-underline text-inherit transition duration-300',
      url ? 'cursor-pointer hover:scale-105' : '',
      orientation === 'horizontal' ? 'flex-row' : 'flex-col',
      cardStyle === 'outlined' ? 'border border-border' : '',
      ...Object.values(classes),
    ]"
  >
    <div v-if="media?.src" :class="orientation === 'horizontal' ? 'w-2/5 shrink-0' : ''">
      <img
        :src="media.src"
        :alt="media.alt || ''"
        :width="media.width"
        :height="media.height"
        :class="['block w-full object-cover', orientation === 'horizontal' ? 'h-full' : 'h-auto']"
        loading="lazy"
      >
    </div>
    <div :class="['flex flex-col flex-grow gap-2', cardStyle === 'outlined' ? 'p-4 lg:p-6' : 'py-4 lg:py-6']">
      <component :is="`h${level}`" v-if="heading" class="m-0 text-lg font-semibold">
        {{ heading }}
      </component>
      <p v-if="text" class="m-0 text-sm opacity-70">{{ text }}</p>
    </div>
  </component>
</template>

<script setup lang="ts">
/**
 * @description A card with image, heading, and description in vertical or horizontal layout.
 */
const props = withDefaults(defineProps<{
  /**
   * Card heading
   * @example Blog post title
   * @example Project showcase
   */
  heading: string
  /**
   * Heading level
   * @example 3
   */
  level?: 2 | 3 | 4
  /**
   * Card description
   * @example A brief summary of what this card is about.
   */
  text?: string
  /**
   * Card image
   * @example src=https://placehold.co/600x400 alt="Card image" width=600 height=400
   */
  media?: CanvasImage
  /**
   * Optional link URL
   * @format uri-reference
   */
  url?: string
  /**
   * Card orientation
   * @example vertical
   * @enumLabels {"vertical": "Vertical", "horizontal": "Horizontal"}
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * Card style
   * @example outlined
   * @enumLabels {"outlined": "Outlined", "flat": "Flat"}
   */
  cardStyle?: 'outlined' | 'flat'
  /**
   * Rounded corners


   */
  rounded?: boolean
  /**
   * Background color
   * @example default
   * @enumLabels {"default": "Default", "transparent": "Transparent", "accent": "Accent", "primary": "Primary", "muted": "Muted"}
   */
  background?: 'default' | 'transparent' | 'accent' | 'primary' | 'muted'
}>(), {
  level: 3,
  orientation: 'vertical',
  cardStyle: 'outlined',
  rounded: true,
})

const classes = computed(() => ({
  bg: ({
    default: 'bg-background',
    transparent: '',
    primary: 'bg-primary text-primary-foreground',
    accent: 'bg-accent text-accent-foreground',
    muted: 'bg-muted text-foreground',
  })[props.background || 'default'] || '',
  radius: props.rounded ? 'rounded-lg' : '',
}))
</script>
