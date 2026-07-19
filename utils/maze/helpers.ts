export const TAU = 2 * Math.PI

export class Vec2 extends Array<number> {

  constructor(x: number, y: number) {
    super(2)
    this[0] = x
    this[1] = y
  }

  len() {
    return Math.hypot(this[0], this[1])
  }

  clamp(min: number | Vec2, max: number | Vec2) {
    if (typeof min === 'number') min = vec2(min)
    if (typeof max === 'number') max = vec2(max)
    this[0] = this[0] < min[0] ? min[0] : this[0] > max[0] ? max[0] : this[0]
    this[1] = this[1] < min[1] ? min[1] : this[1] > max[1] ? max[1] : this[1]
    return this
  }

  getNeigbors4() {
    return [
      vec2(this[0] + 1, this[1]),
      vec2(this[0] - 1, this[1]),
      vec2(this[0], this[1] + 1),
      vec2(this[0], this[1] - 1),
    ]
  }

  within(low: Vec2, high: Vec2) {
    return this[0] >= low[0] && this[0] <= high[0] && this[1] >= low[1] && this[1] <= high[1]
  }

  strictWithin(low: Vec2, high: Vec2) {
    return this[0] > low[0] && this[0] < high[0] && this[1] > low[1] && this[1] < high[1]
  }

  clone() {
    return new Vec2(this[0], this[1])
  }

  equals(other: Vec2) {
    return this[0] === other[0] && this[1] === other[1]
  }
}

export function vec2(x: number, y?: number) {
  if (y === undefined) return new Vec2(x, x)
  return new Vec2(x, y)
}

export class BitField {
  data: Uint8Array;
  constructor(size: number) {
    this.data = new Uint8Array((size + 7) >> 3);
  }

  get(i: number) {
    return (this.data[i >> 3] >> (i & 7)) & 1;
  }

  set(i: number) {
    this.data[i >> 3] |= 1 << (i & 7);
  }

  clear(i: number) {
    this.data[i >> 3] &= ~(1 << (i & 7));
  }
}

export function err(s: string): never {
  throw new Error(s)
}


export function bitfieldsToLines(horis:BitField[],vert:BitField[],size:Vec2){
  const [numW, numH] = size
  let lines:number[] = [];
  //for horisontal, y is constant, x varies
  for(const [i,bField] of horis.entries()){
    //each value in the horis array is a horisontal row with a different y val
    const yVal = 1/(numH) * (i+1)
    for(let j = 0; j < numW;j++){
      if(bField.get(j)){
        const xStart = 1/(numW) * (j+0)
        const xEnd = 1/(numW) * (j+1)
        lines.push(xStart,yVal,xEnd,yVal)
      }
    }
  }
  
  // //for vertical, x is constant, y varies
  for(const [i,bField] of vert.entries()){
    //each value in the vert array is a vertical row with a different x val
    const xVal = 1/(numW) * (i+1)
    for(let j = 0; j < numH;j++){
      if(bField.get(j)){
        const yStart = 1/(numH) * (j+0)
        const yEnd = 1/(numH) * (j+1)
        lines.push(xVal,yStart,xVal,yEnd)
      }
    }
  }

  //make a nice border
  lines.push(0,0,0,1)
  lines.push(1,0,1,1)
  lines.push(0,0,1,0)
  lines.push(0,1,1,1)
  return lines
}