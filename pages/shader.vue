
<script setup lang="ts">



const {default: allShaders} = (await import("~/utils/shaders"))


let selectedShader= ref(0)
let lastShader:null|number = null

function getShader(){
  return Object.values(allShaders)[selectedShader.value]
}



const canvas = ref<HTMLCanvasElement | null>(null)
const runShader = ref(true)

let uniforms = ref<UniformInput[]>([])

let gl: WebGL2RenderingContext|undefined|null;

onMounted( () => {
  gl = canvas.value?.getContext("webgl2",{ antialias: true })

  if(!gl){
    console.error("no gl context")
    return
  }

  let width = window.innerWidth * 0.9
  gl.canvas.width = width
  gl.canvas.height = width

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
    getShader().shaderSetup(gl)
    //reset uniforms
    uniforms.value = getShader().defineUniforms();
  }
}

function resizeCanvas() {
  if(canvas.value){
    canvas.value.width = window.innerWidth * 0.9
    canvas.value.height = window.innerWidth * 0.9
  }
}


function mainLoop() {
  getShader().shaderLoop()

  if(runShader.value) requestAnimationFrame(mainLoop);
}

</script>

<template>
<div class="choseShader">
  <select name="shaders" id="" v-model="selectedShader">
    <option :value="i" v-for="[k,i] of Object.keys(allShaders).map((k,i)=>[k,i])" v-bind:key="k">{{ k }}</option>
  </select>
</div>
<div class="container" >
  <canvas class="shaderCanvas" ref="canvas"></canvas>

</div>
<div class="uniforms">

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