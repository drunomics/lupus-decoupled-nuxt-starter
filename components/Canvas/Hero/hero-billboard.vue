<template>
  <div
    :class="[
      'relative flex w-full overflow-hidden',
      ...Object.values(classes),
    ]"
  >
    <div
      v-if="backgroundImage?.src"
      class="absolute inset-0"
    >
      <img
        :src="backgroundImage.src"
        :alt="backgroundImage.alt || ''"
        :width="backgroundImage.width"
        :height="backgroundImage.height"
        :class="['size-full object-cover', imageClasses.imagePosition]"
      >
      <div
        v-if="overlayOpacity !== '0%'"
        :class="['absolute inset-0', imageClasses.overlay]"
      />
    </div>
    <div :class="['relative py-6 px-4 md:py-10 md:px-8 xl:py-20 lg:max-w-2/3', alignment === 'center' ? 'text-center mx-auto items-center' : '']">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /**
   * Hero height
   * @example full
   * @enumLabels {"full": "Full screen", "large": "Large", "ribbon": "Ribbon"}
   */
  height?: 'full' | 'large' | 'ribbon'
  /**
   * Content alignment
   * @example center-left
   * @enumLabels {"top-left": "Top left", "center-left": "Center left", "bottom-left": "Bottom left", "center": "Center"}
   */
  alignment?: 'top-left' | 'center-left' | 'bottom-left' | 'center'
  /**
   * Background image
   * @example src=https://placehold.co/1920x1080 alt="Hero background" width=1920 height=1080
   */
  backgroundImage?: CanvasImage
  /**
   * Background image vertical position
   * @example center
   * @enumLabels {"top": "Top", "center": "Center", "bottom": "Bottom"}
   */
  imagePosition?: 'top' | 'center' | 'bottom'
  /**
   * Background overlay opacity
   * @example 0%
   * @enumLabels {"0%": "None", "20%": "Light", "40%": "Medium", "60%": "Dark", "75%": "Extra dark"}
   */
  overlayOpacity?: '0%' | '20%' | '40%' | '60%' | '75%'
}>(), {
  height: 'full',
  alignment: 'center-left',
  imagePosition: 'center',
  overlayOpacity: '0%',
})

defineSlots<{
  /**
   * Hero content
   */
  default?(): unknown
}>()

const classes = computed(() => ({
  height: ({
    full: 'h-dvh',
    large: 'min-h-[60vh]',
    ribbon: 'min-h-48 md:min-h-64',
  })[props.height] || '',
  position: ({
    'top-left': 'items-start justify-start',
    'center-left': 'items-center justify-start',
    'bottom-left': 'items-end justify-start',
    'center': 'items-center justify-center',
  })[props.alignment] || '',
}))

const imageClasses = computed(() => ({
  imagePosition: ({
    top: 'object-top',
    center: 'object-center',
    bottom: 'object-bottom',
  })[props.imagePosition] || '',
  overlay: ({
    '0%': '',
    '20%': 'bg-black/20',
    '40%': 'bg-black/40',
    '60%': 'bg-black/60',
    '75%': 'bg-black/75',
  })[props.overlayOpacity] || '',
}))
</script>
