import * as WavyMountain from "./waveSample/waveSampleShader"
import * as Circles from "./circles/circleShader"
import * as Attractor from "./attractor/attractorShader"
import * as Sphere from "./sphere/sphereShader"
//we need to export them in a certain order to avoid hydration mismatches
//Ordering alphabetically for the time being
export default{ Attractor, Circles,  Sphere, WavyMountain,}
