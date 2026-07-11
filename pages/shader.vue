
<script setup lang="ts">
import * as allShaders from "~/utils/shaders"


useSeoMeta({
  title: "Shader Playground",
  description: "Shader Playground",
  ogTitle: "Shader Playground",
  ogDescription: "Shader Playground",
  ogImage: "/images/shaderStill.png",
})

let selectedShader= ref<keyof typeof allShaders>(Object.keys(allShaders)[0] as keyof typeof allShaders)
let lastShader: keyof typeof allShaders|null = null

let {shader} = useRoute().query
if(shader && typeof shader === "string" && shader in allShaders){
  selectedShader.value = shader as keyof typeof allShaders
}

function getShader(){
  return allShaders[selectedShader.value]
}

function getLastShader(){
  if(lastShader === null) return null as never
  return allShaders[lastShader]
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
    uniforms.value = getShader().getDefaultUniforms();
    //set uniforms
    uniforms.value.forEach(uniform => {
      getShader().setUniform(uniform)
    });

    // if has last shader, delete it
    if(lastShader !== null){
      getLastShader().destroy()
    }

    //set last shader
    lastShader = selectedShader.value
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
  getShader().shaderLoop()

  if(runShader.value) requestAnimationFrame(mainLoop);
}

function validateUniformVals(uniform:UniformInput){
  if(uniform.min !== undefined ){
    uniform.vals = uniform.vals.map(v=>Math.max(uniform.min ?? -Infinity,v)) as typeof uniform.vals
  }
  if(uniform.max !== undefined ){
    uniform.vals = uniform.vals.map(v=>Math.min(uniform.max ?? Infinity,v)) as typeof uniform.vals
  }
}

</script>

<template>
<div class="chooseShader">
  <label for="shaders">Chose shader: </label>
  <select name="shaders" class="shaderSelect" v-model="selectedShader" @change="shaderSwitch">
    <option class="shaderOption" :value="k" v-for="k of Object.keys(allShaders)" v-bind:key="k">{{ k }}</option>
  </select>
</div>
<div class="container" >
  <canvas class="shaderCanvas" ref="canvas"></canvas>
  <div class="uniforms" v-if="uniforms.length > 0">
    <h2>Uniforms (Settings)</h2>
    <div class="uniformInputs">
  
      <div v-for="[i,uniform] of uniforms.entries()" class="uniform" :title="uniform.hint">
        <label for="">{{ uniform.displayname }}</label>
        <br>
        <div class="inputs" >
          <input 
            v-for="defi in uniform.vals.keys()"
            type="number"  
            v-model="uniform.vals[defi]" 
            @change="validateUniformVals(uniform);getShader().setUniform(uniform)"
            :step="uniform.step"
            :min="uniform.min"
            :max="uniform.max"
            :key="defi"
          >
        </div>
    </div>
    </div>
  </div>
</div>

</template>

<style scoped lang="scss">

.chooseShader{
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left:5%;
  padding-right:5%;
  label{
    padding-right: 0.5rem;
  }
  .shaderSelect{
    padding: 0.5rem;
    border-radius: 1rem;
    .shaderOption{
      padding: 0.5rem;
    }
  }
}

.container{
  padding-left:5%;
  padding-right:5%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap:2rem;
  flex-wrap: wrap;

  @media (min-width: 1200px) {
    flex-wrap: nowrap;
  }
  .shaderCanvas{
    margin-top: 1rem;
    margin-bottom: 1rem;
    max-width: 60rem;
    border: none;
  }
  .uniforms{
    .uniformInputs{
      display: flex ;
      flex-direction: row;
      gap:2rem;
      flex-wrap: wrap;
    }
    .uniform{
      margin-bottom: 1rem;
      .inputs{
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        input{
          margin-right: 0.5rem;
          width:5rem
        }
      }
    }
  }
}

</style>