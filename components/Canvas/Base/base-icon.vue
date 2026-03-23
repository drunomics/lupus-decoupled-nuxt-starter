<template>
  <span
    v-if="name"
    class="inline-block bg-current"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      maskImage: `url(https://api.iconify.design/${name}.svg)`,
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskImage: `url(https://api.iconify.design/${name}.svg)`,
      WebkitMaskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
    }"
  />
</template>

<script setup lang="ts">
/**
 * Simple icon component using Iconify CDN with CSS mask.
 * The icon inherits the current text color automatically.
 *
 * For production use, replace this component with @nuxt/icon
 * (https://nuxt.com/modules/icon) which provides SSR support,
 * bundling, and offline rendering.
 *
 * The API is the same: <BaseIcon name="ph:arrow-right" />
 */
withDefaults(defineProps<{
  /**
   * Icon name in Iconify format
   * @example ph:rocket
   * @example ph:arrow-right
   * @example ph:shield-check
   */
  name: string
  /**
   * Icon size in pixels
   * @example 24
   */
  size?: number
}>(), {
  size: 24,
})
</script>
