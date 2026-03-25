<template>
  <div :id="anchorId" />
</template>

<script setup lang="ts">
/**
 * @description An invisible anchor target for in-page navigation.
 */
defineProps<{
  /**
   * Anchor ID for in-page linking (e.g. #features)
   * @example features
   * @example contact
   * @example about
   */
  anchorId: string
}>()
</script>
