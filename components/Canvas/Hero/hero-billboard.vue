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
    </div>
    <div
      v-if="backgroundImage?.src && background"
      :class="['absolute inset-0 opacity-40', imageClasses.tint]"
    />
    <div
      v-if="darken !== '0%'"
      :class="['absolute inset-0 bg-black', imageClasses.darken]"
    />
    <div :class="['relative z-10 flex-1 py-6 px-4 md:py-10 md:px-8 xl:py-20 lg:max-w-2/3', alignment === 'center' ? 'text-center mx-auto items-center' : '']">
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
   * Background color (solid background or image tint)
   * @enumLabels {"primary": "Primary", "secondary": "Secondary", "accent": "Accent", "muted": "Muted"}
   */
  background?: 'primary' | 'secondary' | 'accent' | 'muted'
  /**
   * Background image
   */
  backgroundImage?: CanvasImage
  /**
   * Background image vertical position
   * @example center
   * @enumLabels {"top": "Top", "center": "Center", "bottom": "Bottom"}
   */
  imagePosition?: 'top' | 'center' | 'bottom'
  /**
   * Darken the background
   * @example 0%
   * @enumLabels {"0%": "None", "20%": "Slightly", "40%": "Medium", "60%": "Strong", "75%": "Very strong"}
   */
  darken?: '0%' | '20%' | '40%' | '60%' | '75%'
}>(), {
  height: 'full',
  alignment: 'center-left',
  imagePosition: 'center',
  darken: '0%',
})

defineSlots<{
  /**
   * Hero content
   */
  default?(): unknown
}>()

const classes = computed(() => ({
  height: ({
    full: 'min-h-dvh',
    large: 'min-h-[32rem]',
    ribbon: 'min-h-48 md:min-h-64',
  })[props.height] || '',
  position: ({
    'top-left': 'items-start justify-start',
    'center-left': 'items-center justify-start',
    'bottom-left': 'items-end justify-start',
    'center': 'items-center justify-center',
  })[props.alignment] || '',
  bg: props.backgroundImage?.src ? '' : ({
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    muted: 'bg-muted text-muted-foreground',
  })[props.background || ''] || '',
}))

const imageClasses = computed(() => ({
  imagePosition: ({
    top: 'object-top',
    center: 'object-center',
    bottom: 'object-bottom',
  })[props.imagePosition] || '',
  tint: ({
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    muted: 'bg-muted',
  })[props.background || ''] || '',
  darken: ({
    '0%': '',
    '20%': 'opacity-20',
    '40%': 'opacity-40',
    '60%': 'opacity-60',
    '75%': 'opacity-75',
  })[props.darken] || '',
}))
</script>
