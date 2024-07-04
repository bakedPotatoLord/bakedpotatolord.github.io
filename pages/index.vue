<script setup lang="ts">
import About from '~/components/sections/About.vue';
import Portfolio from '~/components/sections/Portfolio.vue';

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
    <div class="maintext">
      <div class="textContainer">
        <h1>
          C<span class="potato">🥔</span>de P<span class="potato">🥔</span>tato
        </h1>
        <h2>
          The <span ref="a" class="adjective">{{ adjective }} </span>
          <span class="fullstack"> Fullstack</span><br />Web Developer
        </h2>
      </div>
    </div>
    <div class="potatoContainer">
      <Potato id="potato" />
    </div>
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

  </section>
</template>

<style lang="scss" scoped>
.intro {
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .maintext {
    display: flex;
    align-items: center;

    .textContainer {
      display: block;
      min-width: 400px;
      max-width: 500px;

      h1 {
        font-weight: 600;
      }

      h2 {
        font-weight: 300;
        margin-bottom: 0px;

        .adjective {
          text-shadow: white 0px 0px 10px;
        }
      }
    }
  }

  .potatoContainer {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

#diagonalDivider {
  position: relative;
}

</style>
