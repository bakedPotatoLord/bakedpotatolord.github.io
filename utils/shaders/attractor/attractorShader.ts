import vs from './attractor.vert.glsl?raw'
import fs from './attractor.frag.glsl?raw'
import {type UniformInput} from "~/utils/shaderTools"

let gl: WebGL2RenderingContext;

let cw:number;
let ch:number;

let quadVAO: WebGLVertexArrayObject;

let pointProgram: WebGLProgram;
let copyProgram: WebGLProgram

let vao1: WebGLVertexArrayObject
let buffer1: WebGLBuffer
let vao2: WebGLVertexArrayObject
let buffer2: WebGLBuffer

let vao: WebGLVertexArrayObject
let buffer: WebGLBuffer

const startTime = Date.now()

const numPoints = 2**18;

export function getDefaultUniforms() : UniformInput[] {
  return [ ]
}

export function setUniform(uniform: UniformInput) {
  handleUniform(gl, pointProgram, uniform)
}

export async function shaderSetup(glc: WebGL2RenderingContext) {
  gl = glc
  cw = gl.canvas.width
  ch = gl.canvas.height
  gl.viewport(0,0,cw,ch)


  pointProgram = compileProgram(gl, vs, fs,(p)=>{
    gl.transformFeedbackVaryings(p, [ 'v_position'], gl.INTERLEAVED_ATTRIBS);
  }) ?? <never>null;

  let initData = new Float32Array(numPoints * 3)
  for (let i = 0; i < numPoints; i+=3) {
    initData[i + 0] = Math.random() * 2 - 1
    initData[i + 1] = Math.random() * 2 - 1
    initData[i + 2] = Math.random() * 2 - 1
  }

  
  //make buffer 1
  buffer1 = gl.createBuffer()?? null as never;
  vao1 = gl.createVertexArray()?? null as never;
  gl.bindVertexArray(vao1);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
  gl.bufferData(gl.ARRAY_BUFFER, numPoints *3 * 4, gl.DYNAMIC_COPY);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, initData);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
  gl.enableVertexAttribArray(0);

  //and buffer 2
  buffer2 = gl.createBuffer()?? null as never;
  vao2 = gl.createVertexArray()?? null as never;
  gl.bindVertexArray(vao2);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
  gl.bufferData(gl.ARRAY_BUFFER, numPoints *3*4, gl.DYNAMIC_COPY);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
  gl.enableVertexAttribArray(0);

  //clean up
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindVertexArray(null);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  //set frameState
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.disable(gl.DEPTH_TEST);
  
  //init buffer and vao
  vao = vao1
  buffer = buffer2
}



export function shaderLoop() {

  
  let time = (Date.now()- startTime)/1000;
  
  gl.useProgram(pointProgram);
  
  //set uniforms
  gl.uniform1f(gl.getUniformLocation(pointProgram, "u_time"), time);

  //draw points to screen
  gl.bindVertexArray(vao);
  gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, buffer);

  gl.beginTransformFeedback(gl.POINTS);
  gl.drawArrays(gl.POINTS, 0, numPoints);
  gl.endTransformFeedback();


  gl.bindVertexArray(null);
  gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null);

  //swap VAO and buffer
  if(vao == vao1){
    vao = vao2
    buffer = buffer1
  }else{
    vao = vao1
    buffer = buffer2
  }
  
}

export function destroy() {
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