<script setup lang="ts">
import { err } from "~/utils/maze/helpers"
import allShaders from "~/utils/shaders"


useSeoMeta({
  title: "Shader Playground",
  description: "Shader Playground",
  ogTitle: "Shader Playground",
  ogDescription: "Shader Playground",
  ogImage: "/images/shaderStill.png",
})

let selectedShader = ref<keyof typeof allShaders>(Object.keys(allShaders)[0] as keyof typeof allShaders)
let lastShader: keyof typeof allShaders | null = null

let { shader } = useRoute().query
if (shader && typeof shader === "string" && shader in allShaders) {
  selectedShader.value = shader as keyof typeof allShaders
}

function getShader() {
  return allShaders[selectedShader.value]
}

function getLastShader() {
  if (lastShader === null) return null as never
  return allShaders[lastShader]
}


const glcanvas = ref<HTMLCanvasElement | null>(null)
const gpucanvas = ref<HTMLCanvasElement | null>(null)
const runShader = ref(true)
const uniforms = ref<UniformInput[]>([])
const webgl = ref(true)

let gl: WebGL2RenderingContext | undefined | null;
let gpuContext: GPUCanvasContext | null = null
let gpuDevice: GPUDevice | null = null


onMounted(async () => {

  webgl.value = true
  //get openGL context
  gl = glcanvas.value?.getContext("webgl2", { antialias: true })
  if (!gl) {
    console.error("no gl context")
    return
  }

  //get webgpu context
  if (!navigator.gpu) {
    alert("WebGPU is not supported on this browser.");
    return;
  }
  // 3. Request Adapter and Device
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    alert("No GPU adapter found.");
    return;
  }
  gpuDevice = await adapter.requestDevice();

  // 4. Configure Canvas Context
  gpuContext = gpucanvas.value?.getContext("webgpu") ?? err("no webgpu context");
  const canvasFormat = navigator.gpu.getPreferredCanvasFormat();

  gpuContext.configure({
    device: gpuDevice,
    format: canvasFormat,
    alphaMode: "opaque"
  });

  console.log("gpu context configured", gpuContext, gpuDevice)


  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  shaderSwitch()
  mainLoop()
})

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas)
})

function shaderSwitch() {
  const shaderInfo = getShader().getInfo();
  webgl.value = shaderInfo.type != "webGPU";
  if (webgl.value && gl) {
    //call new shader setup
    getShader().shaderSetup({ glc: gl })
  } else if (gpuDevice && gpuContext) {
    getShader().shaderSetup({ gpuDevice, gpuContext })
  }
  //reset uniforms
  uniforms.value = getShader().getDefaultUniforms();
  //set uniforms
  uniforms.value.forEach(uniform => {
    getShader().setUniform(uniform)
  });
  // if has last shader, delete it
  if (lastShader !== null) {
    getLastShader().destroy()
  }

  //set last shader
  lastShader = selectedShader.value
}

function resizeCanvas() {
  for (const canvas of [glcanvas.value, gpucanvas.value]) {
    if (canvas) {
      canvas.width = window.innerWidth * 0.9
      canvas.height = window.innerWidth * 0.9
      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
    }
  }
}


function mainLoop() {
  getShader().shaderLoop()

  if (runShader.value) requestAnimationFrame(mainLoop);
}

function validateUniformVals(uniform: UniformInput) {
  if (uniform.min !== undefined) {
    uniform.vals = uniform.vals.map(v => Math.max(uniform.min ?? -Infinity, v)) as typeof uniform.vals
  }
  if (uniform.max !== undefined) {
    uniform.vals = uniform.vals.map(v => Math.min(uniform.max ?? Infinity, v)) as typeof uniform.vals
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
  <div class="container">
    <canvas class="webglCanvas" ref="glcanvas" :hidden="!webgl"></canvas>
    <canvas class="webgpuCanvas" ref="gpucanvas" :hidden="webgl"></canvas>


    <div class="uniforms" v-if="uniforms.length > 0">
      <h2>Uniforms (Settings)</h2>
      <div class="uniformInputs">

        <div v-for="[i, uniform] of uniforms.entries()" class="uniform" :title="uniform.hint">
          <label for="">{{ uniform.displayname }}</label>
          <br>
          <div class="inputs">
            <input v-for="defi in uniform.vals.keys()" type="number" v-model="uniform.vals[defi]"
              @change="validateUniformVals(uniform); getShader().setUniform(uniform)" :step="uniform.step"
              :min="uniform.min" :max="uniform.max" :key="defi">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.chooseShader {
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 5%;
  padding-right: 5%;

  label {
    padding-right: 0.5rem;
  }

  .shaderSelect {
    padding: 0.5rem;
    border-radius: 1rem;

    .shaderOption {
      padding: 0.5rem;
    }
  }
}

.container {
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;

  @media (min-width: 1200px) {
    flex-wrap: nowrap;
  }

  .webgpuCanvas,
  .webglCanvas {
    margin-top: 1rem;
    margin-bottom: 1rem;
    max-width: 60rem;
    border: none;
  }

  .uniforms {
    .uniformInputs {
      display: flex;
      flex-direction: row;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .uniform {
      margin-bottom: 1rem;

      .inputs {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;

        input {
          margin-right: 0.5rem;
          width: 5rem
        }
      }
    }
  }
}
</style>