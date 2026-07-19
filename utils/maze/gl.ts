import vs from './shaders/line.vert.glsl?raw'
import fs from './shaders/line.frag.glsl?raw'

let gl:WebGL2RenderingContext

let linesVAO:WebGLVertexArrayObject
let linesLength:number

let solutionVAO:WebGLVertexArrayObject
let solutionLength:number

let uniforLoc:Record<string,WebGLUniformLocation> = {}

export function setCanvas(canvas:HTMLCanvasElement) {
  gl = canvas.getContext('webgl2', {
    preserveDrawingBuffer: true
  }) ?? err("no webgl2")
}

export function getMaxViewportDims() {
  return gl.getParameter(gl.MAX_VIEWPORT_DIMS)
}

export function setupGL(canvas:HTMLCanvasElement,lines:Float32Array,solution:Float32Array) {
  linesLength = lines.length
  solutionLength = solution.length

  gl.viewport(0, 0, canvas.width, canvas.height)
  gl.clearColor(1.0, 1.0, 1.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  let program = compileProgram(gl, vs, fs) ?? err("no program")
  gl.useProgram(program)


  const lineBuffer = gl.createBuffer() ?? err("no buffer")
  gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, lines, gl.STATIC_DRAW)
  linesVAO = gl.createVertexArray() ?? err("no vao")
  gl.bindVertexArray(linesVAO)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0)
  gl.enableVertexAttribArray(0)
  
  const solutionBuffer = gl.createBuffer() ?? err("no buffer")
  gl.bindBuffer(gl.ARRAY_BUFFER, solutionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, lines, gl.STATIC_DRAW)
  solutionVAO = gl.createVertexArray() ?? err("no vao")
  gl.bindVertexArray(solutionVAO)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0)
  gl.enableVertexAttribArray(0)

  console.log(solution)

  //clean up
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  gl.bindVertexArray(null)

  uniforLoc["u_color"] = gl.getUniformLocation(program, "u_color") ?? undefined as never
}

function err(s:string): never {
  throw new Error(s)
}


export function drawGL() {
  gl.clearColor(1.0, 1.0, 1.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.uniform4f(uniforLoc.u_color, 0.0,0.0,0.0, 1.0)
  gl.bindVertexArray(linesVAO)
  gl.drawArrays(gl.LINES, 0, linesLength*0.5)

  gl.uniform4f(uniforLoc.u_color, 1.0,0.5,0.5, 1.0)
  gl.bindVertexArray(solutionVAO)
  gl.drawArrays(gl.LINES, 0, solutionLength*0.5)

  gl.bindVertexArray(null)
}