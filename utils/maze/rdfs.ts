import { BitField, vec2, Vec2 } from './helpers';
import type Node from './Node';
/**
 * @description randomized depth first search
 * @author Josiah Hamm / @bakedPotatoLord
 * @license MIT
 */
export default  function* rdfs(horisontal:BitField[],vertical:BitField[],start:Vec2,end:Vec2,mazeSize:Vec2){
  const numCells = mazeSize[0] * mazeSize[1]

  horisontal.forEach(el=>el.data.fill(255))
  vertical.forEach(el=>el.data.fill(255))

  console.log(horisontal,vertical)

  const visited = new BitField(numCells)
  let i = 0

  const setVisited = (v:Vec2) => { visited.set(v[0] + v[1] * mazeSize[0]) };
  const getVisited = (v:Vec2) =>  visited.get(v[0] + v[1] * mazeSize[0]) ;

  //initialize algorithm
  setVisited(start)
  let que = [start]
  while(que.length > 0){
    i++
    yield (i/numCells)
    //pick from bottom of stack
    let current = que.shift() as Vec2;
    // 
    let unvisited = current
      .getNeigbors4()
      .filter(v=>v.within(vec2(0,0),vec2(mazeSize[0]-1,mazeSize[1]-1)) && !getVisited(v))
    // only add nodes to stack if they can grow
    if(unvisited.length){ //type coersion go brrr
      // add current to top of stack
      que.push(current)
      // chose random Node from unvisited
      let chosen = unvisited[Math.floor(Math.random()*unvisited.length)];
      // remove walls

      if(current[0] == chosen[0]){
        //same x, horisontal wall
        if(current[1] < chosen[1]){
          //remove top wall of current
          horisontal[current[1]].clear(current[0])
        }else{
          //remove bottom wall of current
          horisontal[chosen[1]].clear(current[0])
        }
      }else{
        //same y, vertical wall
        if(current[0] < chosen[0]){
          //remove right wall of current
          vertical[current[0]].clear(current[1])
        }else{
          //remove left wall of current
          vertical[chosen[0]].clear(current[1])
        }
      }
      

      setVisited(chosen)
      // add chosen to the bottom of stack (This is the DEPTH FIRST part)
      que.unshift(chosen)
    } 
  }
  console.log(horisontal,vertical)

  return;
}