
const customTags = new Set(["Annotation", "mi", "mrow", "semantics", "mn", "mo"])


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/content', "@nuxt/image"],

  components: [
    { path: '~/components/dividers', pathPrefix: false },
    { path: '~/components/sections', pathPrefix: false },
    '~/components',
  ],

  vite: {
    build: {
      minify: true,
      cssMinify: true,
      
    },
  },
  appConfig:{
    
  },

  

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        if(customTags.has(tag)) console.log("checking tag", tag)
        return false;
      },
    },
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