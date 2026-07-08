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
  return [
    {
      glslname:"u_numPoints",
      displayname:"Number of points",
      hint:"https://en.wikipedia.org/wiki/Iterated_function_system",
      type:"float",
      step:1,
      invert:false,
      min:0,
      max:100,
      vals:[5],
    },
    {
      glslname:"u_ratio",
      displayname:"Ratio",
      hint:"https://en.wikipedia.org/wiki/Iterated_function_system",
      type:"float",
      step:0.01,
      invert:false,
      min:0,
      max:1,
      vals:[0.5],
    },
    {
      glslname:"u_scale",
      displayname:"Viewport Scale",
      hint:"changes how the points are mapped to the screen. does not affect the IFS",
      type:"float",
      step:0.01,
      invert:false,
      min:1e-10,
      max:1e10,
      vals:[1,1],
    },
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


  pointProgram = compileProgram(gl, vs, fs,(p)=>{
    gl.transformFeedbackVaryings(p, [ 'v_position'], gl.INTERLEAVED_ATTRIBS);
  }) ?? <never>null;

  let initData = new Float32Array(numPoints * 2)
  for (let i = 0; i < numPoints; i+=2) {
    initData[i + 0] = Math.random() * 2 - 1
    initData[i + 1] = Math.random() * 2 - 1
  }

  
  //make buffer 1
  buffer1 = gl.createBuffer()?? null as never;
  vao1 = gl.createVertexArray()?? null as never;
  gl.bindVertexArray(vao1);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
  gl.bufferData(gl.ARRAY_BUFFER, numPoints *2 * 4, gl.DYNAMIC_COPY);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, initData);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0);
  gl.enableVertexAttribArray(0);

  //and buffer 2
  buffer2 = gl.createBuffer()?? null as never;
  vao2 = gl.createVertexArray()?? null as never;
  gl.bindVertexArray(vao2);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
  gl.bufferData(gl.ARRAY_BUFFER, numPoints *2*4, gl.DYNAMIC_COPY);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0);
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

let frame =0;

export async function shaderLoop() {
  
  
  gl.useProgram(pointProgram);
  
  //set uniforms
  gl.uniform1f(gl.getUniformLocation(pointProgram, "u_frame"), frame);
  frame++
  frame %= Number.MAX_SAFE_INTEGER

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
    description:"generates geometric patterns using an iterated function system",
    image:"/images/shaders/attractor.png"
  }
}