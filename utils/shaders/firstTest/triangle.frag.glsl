#version 300 es
precision mediump float;

uniform sampler2D u_texture;
uniform float u_time;

in vec2 v_uv;

out vec4 fragColor;

float PI = radians(180.0);

void main(){

  vec2 center = vec2(0.0);
  vec2 myPos = gl_FragCoord.xy;
  vec2 uv = v_uv;

float divisorx = 100.0 + 900.0* (cos(u_time*PI)*0.5 +0.5);
float divisory = 100.0 + 900.0* (sin(u_time*PI)*0.5 +0.5);

  uv.x += (cos(u_time*PI*1.0)*sin(myPos.y*0.1))/divisorx;
  uv.y += (sin(u_time*PI*4.0)*cos(myPos.x*0.3))/divisory;
  
  fragColor = texture(u_texture, uv);

  // if(floor( mod(u_time*2.0,2.0)) == 1.0) discard; 
  
}