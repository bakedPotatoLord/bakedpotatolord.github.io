import vs from './sphere.vert.glsl?raw'
import fs from './sphere.frag.glsl?raw'
import {type ShaderInfo, type UniformInput} from "~/utils/shaderTools"
import { Matrix4, Vector3 } from '@math.gl/core';

let gl: WebGL2RenderingContext;

let cw;
let ch;

let pointsVAO: WebGLVertexArrayObject;

let program: WebGLProgram;
let texture: WebGLTexture

const startTime = Date.now()

const sideWidth = 8;
const perside = sideWidth*sideWidth
const totalQuads = perside*6

let modelMx= new Matrix4()  

let viewMx = new Matrix4()
let projMx = new Matrix4()

let uniformLoc:Record<string, WebGLUniformLocation>;


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

  let eye = new Vector3(2,2,0)
  let center = new Vector3(0,0,0)
  let up = new Vector3(0,0,1)
  viewMx.lookAt({
    eye,
    center,
    up
  })

  const fovy = 45 * Math.PI / 180
  const aspect = cw/ch
  const near = 0.1
  const far = 1000

  projMx.perspective({
    fovy,
    aspect,
    near,
    far
  })


  program = compileProgram(gl, vs, fs) ?? <never>null;

  function handleNullUniform(name: string) {
    console.warn(`Uniform ${name} not found`)
    return null as never
  }

  uniformLoc = {
    u_time: gl.getUniformLocation(program, "u_time") ?? handleNullUniform("u_time"),
    u_sideWidth: gl.getUniformLocation(program, "u_sideWidth") ?? handleNullUniform("u_sideWidth"),
    u_projectionViewMx: gl.getUniformLocation(program, "u_projectionViewMx") ?? handleNullUniform("u_projectionViewMx"),
    u_modelMx: gl.getUniformLocation(program, "u_modelMx") ?? handleNullUniform("u_modelMx"),
  }
  
  let pointArray = new Float32Array([
    0.1,0.1,
    0.9,0.1,
    0.1,0.9,
    0.9,0.9,
  ])

  pointsVAO = gl.createVertexArray() ?? <never>null;
  gl.bindVertexArray(pointsVAO);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, pointArray, gl.STATIC_DRAW);

  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0);
  gl.enableVertexAttribArray(0);

  //clean up
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindVertexArray(null);

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LESS);


  gl.uniform1i(uniformLoc.u_sideWidth, sideWidth);
  let projectionView = projMx.multiplyRight(viewMx)
  gl.uniformMatrix4fv(uniformLoc.u_projectionViewMx, false, projectionView.elements);

}


export function shaderLoop() {
  // Shader code goes here

  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if(!uniformLoc) return;
  let time = (Date.now()- startTime)/1000;
  gl.uniform1f(uniformLoc.u_time, time);
  
  //pass model matrix
  modelMx.rotateZ(0.01);
  modelMx.rotateY(0.01);
  gl.uniformMatrix4fv(uniformLoc.u_modelMx, false, modelMx.elements);

  gl.bindVertexArray(pointsVAO);
  gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4,totalQuads);
  gl.bindVertexArray(null);

}

export function destroy() {
  gl.deleteTexture(texture)
  gl.deleteProgram(program)
  gl.deleteVertexArray(pointsVAO)
}

export function getInfo(): ShaderInfo{
  return {
    description:"A simple 2d wave effect applied to an image of a sunset over a mountain range in boulder",
    image:"/images/shaders/wavyMountain.png"
  }
}