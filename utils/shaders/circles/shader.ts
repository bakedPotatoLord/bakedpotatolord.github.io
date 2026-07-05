import vs from './circle.vert.glsl?raw'
import fs from './circle.frag.glsl?raw'
import imageurl from "~/assets/img/sunset.jpg?url"
import {type UniformInput} from "~/utils/shaderTools"

let gl: WebGL2RenderingContext;

let cw;
let ch;

let pointsVAO: WebGLVertexArrayObject;

let program: WebGLProgram;

const startTime = Date.now()

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



  
}


export function shaderLoop() {
  // Shader code goes here

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  //activate texture

  let time = (Date.now()- startTime)/1000;
  gl.uniform1f(gl.getUniformLocation(program, "u_time"), time);
  
  gl.bindVertexArray(pointsVAO);
  
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  gl.bindVertexArray(null);
}

export function destroy() {
  gl.deleteProgram(program)
  gl.deleteVertexArray(pointsVAO)
}