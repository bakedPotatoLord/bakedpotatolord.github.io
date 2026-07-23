#version 300 es

uniform float u_pointSize;

layout(location=0) in vec2 i_quadPos;
layout(location=1) in vec3 i_color;

out vec3 v_color;

void main()
{
  v_color = i_color;
  gl_PointSize = u_pointSize;
  gl_Position = vec4(i_quadPos*2.0 -1.0, 0.0, 1.0);
}