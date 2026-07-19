
export type StartData = {
  width: number
  height: number
  blockSize: number
  shape: number
}

export type WorkerResponse = {
  completion: number
  state: "RDFS" | "BFS" | 'DRAW'
  done: boolean
  lines:Float32Array
  solution:Float32Array
}