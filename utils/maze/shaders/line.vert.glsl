#version 300 es

layout(location=0) in vec2 i_position;

flat out vec3 v_color;

void main()
{
  v_color = vec3(0.0,0.0,0.0);
  gl_Position = vec4(i_position*1.9 -0.95, 0.0, 1.0);
}