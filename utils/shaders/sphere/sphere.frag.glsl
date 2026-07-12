#version 300 es
precision mediump float;

uniform float u_time;

in vec3 v_color;

out vec4 fragColor;

float PI = radians(180.0);

void main(){
  if(v_color.r < 0.2  ||v_color.g < 0.2 || v_color.b < 0.2) discard;
  fragColor = vec4(v_color,1.0);
}