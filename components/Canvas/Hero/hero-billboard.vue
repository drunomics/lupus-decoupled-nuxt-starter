<template>
  <div
    :class="[
      'relative flex flex-col w-full overflow-hidden',
      ...Object.values(classes),
      backgroundImage?.src ? 'text-white' : '',
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
    <div :class="['relative z-10 flex flex-col gap-3 lg:gap-4 px-6 md:px-12 lg:px-16 max-w-4xl', alignment === 'top-left' ? 'pt-8 md:pt-12 pb-3' : alignment === 'bottom-left' ? 'pt-3 pb-6 md:pb-8' : 'py-3 md:py-4', alignment === 'center' ? 'items-center text-center mx-auto' : 'items-start']">
      <component :is="`h${level}`" v-if="heading" class="m-0 text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl">
        {{ heading }}
      </component>
      <p v-if="text" class="m-0 text-xl font-normal max-w-2xl">{{ text }}</p>
      <div v-if="$slots.actions" :class="['flex flex-col gap-4 sm:flex-row', alignment === 'center' ? 'justify-center' : '']">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /**
   * Heading text
   * @example Page title goes here
   */
  heading?: string
  /**
   * Heading level
   * @example 2
   */
  level?: 1 | 2 | 3 | 4
  /**
   * Description text
   * @example A short introduction or tagline for this page.
   */
  text?: string
  /**
   * Hero height
   * @example large
   * @enumLabels {"full": "Full screen", "large": "Large", "ribbon": "Ribbon"}
   */
  height?: 'full' | 'large' | 'ribbon'
  /**
   * Content alignment
   * @example center
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
   * @example src=https://placehold.co/1920x1080/333/333 alt="Hero background" width=1920 height=1080
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
  level: 2,
  height: 'large',
  alignment: 'center',
  imagePosition: 'center',
  darken: '60%',
})

defineSlots<{
  /**
   * Action buttons
   */
  actions?(): unknown
}>()

const classes = computed(() => ({
  height: ({
    full: 'h-[100vh] h-dvh',
    large: 'min-h-[32rem]',
    ribbon: 'min-h-64 md:min-h-80',
  })[props.height] || '',
  position: ({
    'top-left': 'justify-start items-start',
    'center-left': 'justify-center items-start',
    'bottom-left': 'justify-end items-start',
    'center': 'justify-center items-center',
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
