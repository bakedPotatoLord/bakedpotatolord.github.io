// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //devtools: { enabled: true },
  modules: [
    '@nuxt/content'
  ],
  components: [
    { path: '~/components/dividers', pathPrefix: false },
    '~/components',
  ],
  vite:{
    build:{
      minify:true,
      cssMinify:true,
    }
  }
})
