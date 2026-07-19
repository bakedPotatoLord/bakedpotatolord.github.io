<script setup lang="ts">
import { drawGL, setupGL, getMaxViewportDims, setCanvas } from "~/utils/maze/gl";
import { type StartData, type WorkerResponse } from "~/utils/maze/types"

useHead({
  title: 'maze solver',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/images/mazeIcon.png' }
  ]
})

let Worker: typeof import("~/utils/maze/workerGenerate?worker").default;

const c = ref<HTMLCanvasElement | null>(null)
const state = ref<string>("")
const showMazeOptions = ref<boolean>(false)
const showSolution = ref<boolean>(false)
const mazeData = ref<StartData>({
  width: 20,
  height: 20,
  blockSize: 20,
  shape: 4
})
const lastMazeData: StartData = {
  width: 20,
  height: 20,
  blockSize: 20,
  shape: 4
}

const router = useRouter();

let mazeExists = false
let viewPortDims = { width: 0, height: 0 }

onMounted(async () => {

  setCanvas(c.value!)
  let dims = getMaxViewportDims()
  console.log("max viewport dims:", dims)

  viewPortDims.width = dims[0];
  viewPortDims.height = dims[1];

  if (process.client) {
    //avoid making webworker if in SSR mode
    Worker = (await import("~/utils/maze/workerGenerate?worker")).default
  }

});

async function doRealtimeGenerate(mazeData: StartData) {
  const { width, height, blockSize, shape } = mazeData
  const work = new Worker();
  work.postMessage({ width, height, blockSize, shape })

  work.onmessage = (e) => {
    const { completion, state: workerState, done, lines, solution } = e.data as WorkerResponse

    const formattedPercent = (completion * 100).toFixed(2) + '%';
    state.value = (workerState === 'RDFS') ? ('RDFSing: ' + formattedPercent) : ('drawing: ' + formattedPercent)
    if (done) {
      if (!(c.value && lines)) return;
      work.terminate()
      mazeExists = true
      showMazeOptions.value = true

      state.value = 'done'
      c.value.width = width * blockSize
      c.value.height = height * blockSize

      setupGL(c.value, lines, solution)
      drawGL(showSolution.value)

    } else {
      state.value = `${workerState}: ${formattedPercent}`
    };
  };

  work.onerror = (e) => {
    console.log(e)
  }
};

const handleSubmit = (e: Event) => {
  e.preventDefault()
  let data = (new FormData(<HTMLFormElement>e.target))
  state.value = 'generating ...'
  requestAnimationFrame(() => {
    try {
      doRealtimeGenerate(
        mazeData.value
      )
    } catch (err: any) {
      if (err[0]) alert(err[1])
      console.log(err)
      return
    }
  })
}

function validateChange() {
  let { width, height, blockSize } = mazeData.value
  if (width * blockSize > viewPortDims.width || height * blockSize > viewPortDims.height) {
    alert('maze too big for your renderer')
    mazeData.value = lastMazeData
  } else {
    lastMazeData.width = width
    lastMazeData.height = height
    lastMazeData.blockSize = blockSize
  }
}

//form submission button
//download button
function downloadMaze(e: Event) {
  e.preventDefault()
  if (mazeExists) {
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = c.value?.toDataURL() ?? ''
    a.download = 'maze.png'
    a.click()
  } else {
    alert('you need to generate your maze first bozo')
  }
}

</script>

<template>
  <form @submit="handleSubmit" class="inputForm">
    <table>
      <tbody>
        <tr>
          <th><label for="width">Maze Width (Cells)</label></th>
          <th><input type="number" name="width" min="0" v-model="mazeData.width" @input="validateChange"></th>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th><label for="heigth">Maze Height (Cells)</label></th>
          <th><input type="number" name="heigth" min="0" v-model="mazeData.height" @input="validateChange"></th>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th><label for="cellSize">Cell Size</label></th>
          <th><input type="number" name="cellSize" min="5" v-model="mazeData.blockSize" @input="validateChange"></th>
        </tr>
      </tbody>
    </table>
    <div class="options">
      <a class="visLink buttonStyle" @click="router.push('/maze/visualize')">Visualize Maze Generation</a><br>
      <label for="shape">Cell Shape</label>
      <select name="shape" id="" v-model="mazeData.shape" @input="validateChange">
        <option value="4" selected>Square</option>
        <option value="6">Hexagon</option>
        <!--  <option value="3">Triangle</option> -->
      </select>
      <input  class = "buttonStyle" type="submit" value="Generate Maze">
    </div>
  </form>
  <div class="mazeOptions" v-if="showMazeOptions">
    <label for="showSolution">Show Solution</label>
    <input type="checkbox" name="showSolution" id="showSolution" v-model="showSolution" @change="drawGL(showSolution)">
    <button @click="downloadMaze">Download Maze</button>
  </div>
  <div class="stateContainer">
    <p id="state">{{ state ?? "" }}</p>
  </div>
  <div class="canvases">
    <canvas ref="c"></canvas>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

* {
  font-family: 'Open Sans', sans-serif;
}

.inputForm {
  background-color: rgb(64, 61, 64);
  border-radius: 20px;
  text-align: center;
  padding-bottom: 2%;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  table {
    padding: 5%;
    margin-left: auto;
    margin-right: auto;
    th {
      text-align: left;
      label {
        font-weight: bold;
      }
    }
  }
}

input,
select {
  border: 2px groove rgb(118, 118, 118);
  border-radius: 0.4rem;
  background-color: grey;
  color: whitesmoke;
  font-weight: bold;
}

.mazeOptions {
  background-color: rgb(64, 61, 64);
  border-radius: 20px;
  text-align: center;
  padding-bottom: 1%;
  padding-top: 1%;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  color: whitesmoke;
  .visLink {
   margin-bottom: 10rem;
  }
}

input[type=submit],
.mazeOptions button,
.visLink {
  border: none;
  padding: 4px;
  border-radius: 4px;
  margin: 5px;
  background-color: rgb(35, 37, 41);
  color: aliceblue;
  font-weight: bold;
  transition: ease-in-out;
  transition-duration: 250ms;
}

.stateContainer {
  text-align: center;
  #state {
    font-size: small;
  }
}

.canvases {
  text-align: center;
  canvas {
    border: none;
    max-width: 90vw;
  }
}

</style>