


export class Circle {
  x: number
  y: number
  r: number
  maxWallDistance: number
  surfaceColor: boolean
  constructor(cw: number, ch: number, color: boolean) {
    this.x = Math.random() * ch
    this.y = Math.random() * cw
    this.r = 0
    this.maxWallDistance = Math.min(Math.abs(this.x), Math.abs(this.x - cw), Math.abs(this.y), Math.abs(this.y - ch))
    this.surfaceColor = color
  }

  findMaxRadius(circles: Circle[]) {
    let smallestContaining: Circle|undefined;
    //initialises the radius
    this.r = this.maxWallDistance
    //find all of the circles that it is inside of
    for (let c of circles) {
      //skip self
      if(c == this) continue
      //if inside of a circle and larger than that circle
      if (this.dist(c) < c.r && this.r > c.r) {
        //set radius to dist to edge of containing circle
        this.r = c.r - this.dist(c)
        smallestContaining = c
      }
    }
    for (let c of circles) {
      //skip self
      if(c == this) continue
      //if dist to other circle is less than other circle's radius and wall dist
      if (this.dist(c) < c.r + this.maxWallDistance) {
        //if overlapping a circle
        if (this.dist(c) - c.r < this.r) {
          //set radius to dist to edge of overlapping circle
          this.r = Math.abs(this.dist(c) - c.r)
        }
      }
    }

    if(smallestContaining){
      this.surfaceColor = !smallestContaining.surfaceColor
    }
  }

  dist(c: Circle) {
    return Math.hypot(this.x - c.x, this.y - c.y)
  }

}