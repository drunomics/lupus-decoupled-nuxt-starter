<template>
  <div>
    <SiteHeader />
    <SiteMessages />
    <main id="main">
      <slot />
    </main>
    <footer>
      <NavigationAccount />
    </footer>
  </div>
</template>

<style>
#main {
  min-height: 70vh;
}
body {
  background-color: var(--color-background);
}
</style>
