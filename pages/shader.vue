
<script setup lang="ts">
import { shaderLoop, shaderSetup } from '~/utils/shaders/firstTest/shader';

onMounted( () => {
  let gl = canvas.value?.getContext("webgl2",{ antialias: true })

  if(!gl){
    console.error("no gl context")
    return
  }
  
  shaderSetup(gl)
  mainLoop()
})

const canvas = ref<HTMLCanvasElement | null>(null)

const runShader = ref(true)


function mainLoop() {
  shaderLoop()

  if(runShader.value) requestAnimationFrame(mainLoop);
}

</script>

<template>

<div class="container" >
  <canvas class="shaderCanvas" ref="canvas"></canvas>

</div>

</template>

<style scoped lang="scss">

.container{
  display: flex;
  align-items: center;
  justify-content: center;
  .shaderCanvas{
    margin-top: 1rem;
    margin-bottom: 1rem;
    width:95%;
    aspect-ratio: 1;
    border: 2px dashed black;
  }
}
</style>