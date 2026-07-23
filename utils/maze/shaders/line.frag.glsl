#version 300 es
precision mediump float;

flat in vec4 v_color;

out vec4 o_fragColor;

void main(){
  o_fragColor = v_color;
}