import vs from './shaders/line.vert.glsl?raw'
import fs from './shaders/line.frag.glsl?raw'

let gl:WebGL2RenderingContext

let vao:WebGLVertexArrayObject
let linesLength:number

export function setupGL(canvas:HTMLCanvasElement,lines:Float32Array) {
  linesLength = lines.length

  gl = canvas.getContext('webgl2') ?? err("no webgl2")
  gl.viewport(0, 0, canvas.width, canvas.height)
  gl.clearColor(1.0, 1.0, 1.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  let program = compileProgram(gl, vs, fs) ?? err("no program")
  gl.useProgram(program)


  const buffer = gl.createBuffer() ?? err("no buffer")
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, lines, gl.STATIC_DRAW)
  vao = gl.createVertexArray() ?? err("no vao")

  gl.bindVertexArray(vao)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0)
  gl.enableVertexAttribArray(0)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  gl.bindVertexArray(null)

}

function err(s:string): never {
  throw new Error(s)
}


export function drawGL() {
  gl.clearColor(1.0, 1.0, 1.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.bindVertexArray(vao)
  gl.drawArrays(gl.LINES, 0, linesLength)
  gl.bindVertexArray(null)
}