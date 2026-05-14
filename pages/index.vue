<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
</script>

<template>
  <Analytics/>
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
