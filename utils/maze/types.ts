
export type startData = {
  width: number
  heigth: number
  blockSize: number
  shape: number
}

export type workerResponse = {
  completion: number
  state: "RDFS" | "draw"
  done: boolean
  imageData?: ImageData
}