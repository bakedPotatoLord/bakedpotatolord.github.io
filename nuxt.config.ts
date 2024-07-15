// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/content', "@nuxt/image"],

  components: [
    { path: '~/components/dividers', pathPrefix: false },
    { path: '~/components/sections', pathPrefix: false },
    '~/components',
  ],

  vite:{
    build:{
      minify:true,
      cssMinify:true,
    }
  },

  content:{
    highlight:{
      theme:"github-dark",
      langs:[
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
  },

  compatibilityDate: '2024-07-04'
})