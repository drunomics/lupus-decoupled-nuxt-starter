import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

// Layout components
import LayoutSection from '~/components/Canvas/Layout/layout-section.vue'
import LayoutTwoColumns from '~/components/Canvas/Layout/layout-two-columns.vue'
import LayoutThreeColumns from '~/components/Canvas/Layout/layout-three-columns.vue'
import LayoutGrid from '~/components/Canvas/Layout/layout-grid.vue'
import LayoutStack from '~/components/Canvas/Layout/layout-stack.vue'

// Base components
import BaseHeading from '~/components/Canvas/Base/base-heading.vue'
import BaseRichText from '~/components/Canvas/Base/base-rich-text.vue'
import BaseButton from '~/components/Canvas/Base/base-button.vue'
import BaseAnchor from '~/components/Canvas/Base/base-anchor.vue'
import BaseBanner from '~/components/Canvas/Base/base-banner.vue'
import BaseImage from '~/components/Canvas/Base/base-image.vue'
import BaseIcon from '~/components/Canvas/Base/base-icon.vue'

// Card components
import CardIcon from '~/components/Canvas/Card/card-icon.vue'
import CardImage from '~/components/Canvas/Card/card-image.vue'

// Hero components
import HeroCta from '~/components/Canvas/Hero/hero-cta.vue'
import HeroBillboard from '~/components/Canvas/Hero/hero-billboard.vue'

describe('Layout Components', () => {
  it('layout-section renders with defaults', async () => {
    const wrapper = await mountSuspended(LayoutSection)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('layout-section renders with background and padding', async () => {
    const wrapper = await mountSuspended(LayoutSection, {
      props: { background: 'muted', paddingTop: 'lg', paddingBottom: 'lg', contentWidth: 'narrow' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('layout-two-columns renders 50-50', async () => {
    const wrapper = await mountSuspended(LayoutTwoColumns, {
      props: { layout: '50-50' },
      slots: { 'col-1': '<p>Left</p>', 'col-2': '<p>Right</p>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('layout-two-columns renders 75-25', async () => {
    const wrapper = await mountSuspended(LayoutTwoColumns, {
      props: { layout: '75-25' },
      slots: { 'col-1': '<p>Wide</p>', 'col-2': '<p>Narrow</p>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('layout-three-columns renders 33-33-33', async () => {
    const wrapper = await mountSuspended(LayoutThreeColumns, {
      props: { layout: '33-33-33' },
      slots: { 'col-1': '<p>A</p>', 'col-2': '<p>B</p>', 'col-3': '<p>C</p>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('layout-grid renders 3 columns', async () => {
    const wrapper = await mountSuspended(LayoutGrid, {
      props: { columns: '3', gap: 'lg' },
      slots: { default: '<div>A</div><div>B</div><div>C</div>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('layout-stack renders vertical', async () => {
    const wrapper = await mountSuspended(LayoutStack, {
      props: { direction: 'column', gap: 'md' },
      slots: { default: '<div>A</div><div>B</div>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('layout-stack renders horizontal with background', async () => {
    const wrapper = await mountSuspended(LayoutStack, {
      props: { direction: 'row', gap: 'lg', background: 'primary', radius: 'md', padding: 'md' },
      slots: { default: '<div>A</div><div>B</div>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Base Components', () => {
  it('base-heading renders with defaults', async () => {
    const wrapper = await mountSuspended(BaseHeading, {
      props: { text: 'Hello World', level: 2 },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('base-heading renders h1 with custom size', async () => {
    const wrapper = await mountSuspended(BaseHeading, {
      props: { text: 'Big Title', level: 1, size: '6xl', align: 'center', textColor: 'primary' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('base-heading renders as link', async () => {
    const wrapper = await mountSuspended(BaseHeading, {
      props: { text: 'Click me', level: 3, url: '/page' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('base-rich-text renders html content', async () => {
    const wrapper = await mountSuspended(BaseRichText, {
      props: { text: '<p>Hello <strong>world</strong></p>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('base-button renders primary', async () => {
    const wrapper = await mountSuspended(BaseButton, {
      props: { label: 'Click me' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('base-button renders all variants', async () => {
    for (const variant of ['primary', 'secondary', 'outline'] as const) {
      const wrapper = await mountSuspended(BaseButton, {
        props: { label: variant, variant, href: '/test' },
      })
      expect(wrapper.html()).toMatchSnapshot()
    }
  })

  it('base-button renders with icon', async () => {
    const wrapper = await mountSuspended(BaseButton, {
      props: { label: 'Next', icon: 'ph:arrow-right', iconPosition: 'end', size: 'lg' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('base-anchor renders with id', async () => {
    const wrapper = await mountSuspended(BaseAnchor, {
      props: { anchorId: 'features' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('base-banner renders info variant', async () => {
    const wrapper = await mountSuspended(BaseBanner, {
      props: { text: 'Hello', variant: 'info', icon: 'ph:info' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('base-image renders with media', async () => {
    const wrapper = await mountSuspended(BaseImage, {
      props: {
        media: { src: 'https://example.com/img.jpg', alt: 'Test', width: 800, height: 600 },
        aspectRatio: '16:9',
        radius: 'md',
        caption: 'A test image',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('base-icon renders', async () => {
    const wrapper = await mountSuspended(BaseIcon, {
      props: { name: 'ph:rocket', size: 32 },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Card Components', () => {
  it('card-icon renders', async () => {
    const wrapper = await mountSuspended(CardIcon, {
      props: { icon: 'ph:rocket', heading: 'Fast', text: '<p>Very fast.</p>', align: 'center', background: 'muted', radius: 'lg' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('card-image renders vertical', async () => {
    const wrapper = await mountSuspended(CardImage, {
      props: {
        heading: 'Article',
        text: 'A description.',
        media: { src: 'https://example.com/img.jpg', alt: 'Thumb', width: 600, height: 400 },
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('card-image renders horizontal', async () => {
    const wrapper = await mountSuspended(CardImage, {
      props: {
        heading: 'Article',
        text: 'A description.',
        media: { src: 'https://example.com/img.jpg', alt: 'Thumb', width: 600, height: 400 },
        orientation: 'horizontal',
        cardStyle: 'flat',
        background: 'accent',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Hero Components', () => {
  it('hero-cta renders centered', async () => {
    const wrapper = await mountSuspended(HeroCta, {
      props: { heading: 'Call to action', text: 'Do it now.', background: 'primary', align: 'center' },
      slots: { actions: '<button>Go</button>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('hero-billboard renders', async () => {
    const wrapper = await mountSuspended(HeroBillboard, {
      props: {
        heading: 'Welcome',
        text: 'A hero description.',
        level: 1,
        height: 'large',
        alignment: 'center-left',
        backgroundImage: { src: 'https://example.com/hero.jpg', alt: 'Hero', width: 1920, height: 1080 },
        darken: '40%',
      },
      slots: { actions: '<button>Go</button>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
