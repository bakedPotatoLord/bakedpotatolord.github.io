import bfs from "./bfs"
import { BitField, Vec2, vec2 } from "./helpers"
import rdfs from "./rdfs"
import type { startData, workerResponse } from "./types"




onmessage = (e: MessageEvent<startData>) => {
  const { width, heigth, blockSize, shape } = e.data

  try {
    // Your worker logic that might throw an error
    realtimeGenerate(vec2(width, heigth))
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

  const horis = new Array(numH -1)
  .fill(undefined)
  .map((el, i) => new BitField(numW));

  const vert = new Array(numW -1)
  .fill(undefined)
  .map((el, i) => new BitField(numH));

  //do the grunt work
  for (const completion of rdfs(horis, vert, vec2(0, 0), vec2(numW - 1, numH - 1), mazeSize)) {
    postMessage(<workerResponse>{
      completion,
      state: 'RDFS',
      done: false
    })
  }


 
  //use breadth-first search because depth first will find "a" solution, but not "the" solutoin  
  // bfs(startingNode, endingNode, nodes, blockSize)

  //flattened array of [x1,y1,x2,y2]
  const lines:number[] = []

  // create array of lines, pass as float32Array to main thread
  for(const [i,bField] of horis.entries()){
    const yStart = 1/(numH-0) * i
    const yEnd = 1/(numH-0) * (i+1)
    for(let j = 0; j < numW;j++){
      if(bField.get(j)){
        const xVal = 1/numW * j
        lines.push(xVal,yStart,xVal,yEnd)
      }
    }
  }

  for(const [i,bField] of vert.entries()){
    const xStart = 1/(numW-0) * i
    const xEnd = 1/(numW-0) * (i+1)
    for(let j = 0; j < numW;j++){
      if(bField.get(j)){
        const yVal = 1/numH * j
        lines.push(xStart,yVal,xEnd,yVal)
      }
    }
  }

  console.log(lines)

  const typedLines = new Float32Array(lines)

  postMessage(<workerResponse>{
    completion: 1,
    state: 'draw',
    done: true,
    lines: typedLines
  })
  return;


}

