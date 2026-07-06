#version 300 es
precision mediump float;

uniform sampler2D u_texture;
uniform float u_time;

uniform vec2 u_posFactor;
uniform vec2 u_amplitude;
uniform vec2 u_timeMultiplier;
uniform vec2 u_timeOffset;

in vec2 v_uv;

out vec4 fragColor;

float PI = radians(180.0);

void main(){

  vec2 center = vec2(0.0);
  vec2 myPos = v_uv * 777.0;
  vec2 uv = v_uv;

  uv += (sin(mod(myPos*u_posFactor+ (u_time*u_timeMultiplier)+ u_timeOffset,2.0*PI))) * u_amplitude;
  
  fragColor = texture(u_texture, uv);
}