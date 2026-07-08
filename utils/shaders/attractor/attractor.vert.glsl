#version 300 es

uniform float u_numPoints;
uniform float u_ratio;
uniform float u_frame;
uniform vec2 u_scale;

layout(location=0 ) in vec2 i_position;

out vec2 v_position;
out vec3 v_color;

const float PI = radians(180.0);
const float TAU = PI * 2.0;

const vec3 red = vec3(1.0,0.2,0.2);
const vec3 green = vec3(0.2,1.0,0.2);
const vec3 blue = vec3(0.2,0.2,1.0);


float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 gradient(float amt){
  amt = clamp(amt,0.0,1.0);
  if(amt < 0.3333){
    //red to green
    return mix (red,green,amt*3.0);
  }else if(amt < 0.6666){
    //green to blue
    return mix (green,blue,(amt-0.3333)*3.0);
  }else{
    //blue to red
    return mix (blue,red,(amt-0.6666)*3.0);
  }
}

void main(){
  
  //rand float
  float random = rand(i_position.xy+ vec2(u_frame,gl_VertexID));
  float random2 = rand(i_position.xy+ vec2(gl_VertexID,u_frame));
  //scale to numPoints
  float randomPoint = floor( random * u_numPoints );

  float angle = TAU * randomPoint / u_numPoints;
  v_position = i_position + vec2(cos(angle),sin(angle));
  v_position *= u_ratio;

  gl_PointSize = 1.0;

  gl_Position = vec4(v_position*u_scale,0.0,1.0) ;
  v_color = gradient(random);
}