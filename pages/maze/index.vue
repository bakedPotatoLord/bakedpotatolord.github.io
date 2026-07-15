<script setup lang="ts">
import { type startData, type workerResponse } from "~/utils/maze/types"

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

const c= ref<HTMLCanvasElement|null>(null)

const state = ref<string>("")
const mazeOptions = ref<HTMLDivElement|null>(null)

const router = useRouter();

let mazeExists = false
let ctx:CanvasRenderingContext2D;

onMounted(async () => {
  console.log(c.value)
  ctx = c.value?.getContext("2d")?? null as never;
  
  if(!ctx){
    throw new Error("no context")
  }
  if(process.client){
    //avoid on 
    Worker = (await import( "~/utils/maze/workerGenerate?worker")).default
  }

  ctx.fillStyle = "black";
});

async function doRealtimeGenerate(width: number, heigth: number, blockSize: number, shape: number){
    const work = new Worker();
    work.postMessage(<startData>{width, heigth, blockSize, shape})
    
    work.onmessage = (e) => {
      const {completion, state:workerState, done, imageData} = <workerResponse>e.data
      
      const formattedPercent = (completion*100).toFixed(2)+'%';
      state.value = (workerState==='RDFS')?('RDFSing: '+formattedPercent):('drawing: '+formattedPercent)
      if(done ){

        if( !(mazeOptions.value && c.value && ctx && imageData)) return;
        console.log("done",e.data,mazeOptions.value);
        work.terminate()
        mazeExists = true
        mazeOptions.value.hidden = true

        state.value = 'done'
        c.value.width = width*blockSize
        c.value.height = heigth*blockSize
        console.log(c,width,blockSize)
        ctx.putImageData(imageData, 0, 0)
      }else{
        state.value = `${workerState}: ${formattedPercent}`
      };
    };
  };

const handleSubmit = (e: Event) => {
    e.preventDefault()
    let data = (new FormData(<HTMLFormElement>e.target))
    state.value = 'generating ...'
    requestAnimationFrame(() => {
      try {
        doRealtimeGenerate(
          parseFloat(data.get('width')?.toString()?? '20'),
          parseFloat(data.get('heigth')?.toString() ?? '20'),
          parseFloat(data.get('cellSize')?.toString() ?? '10'),
          parseFloat(data.get('shape')?.toString() ?? '0'),
        )
      } catch (err:any) {
        if (err[0]) alert(err[1])
        console.log(err)
        return
      }
    })
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

  <form @submit="handleSubmit">
    <table>
      <tbody>
      <tr>
        <th><label for="width">Maze Width (Cells)</label></th>
        <th><input type="number" name="width" value="20" min="0"></th>
      </tr>
      </tbody>
      <tbody>
        <tr>
          <th><label for="heigth">Maze Height (Cells)</label></th>
          <th><input type="number" name="heigth" value="20" min="0"></th>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th><label for="cellSize">Cell Size</label></th>
          <th><input type="number" name="cellSize" value="20" min="5"></th>
        </tr>
      </tbody>
    </table>

    <div class="options">
      <a href="./visualize/">Visualize Maze Generation</a><br>
      <label for="shape">Cell Shape</label>
      <select name="shape" id="">
        <option value="4" selected>Square</option>
        <option value="6">Hexagon</option>
        <!--  <option value="3">Triangle</option> -->
      </select>
      <input type="submit" value="Generate Maze">
    </div>

  </form>
  <div class="mazeOptions" ref="mazeOptions" hidden>
    <label for="showSolution">Show Solution</label>
    <input type="checkbox" name="showSolution" id="showSolution">
    <button @click="downloadMaze">Download Maze</button>
  </div>
  <div class="stateContainer">
    <p id="state" >{{ state ?? ""}}</p>
  </div>
  <div class="canvases">
    <canvas ref="c"></canvas>
  </div>
</template>


<style>

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

body{
  margin: 0px;
  background-color: rgb(38, 38, 38);
}

*{
  font-family: 'Open Sans', sans-serif;
}


form{
  background-color: rgb(81, 73, 83);
  border-radius: 20px;
  text-align: center;
  padding-bottom: 2%;
  width:75%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}

table{
  padding: 5%;
  margin-left: auto;
  margin-right: auto;

}

table tr th{
  text-align: left;
}

label{
  color: wheat;
  font-weight: bold;
}

input,
select{
  border: 2px inset rgb(118, 118, 118);
  background-color: grey;
  color:whitesmoke;
  font-weight: bold;
}

input[type=submit],
.mazeOptions button{
  border: none;
  padding: 4px;
  border-radius: 4px;
  margin:5px;
  background-color:rgb(35, 37, 41);
  color:aliceblue;
  font-weight: bold;
  transition:ease-in-out;
  transition-duration: 250ms;
}


form a{
  color: wheat;
  text-decoration: underline;

}

.mazeOptions{
  background-color: rgb(81, 73, 83);
  border-radius: 20px;
  text-align: center;
  padding-bottom: 1%;
  padding-top: 1%;
  width:75%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  color:whitesmoke
}

.stateContainer{
  text-align: center;
}

#state{
  color:wheat;
  font-size: small;
}

.canvases{
  text-align: center;
}

canvas{
  border:none;
}
</style>