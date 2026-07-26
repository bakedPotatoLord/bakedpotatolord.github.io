<script lang="ts" setup>
import { drawGL, setGL, setupGL, setupLinesGL, setupPointsGL } from '~/utils/maze/gl';
import { BitField, bitfieldsToLines, err, Vec2, vec2 } from '~/utils/maze/helpers';
import rdfs from '~/utils/maze/rdfs';
import type { StartData } from '~/utils/maze/types';

useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/images/mazeIcon.png' }
  ]
})

useSeoMeta({

  title: 'Maze Creation Visualizer',
  ogTitle: 'Maze Creation Visualizer',
  ogDescription: 'Maze Creation Visualizer',

})

const router = useRouter()

const canvas = ref<HTMLCanvasElement | undefined>(undefined);
const slowdown = ref(5);
const state = ref('')
let activelyDrawing = false

let shouldKill = false


// initialize helper variables
const mazeData:StartData ={
  width: 20,
  height: 20,
  blockSize: 20,
  shape: 4,
  bgColor: "#FFFFFF",
  fgColor: "#000000",
  solnColor: "#FF0000",
  drawEnds: true,
}

let horis: BitField[];
let vert: BitField[];
let start: Vec2;
let end: Vec2;
let mazeSize: Vec2;
let viewPort: Vec2;

onMounted(() => {
  if (!canvas.value) return
  shouldKill = false
})

onUnmounted(() => {
  shouldKill = true
})

function setup() {
  if(!canvas.value) return
  const { width:numW, height:numH, blockSize } = mazeData
  mazeSize = vec2(numW, numH)
  viewPort = vec2(numW * blockSize, numH * blockSize)

  canvas.value.width = numW * mazeData.blockSize;
  canvas.value.height = numH * mazeData.blockSize;

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
  for(let {cell} of rdfs(horis,vert,start,end,vec2(mazeData.width,mazeData.height))) {
    if(shouldKill) return
    let lines = new Float32Array(bitfieldsToLines(horis,vert,mazeSize))
    const px = (cell[0]+0.5) / mazeData.width
    const py = (cell[1]+0.5) / mazeData.height
    const point = new Float32Array([px, py, 0, 1, 0])
    setupGL(viewPort);
    setupLinesGL(lines)
    setupPointsGL(point, mazeData.blockSize-2)
    drawGL(false, mazeData);
    await new Promise(res => setTimeout(res, slowdown.value))
  }

  activelyDrawing = false
  state.value = 'Generation Complete'
}

function handleSubmit(e: Event) {
  if(activelyDrawing) return
  activelyDrawing = true
  e.preventDefault()
  state.value = 'Generating ...'
  if (!canvas.value ) return

  setGL(canvas.value)
  setup()
  requestAnimationFrame(draw)
}
</script>


<template>
  <div class="title">
    <SectionTitle title="Maze Visualizer" justify="left"/>
    <a class="buttonStyle" @click="router.push('/maze') ">Back to Maze Generator</a>
  </div>

  <div class="container">
    <br>
    <div class="io">
      <div class="inputs">
        <div class="inputGroup">
          <label for="size">Maze Size</label>
          <input type="number" name="size" min="5" max="200" v-model="mazeData.width" @change="mazeData.height = mazeData.width">
        </div>
        <div class="inputGroup">
          <label for="size">Frame Rate Slowdown</label>
          <input type="number" name="size" min="1" max="1-" v-model="slowdown" >
        </div>
        <button class="mazeButtonStyle" @click="handleSubmit" >Start Visualization</button>
      </div>
      <p>{{ state }}</p>
    </div>
    <div class="canvasContainer">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

* {
  font-family: 'Open Sans', sans-serif;

}

.title{
  padding-left:5%;
  a{
    margin-left:0.5rem;
  }
}

.container{
  margin-left:5%;
  margin-right: 5%;
  display:flex;
  flex-direction: row;
  flex-wrap:wrap;
  gap:3rem;

  .io{
    .inputs {
      margin-bottom: 10px;
      margin-top: 10px;
      background-color: rgb(64,64,64);
      width:max-content;
      padding: 1%;
      border-radius: 5px;
      .inputGroup{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 10px;
        gap:1rem;
        input{
          width: 6ch;
        }
        label{
          text-wrap:nowrap;
          width: max-content;
        }
      }
    }
  }
  .canvasContainer{
    display: flex;
    align-items: center;
    justify-content: center;
    canvas{
      width: min(90vw, 100%);
    }
  }

}
</style>