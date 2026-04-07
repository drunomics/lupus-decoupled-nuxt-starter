<template>
  <header class="site-header">
    <div class="header-inner">
      <nuxt-link to="/" class="header-brand">
        <img :src="logoUrl" alt="Logo" class="header-logo" />
        <span class="header-site-name">Nuxt Starter</span>
      </nuxt-link>

      <!-- Desktop nav -->
      <nav class="header-nav">
        <NavigationMain />
      </nav>

      <!-- Hamburger — mobile only -->
      <button
        class="hamburger"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation"
        @click="menuOpen = !menuOpen"
      >
        <base-icon :name="menuOpen ? 'ph:x' : 'ph:list'" :size="22" aria-hidden="true" />
      </button>
    </div>

    <!-- Mobile menu panel -->
    <nav v-if="menuOpen" class="mobile-menu">
      <NavigationMain />
    </nav>
  </header>
</template>

<script setup lang="ts">
import logoUrl from '~/assets/logo.svg'
const menuOpen = ref(false)
const router = useRouter()
router.afterEach(() => { menuOpen.value = false })
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  flex-shrink: 0;
  color: var(--color-foreground);
}

.header-logo {
  height: 1.75rem;
  width: auto;
}

.header-site-name {
  font-size: 1.0625rem;
  font-weight: 600;
}

.header-nav {
  display: flex;
  margin-left: 2rem;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.375rem;
  margin-left: auto;
  color: var(--color-foreground);
}

/* Mobile */
@media (max-width: 768px) {
  .header-nav {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .mobile-menu {
    position: fixed;
    top: 3.5rem;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: var(--color-background);
    border-bottom: 1px solid var(--color-border);
    box-shadow: 0 4px 8px oklch(0 0 0 / 0.08);
  }

  .mobile-menu :deep(.main-menu) {
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    gap: 0;
    padding: 0;
    margin: 0;
  }

  .mobile-menu :deep(.item) {
    display: block;
    margin: 0;
    padding: 0.75rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
  }

  .mobile-menu :deep(li:last-child .item) {
    border-bottom: none;
  }
}
</style>
