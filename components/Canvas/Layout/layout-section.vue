<template>
  <section
    :class="[
      'relative w-full',
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
    </div>
    <div
      v-if="backgroundImage?.src && background && background !== 'default'"
      :class="['absolute inset-0 opacity-40', classes.tint]"
    />
    <div
      v-if="darken !== '0%'"
      :class="['absolute inset-0 bg-black', classes.darken]"
    />
    <div :class="['relative mx-auto', classes.contentWidth]">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /**
   * Background color
   * @enumLabels {"default": "Default", "primary": "Primary", "secondary": "Secondary", "accent": "Accent", "muted": "Muted"}
   */
  background?: 'default' | 'primary' | 'secondary' | 'accent' | 'muted'
  /**
   * Background image
   */
  backgroundImage?: CanvasImage
  /**
   * Darken the background
   * @example 0%
   * @enumLabels {"0%": "None", "20%": "Slightly", "40%": "Medium", "60%": "Strong", "75%": "Very strong"}
   */
  darken?: '0%' | '20%' | '40%' | '60%' | '75%'
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
  darken: '0%',
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
  contentWidth: ({
    narrow: 'max-w-3xl px-4',
    regular: 'max-w-6xl px-4 md:px-8',
    full: 'w-full',
  })[props.contentWidth] || '',
}))
</script>
