import shaderCode from "./fractal.wgsl?raw"


let device: GPUDevice;
let gpuContext: GPUCanvasContext;

export function getDefaultUniforms() : UniformInput[] {
  return [
    
  ]
}

export function setUniform(uniform: UniformInput) {
  
}

export async function shaderSetup(p:{gpuDevice: GPUDevice, gpuContext: GPUCanvasContext}) {
  device = p.gpuDevice
  gpuContext = p.gpuContext
}

export function shaderLoop() {

}

export function destroy() {

}

export function getInfo(): ShaderInfo{
  return {
    description:"",
    image:"",
    type:"webGL2",
  }
}