<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div
    :class="['prose', ...Object.values(classes)]"
    v-html="text"
  />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /**
   * Rich text content
   * @contentMediaType text/html
   * @formattingContext block
   * @example <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
   */
  text?: string
  /**
   * Text size
   * @example md
   * @enumLabels {"sm": "Small", "md": "Medium (default)", "lg": "Large", "xl": "Extra large"}
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Text color
   * @example default
   * @enumLabels {"default": "Default", "inverted": "Inverted", "primary": "Primary"}
   */
  textColor?: 'default' | 'inverted' | 'primary'
}>(), {
  size: 'md',
  textColor: 'default',
})

const classes = computed(() => ({
  size: ({
    sm: 'prose-sm',
    md: '',
    lg: 'prose-lg',
    xl: 'prose-xl',
  })[props.size] || '',
  color: ({
    default: '',
    inverted: 'text-inverted-foreground',
    primary: 'text-primary',
  })[props.textColor || 'default'] || '',
}))
</script>
