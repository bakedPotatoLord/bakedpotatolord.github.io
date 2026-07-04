
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
}