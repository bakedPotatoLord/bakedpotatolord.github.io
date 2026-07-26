
import shaderCode from "./dotRender.wgsl?raw";
// main.ts
// TypeScript + WebGPU example: draw 100 dots using instanced quads.
// Assumes shader is in ./shader.wgsl

async function init() {
  if (!navigator.gpu) {
    throw new Error("WebGPU not supported in this browser.");
  }

  // Create canvas
  const canvas = <HTMLCanvasElement> document.querySelector("#canvasGPU");

  canvas.width = 512;
  canvas.height = 512;

  // Acquire GPU device
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) throw new Error("No GPU adapter available.");
  const device = await adapter.requestDevice();

  const context = canvas.getContext("webgpu") as GPUCanvasContext;
  const format = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device,
    format,
    alphaMode: "opaque",
    // size is derived from canvas.width/height
  });

  // Load WGSL shader
  
  const shaderModule = device.createShaderModule({ code: shaderCode });

  // Pipeline
  const pipeline = device.createRenderPipeline({
    layout: "auto", // auto layout is convenient and fine for this example
    vertex: {
      module: shaderModule,
      entryPoint: "vs_main",
      buffers: [
        // Quad vertex buffer (per-vertex)
        {
          arrayStride: 2 * 4, // vec2<f32> (x,y) = 8 bytes
          stepMode: "vertex",
          attributes: [
            {
              shaderLocation: 0,
              offset: 0,
              format: "float32x2",
            },
          ],
        },
        // Instance buffer: center (x,y) in pixels
        {
          arrayStride: 2 * 4,
          stepMode: "instance",
          attributes: [
            {
              shaderLocation: 1,
              offset: 0,
              format: "float32x2",
            },
          ],
        },
      ],
    },
    fragment: {
      module: shaderModule,
      entryPoint: "fs_main",
      targets: [
        {
          format,
        },
      ],
    },
    primitive: {
      topology: "triangle-list",
      cullMode: "none",
    },
  });

  // Create small quad geometry (6 vertices => 2 triangles)
  // We'll build the quad in *pixel space* in the vertex shader using radius uniform.
  // quadVerts are offsets in [-1, 1] that will be multiplied by radius in the shader.
  const quadVerts = new Float32Array([
    -1, -1,
     1, -1,
     1,  1,
    -1, -1,
     1,  1,
    -1,  1,
  ]);
  const quadBuffer = device.createBuffer({
    size: quadVerts.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });
  device.queue.writeBuffer(quadBuffer, 0, quadVerts.buffer, quadVerts.byteOffset, quadVerts.byteLength);

  // Create 100 instance centers (arranged 10x10 grid)
  const COUNT = 100;

  const centers = new Float32Array(COUNT * 2);
  for (let i = 0; i < COUNT; i++) {
      centers[i * 2 + 0] = Math.random()*canvas.width // x in pixels
      centers[i * 2 + 1] =Math.random()*canvas.height; // y in pixels
  }

  const instanceBuffer = device.createBuffer({
    size: centers.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(instanceBuffer, 0, centers.buffer, centers.byteOffset, centers.byteLength);

  // Uniforms: resolution (vec2<f32>), radius (f32), padding (f32) -> total 16 bytes
  const radiusInPixels = 8; // dot radius in pixels
  const uniformData = new Float32Array([canvas.width, canvas.height, radiusInPixels, 0]);
  const uniformBuffer = device.createBuffer({
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(uniformBuffer, 0, uniformData.buffer, uniformData.byteOffset, uniformData.byteLength);

  // Bind group for uniforms (binding 0 group 0 as used in shader)
  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: {
          buffer: uniformBuffer,
        },
      },
    ],
  });

  function frame() {
    // resize handling (simple)
    const cssWidth = Math.floor(512);
    const cssHeight = Math.floor(512);
    if (canvas.width !== cssWidth || canvas.height !== cssHeight) {
      canvas.width = cssWidth;
      canvas.height = cssHeight;
      // update uniforms with new resolution
      const newUniform = new Float32Array([canvas.width, canvas.height, radiusInPixels, 0]);
      device.queue.writeBuffer(uniformBuffer, 0, newUniform.buffer, newUniform.byteOffset, newUniform.byteLength);
    }

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: textureView,
          clearValue: { r: 0.8, g: 0.8, b: 0.8, a: 1.0 },
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    });

    renderPass.setPipeline(pipeline);
    renderPass.setBindGroup(0, bindGroup);
    renderPass.setVertexBuffer(0, quadBuffer);
    renderPass.setVertexBuffer(1, instanceBuffer);
    renderPass.draw(6, COUNT, 0, 0); // 6 vertices per instance, 100 instances
    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
    // request next frame
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

init().catch(err => {
  console.error(err);
  const p = document.createElement("pre");
  p.textContent = String(err);
  document.body.appendChild(p);
});
