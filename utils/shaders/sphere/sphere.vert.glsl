#version 300 es

uniform int u_sideWidth;
uniform float u_time;
uniform mat4 u_modelMx;
uniform mat4 u_projectionViewMx;

layout(location=0 ) in vec2 i_position;

out vec3 v_color;

//credit bookOfShaders
float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main(){

  int sideTotal = u_sideWidth * u_sideWidth;
  float fsideWidth = float(u_sideWidth);

  int face = gl_InstanceID / sideTotal;
  int faceFlat = gl_InstanceID % sideTotal;


  float positionMult = 1.0 / fsideWidth * 2.0;
  vec2 facePos = vec2(faceFlat % u_sideWidth,faceFlat / u_sideWidth);
  vec2 vertPosition = (facePos + i_position )
    *positionMult - 1.0;

  vec3 position;
  if(face == 0){
    position = vec3(1.0,vertPosition.xy);
  }else if(face == 1){
    position = vec3(-1.0,vertPosition.xy);
  }else if(face == 2){
    position = vec3(vertPosition.x,1.0,vertPosition.y);
  }else if(face == 3){
    position = vec3(vertPosition.x,-1.0,vertPosition.y);
  }else if(face == 4){
    position = vec3(vertPosition.xy,1.0);
  }else if(face == 5){
    position = vec3(vertPosition.xy,-1.0);
  }

  //normalize
  position = normalize(position);

  v_color = vec3(
    random(facePos),
    random(facePos+1.0),
    random(facePos+2.0)
  );

  gl_Position = u_projectionViewMx * u_modelMx * vec4(position,1.0);
  // gl_Position = vec4(position,1.0);

}