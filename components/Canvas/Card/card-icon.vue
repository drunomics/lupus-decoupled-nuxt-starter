<template>
  <component
    :is="url ? 'a' : 'div'"
    :href="url || undefined"
    :class="[
      'flex flex-col gap-3 p-5 md:p-6 no-underline text-inherit transition duration-300',
      url ? 'cursor-pointer hover:scale-105' : '',
      ...Object.values(classes),
    ]"
  >
    <BaseIcon
      v-if="icon"
      :name="icon"
      :size="iconSizePx"
    />
    <div class="flex flex-col gap-1">
      <h3 v-if="heading" class="m-0 text-lg font-semibold">{{ heading }}</h3>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div
        v-if="text"
        class="text-sm text-muted-foreground"
        v-html="text"
      />
    </div>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /**
   * Icon name (Iconify format)
   * @example ph:rocket
   * @example ph:shield-check
   * @example ph:lightning
   */
  icon: string
  /**
   * Icon size
   * @example md
   * @enumLabels {"sm": "Small", "md": "Medium", "lg": "Large"}
   */
  iconSize?: 'sm' | 'md' | 'lg'
  /**
   * Card heading
   * @example Easy Setup
   * @example Fully Customizable
   */
  heading?: string
  /**
   * Card description
   * @contentMediaType text/html
   * @formattingContext block
   * @example <p>A short description of this feature or service.</p>
   */
  text?: string
  /**
   * Content alignment
   * @example start
   * @enumLabels {"start": "Left", "center": "Center"}
   */
  align?: 'start' | 'center'
  /**
   * Optional link URL
   * @format uri-reference
   */
  url?: string
  /**
   * Background color
   * @example default
   * @enumLabels {"default": "Default", "primary": "Primary", "accent": "Accent", "muted": "Muted"}
   */
  background?: 'default' | 'primary' | 'accent' | 'muted'
  /**
   * Corner radius
   * @example md
   * @enumLabels {"none": "None", "sm": "Small", "md": "Medium", "lg": "Large"}
   */
  radius?: 'none' | 'sm' | 'md' | 'lg'
}>(), {
  iconSize: 'md',
  align: 'start',
  radius: 'md',
})

const iconSizePx = computed(() => ({
  sm: 24,
  md: 32,
  lg: 48,
})[props.iconSize] || 32)

const classes = computed(() => ({
  align: ({
    start: 'items-start text-start',
    center: 'items-center text-center',
  })[props.align] || '',
  bg: ({
    default: '',
    primary: 'bg-primary text-primary-foreground',
    accent: 'bg-accent text-accent-foreground',
    muted: 'bg-muted text-muted-foreground',
  })[props.background || 'default'] || '',
  radius: ({
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
  })[props.radius] || '',
}))
</script>
