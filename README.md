# Lupus Decoupled Nuxt Starter

A starter setup with skeleton components for [Lupus Decoupled Drupal](https://www.drupal.org/project/lupus_decoupled).
Built upon the [nuxtjs-drupal-ce](https://github.com/drunomics/nuxtjs-drupal-ce) Nuxt module.

Full documentation is available at [lupus-decoupled.org](https://lupus-decoupled.org).

## Overview

This is a Nuxt project with [nuxtjs-drupal-ce](https://github.com/drunomics/nuxtjs-drupal-ce) installed and configured, ready to connect to a Lupus Decoupled Drupal backend.

### Canvas Components

The components under `components/Canvas/` are example components demonstrating how to build for [Drupal Canvas](https://www.drupal.org/project/canvas), a Drupal module that lets editors compose pages from Vue components. They cover common patterns (heroes, cards, layout primitives, rich text) and serve as a starting point to be extended or replaced with your own components.

### Related Projects

- **[lupus_decoupled_starter](https://www.drupal.org/project/lupus_decoupled_starter)**: a Drupal CMS Site Template that uses this starter as its frontend
- **[lupus_csr](https://www.drupal.org/project/lupus_csr)**: a Drupal theme that bundles a built version of this starter to serve it as a Drupal-hosted CSR frontend

## Try it

### GitHub Codespaces

The easiest way to try it is via [GitHub Codespaces](https://codespaces.new/drunomics/lupus-decoupled-project?quickstart=1), a free, browser-based development environment with everything preconfigured.

See the [Play Online](https://lupus-decoupled.org/get-started/play-online) guide for details and alternative setups (shadcn/ui, Next.js).

### StackBlitz

You can also [launch it on StackBlitz](https://stackblitz.com/fork/github/drunomics/lupus-decoupled-nuxt-starter/tree/main?file=nuxt.config.ts) and connect it to a backend manually (see manual setup steps below).

### Manual setup steps

When using StackBlitz or a local setup, configure the base URLs:

1. Set the Drupal base URL in `nuxt.config.ts`.
2. Set the frontend base URL in Drupal at `/admin/config/system/lupus-decoupled/settings`.
3. Add some content nodes and menu items pointing to them. `/node/1` on the backend is available under `/node/1` in the frontend.

## Usage

### Setup

Install the dependencies:

```bash
npm install
```

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

### Testing

```bash
npm test
```

Tests cover:
- **HTML snapshots**: renders each Canvas component with various prop combinations and snapshots the output. Catches regressions in markup and Tailwind class mappings.
- **Component index**: verifies all Canvas components are registered and exposed with correct categories for Drupal Canvas.

Update snapshots after intentional changes:

```bash
npx vitest run --update
```

### Linting

```bash
npm run lint
```

## License

[MIT](./LICENSE)
