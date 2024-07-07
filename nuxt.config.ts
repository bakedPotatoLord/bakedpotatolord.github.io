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

  compatibilityDate: '2024-07-04'
})