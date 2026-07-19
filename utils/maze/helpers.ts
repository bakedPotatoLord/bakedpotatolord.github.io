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