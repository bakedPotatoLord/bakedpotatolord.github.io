import { Bird } from "./Bird.js";
import "./style.css";
import type vec2 from "./vec2.js";

var c =<HTMLCanvasElement>document.querySelector('canvas')
var ctx = c.getContext('2d')
const cw = 512;
const ch = 512;
c.width = cw
c.height = ch

const birdNum = 128
const showLines = false;


export const config = {
	cw,
	ch
};

var birds = Array(birdNum).fill(0)
.map(() =>{
	const heading = rand(0,2*Math.PI)
	return new Bird(rand(200,250),rand(200,250),Math.cos(heading),Math.sin(heading))
} )

function rand(min:number,max:number){
	return min+(Math.random()*(max-min))
}

function line(a:vec2,b:vec2){
	ctx.beginPath();
	ctx.moveTo(a[0], a[1]); 
	ctx.lineTo(b[0], b[1]); 
	ctx.stroke();  
}



function init(){
	for(var i = 0; i<birdNum;i++){
		birds.push(  )
	}
	//starts loop
	loop()
}



function draw(){
	//clear canvas
	ctx.clearRect(0,0,cw,ch)
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,cw,ch)
	
	ctx.fillStyle = "black";
	
	ctx.strokeStyle = 'blue'
	ctx.lineWidth = 2
	for(let b of birds){
		let theta = Math.atan2(b.vel[1],b.vel[0])
		ctx.beginPath();
		ctx.ellipse(b.pos[0], b.pos[1], 5, 3, theta, 0, 2*Math.PI);
		ctx.fill()
		line(b.pos,b.pos.cadd(b.vel.cmul(10)))
	}
	
}

window.onload = init

function loop(){
	requestAnimationFrame(loop)

	birds.forEach(bird => {
		bird.setVel(birds)
	})
	
	birds.forEach(bird => {
		bird.move()
	})
	draw()
}



