
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

const i = ref(0)
const a = ref<HTMLSpanElement | null>(null)
const adjective = computed(() => adjectives[i.value])
let interval: NodeJS.Timer

onMounted( () => {
  interval= setInterval(changeWord,2500)
  function changeWord() {
     i.value = (++i.value) % adjectives.length
  }
})

onUnmounted(()=>{
  clearInterval(interval)
})

</script>


<template>
  <div class="nameBar">
    <div class="maintext">
      <div class="textContainer">
        <h1>
          C<span class="potato">🥔</span>de P<span class="potato">🥔</span>tato
        </h1>
        <h2>
          The <span ref="a" class="adjective">{{ adjective }} </span> Developer
           <br />and Engineer
        </h2>
      </div>
    </div>
    <div class="potatoContainer">
      <Potato id="potato" />
    </div>
  </div>
</template>

<style scoped lang="scss">


.nameBar {
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;

  .maintext {
    display: flex;
    align-items: center;
    .textContainer {
      display: block;
      min-width: 400px;
      max-width: 500px;
      h1 {
        font-weight: 600;
        font-size: 3.5rem;
        margin-bottom: 0.5rem;
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
    
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
  }
}
</style>