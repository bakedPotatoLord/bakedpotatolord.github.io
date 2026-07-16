<script lang="ts" setup>
import { getEndingNode, getStartingNode, makeSquareNodeMap } from '~/utils/maze/helpers';
import Node from '~/utils/maze/Node';

useHead({
  title: 'Maze Creation Visualizer',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/images/mazeIcon.png' }
  ]
})


const canvas = ref<HTMLCanvasElement | undefined>(undefined);
const state = ref('')
const size = ref(20)

let cw = 200
let ch = 200
const blockSize = 20

// initialize helper variables
let form = ref<HTMLFormElement | null>(null)
let nodes: Map<string, Node>
let startingNode: Node
let que: Node[] = []
let drawingCompleted = true

let ctx: CanvasRenderingContext2D

onMounted(() => {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d') ?? null as never
  canvas.value.width = cw
  canvas.value.height = ch
  console.log(ctx)

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, cw, ch)

})


// create canvas vars

function setup() {
  nodes = makeSquareNodeMap(cw, ch, blockSize)

  nodes.forEach(n => {
    n.visited = false
    n.wallsTo = n.getTouchingNodes(nodes, blockSize)
  })
  //get starting node
  startingNode = getStartingNode(nodes)
  startingNode.isStartingNode = true
  //get ending node
  getEndingNode(nodes).isEndingNode = true
  //setup que
  startingNode.visited = true
  que = [startingNode]
}

async function draw() {
  if (!que.length) throw new Error('que is empty');
  let current = que.shift() as Node
  let unvisited = current
    .getTouchingNodes(nodes, blockSize)
    .filter((el) => !el.visited)

  if (unvisited.length > 0) {
    que.push(current)
    let chosen = unvisited[Math.floor(Math.random() * unvisited.length)];
    current.wallsTo = current.wallsTo.filter((el) =>
      el != chosen
    )
    chosen.wallsTo = chosen.wallsTo.filter((el) =>
      el != current
    )
    chosen.visited = true
    que.unshift(chosen)

    ctx.clearRect(0, 0, cw, ch)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, cw, ch)

    ctx.strokeStyle = 'red'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(current.x, current.y)
    ctx.lineTo(chosen.x, chosen.y)
    ctx.stroke()

    ctx.lineWidth = 0.5
    nodes.forEach(n => n.draw(ctx, blockSize))
  }

  if (que.length > 0) {
    await new Promise(res => setTimeout(res, 5))

    draw()
  } else {
    drawingCompleted = true
    state.value = 'Generation Complete'
  }
}

function handleSubmit(e: Event) {
  e.preventDefault()
  state.value = 'Generating ...'
  if (!canvas.value || !size.value) return
  ch = canvas.value.height = cw = canvas.value.width = size.value * blockSize
  setup()
  draw()
}
</script>


<template>
  <a href="../">back home</a>
  <br>
  <form>
    <label for="size">Maze Size</label>
    <input type="number" name="size" min="5" max="100" v-model="size">
    <input type="submit" value="Generate Maze" @click="handleSubmit">
  </form>
  <p>{{ state }}</p>
  <canvas ref="canvas"></canvas>

</template>



<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

body {
  margin: 10px;
  background-color: rgb(38, 38, 38);
}

p,
input,
label,
button,
a {
  font-family: 'Open Sans', sans-serif;

}


p,
a,
label {
  color: wheat;
}

form {
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: rgb(81, 73, 83);
  width: max-content;
  padding: 1%;
  border-radius: 5px;
}
</style>