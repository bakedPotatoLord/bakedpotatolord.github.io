import type { Vec2 } from './helpers'
import Node from './Node'

export default function bfs(start:Node,end:Node,nodes:Map<string,Node>,blockSize:number,ctx?:CanvasRenderingContext2D){
  nodes.forEach(el=>el.visited = false)
  let que: Vec2[] =[]
  start.visited = true
  start.generation = 0
  que.push(start)
  while(que.length >0){
    let v = que.shift()
    for(let child of v.getViableNodes(nodes,blockSize)){
      
      if(!child.visited){
        child.generation = v.generation+1
        child.parent = v
        if(ctx){
          ctx.strokeStyle = 'brown'
          ctx.beginPath()
          child.drawLineTo(v,ctx)
          ctx.stroke()
        }
        child.visited = true
        que.push(child)
      }
      if(child == end) return true
    }
  }
  return false
}