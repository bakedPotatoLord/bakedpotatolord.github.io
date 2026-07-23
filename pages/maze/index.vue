<script setup lang="ts">
import { drawGL, setupGL, getMaxViewportDims, setGL, setupLinesGL, setupSolutionGL, setupPointsGL } from "~/utils/maze/gl";
import { vec2 } from "~/utils/maze/helpers";
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
  shape: 4,
  bgColor: "#FFFFFF",
  fgColor: "#000000",
  solnColor: "#FF0000",
  drawEnds: true,

})
const lastMazeData: StartData = Object.assign({}, mazeData.value)

const router = useRouter();

let mazeExists = false
let generating = false
let viewPortDims = { width: 0, height: 0 }

onMounted(async () => {
  if (!c.value) throw new Error("no canvas")
  setGL(c.value)
  let dims = getMaxViewportDims()

  viewPortDims.width = dims[0];
  viewPortDims.height = dims[1];

  if (process.client) {
    //avoid making webworker if in SSR mode
    Worker = (await import("~/utils/maze/workerGenerate?worker")).default
  }

});

async function doRealtimeGenerate(mazeData: StartData) {
  if(generating) return
  generating = true
  const { width, height, blockSize, shape } = mazeData
  const viewport = vec2(width * blockSize, height * blockSize)

  const px =(1/width)*0.5
  const py =(1/height)*0.5
  const points = new Float32Array([
    //x, y, r,g,b
    px,py,0,1,0,
    1-px,1-py, 1,0,0,
  ])
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

      setupGL(viewport);
      setupLinesGL(lines);
      setupSolutionGL(solution);
      setupPointsGL(points,blockSize-2);
      drawGL(showSolution.value,mazeData)

      generating = false

    } else {
      state.value = `${workerState}: ${formattedPercent}`
    };
  };

  work.onerror = (e) => {
    console.log(e)
    generating = false;
  }
};

const handleGenerate = (e: Event) => {
  e.preventDefault()
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
  <div class="title">
    <SectionTitle title="Maze Generator" justify="center"/>
  </div>
  <div class="inputs">
    <h2 class="optionsTitle">Maze Options</h2>
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
      <tbody>
        <tr>
          <th><label for="bgColor">Background Color</label></th>
          <th><input type="color" name="bgColor"  v-model="mazeData.bgColor" @input="validateChange"></th>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th><label for="fgColor">Line Color</label></th>
          <th><input type="color" name="fgColor"  v-model="mazeData.fgColor" @input="validateChange"></th>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th><label for="solnColor">Solution Color</label></th>
          <th><input type="color" name="solnColor"  v-model="mazeData.solnColor" @input="validateChange"></th>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th><label for="drawEnds">Draw Maze Ends</label></th>
          <th><input type="checkbox" name="solnColor"  v-model="mazeData.drawEnds" @input="validateChange"></th>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th><label for="shape">Cell Shape</label></th>
          <th>
            <select name="shape" id="" v-model="mazeData.shape" @input="validateChange">
              <option value="4" selected>Square</option>
              <!-- <option value="6">Hexagon</option> -->
              <!--  <option value="3">Triangle</option> -->
            </select>
          </th>
        </tr>
      </tbody>
    </table>
    <div class="options">
      <button class="mazeButtonStyle" @click="handleGenerate">Generate Maze</button>
      <button class="visLink mazeButtonStyle" @click="router.push('/maze/visualize')">Visualize Maze Generation</button>
    </div>
  </div>
  <div class="mazeOptions" v-if="showMazeOptions">
    <label for="showSolution">Show Solution</label>
    <input type="checkbox" name="showSolution" id="showSolution" v-model="showSolution" @change="drawGL(showSolution, mazeData)">
    <button @click="downloadMaze" class="mazeButtonStyle">Download Maze</button>
  </div>
  <div class="stateContainer">
    <p id="state">{{ state }}</p>
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

.inputs {
  background-color: rgb(64, 61, 64);
  border-radius: 20px;
  text-align: center;
  padding-bottom: 2%;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;

  .optionsTitle {
    margin: 0px;
  }

  table {
    padding: 1rem;
    margin-left: auto;
    margin-right: auto;
    th {
      text-align: left;
      label {
        font-weight: bold;
      }
      input,
      select {
        border: 2px groove rgb(118, 118, 118);
        border-radius: 0.4rem;
        background-color: grey;
        color: whitesmoke;
        font-weight: bold;
      }
    }
  }
}

.mazeOptions {
  background-color: rgb(64, 64, 64);
  border-radius: 20px;
  text-align: center;
  padding-bottom: 1%;
  padding-top: 1%;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  color: whitesmoke;

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