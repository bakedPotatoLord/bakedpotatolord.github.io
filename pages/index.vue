<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
</script>

<template>
  <Analytics/>
  <section id="intro">
    <NameBar/>
  </section>
  <DiagonalDivider id="diagonalDivider" />
  <section id="about">
    <About />
  </section>
  <TriangleDivider />
  <section id="portfolio">
    <Portfolio />
  </section>
  <InvertedTriangleDivider />
  <section id="blog">
    <Blog />
  </section>
  <section id="contact">
    <Contact/>
  </section>
</template>

<style lang="scss" scoped>

#diagonalDivider {
  position: relative;
}

</style>
