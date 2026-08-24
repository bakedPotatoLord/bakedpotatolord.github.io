import shaderCode from "./raytrace.wgsl?raw"


let device: GPUDevice;
let gpuContext: GPUCanvasContext;
let pipeline: GPURenderPipeline;
let uniformBuffer: GPUBuffer;
let uniformBufferValues: Float32Array;
let bindGroup: GPUBindGroup;
let renderTexture: GPUTexture
let renderTextureView: GPUTextureView

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
      vals:[0,0.0],
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
      vals:[0.5],
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

let lastx: number;
let lasty:number;
let moving = false
let zoom = 1

export function handleMouseEvent(e: MouseEvent,type:MouseEventType,) {
  
  e.preventDefault()
  // console.log(e,type)
  switch (type) {
    case MouseEventType.down:
      lastx = e.offsetX
      lasty = e.offsetY
      moving = true
      break;
    case MouseEventType.move:
      if(!moving) break
      const scale = 0.5 ** zoom;
      let movex = (e.offsetX - lastx) * 1e-2 * scale;
      let movey = (e.offsetY - lasty) * 1e-2 * scale;
      
      uniformBufferValues[0] -= movex
      uniformBufferValues[1] += movey

      lastx = e.offsetX
      lasty = e.offsetY

      uniformsDirty = true
      break;
    case MouseEventType.up:
      moving = false
      break;
    case MouseEventType.wheel:
      zoom -= (e as WheelEvent).deltaY * 1e-2
      uniformsDirty = true
      break;
  }
}

export function setUniform(uniform: UniformInput) {
  const offset = uniform.wgslOffset
  if(offset === 2){
    //if zoom
    zoom = uniform.vals[0]
    uniformsDirty = true
  }
  if(offset !== undefined ){
    uniformBufferValues.set(uniform.vals, offset)
    uniformsDirty = true
  }
}

export function handleResize(width: number, height: number) {

}

export async function shaderSetup(p: { gpuDevice: GPUDevice, gpuContext: GPUCanvasContext }) {
  device = p.gpuDevice
  gpuContext = p.gpuContext



  const shaderModule = device.createShaderModule({
    code: shaderCode
  });


  renderTexture = device.createTexture({
    size: {
        width: gpuContext.canvas.width,
        height: gpuContext.canvas.height,
    },
    format: navigator.gpu.getPreferredCanvasFormat(),
    usage:
        GPUTextureUsage.RENDER_ATTACHMENT |
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_SRC,
  });

  renderTextureView = renderTexture.createView();

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

  bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: uniformBuffer },
    ],
  });


}

function renderToTexture(commandEncoder: GPUCommandEncoder){
  if(!pipeline || !gpuContext || !device) return
  

  const renderPass = commandEncoder.beginRenderPass({
    colorAttachments: [{
      view: renderTextureView,
      clearValue: { r: 0.05, g: 0.05, b: 0.05, a: 1.0 },
      loadOp: 'load',
      storeOp: 'store',
    }]
  });

  renderPass.setPipeline(pipeline);
  renderPass.setBindGroup(0, bindGroup);
  renderPass.draw(4);
  renderPass.end();

}

function renderFromTexture(commandEncoder: GPUCommandEncoder){
  if(!pipeline || !gpuContext || !device) return

  commandEncoder.copyTextureToTexture(
    { texture: renderTexture },
    { texture: gpuContext.getCurrentTexture() },
    { width: gpuContext.canvas.width, height: gpuContext.canvas.height }
  );

}


export function shaderLoop() {
  if(!pipeline || !gpuContext || !device) return
  
  const commandEncoder = device.createCommandEncoder();

  if(uniformsDirty){
    uniformBufferValues[2] = 0.5 ** zoom; // set as log of zoom val
    
    device.queue.writeBuffer(uniformBuffer, 0, uniformBufferValues);
    
    renderToTexture(commandEncoder)
    
    uniformsDirty = false
  }
  
  // render from framebuffer
  renderFromTexture(commandEncoder)
  
  device.queue.submit([commandEncoder.finish()]);
}

export function destroy() {

}

export function getInfo(): ShaderInfo {
  return {
    description: "A mouse controlled fractal generator, displaying the mandlebrot set by default",
    image: "/images/shaders/fractal.png",
    type: "webGPU",
  }
}