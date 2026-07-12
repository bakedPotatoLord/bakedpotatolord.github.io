<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'

let timeout:NodeJS.Timeout;

const displaySphere = ref(false)

onMounted(() => {
  timeout = setTimeout(() => {
    displaySphere.value = true
  },45_000)
})

onBeforeUnmount(() => {
  clearTimeout(timeout)
})

</script>

<template>
  <Analytics/>
  <Transition>
    <Globe v-if="displaySphere" />
  </Transition>
  <section id="intro" role="region" aria-label="Intro">
    <NameBar/>
  </section>
  <DiagonalDivider id="diagonalDivider" />
  <section id="about" role="region" aria-label="About">
    <About />
  </section>
  <TriangleDivider />
  <section id="portfolio" role="region" aria-label="Portfolio">
    <Portfolio />
  </section>
  <InvertedTriangleDivider />
  <section id="blog" role="region" aria-label="Blog">
    <Blog />
  </section>
  <section id="contact" role="region" aria-label="Contact">
    <Contact/>
  </section>

</template>

<style lang="scss" scoped>

#diagonalDivider {
  position: relative;
}




</style>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
