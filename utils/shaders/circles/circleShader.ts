import vs from './circle.vert.glsl?raw'
import fs from './circle.frag.glsl?raw'
import copyvs from './copyBuffer.vert.glsl?raw'
import copyfs from './copyBuffer.frag.glsl?raw'
import {type UniformInput} from "~/utils/shaderTools"
import { Circle } from './Circle';

let gl: WebGL2RenderingContext;

let cw:number;
let ch:number;

let quadVAO: WebGLVertexArrayObject;

let pointProgram: WebGLProgram;
let copyProgram: WebGLProgram

let texture: WebGLTexture
let frameBuffer: WebGLFramebuffer

const startTime = Date.now()

let circles: Circle[] = []

export function getDefaultUniforms() : UniformInput[] {
  
  return [
    
  ]
}

export function setUniform(uniform: UniformInput) {
  handleUniform(gl, pointProgram, uniform)
}

export async function shaderSetup(glc: WebGL2RenderingContext) {
  gl = glc
  cw = gl.canvas.width
  ch = gl.canvas.height

  gl.viewport(0,0,cw,ch)

  pointProgram = compileProgram(gl, vs, fs) ?? <never>null;
  copyProgram = compileProgram(gl, copyvs, copyfs) ?? <never>null;

  //dummy fullscreen Quad VAO
  let pointArray = fullScreenQuad

  quadVAO = gl.createVertexArray() ?? <never>null;
  gl.bindVertexArray(quadVAO);

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

  //make texture
  texture = gl.createTexture() ?? <never>null
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, cw, ch, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.bindTexture(gl.TEXTURE_2D, null);

  //make framebuffer
  frameBuffer = gl.createFramebuffer() ?? <never>null;
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //unbind framebuffer
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  //set frameState
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.disable(gl.DEPTH_TEST);
  
}


export function shaderLoop() {

  
  let time = (Date.now()- startTime)/1000;
  let newCirc = new Circle(1.0, 1.0, false)
  newCirc.findMaxRadius(circles)
  circles.push(newCirc)
  let {r, x, y} = newCirc
  
  
  gl.useProgram(pointProgram);
  //set uniforms
  gl.uniform1f(gl.getUniformLocation(pointProgram, "u_time"), time);
  gl.uniform2f(gl.getUniformLocation(pointProgram, "u_pointPos"), x,y);
  gl.uniform1f(gl.getUniformLocation(pointProgram, "u_pointSize"), r); // uv coordinates of the point
  gl.uniform4f(gl.getUniformLocation(pointProgram, "u_pointColor"), 0.0, Math.random(), Math.random(), 1.0);
  //draw to framebuffer
  gl.bindVertexArray(quadVAO);
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);


  gl.useProgram(copyProgram);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);


  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindVertexArray(null);
}

export function destroy() {
  gl.deleteTexture(texture)
  gl.deleteFramebuffer(frameBuffer)
  gl.deleteProgram(copyProgram)
  gl.deleteProgram(pointProgram)
  gl.deleteVertexArray(quadVAO)
}

export function getInfo(): ShaderInfo{
  return {
    description:"A series of circles that appear inside of each other. this is originally from a scratch project from like 2016",
    image:"/images/shaders/circles.png"
  }
}