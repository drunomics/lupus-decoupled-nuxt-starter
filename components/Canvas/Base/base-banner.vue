<template>
  <div
    v-if="!dismissed"
    :class="['flex items-center justify-center px-6 py-4 text-base', ...Object.values(classes)]"
    role="alert"
  >
    <div class="flex items-center gap-2 flex-1 justify-center">
      <BaseIcon v-if="icon" :name="icon" :size="20" />
      <component
        :is="url ? 'a' : 'span'"
        :href="url || undefined"
        :class="url ? 'underline' : ''"
      >
        {{ text }}
      </component>
    </div>
    <button
      v-if="dismissible"
      class="bg-transparent border-none text-4xl leading-none cursor-pointer text-current/70 px-3 py-1 hover:text-current transition-colors"
      aria-label="Dismiss"
      @click="dismissed = true"
    >
      &times;
    </button>
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
  /**
   * Banner text
   * @example Important update: Site will be in maintenance mode tonight.
   * @example Limited offer available until end of month.
   */
  text: string
  /**
   * Optional link URL
   * @format uri-reference
   */
  url?: string
  /**
   * Banner style
   * @example info
   * @enumLabels {"info": "Info", "warning": "Warning", "success": "Success"}
   */
  variant?: 'info' | 'warning' | 'success'
  /**
   * Allow user to dismiss the banner
   */
  dismissible?: boolean
  /**
   * Icon name (Iconify format)
   * @example ph:info
   */
  icon?: string
}>(), {
  variant: 'info',
  dismissible: true,
})

const dismissed = ref(false)

const classes = computed(() => ({
  variant: ({
    info: 'bg-muted text-muted-foreground',
    warning: 'bg-amber-100 text-amber-900',
    success: 'bg-emerald-100 text-emerald-900',
  })[props.variant] || '',
}))
</script>
