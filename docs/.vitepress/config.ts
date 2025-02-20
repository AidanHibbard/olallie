import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/olallie/',
  title: 'Olallie',
  description: 'Simple state management',
  // https://vitepress.dev/reference/site-config#example-using-google-analytics
  head: [
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-KC2VRE76BV',
      },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-KC2VRE76BV');`,
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Walkthrough', link: '/getting-started' },
      { text: 'Upgrading', link: '/upgrade-guide' },
      { text: 'API', link: '/api-reference' },
    ],
    sidebar: [
      {
        text: 'Usage',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'State', link: '/state' },
          { text: 'Actions', link: '/actions' },
          { text: 'Getters', link: '/getters' },
          { text: 'Listeners', link: '/listeners' },
        ],
      },
      { text: 'API', link: '/api-reference' },
      { text: 'Upgrade Guide', link: '/upgrade-guide' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/AidanHibbard/olallie' },
    ],
    editLink: {
      pattern: 'https://github.com/AidanHibbard/olallie/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },
  },
});
