
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
    uniforms.value = getShader().getDefaultUniforms();
    //set uniforms
    uniforms.value.forEach(uniform => {
      getShader().setUniform(uniform)
    });
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
  <select name="shaders" class="shaderSelect" v-model="selectedShader">
    <option class="shaderOption" :value="i" v-for="[k,i] of Object.keys(allShaders).map((k,i)=>[k,i])" v-bind:key="k">{{ k }}</option>
  </select>
</div>
<div class="container" >
  <canvas class="shaderCanvas" ref="canvas"></canvas>

</div>
<div class="uniforms">
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
  display: flex;
  align-items: center;
  justify-content: center;
  .shaderCanvas{
    margin-top: 1rem;
    margin-bottom: 1rem;

    border: none;
  }
}

.uniforms{
  padding-left:5%;
  padding-right:5%;
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
</style>