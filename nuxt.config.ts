import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxtjs-drupal-ce', 'nuxt-component-preview', "@nuxt/eslint"],

  css: ['~/assets/css/theme.css'],

  // Register Canvas components as global. Group subfolders (Layout/, Base/, etc.)
  // are for organization only — pathPrefix: false means they don't affect component names.
  // e.g. Canvas/Layout/layout-section.vue -> <layout-section>

  drupalCe: {
    drupalBaseUrl: process.env.NUXT_PUBLIC_DRUPAL_CE_DRUPAL_BASE_URL || 'http://lupus-decoupled.ddev.site',
  },

  components: [
    { path: '~/components/Canvas', global: true, pathPrefix: false, prefix: '' },
    { path: '~/components/global', global: true },
    '~/components',
  ],

  componentPreview: {
    componentIndex: {
      // Derive Canvas component categories from folder names (Base/, Layout/, Card/, Hero/)
      category: { directory: true, fallback: 'Misc' },
    },
  },

  nitro: {
    compressPublicAssets: true,
    // Disable link crawling for nuxt generate — useful when generating
    // a SPA for shipping with Lupus CSR.
    prerender: {
      crawlLinks: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  compatibilityDate: '2026-03-24',
})
