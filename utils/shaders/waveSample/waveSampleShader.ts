import vs from './triangle.vert.glsl?raw'
import fs from './triangle.frag.glsl?raw'
import imageurl from "~/assets/img/sunset.jpg?url"
import {type ShaderInfo, type UniformInput} from "~/utils/shaderTools"

let gl: WebGL2RenderingContext;

let cw;
let ch;

let pointsVAO: WebGLVertexArrayObject;

let program: WebGLProgram;
let texture: WebGLTexture

const startTime = Date.now()

export function getDefaultUniforms() : UniformInput[] {
  
  return [
    {
      glslname:"u_posFactor",
      displayname:"Wave Factor",
      hint: "the width of the wave, higher numbers = larger columns",
      type:"float",
      invert:true,
      vals:[1,2],
    },
    {
      glslname:"u_amplitude",
      displayname:"Amplitude (more is less)",
      hint:"the degree to which the effect is applied to the image",
      type:"float",
      step:1,
      invert:true,
      min:0,
      max:1e13,
      vals:[0,80],
    },
    {
      glslname:"u_timeOffset",
      displayname:"Time offset",
      hint:"per-axis time- waveform offsets in Radians",
      type:"float",
      step:Math.PI/4,
      invert:true,
      min:0,
      max:2*Math.PI,
      vals:[0,0],
    },
    {
      glslname:"u_timeMultiplier",
      displayname:"Time Multiplier",
      hint:"Have you ever wanted to control the speed of time? how about pause time? Now you can! Now with not one but two axes! ",
      type:"float",
      step:1,
      invert:false,
      min:0,
      vals:[0,2],
    }
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

  texture = gl.createTexture() ?? <never>null

  let {image} = await imageBuffer(imageurl)
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);


  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  
}


export function shaderLoop() {
  // Shader code goes here

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  //activate texture
  gl.activeTexture(gl.TEXTURE0);
  gl.uniform1i(gl.getUniformLocation(program, "u_texture"), 0); 

  let time = (Date.now()- startTime)/1000;
  gl.uniform1f(gl.getUniformLocation(program, "u_time"), time);
  
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.bindVertexArray(pointsVAO);
  
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

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