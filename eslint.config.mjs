import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    rules: {
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
    }
  },
  {
    // Pre-existing starter components use `any` types — disable strict typing for them.
    files: ['components/global/**', 'components/Drupal/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'vue/no-required-prop-with-default': 'off',
    }
  }
])
