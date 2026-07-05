
export interface UniformInput {
  glslname:string
  displayname:string
  hint?: string
  type: "float" | "int" | "uint"
  vecsize?: 1 | 2 | 3 | 4
  min?: number
  max?: number
  step?: number
}

export function compileProgram(gl: WebGLRenderingContext, vs: string, fs: string) {
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
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.log(gl.getShaderInfoLog(vertexShader));
		console.log(gl.getShaderInfoLog(fragmentShader));
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


