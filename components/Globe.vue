<script setup lang="ts">
import allShaders from "~/utils/shaders"

const globeShader = allShaders.Sphere;
const canvas = ref<HTMLCanvasElement | null>(null)
const runShader = ref(true)
const router = useRouter()

let gl: WebGL2RenderingContext | undefined | null;

onMounted(() => {
  console.log(canvas)
  gl = canvas.value?.getContext("webgl2", { antialias: true })

  if (!gl || !canvas.value) {
    console.error("no gl context")
    return
  }

  let width = window.innerWidth * 0.1;
  gl.canvas.width = width;
  gl.canvas.height = width;

  window.addEventListener("resize", resizeCanvas)
  globeShader.shaderSetup(gl)
  mainLoop()
})

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas)
})

function resizeCanvas() {
  if (canvas.value) {
    canvas.value.width = window.innerWidth * 0.9
    canvas.value.height = window.innerWidth * 0.9
  }
  if (gl) {
    gl.viewport(0, 0, canvas.value?.width ?? 0, canvas.value?.height ?? 0)
  }
}

function mainLoop() {
  globeShader.shaderLoop()
  if (runShader.value) requestAnimationFrame(mainLoop);
}
</script>

<template>
  <canvas ref="canvas" class="globeCanvas" @click="router.push('/shaders')"
    title="Stop hovering and just click! I promise I'll make it worth your while...">
  </canvas>
</template>

<style scoped>
.globeCanvas {
  z-index: 1;
  position: fixed;
  right: 0px;
  bottom: 0px;
}
</style>