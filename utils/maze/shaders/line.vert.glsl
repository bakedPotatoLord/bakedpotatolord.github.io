#version 300 es

uniform vec4 u_color;

layout(location=0) in vec2 i_position;

flat out vec4 v_color;

void main()
{
  v_color = u_color;
  gl_Position = vec4(i_position*2.0 -1.0, 0.0, 1.0);
}