import { config } from "./script.js";
import vec2 from "./vec2.js"

// const {cw,ch,chunkSize,chunkRow} = config

const perceptionRadius = 30;
const alignmentMultiplier = 0.8
const seperationMultiplier = 1.3
const cohesionMultiplier = 1.2

const wallBounce = 0.03

const maxVel = 1
const maxAcc = 0.1

export class Bird{
	pos: vec2
	vel: vec2
	acc: vec2
	constructor(x:number,y:number,vx=0,vy=0,ax=0,ay=0){
		this.pos=new vec2(x,y)
		this.vel=new vec2(vx,vy)
		this.acc=new vec2(ax,ay)
	}


	setVel(adjacent:Bird[]){
		
		this.applyRules(adjacent)
		// console.log(adjacent.length)
		this.bounceWalls()

	}

	applyRules(adjacent:Bird[]){
		let steering = new vec2(0,0)
		let seperation = new vec2(0,0)
		let cohesion = new vec2(0,0)
		let total = 0

		for(let b of adjacent){
			let r = b.pos.csub(this.pos).magnitude()
			if(b != this && r <= perceptionRadius){
				steering.add(b.vel) //sum up velocities
				
				seperation.add( // sum up delta positions
					b.pos.csub(this.pos)
					.div(r*r) // weight by inverse distance
				)

				cohesion.add(b.pos.csub(this.pos))
				total++

			}
		}
		//if at least one neighbor
		if(total > 0 ){

			steering
			.div(total) // get average
			.normalize() // normalize
			.mul(alignmentMultiplier) // scale
			.sub(this.vel) // subtract current velocity to get desired

			seperation
			.div(total) // get average
			.normalize() // normalize
			.mul(-seperationMultiplier) // scale

			cohesion
			.div(total)
			.normalize()
			.mul(cohesionMultiplier)

			this.acc
			.add(seperation)
			.add(steering)
			.add(cohesion)
			.limitMagnitude(maxAcc)
		}
	}


	bounceWalls(){
		if(this.pos[0] <= 50 ){
			this.acc[0] += wallBounce
		}else if(this.pos[0] >= config.cw-50){
			this.acc[0] -= wallBounce
		}
		if(this.pos[1] <= 50){
			this.acc[1] += wallBounce
		}else if(this.pos[1] >= config.ch-50){
			this.acc[1] -= wallBounce
		}
	}


	move(){
		this.vel.add(this.acc)

		this.vel.limitMagnitude(maxVel)
		this.pos.add(this.vel)
	}

	
}