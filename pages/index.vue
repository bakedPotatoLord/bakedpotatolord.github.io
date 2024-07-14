<script setup lang="ts">

const adjectives = [
  "Starchy",
  "Versatile",
  "Dependable",
  "Satisfying",
  "Wholesome",
  "Down-To-Earth",
  "Robust",
  "Resourceful",
]

const year = Date.parse("1971-01-01T00:00:00.000Z");
const currentTime = Date.now();
const birthTime = Date.parse("October 2, 2006");
const ageMs = currentTime - birthTime;
const age = ref(Math.floor(ageMs / year));

const i = ref(0)
const a = ref<HTMLSpanElement | null>(null)
const adjective = computed(() => adjectives[i.value])

onMounted(async () => {
  let isOver = false
  let timeout: ReturnType<typeof setTimeout>;

  if (a.value) {
    a.value.onmouseover = () => {
      console.log('mouse over')
      isOver = true
      changeWord()
    }
    a.value.onmouseleave = () => {
      console.log('mouse leave')
      isOver = false
      clearTimeout(timeout)
    }
  }

  function changeWord() {
    if (isOver) i.value = (++i.value) % adjectives.length
    timeout = setTimeout(changeWord, 750)
  }
})
</script>

<template>
  <section class="intro">
    <NameBar/>
  </section>
  <DiagonalDivider id="diagonalDivider" />
  <section class="about">
    <About />
  </section>
  <TriangleDivider />
  <section class="portfolio">
    <Portfolio />
  </section>
  <InvertedTriangleDivider />
  <section class="blog">
    <Blog />
  </section>
  <section class="contact">
    <Contact/>
  </section>
</template>

<style lang="scss" scoped>


#diagonalDivider {
  position: relative;
}

</style>
