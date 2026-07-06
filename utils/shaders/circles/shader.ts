import vs from './circle.vert.glsl?raw'
import fs from './circle.frag.glsl?raw'
import imageurl from "~/assets/img/sunset.jpg?url"
import {type UniformInput} from "~/utils/shaderTools"
import { Circle } from './Circle';

let gl: WebGL2RenderingContext;

let cw:number;
let ch:number;

let pointsVAO: WebGLVertexArrayObject;

let program: WebGLProgram;

const startTime = Date.now()

let circles: Circle[] = []

export function getDefaultUniforms() : UniformInput[] {
  
  return [
    
  ]
}

export function setUniform(uniform: UniformInput) {
  handleUniform(gl, program, uniform)
}

export async function shaderSetup(glc: WebGL2RenderingContext) {
  gl = glc
  cw = gl.canvas.width
  ch = gl.canvas.height

  

  gl.viewport(0,0,cw,ch)

  program = compileProgram(gl, vs, fs) ?? <never>null;
  gl.useProgram(program);

  //dummy VAO
  let pointArray = fullScreenQuad

  pointsVAO = gl.createVertexArray() ?? <never>null;
  gl.bindVertexArray(pointsVAO);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, pointArray, gl.STATIC_DRAW);

  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
  gl.enableVertexAttribArray(0);
  gl.enableVertexAttribArray(1);

  //clean up
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindVertexArray(null);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  gl.disable(gl.DEPTH_TEST);
  
}

let frameTime = 500

let lastFrame = Date.now()

export function shaderLoop() {
  // if(Date.now() - lastFrame > frameTime){
  //   lastFrame = Date.now()
  // }else{
  //   return
  // }
  
  let time = (Date.now()- startTime)/1000;
  gl.uniform1f(gl.getUniformLocation(program, "u_time"), time);
  
  gl.bindVertexArray(pointsVAO);

  let newCirc = new Circle(1.0, 1.0, false)
  newCirc.findMaxRadius(circles)
  circles.push(newCirc)


  let {r, x, y} = newCirc

  gl.uniform2f(gl.getUniformLocation(program, "u_pointPos"), x,y);
  gl.uniform1f(gl.getUniformLocation(program, "u_pointSize"), r); // uv coordinates of the point
  gl.uniform4f(gl.getUniformLocation(program, "u_pointColor"), 0.0, Math.random(), Math.random(), 1.0);
  
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  gl.bindVertexArray(null);
}

export function destroy() {
  gl.deleteProgram(program)
  gl.deleteVertexArray(pointsVAO)
}