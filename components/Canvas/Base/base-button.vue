<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href || undefined"
    class="group"
    :class="[
      'inline-flex items-center rounded-lg font-medium leading-tight no-underline cursor-pointer transition duration-300 ease-in-out',
      'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring outline-none',
      ...Object.values(classes),
    ]"
  >
    <BaseIcon v-if="icon && iconPosition === 'start'" :name="icon" :size="iconSize" class="transition-transform duration-300" />
    <span>{{ label }}</span>
    <BaseIcon v-if="icon && iconPosition === 'end'" :name="icon" :size="iconSize" class="transition-transform duration-300 group-hover:translate-x-1" />
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /**
   * Button text
   * @example Read more
   * @example Sign up
   * @example View details
   */
  label: string
  /**
   * Link URL
   * @format uri-reference
   * @example /contact
   */
  href?: string
  /**
   * Visual style
   * @example primary
   * @enumLabels {"primary": "Primary", "secondary": "Secondary", "outline": "Outline"}
   */
  variant?: 'primary' | 'secondary' | 'outline'
  /**
   * Button size
   * @example md
   * @enumLabels {"sm": "Small", "md": "Medium", "lg": "Large"}
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Icon name (Iconify format)
   * @example ph:arrow-right
   */
  icon?: string
  /**
   * Icon position relative to label
   * @example end
   * @enumLabels {"start": "Before label", "end": "After label"}
   */
  iconPosition?: 'start' | 'end'
}>(), {
  variant: 'primary',
  size: 'md',
  iconPosition: 'end',
})

const classes = computed(() => ({
  variant: ({
    primary: 'bg-primary text-primary-foreground hover:bg-primary/75',
    secondary: 'bg-accent text-accent-foreground hover:bg-accent/70',
    outline: 'bg-transparent border border-current hover:bg-current/15',
  })[props.variant] || '',
  size: ({
    sm: 'gap-1 px-4 py-2 text-sm',
    md: 'gap-2 px-5 py-2 text-base xl:py-3',
    lg: 'gap-3 px-6 py-3 text-lg xl:py-3.5',
  })[props.size] || '',
}))

const iconSize = computed(() => ({
  sm: 16,
  md: 20,
  lg: 24,
})[props.size] || 20)
</script>
