import * as WavyMountain from "./waveSample/waveSampleShader"
import * as Circles from "./circles/circleShader"
import * as Attractor from "./attractor/attractorShader"
import * as Sphere from "./sphere/sphereShader"
import * as Fractal from "./fractal/fractalShader"
//we need to export them in a certain order to avoid hydration mismatches
//Ordering alphabetically for the time being
export default{ Attractor, Circles, Fractal, Sphere, WavyMountain} as Record<string, {
  getDefaultUniforms: () => UniformInput[],
  setUniform: (uniform: UniformInput) => void,
  shaderSetup: (p:{glc?: WebGL2RenderingContext, gpuDevice?:  GPUDevice, gpuContext?: GPUCanvasContext}) => void
  shaderLoop: () => void
  destroy: () => void
  getInfo: () => ShaderInfo
  handleMouseEvent?: (e: MouseEvent) => void
}>
