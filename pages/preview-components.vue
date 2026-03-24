<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Ribbon Hero -->
    <HeroBillboard
      height="ribbon"
      content-position="center"
      :background-image="{ src: 'https://placehold.co/1920x600/0d3d38/0d3d38', alt: 'Dark background', width: 1920, height: 600 }"
      darken="20%"
    >
      <LayoutStack direction="column" gap="md" align="center">
        <BaseHeading text="Canvas Starter Components" :level="1" size="4xl" text-color="inverted" align="center" />
        <BaseRichText text="<p>A preview of all available building blocks.</p>" size="xl" text-color="inverted" />
      </LayoutStack>
    </HeroBillboard>

    <!-- Banner -->
    <BaseBanner text="Preview mode — these components render without a Drupal backend." variant="info" icon="ph:info" />

    <!-- Two-column: Intro text + Icon Cards stacked -->
    <LayoutSection padding-top="lg" padding-bottom="lg" content-width="regular">
      <LayoutTwoColumns layout="50-50">
        <template #col-1>
          <LayoutStack direction="column" gap="md">
            <BaseHeading text="Composable by design" :level="2" />
            <BaseRichText text="<p>Each component serves a single purpose. Sections wrap content with backgrounds, stacks arrange items in rows or columns, and grids distribute children evenly.</p><p>Editors pick components in Canvas, configure props through the UI, and the frontend renders them with Tailwind CSS.</p>" />
            <BaseButton label="View source" variant="primary" href="#showcase" icon="ph:code" />
          </LayoutStack>
        </template>
        <template #col-2>
          <LayoutStack direction="column" gap="lg">
            <CardIcon icon="ph:puzzle-piece" heading="Modular" text="<p>Nest layout components freely — a section containing a grid of cards, each with its own stack inside.</p>" radius="lg" background="muted" />
            <CardIcon icon="ph:paint-brush" heading="Themeable" text="<p>All colors come from CSS variables. Swap the palette in theme.css and every component updates.</p>" radius="lg" background="muted" />
          </LayoutStack>
        </template>
      </LayoutTwoColumns>
    </LayoutSection>

    <!-- Horizontal Image Cards in 2 columns -->
    <LayoutSection padding-top="lg" padding-bottom="lg" content-width="regular" background="muted">
      <LayoutStack direction="column" gap="lg">
        <BaseHeading text="Content cards" :level="2" align="center" />
        <LayoutGrid columns="2" gap="lg">
          <CardImage
            heading="Horizontal card"
            text="Image sits beside the text on wider screens."
            :media="{ src: 'https://placehold.co/400x300/6b9b93/fff', alt: 'Thumbnail', width: 400, height: 300 }"
            orientation="horizontal"
            url="#"
          />
          <CardImage
            heading="Another card"
            text="Framed style with border and rounded corners."
            :media="{ src: 'https://placehold.co/400x300/4a7c73/fff', alt: 'Thumbnail', width: 400, height: 300 }"
            orientation="horizontal"
            url="#"
          />
        </LayoutGrid>
        <LayoutGrid columns="3" gap="lg">
          <CardImage
            heading="Vertical card"
            text="Classic top-image layout."
            :media="{ src: 'https://placehold.co/600x400/d1ede8/3d6b63', alt: 'Thumbnail', width: 600, height: 400 }"
            url="#"
          />
          <CardImage
            heading="Full width style"
            text="No border, content sits directly below the image."
            :media="{ src: 'https://placehold.co/600x400/0d7a6f/5eeade', alt: 'Thumbnail', width: 600, height: 400 }"
            card-style="flat"
            url="#"
          />
          <CardImage
            heading="With background"
            text="Muted background color applied to the card."
            :media="{ src: 'https://placehold.co/600x400/d1ede8/3d6b63', alt: 'Thumbnail', width: 600, height: 400 }"
            background="accent"
            url="#"
          />
        </LayoutGrid>
      </LayoutStack>
    </LayoutSection>

    <!-- CTA with background image -->
    <HeroCta
      heading="Start composing"
      text="Create pages visually with Canvas and render them with Nuxt."
      background="primary"
      align="center"
    >
      <template #actions>
        <BaseButton label="Open Canvas" variant="primary" size="lg" href="#" />
        <BaseButton label="Read the docs" variant="outline" size="lg" href="#" icon="ph:arrow-right" />
      </template>
    </HeroCta>

    <!-- Component Showcase -->
    <LayoutSection padding-top="lg" padding-bottom="lg" content-width="narrow">
      <LayoutStack direction="column" gap="xl">
        <BaseAnchor anchor-id="showcase" />

        <!-- Headings -->
        <LayoutStack direction="column" gap="sm">
          <BaseHeading text="Heading levels" :level="2" />
          <BaseHeading text="Heading 1 — default size" :level="1" />
          <BaseHeading text="Heading 2 — default size" :level="2" />
          <BaseHeading text="Heading 3 — default size" :level="3" />
          <BaseHeading text="Heading 4 — default size" :level="4" />
          <BaseHeading text="Heading 5 — default size" :level="5" />
          <BaseHeading text="Heading 6 — default size" :level="6" />
        </LayoutStack>

        <LayoutStack direction="column" gap="sm">
          <BaseHeading text="Custom size override" :level="2" />
          <BaseHeading text="h3 displayed at 5XL" :level="3" size="5xl" />
          <BaseHeading text="h5 displayed at 3XL" :level="5" size="3xl" />
        </LayoutStack>

        <!-- Buttons -->
        <LayoutStack direction="column" gap="md">
          <BaseHeading text="Button variants" :level="2" />
          <LayoutStack direction="row" gap="md" wrap>
            <BaseButton label="Primary" variant="primary" />
            <BaseButton label="Secondary" variant="secondary" />
            <BaseButton label="Outline" variant="outline" />
          </LayoutStack>
          <LayoutStack direction="row" gap="md" wrap>
            <BaseButton label="Small" variant="primary" size="sm" />
            <BaseButton label="Medium" variant="primary" size="md" />
            <BaseButton label="Large" variant="primary" size="lg" />
          </LayoutStack>
          <LayoutStack direction="row" gap="md" wrap>
            <BaseButton label="With icon" variant="primary" icon="ph:arrow-right" />
            <BaseButton label="Icon start" variant="secondary" icon="ph:download" icon-position="start" />
          </LayoutStack>
        </LayoutStack>

        <!-- Images -->
        <LayoutStack direction="column" gap="md">
          <BaseHeading text="Image aspect ratios" :level="2" />
          <LayoutGrid columns="4" gap="md">
            <BaseImage :media="{ src: 'https://placehold.co/800x600/6b9b93/fff?text=4:3', alt: 'Landscape', width: 800, height: 600 }" aspect-ratio="4:3" radius="sm" caption="4:3 ratio" />
            <BaseImage :media="{ src: 'https://placehold.co/800x600/4a7c73/fff?text=16:9', alt: 'Widescreen', width: 800, height: 600 }" aspect-ratio="16:9" radius="md" caption="16:9 ratio" />
            <BaseImage :media="{ src: 'https://placehold.co/800x600/6b9b93/fff?text=1:1', alt: 'Square', width: 800, height: 600 }" aspect-ratio="1:1" radius="lg" caption="1:1 ratio" />
            <BaseImage :media="{ src: 'https://placehold.co/800x600/4a7c73/fff?text=Original', alt: 'Original', width: 800, height: 600 }" caption="Original ratio" />
          </LayoutGrid>
        </LayoutStack>

        <!-- Icon Cards centered -->
        <LayoutStack direction="column" gap="md">
          <BaseHeading text="Icon cards — centered" :level="2" />
          <LayoutGrid columns="3" gap="lg">
            <CardIcon icon="ph:rocket" heading="Performance" text="<p>Server-side rendered for fast load times.</p>" align="center" />
            <CardIcon icon="ph:shield-check" heading="Security" text="<p>Content API with proper access control.</p>" align="center" />
            <CardIcon icon="ph:plugs-connected" heading="Integration" text="<p>Canvas, custom elements, Nuxt — all connected.</p>" align="center" />
          </LayoutGrid>
        </LayoutStack>

      </LayoutStack>
    </LayoutSection>

    <!-- Column layouts -->
    <LayoutSection padding-top="none" padding-bottom="lg" content-width="narrow">
      <LayoutStack direction="column" gap="md" align="stretch">
        <BaseHeading text="Column layouts" :level="2" />
        <LayoutTwoColumns layout="75-25">
          <template #col-1>
            <BaseRichText text="<p style='text-align:center;background:var(--color-muted);border-radius:0.375rem;padding:1rem'>75%</p>" />
          </template>
          <template #col-2>
            <BaseRichText text="<p style='text-align:center;background:var(--color-muted);border-radius:0.375rem;padding:1rem'>25%</p>" />
          </template>
        </LayoutTwoColumns>
        <LayoutThreeColumns layout="33-33-33">
          <template #col-1>
            <BaseRichText text="<p style='text-align:center;background:var(--color-muted);border-radius:0.375rem;padding:1rem'>33%</p>" />
          </template>
          <template #col-2>
            <BaseRichText text="<p style='text-align:center;background:var(--color-muted);border-radius:0.375rem;padding:1rem'>33%</p>" />
          </template>
          <template #col-3>
            <BaseRichText text="<p style='text-align:center;background:var(--color-muted);border-radius:0.375rem;padding:1rem'>33%</p>" />
          </template>
        </LayoutThreeColumns>
      </LayoutStack>
    </LayoutSection>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>
