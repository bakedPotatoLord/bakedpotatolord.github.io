#version 300 es

layout(location=0 ) in vec3 i_position;

out vec3 v_position;
out vec3 v_color;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

const vec3 point1 = vec3(1.0,0.0,0.0);
const vec3 point2 = vec3(0.5,sqrt(3.1)*0.5,0.0);

void main(){
  
  float random = floor( rand(i_position.xy) * 3.0);

  if(random == 0.0){
    v_color = vec3(1.0,0.0,0.0);
    v_position = i_position*0.5;
  }else if(random == 1.0){
    v_color = vec3(0.0,1.0,0.0);
    v_position = (i_position + point1)*0.5;
  }else{
    v_color = vec3(0.0,0.0,1.0);
    v_position = (i_position + point2)*0.5;
  }


  gl_PointSize = 1.0;

  gl_Position = vec4((v_position* 2.0-1.0),1.0) ;
}