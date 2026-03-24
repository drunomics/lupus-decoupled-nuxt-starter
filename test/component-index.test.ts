// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('Component Index', async () => {
  await setup({
    server: true,
  })

  it('exposes all canvas components with correct categories', async () => {
    const index = await $fetch('/nuxt-component-preview/component-index.json')
    expect(index.version).toBe('1.0')

    const byId = Object.fromEntries(
      index.components.map((c: { id: string, category: string }) => [c.id, c.category]),
    )

    // Verify all 15 components are present and in the right category
    expect(byId).toMatchObject({
      LayoutSection: 'Layout',
      LayoutColumns: 'Layout',
      LayoutGrid: 'Layout',
      LayoutStack: 'Layout',
      BaseHeading: 'Base',
      BaseRichText: 'Base',
      BaseButton: 'Base',
      BaseAnchor: 'Base',
      BaseBanner: 'Base',
      BaseImage: 'Base',
      BaseIcon: 'Base',
      CardIcon: 'Card',
      CardImage: 'Card',
      HeroCta: 'Hero',
      HeroBillboard: 'Hero',
    })
  })
})
