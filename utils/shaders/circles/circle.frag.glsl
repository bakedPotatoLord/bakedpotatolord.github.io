#version 300 es
precision mediump float;

uniform float u_time;

uniform vec2 u_pointPos;
uniform float u_pointSize;
uniform vec4 u_pointColor;

in vec2 v_uv;

out vec4 fragColor;

float PI = radians(180.0);

void main(){
  vec2 dist = u_pointPos - v_uv;

  float distsq = dot(dist,dist);

  if(distsq > u_pointSize *  u_pointSize){
    discard;
  }else{
    fragColor = u_pointColor;
  }
  
}