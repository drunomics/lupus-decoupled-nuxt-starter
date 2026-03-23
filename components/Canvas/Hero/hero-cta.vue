<template>
  <div
    :class="[
      'relative',
      ...Object.values(classes),
      backgroundImage?.src ? 'text-white' : '',
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
        :class="['absolute inset-0', innerClasses.overlay]"
      />
    </div>
    <div :class="['relative flex flex-col gap-6 lg:gap-8 py-20 lg:py-28 xl:py-36 px-4', innerClasses.contentAlign]">
      <component :is="`h${level}`" v-if="heading" class="m-0 text-4xl md:text-5xl font-bold max-w-3xl">
        {{ heading }}
      </component>
      <p v-if="text" class="m-0 text-xl font-normal max-w-2xl">{{ text }}</p>
      <div v-if="$slots.actions" :class="['flex flex-col gap-4 sm:flex-row', align === 'center' ? 'justify-center' : align === 'end' ? 'justify-end' : '']">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /**
   * CTA heading
   * @example Take the next step
   * @example Explore what we offer
   */
  heading?: string
  /**
   * Heading level
   * @example 2
   */
  level?: 1 | 2 | 3 | 4
  /**
   * CTA description
   * @example Find out how we can help you succeed.
   */
  text?: string
  /**
   * Text alignment
   * @example center
   * @enumLabels {"start": "Left", "center": "Center", "end": "Right"}
   */
  align?: 'start' | 'center' | 'end'
  /**
   * Background color
   * @example primary
   * @enumLabels {"primary": "Primary", "secondary": "Secondary", "accent": "Accent", "muted": "Muted", "inverted": "Inverted"}
   */
  background?: 'primary' | 'secondary' | 'accent' | 'muted' | 'inverted'
  /**
   * Background image
   * @example src=https://placehold.co/1920x600 alt="CTA background" width=1920 height=600
   */
  backgroundImage?: CanvasImage
  /**
   * Background overlay opacity
   * @example 40%
   * @enumLabels {"0%": "None", "20%": "Light", "40%": "Medium", "60%": "Dark", "75%": "Extra dark"}
   */
  overlayOpacity?: '0%' | '20%' | '40%' | '60%' | '75%'
}>(), {
  level: 2,
  align: 'center',
  overlayOpacity: '40%',
})

defineSlots<{
  /**
   * Action buttons
   */
  actions?(): unknown
}>()

const classes = computed(() => ({
  align: ({
    start: 'text-start',
    center: 'text-center',
    end: 'text-end',
  })[props.align] || '',
  bg: ({
    default: '',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    muted: 'bg-muted text-muted-foreground',
    inverted: 'bg-inverted text-inverted-foreground',
  })[props.background || 'default'] || '',
}))

const innerClasses = computed(() => ({
  contentAlign: ({
    start: 'items-start',
    center: 'items-center mx-auto max-w-4xl',
    end: 'items-end ml-auto',
  })[props.align] || '',
  overlay: ({
    '0%': '',
    '20%': 'bg-black/20',
    '40%': 'bg-black/40',
    '60%': 'bg-black/60',
    '75%': 'bg-black/75',
  })[props.overlayOpacity] || '',
}))
</script>
