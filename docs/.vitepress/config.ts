import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/olallie/',
  title: "Olallie",
  description: "Simple state management",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Get started', link: '/get-started' }
    ],

    sidebar: [
      {
        text: 'Usage',
        items: [
          { text: 'Get Started', link: '/get-started' },
          { text: 'State', link: '/state' },
          { text: 'Actions', link: '/actions' },
          { text: 'Getters', link: '/getters' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AidanHibbard/olallie' }
    ]
  }
})
