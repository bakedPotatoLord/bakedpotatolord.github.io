<template>
  <div class="background">
    <Header />
    
    <br />
    <div class="pagewrapper">
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import "./global.css";

useServerSeoMeta({
  title: 'BakedPotatoLord | Josiah Hamm',
  ogTitle: 'BakedPotatoLord | Josiah Hamm',
  description: 'My portfolio and blog',
  ogDescription: 'My portfolio and blog',
  ogUrl: 'https://www.potatolord.win',
  ogImage: 'https://www.potatolord.win/images/bakedpotatolord.png',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})

</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;200;300;400;500;600;700;800&display=swap');

</style>

