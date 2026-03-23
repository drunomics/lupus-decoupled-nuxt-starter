<template>
  <component
    :is="url ? 'a' : 'div'"
    :href="url || undefined"
    :class="[
      'flex overflow-hidden no-underline text-inherit transition duration-300',
      url ? 'cursor-pointer hover:scale-105' : '',
      orientation === 'horizontal' ? 'flex-row' : 'flex-col',
      cardStyle === 'framed' ? 'border border-border rounded-lg' : '',
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
    <div :class="['flex flex-col gap-2', cardStyle === 'framed' ? 'p-4 lg:p-6' : 'py-4 lg:py-6']">
      <component :is="`h${level}`" v-if="heading" class="m-0 text-lg font-semibold">
        {{ heading }}
      </component>
      <p v-if="text" class="m-0 text-sm text-muted-foreground">{{ text }}</p>
    </div>
  </component>
</template>

<script setup lang="ts">
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
   * @example framed
   * @enumLabels {"framed": "Framed", "full": "Full width"}
   */
  cardStyle?: 'framed' | 'full'
  /**
   * Background color
   * @example default
   * @enumLabels {"default": "Default", "accent": "Accent", "primary": "Primary", "muted": "Muted"}
   */
  background?: 'default' | 'accent' | 'primary' | 'muted'
}>(), {
  level: 3,
  orientation: 'vertical',
  cardStyle: 'framed',
})

const classes = computed(() => ({
  bg: ({
    default: '',
    primary: 'bg-primary text-primary-foreground',
    accent: 'bg-accent text-accent-foreground',
    muted: 'bg-muted text-muted-foreground',
  })[props.background || 'default'] || '',
}))
</script>
