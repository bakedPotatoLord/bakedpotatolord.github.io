// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxt/image", "@nuxtjs/sitemap",'@nuxt/content',],

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
  
  sitemap: {
    strictNuxtContentPaths: true,
    excludeAppSources: true,
    sitemaps:{
      pages: {
        urls: ['/','/blog',],
      },
      posts: {
        sources: ['/api/__sitemap__/posts'],
      }
    }
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
        "ts",
        "js",
        "json",
        "html",
        "vue",
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
    '/': { ssr: true, sitemap: { lastmod: new Date("8-18-2024")} },
    "/blog/**/*": { ssr: false },
    "/blog": { ssr: false, sitemap: { lastmod: new Date("8-18-2024")} },
  },

  compatibilityDate: '2024-07-04'
})