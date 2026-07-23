import { BitField, vec2, Vec2 } from './helpers'

export default function bfs(horis: BitField[], vert: BitField[], start: Vec2, end: Vec2, mazeSize: Vec2, progress?: (p: number) => void) {

  const count = mazeSize[0] * mazeSize[1]
  const visited = new BitField(count)

  let visitedCounter = 0;

  const getVisited = (v: Vec2) => visited.get(v[0] + v[1] * mazeSize[0])
  const setVisited = (v: Vec2) => visited.set(v[0] + v[1] * mazeSize[0])
  const toHash = (v: Vec2) => v[0] + v[1] * mazeSize[0]

  //map from vec2 child hash to parent vec2 
  const parentMap = new Map<number, Vec2>()

  const que: Vec2[] = []
  que.push(start)
  while (que.length > 0) {
    let v = que.shift() as Vec2

    if (v.equals(end)) {
      //generate path
      const path = [v]
      while (!v.equals(start)) {
        const parent = parentMap.get(toHash(v)) as Vec2
        path.push(parent)
        v = parent
      }
      return path
    }

    if (!getVisited(v)) {
      setVisited(v)
      visitedCounter++
      if( progress && visitedCounter % 100 == 0) progress(visitedCounter / count)

      const neighbors = v.getNeigbors4().filter(n => {
        if (!(n.within(vec2(0, 0), vec2(mazeSize[0] - 1, mazeSize[1] - 1)) && !getVisited(n))) return false

        if (v[0] == n[0]) {
          //same x, horisontal wall
          if (v[1] < n[1]) {
            //check if top wall exists
            return horis[v[1]].get(v[0]) == 0
          } else {
            //check if bottom wall exists
            return horis[n[1]].get(v[0]) == 0
          }
        } else {
          //same y, vertical wall
          if (v[0] < n[0]) {
            //check right wall
            return vert[v[0]].get(v[1]) == 0
          } else {
            //check left wall
            return vert[n[0]].get(v[1]) == 0
          }
        }
      })

      for (let child of neighbors) {
        parentMap.set(toHash(child), v)
        que.push(child)
      }
    }
  }
  return null
}