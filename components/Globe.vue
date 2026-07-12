<script setup lang="ts">
import allShaders from "~/utils/shaders"

const globeShader = allShaders.Sphere;

const canvas = ref<HTMLCanvasElement | null>(null)

const runShader = ref(true)

let gl: WebGL2RenderingContext|undefined|null;

const router = useRouter()

onMounted( () => {
  console.log(canvas)
  gl = canvas.value?.getContext("webgl2",{ antialias: true })

  if(!gl || !canvas.value){
    console.error("no gl context")
    return
  }

  let width = window.innerWidth * 0.1;
  gl.canvas.width = width;
  gl.canvas.height = width;

  window.addEventListener("resize", resizeCanvas)
  
  shaderSwitch()
  mainLoop()
})

onUnmounted(()=>{
  window.removeEventListener("resize", resizeCanvas)
})
function shaderSwitch(){
  if(gl){
    //call new shader setup
    globeShader.shaderSetup(gl)
    //reset uniforms

  }
}

function resizeCanvas() {
  if(canvas.value){
    canvas.value.width = window.innerWidth * 0.9
    canvas.value.height = window.innerWidth * 0.9
  }
  if(gl){
    gl.viewport(0,0,canvas.value?.width ?? 0,canvas.value?.height ?? 0)
  }
}


function mainLoop() {
  globeShader.shaderLoop()

  if(runShader.value) requestAnimationFrame(mainLoop);
}

</script>

<template>
  <canvas ref="canvas" class="globeCanvas" @click="router.push('/shaders')">
</canvas>

</template>

<style scoped>

.globeCanvas{
  z-index:  1;
  position:fixed;
  right:0px;
  bottom:0px;

}


</style>