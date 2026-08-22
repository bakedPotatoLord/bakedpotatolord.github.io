

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vs_main(@builtin(vertex_index) in_vertex_index: u32) -> VertexOutput {
  var pos = array<vec2f, 4>(
    vec2f( -1.0,  -1.0),  // Top
    vec2f(-1.0, 1.0),  // Bottom Left
    vec2f( 1.0, -1.0),
    vec2f(1.0,1.0),   
  );
  return VertexOutput(vec4f(pos[in_vertex_index], 0.0, 1.0),pos[in_vertex_index]);
}

@fragment
fn fs_main(input:VertexOutput) -> @location(0) vec4f {
  var uv = (input.uv + 1.0) * 0.5;
  return vec4f(uv, 0.0, 1.0); // Red
}