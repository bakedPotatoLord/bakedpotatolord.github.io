import shaderCode from "./fractal.wgsl?raw"


let device: GPUDevice;
let gpuContext: GPUCanvasContext;
let pipeline: GPURenderPipeline;
let uniformBuffer: GPUBuffer;
let uniformBufferValues: Float32Array;
let bindGroup: GPUBindGroup;

let uniformsDirty = true

export function getDefaultUniforms(): UniformInput[] {
  return [
    {
      wgslOffset:0,
      displayname:"Origin",
      hint:"",
      type:"float",
      step:0.1,
      invert:false,
      min:-6,
      max:6,
      vals:[-1,0.28],
    },
    {
      wgslOffset:2,
      displayname:"Zoom",
      hint:" passed into a log function before being used.",
      type:"float",
      step:0.001,
      invert:false,
      min:0.00001,
      max:2,
      vals:[0.03],
    },
    {
      wgslOffset:3,
      displayname:"depth",
      hint:" passed into a log function before being used.",
      type:"int",
      step:1,
      invert:false,
      min:1,
      max:4096,
      vals:[128],
    },
  ]
}

export function handleMouseEvent() {
  
}

export function setUniform(uniform: UniformInput) {
  const offset = uniform.wgslOffset
  if(offset !== undefined){
    uniformBufferValues.set(uniform.vals, offset)
    uniformsDirty = true
  }
  
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

  const uniformBufferSize = 4 * 4; // Account for alignment/padding (vec4 = 16 bytes, f32 = 4 bytes)
  uniformBuffer = device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  uniformBufferValues = new Float32Array(uniformBufferSize / 4);
  uniformBufferValues[0] = 0;
  uniformBufferValues[1] = 0;
  uniformBufferValues[2] = 1;
  uniformBufferValues[3] = 1;

  bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: uniformBuffer },
    ],
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

  if(uniformsDirty){
    device.queue.writeBuffer(uniformBuffer, 0, uniformBufferValues);
    uniformsDirty = false
  }

  renderPass.setPipeline(pipeline);
  renderPass.setBindGroup(0, bindGroup);
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