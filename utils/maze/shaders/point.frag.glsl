#version 300 es
precision mediump float;

in vec3 v_color;

out vec4 fragColor;

void main()
{
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  
  // Discard pixels outside the circle radius
  if (dist > 0.5) {
      discard;
  }
  // float dist = dot(pos,pos);
  // if(dist > 0.25) discard;
  fragColor = vec4(v_color, 1.0);
}