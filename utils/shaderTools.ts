
export interface UniformInput {
  glslname:string
  displayname:string
  hint?: string
  type: "float" | "int" 
  invert?: boolean
  min?: number
  max?: number
  step?: number
  vals: [number] | [number,number] | [number,number,number] | [number,number,number,number]
}

export interface ShaderInfo {
  description: string
  image: string
}

export function compileProgram(gl: WebGLRenderingContext, vs: string, fs: string, beforeLink?: (program:WebGLProgram) => void) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) return;
  gl.shaderSource(vertexShader, vs);
  gl.compileShader(vertexShader);
  gl.shaderSource(fragmentShader, fs);
  gl.compileShader(fragmentShader);

  const shaderProgram = gl.createProgram();
  if (!shaderProgram) return;

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  beforeLink?.(shaderProgram)
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.log(gl.getShaderInfoLog(vertexShader));
		console.log(gl.getShaderInfoLog(fragmentShader));
    console.log(gl.getProgramInfoLog(shaderProgram));
	}

  gl.useProgram(shaderProgram);
  return shaderProgram
}

export function imageBuffer(uri:string): Promise<{image:HTMLImageElement,width:number,height:number}> {
  let image = new Image()
  image.src = uri
  return new Promise(res=>{
    image.onload = () => {
      const height = image.naturalHeight
      const width = image.naturalWidth
      res({image,width,height})
    }
  })
}

export const fullScreenQuad = new Float32Array([
  //position vex2, uv vec2
  -1.0,-1.0,     0.0, 0.0,
  1.0, -1.0,     1.0, 0.0,
  -1.0, 1.0,     0.0, 1.0,
  1.0, 1.0,     1.0, 1.0,
])

function abbreviategltype(str:string){
  switch(str){
    case "float":
      return "f"
    case "int":
      return "i"
    default:
      return "f"
  }
}



export function handleUniform(gl:WebGL2RenderingContext, program:WebGLProgram, uniform:UniformInput){
  let {
    glslname,
    vals,
    type,
  } = uniform

  const size= vals.length
  const typeAbbr = abbreviategltype(type)

  let location = gl.getUniformLocation(program, glslname)
  if (location === null) return

  if(uniform.invert){
    vals = vals.map(v=>v==0?0:1/v) as typeof vals
  }

  if(size === 1){
    gl[`uniform${size}${typeAbbr}`](location, ...vals)
  }else if(size === 2){
    gl[`uniform${size}${typeAbbr}`](location, ...vals)
  }else if(size === 3){
    gl[`uniform${size}${typeAbbr}`](location, ...vals)
  }else if(size === 4){
    gl[`uniform${size}${typeAbbr}`](location, ...vals)
  }
}