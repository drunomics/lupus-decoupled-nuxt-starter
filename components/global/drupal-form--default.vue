<template>
  <form
    :formId="formId"
    :method="method"
    v-bind="attributes"
    :action="useRoute().fullPath"
    class="drupal-form"
  >
    <slot />
  </form>
</template>

<script setup lang="ts">
defineProps<{
  formId: string
  attributes: object
  method: string,
}>()

defineSlots<{
  default(): any
}>()
</script>

<style>
.drupal-form {
  padding: 0 1rem;
}

.drupal-form label {
  display: block;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
}

.drupal-form .description {
  font-size: 0.875rem;
  color: var(--color-muted-foreground, #666);
  margin-top: -0.5rem;
  margin-bottom: 0.75rem;
}

.drupal-form input[type="text"],
.drupal-form input[type="email"],
.drupal-form input[type="password"],
.drupal-form input[type="search"],
.drupal-form input[type="url"],
.drupal-form input[type="tel"],
.drupal-form input[type="number"],
.drupal-form textarea,
.drupal-form select {
  display: block;
  width: 100%;
  max-width: 32rem;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--color-border, #ccc);
  border-radius: 0.25rem;
  font: inherit;
}

.drupal-form input[type="submit"],
.drupal-form button {
  margin: 1rem 0;
  padding: 0.5rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  background: var(--color-primary, #333);
  color: var(--color-primary-foreground, #fff);
  font: inherit;
  cursor: pointer;
}
</style>
