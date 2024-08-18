// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/content', "@nuxt/image", "@nuxtjs/sitemap"],

  components: {
    global: true,
    dirs: [
      { path: '~/components/dividers', pathPrefix: false },
      { path: '~/components/sections', pathPrefix: false },
      { path: '~/components/content', pathPrefix: false },
      '~/components',
    ],
  },

  vite: {
    build: {
      minify: true,
      cssMinify: true,
    },
  },
  appConfig: {
  },

  vue: {
    compilerOptions: {
    },
  },

  site: {
    url: 'https://bakedpotatolord.vercel.app',
    name: 'BakedPotatoLord'
  },

  content: {
    highlight: {
      theme: "github-dark",
      langs: [
        'c',
        'cpp',
        'java',
        'css',
        'scss',
        'bash',
        'json',
        "zig",
      ]
    },
    markdown: {
      rehypePlugins: [
        "rehype-katex",
      ],
      remarkPlugins: [
        "remark-math",
      ]
    },
  },

  routeRules: {
    '/': { ssr: true },
    "/blog/**/*": { ssr: false },
    "/blog": { ssr: false },
  },

  compatibilityDate: '2024-07-04'
})