<template>
  <div class="base">
    <h1>
      The C<span class="potato">🥔</span>de P<span class="potato">🥔</span>tato
    </h1>
    <h2>
      <span class="adjective">{{  randomAdjective  }}  </span>
      <span class="fullstack"> Fullstack</span><br />web developer
    </h2>
  </div>
</template>

<script setup lang="ts">
const adjectives =  [
  "Starchy",
  "Versatile",
  "Comforting",
  "Satisfying",
  "Wholesome",
  "Down-To-Earth",
  "Robust",
  "Resourceful"
]

const randomAdjective =computed(() =>
  adjectives[Math.floor(Math.random()*adjectives.length)]
)

</script>

<style scoped lang="scss">
h1 {
  font-family: "Noto Sans", sans-serif;
}

.potato {
  font-size: 1.5rem;
}
</style>
