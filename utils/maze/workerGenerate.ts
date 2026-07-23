import bfs from "./bfs"
import { BitField, bitfieldsToLines, Vec2, vec2 } from "./helpers"
import rdfs from "./rdfs"
import type { StartData, WorkerResponse } from "./types"




onmessage = (e: MessageEvent<StartData>) => {
  const { width, height, blockSize, shape } = e.data

  try {
    // Your worker logic that might throw an error
    realtimeGenerate(vec2(width, height))
  } catch (error:any) {
    // Send the error message and stack trace back to the main thread
    self.postMessage({
      type: 'ERROR',
      message: error.message,
      stack: error.stack
    });
  }
}

async function realtimeGenerate(mazeSize:Vec2) {
  const [numW, numH] = mazeSize

  const start = vec2(0, 0)
  const end = vec2(numW-1, numH-1)

  const horis = new Array(numH-1)
  .fill(undefined)
  .map(() => new BitField(numW));

  const vert = new Array(numW-1)
  .fill(undefined)
  .map(() => new BitField(numH));

  //do the grunt work
  for (const {completion} of rdfs(horis, vert, start, end, mazeSize)) {
    postMessage(<WorkerResponse>{
      completion,
      state: 'RDFS',
      done: false
    })
  }


  //flattened array of [x1,y1,x2,y2]
  const lines:number[] = []
  let solution:Float32Array;
 
  //use breadth-first search because depth first will find "a" solution, but not "the" solutoin  
  let out = bfs(horis,vert,start,end,mazeSize,(completion) => {
    postMessage(<WorkerResponse>{
      completion,
      state: 'BFS',
      done: false
    })
  })

  if(out){
    let scale = 1/(numW)
    solution= new Float32Array((out.length-1)*4)
    for(let i= 0; i < out.length-1; i++){
      let [cx, cy] = out[i]
      let [nx, ny] = out[i+1]
      cx = (cx + 0.5)* scale
      cy = (cy + 0.5)* scale
      nx = (nx + 0.5)* scale
      ny = (ny + 0.5)* scale
      solution.set([cx,cy,nx,ny],i*4)
    }
  }else{
    solution = new Float32Array(0)
  }

  // create array of lines, pass as float32Array to main thread
  const typedLines = new Float32Array(bitfieldsToLines(horis,vert,mazeSize))

  postMessage(<WorkerResponse>{
    completion: 1,
    state: 'DRAW',
    done: true,
    lines: typedLines,
    solution
  })
  return;


}

