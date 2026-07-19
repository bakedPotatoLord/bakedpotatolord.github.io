<script lang="ts" setup>
import { drawGL, setGL, setupGL } from '~/utils/maze/gl';
import { BitField, bitfieldsToLines, err, Vec2, vec2 } from '~/utils/maze/helpers';
import rdfs from '~/utils/maze/rdfs';
import type { StartData } from '~/utils/maze/types';

useHead({
  title: 'Maze Creation Visualizer',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/images/mazeIcon.png' }
  ]
})

const router = useRouter()

const canvas = ref<HTMLCanvasElement | undefined>(undefined);
const state = ref('')


// initialize helper variables
const mazeData = ref<StartData>({
  width: 20,
  height: 20,
  blockSize: 20,
  shape: 4
})

let gl: WebGL2RenderingContext;
let horis: BitField[];
let vert: BitField[];
let start: Vec2;
let end: Vec2;
let mazeSize: Vec2;
let drawingCompleted = false;

onMounted(() => {
  if (!canvas.value) return
  gl = canvas.value.getContext('webgl2') ?? err("no webgl2")

})

function setup() {
  if(!canvas.value) return
  const numW = mazeData.value.width;
  const numH = mazeData.value.height;
  mazeSize = vec2(numW, numH)

  canvas.value.width = numW * mazeData.value.blockSize;
  canvas.value.height = numH * mazeData.value.blockSize;

  start = vec2(0, 0);
  end = vec2(numW-1, numH-1);

  horis = new Array(numH-1)
  .fill(undefined)
  .map(() => new BitField(numW));

  vert = new Array(numW-1)
  .fill(undefined)
  .map(() => new BitField(numH));
  
}

async function draw() {
  if(!canvas.value) return
  for(let completion of rdfs(horis,vert,start,end,vec2(mazeData.value.width,mazeData.value.height))) {
    
  let lines = new Float32Array(bitfieldsToLines(horis,vert,mazeSize))
    setupGL(canvas.value, lines, new Float32Array([]));
    drawGL(false);
    console.log("draw")
    await new Promise(res => setTimeout(res, 5))
    // requestAnimationFrame(draw)
  }

    drawingCompleted = true
    state.value = 'Generation Complete'
}

function handleSubmit(e: Event) {
  e.preventDefault()
  state.value = 'Generating ...'
  if (!canvas.value ) return

  setGL(canvas.value)
  setup()
  requestAnimationFrame(draw)
}
</script>


<template>
  <div class="container">
    <a class="buttonStyle" @click="router.push('/maze') ">Back to Maze Generator</a>
    <br>
    <form @submit="handleSubmit">
      <label for="size">Maze Size</label>
      <input type="number" name="size" min="5" max="200" v-model="mazeData.width", @change="mazeData.height = mazeData.width">
      <input type="submit" value="Generate Maze" >
    </form>
    <p>{{ state }}</p>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

* {
  font-family: 'Open Sans', sans-serif;

}

.container{
  margin-left:5%;
  margin-right: 5%;

  canvas{
    max-width: 100%;
  }
}

form {
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: rgb(64,64,64);
  width: max-content;
  padding: 1%;
  border-radius: 5px;
}
</style>