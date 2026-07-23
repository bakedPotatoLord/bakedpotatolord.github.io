import linesvs from './shaders/line.vert.glsl?raw'
import linesfs from './shaders/line.frag.glsl?raw'
import pointsvs from './shaders/point.vert.glsl?raw'
import pointsfs from './shaders/point.frag.glsl?raw'
import { err, makeQuad, parsehex, parsehexFloat, Vec2 } from './helpers'
import type { StartData } from './types'

let gl: WebGL2RenderingContext
let linesProgram: WebGLProgram
let pointsProgram: WebGLProgram

let linesLength: number
let solutionLength: number
let pointsLength: number
let pointSize: number

let linesVAO: WebGLVertexArrayObject
let solutionVAO: WebGLVertexArrayObject
let pointsVAO: WebGLVertexArrayObject

let uniforLoc: Record<string, WebGLUniformLocation> = {}

export function setGL(canvas: HTMLCanvasElement) {
  gl = canvas.getContext('webgl2', {
    preserveDrawingBuffer: true
  }) ?? err("no webgl2")
}

export function getMaxViewportDims() {
  return gl.getParameter(gl.MAX_VIEWPORT_DIMS)
}

export function setupGL(viewport:Vec2) {
  //set viewport and compile programs
  gl.viewport(0, 0, viewport[0], viewport[1])
  linesProgram = compileProgram(gl, linesvs, linesfs) ?? err("no lines program")
  pointsProgram = compileProgram(gl, pointsvs, pointsfs) ?? err("no points program")
  
  //setup uniforms for both programs
  gl.useProgram(linesProgram)
  uniforLoc["u_color"] = gl.getUniformLocation(linesProgram, "u_color") ?? undefined as never
  gl.useProgram(pointsProgram)
  uniforLoc["u_pointSize"] = gl.getUniformLocation(pointsProgram, "u_pointSize") ?? undefined as never
}

export function setupLinesGL(lines: Float32Array) {
  linesLength = lines.length
  const lineBuffer = gl.createBuffer() ?? err("no buffer")
  gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, lines, gl.STATIC_DRAW)
  linesVAO = gl.createVertexArray() ?? err("no vao")
  gl.bindVertexArray(linesVAO)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0)
  gl.enableVertexAttribArray(0)

  //clean up
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  gl.bindVertexArray(null)

  
}

export function setupSolutionGL(solution: Float32Array) {
  solutionLength = solution.length
  const solutionBuffer = gl.createBuffer() ?? err("no buffer")
  gl.bindBuffer(gl.ARRAY_BUFFER, solutionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, solution, gl.STATIC_DRAW)
  solutionVAO = gl.createVertexArray() ?? err("no vao")
  gl.bindVertexArray(solutionVAO)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0)
  gl.enableVertexAttribArray(0)

  //clean up
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  gl.bindVertexArray(null)
}

// x,y ,r,g,b
export function setupPointsGL(points: Float32Array, pointS: number) {
  pointsLength = points.length / 5
  pointSize = pointS;

  const pointsBuffer = gl.createBuffer() ?? err("no buffer")
  gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)
  pointsVAO = gl.createVertexArray() ?? err("no vao")
  gl.bindVertexArray(pointsVAO)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 20, 0)
  gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 20, 8)
  gl.enableVertexAttribArray(0)
  gl.enableVertexAttribArray(1)
  
  //clean up
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  gl.bindVertexArray(null)

}

export function drawGL(showSolution: boolean, mazeData:StartData) {
  
  //set up maze colors
  const {fgColor, bgColor, solnColor, drawEnds} = mazeData

  const fg = parsehexFloat(fgColor)
  const bg = parsehexFloat(bgColor)
  const soln = parsehexFloat(solnColor)

  gl.clearColor(bg[0], bg[1], bg[2], 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(linesProgram)
  gl.uniform4f(uniforLoc.u_color, ...fg, 1.0)
  gl.bindVertexArray(linesVAO)
  gl.drawArrays(gl.LINES, 0, linesLength * 0.5)

  if (showSolution) {
    gl.uniform4f(uniforLoc.u_color, ...soln, 1.0)
    gl.bindVertexArray(solutionVAO)
    gl.drawArrays(gl.LINES, 0, solutionLength * 0.5)
  }

  if(drawEnds) {
    gl.useProgram(pointsProgram);
    //pass uniform
    gl.uniform1f(uniforLoc.u_pointSize, pointSize ?? 20.0);
    gl.bindVertexArray(pointsVAO);
    gl.drawArrays(gl.POINTS, 0, pointsLength);
  }

  gl.bindVertexArray(null)
}