<template>
  <section
    :class="[
      'relative w-full',
      colorScheme === 'dark' ? 'dark' : '',
      classes.bg,
      classes.paddingTop,
      classes.paddingBottom,
    ]"
  >
    <div
      v-if="backgroundImage?.src"
      class="absolute inset-0 overflow-hidden"
    >
      <img
        :src="backgroundImage.src"
        :alt="backgroundImage.alt || ''"
        :width="backgroundImage.width"
        :height="backgroundImage.height"
        class="size-full object-cover"
      >
      <div
        v-if="overlayOpacity !== '0%'"
        :class="['absolute inset-0', classes.overlay]"
      />
    </div>
    <div :class="['relative mx-auto', classes.contentWidth]">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /**
   * Color scheme
   * @example light
   * @enumLabels {"light": "Light", "dark": "Dark"}
   */
  colorScheme?: 'light' | 'dark'
  /**
   * Background color
   * @example default
   * @enumLabels {"default": "Default", "primary": "Primary", "secondary": "Secondary", "accent": "Accent", "muted": "Muted"}
   */
  background?: 'default' | 'primary' | 'secondary' | 'accent' | 'muted'
  /**
   * Background image
   * @example src=https://placehold.co/1920x600 alt="Section background" width=1920 height=600
   */
  backgroundImage?: CanvasImage
  /**
   * Background overlay opacity
   * @example 0%
   * @enumLabels {"0%": "None", "20%": "Light", "40%": "Medium", "60%": "Dark", "75%": "Extra dark"}
   */
  overlayOpacity?: '0%' | '20%' | '40%' | '60%' | '75%'
  /**
   * Top padding
   * @example md
   * @enumLabels {"none": "None", "sm": "Small", "md": "Medium", "lg": "Large", "xl": "Extra large"}
   */
  paddingTop?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Bottom padding
   * @example md
   * @enumLabels {"none": "None", "sm": "Small", "md": "Medium", "lg": "Large", "xl": "Extra large"}
   */
  paddingBottom?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Content width
   * @example regular
   * @enumLabels {"narrow": "Narrow", "regular": "Regular", "full": "Full width"}
   */
  contentWidth?: 'narrow' | 'regular' | 'full'
}>(), {
  colorScheme: 'light',
  overlayOpacity: '0%',
  paddingTop: 'md',
  paddingBottom: 'md',
  contentWidth: 'regular',
})

defineSlots<{
  /**
   * Section content
   */
  default?(): unknown
}>()

const classes = computed(() => ({
  bg: ({
    default: '',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    muted: 'bg-muted text-muted-foreground',
  })[props.background || 'default'] || '',
  paddingTop: ({
    none: '',
    sm: 'pt-4',
    md: 'pt-8',
    lg: 'pt-16',
    xl: 'pt-24',
  })[props.paddingTop] || '',
  paddingBottom: ({
    none: '',
    sm: 'pb-4',
    md: 'pb-8',
    lg: 'pb-16',
    xl: 'pb-24',
  })[props.paddingBottom] || '',
  overlay: ({
    '0%': '',
    '20%': 'bg-black/20',
    '40%': 'bg-black/40',
    '60%': 'bg-black/60',
    '75%': 'bg-black/75',
  })[props.overlayOpacity] || '',
  contentWidth: ({
    narrow: 'max-w-3xl px-4',
    regular: 'max-w-6xl px-4 md:px-8',
    full: 'w-full',
  })[props.contentWidth] || '',
}))
</script>
