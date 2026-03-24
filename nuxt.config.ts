import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxtjs-drupal-ce', 'nuxt-component-preview', "@nuxt/eslint"],

  css: ['~/assets/css/theme.css'],

  // Register Canvas components as global. Group subfolders (Layout/, Base/, etc.)
  // are for organization only — pathPrefix: false means they don't affect component names.
  // e.g. Canvas/Layout/layout-section.vue -> <layout-section>
  components: [
    { path: '~/components/Canvas', global: true, pathPrefix: false, prefix: '' },
  ],

  drupalCe: {
    drupalBaseUrl: process.env.NUXT_PUBLIC_DRUPAL_CE_DRUPAL_BASE_URL || 'https://lupus-decoupled.ddev.site',
  },

  componentPreview: {
    componentIndex: {
      // Derive Canvas component categories from folder names (Base/, Layout/, Card/, Hero/)
      category: { directory: true, fallback: 'Misc' },
    },
  },

  nitro: {
    compressPublicAssets: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  compatibilityDate: '2026-03-24',
})
