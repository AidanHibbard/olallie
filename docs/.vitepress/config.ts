import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/Olallie/',
  title: "Olallie",
  description: "Simple state management",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Walkthrough', link: '/getting-started' },
      { text: 'API', link: '/api-reference' }
    ],

    sidebar: [
      {
        text: 'Usage',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'State', link: '/state' },
          { text: 'Actions', link: '/actions' },
          { text: 'Getters', link: '/getters' },
          { text: 'Listeners', link: '/listeners' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AidanHibbard/Olallie' }
    ]
  }
})
