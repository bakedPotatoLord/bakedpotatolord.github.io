
<script setup lang="ts">
import { shaderLoop, shaderSetup } from '~/utils/shaders/firstTest/shader';

const canvas = ref<HTMLCanvasElement | null>(null)
const runShader = ref(true)

onMounted( () => {
  let gl = canvas.value?.getContext("webgl2",{ antialias: true })

  if(!gl){
    console.error("no gl context")
    return
  }

  let width = window.innerWidth * 0.9
  gl.canvas.width = width
  gl.canvas.height = width

  window.addEventListener("resize", resizeCanvas)
  
  shaderSetup(gl)
  mainLoop()
})

onUnmounted(()=>{
  window.removeEventListener("resize", resizeCanvas)
})

function resizeCanvas() {
  if(canvas.value){
    canvas.value.width = window.innerWidth * 0.9
    canvas.value.height = window.innerWidth * 0.9
  }
}


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

    border: none;
  }
}
</style>