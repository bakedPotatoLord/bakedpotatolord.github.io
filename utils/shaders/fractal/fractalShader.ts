import shaderCode from "./fractal.wgsl?raw"


let device: GPUDevice;
let gpuContext: GPUCanvasContext;
let pipeline: GPURenderPipeline

export function getDefaultUniforms(): UniformInput[] {
  return [

  ]
}

export function setUniform(uniform: UniformInput) {

}

export async function shaderSetup(p: { gpuDevice: GPUDevice, gpuContext: GPUCanvasContext }) {
  device = p.gpuDevice
  gpuContext = p.gpuContext

  const shaderModule = device.createShaderModule({
    code: shaderCode
  });

  pipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module: shaderModule,
      entryPoint: 'vs_main',
    },
    fragment: {
      module: shaderModule,
      entryPoint: 'fs_main',
      targets: [{ format: gpuContext.getCurrentTexture().format }],
    },
    primitive: { topology: 'triangle-strip' },
  });
}

export function shaderLoop() {
  if(!pipeline || !gpuContext || !device) return
  const commandEncoder = device.createCommandEncoder();
  const textureView = gpuContext.getCurrentTexture().createView();

  const renderPass = commandEncoder.beginRenderPass({
    colorAttachments: [{
      view: textureView,
      clearValue: { r: 0.05, g: 0.05, b: 0.05, a: 1.0 },
      loadOp: 'clear',
      storeOp: 'store',
    }]
  });

  renderPass.setPipeline(pipeline);
  renderPass.draw(4);
  renderPass.end();

  device.queue.submit([commandEncoder.finish()]);
}

export function destroy() {

}

export function getInfo(): ShaderInfo {
  return {
    description: "",
    image: "",
    type: "webGPU",
  }
}