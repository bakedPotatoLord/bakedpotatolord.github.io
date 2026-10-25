import shaderCode from "./boids.wgsl?raw"


let device: GPUDevice;
let gpuContext: GPUCanvasContext;
let pipeline: GPURenderPipeline;
let computePipeline: GPUComputePipeline
let uniformBuffer: GPUBuffer;
let vbo1: GPUBuffer;
let vbo2: GPUBuffer;
let activeVBO: GPUBuffer;
let computeBindGroup1: GPUBindGroup;
let computeBindGroup2: GPUBindGroup;
let activeBindGroup: GPUBindGroup;

let uniformsDirty = true

const kNumPoints = 2**8;

export function getDefaultUniforms(): UniformInput[] {
  return [
    
  ]
}

let lastx: number;
let lasty:number;
let moving = false
let zoom = 1

export function handleMouseEvent(e: MouseEvent,type:MouseEventType,) {
  
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
      buffers:[
        {
          arrayStride: 4 * Float32Array.BYTES_PER_ELEMENT,
          stepMode: 'instance',
          attributes: [
            { shaderLocation: 0, offset: 0, format: 'float32x2' },
            { shaderLocation: 1, offset: 8, format: 'float32x2' },
          ]
        }
      ]
    },
    fragment: {
      module: shaderModule,
      entryPoint: 'fs_main',
      targets: [{ format: gpuContext.getCurrentTexture().format }],
    },
    primitive: { topology: 'triangle-list' },
  });

  computePipeline = device.createComputePipeline({
    layout: "auto",
    compute: {
      module: shaderModule,
      entryPoint: "cs_main",
    },
  });
  
  

  const vertexData = new Float32Array(kNumPoints * 4);
  for (let i = 0; i < kNumPoints; ++i) {
    const offset = i * 4;
    vertexData[offset + 0] = 2 * (Math.random() - 0.5);
    vertexData[offset + 1] = 2 * (Math.random() - 0.5);
    vertexData[offset + 2] = 2 * (Math.random() - 0.5);
    vertexData[offset + 3] = 2 * (Math.random() - 0.5);
  }
 
  vbo1 = device.createBuffer({
    label: 'vertex buffer 1',
    size: vertexData.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });
  vbo2 = device.createBuffer({
    label: 'vertex buffer 2',
    size: vertexData.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vbo1, 0, vertexData);

  computeBindGroup1 = device.createBindGroup({
    layout: computePipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: vbo1 } },
      { binding: 1, resource: { buffer: vbo2 } },
    ],
  })
  
  computeBindGroup2 = device.createBindGroup({
    layout: computePipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: vbo2 } },
      { binding: 1, resource: { buffer: vbo1 } },
    ],
  })


  activeVBO = vbo2
  activeBindGroup = computeBindGroup1

}

export function shaderLoop() {
  if(!pipeline || !gpuContext || !device) return
  const commandEncoder = device.createCommandEncoder();
  const textureView = gpuContext.getCurrentTexture().createView();

  const computePass = commandEncoder.beginComputePass();
  computePass.setPipeline(computePipeline);
  computePass.setBindGroup(0, activeBindGroup);
  computePass.dispatchWorkgroups(Math.ceil(kNumPoints / 64));
  computePass.end();


  const renderPass = commandEncoder.beginRenderPass({
    colorAttachments: [{
      view: textureView,
      clearValue: { r: 0.05, g: 0.05, b: 0.05, a: 1.0 },
      loadOp: 'clear',
      storeOp: 'store',
    }]
  });


  renderPass.setPipeline(pipeline);
  renderPass.setVertexBuffer(0, activeVBO);
  renderPass.draw(6,kNumPoints);
  renderPass.end();

  device.queue.submit([commandEncoder.finish()]);

  if(activeVBO == vbo1){
    activeVBO = vbo2
    activeBindGroup = computeBindGroup1
  }else{
    activeVBO = vbo1
    activeBindGroup = computeBindGroup2
  }
}

export function destroy() {

}

export function getInfo(): ShaderInfo {
  return {
    description: "Simulation of flocking behavior observed in birds. https://en.wikipedia.org/wiki/Boids",
    image: "/images/shaders/boids.png",
    type: "webGPU",
  }
}