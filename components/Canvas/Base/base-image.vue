<template>
  <figure class="m-0">
    <component
      :is="url ? 'a' : 'div'"
      :href="url || undefined"
      :class="['block', classes.radius ? `${classes.radius} overflow-hidden` : '']"
    >
      <img
        v-if="media?.src"
        :src="media.src"
        :alt="media.alt || ''"
        :width="media.width"
        :height="media.height"
        :class="['block w-full', classes.aspect]"
        loading="lazy"
      >
    </component>
    <figcaption v-if="caption" class="mt-2 text-sm text-muted-foreground">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
/**
 * @description An image with optional aspect ratio, caption, and link.
 */

const props = withDefaults(defineProps<{
  /**
   * Image
   * @example src=https://placehold.co/800x600 alt="Example image" width=800 height=600
   */
  media?: CanvasImage
  /**
   * Aspect ratio
   * @example original
   * @enumLabels {"original": "Original", "2:1": "2:1", "16:9": "16:9", "3:2": "3:2", "4:3": "4:3", "1:1": "Square"}
   */
  aspectRatio?: 'original' | '2:1' | '16:9' | '3:2' | '4:3' | '1:1'
  /**
   * Rounded corners


   */
  rounded?: boolean
  /**
   * Image caption
   * @example Image description
   */
  caption?: string
  /**
   * Optional link URL
   * @format uri-reference
   */
  url?: string
}>(), {
  aspectRatio: 'original',
  rounded: false,
})

const classes = computed(() => ({
  aspect: ({
    original: 'h-auto',
    '2:1': 'aspect-[2/1] object-cover',
    '16:9': 'aspect-video object-cover',
    '3:2': 'aspect-[3/2] object-cover',
    '4:3': 'aspect-[4/3] object-cover',
    '1:1': 'aspect-square object-cover',
  })[props.aspectRatio] || '',
  radius: props.rounded ? 'rounded-lg' : '',
}))
</script>
