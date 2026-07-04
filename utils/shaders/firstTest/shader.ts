import vs from './triangle.vert.glsl?raw'
import fs from './triangle.frag.glsl?raw'


let gl: WebGL2RenderingContext;

let cw;
let ch;

let pointsVAO: WebGLVertexArrayObject;

export function shaderSetup(glc: WebGL2RenderingContext) {
  gl = glc
  cw = gl.canvas.width
  ch = gl.canvas.height

  compileProgram(gl, vs, fs)

  
  let pointArray = new Float32Array([
    -.5, -.5, 0.0, 1.0,
    0.5, -.5, 0.0, 1.0,
    0.0, 0.5, 0.0, 1.0
  ])

  pointsVAO = gl.createVertexArray() ?? <never>null;
  gl.bindVertexArray(pointsVAO);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, pointArray, gl.STATIC_DRAW);

  gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  //clean up
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindVertexArray(null);

  
}

export function shaderLoop() {
  // Shader code goes here

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);


  gl.bindVertexArray(pointsVAO);
  
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  gl.bindVertexArray(null);
}

