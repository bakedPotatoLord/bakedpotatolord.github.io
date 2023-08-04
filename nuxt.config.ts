// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //devtools: { enabled: true },
  modules: [
    '@nuxt/content'
  ],
  vite:{
    build:{
      minify:true,
      cssMinify:true,
    }
  }
})
