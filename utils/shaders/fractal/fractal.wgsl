

@vertex
fn vs_main(@builtin(vertex_index) in_vertex_index: u32) -> @builtin(position) vec4f {
  var pos = array<vec2f, 3>(
    vec2f( 0.0,  0.5),  // Top
    vec2f(-0.5, -0.5),  // Bottom Left
    vec2f( 0.5, -0.5)   // Bottom Right
  );
  return vec4f(pos[in_vertex_index], 0.0, 1.0);
}

@fragment
fn fs_main() -> @location(0) vec4f {
  return vec4f(1.0, 0.0, 0.0, 1.0); // Red
}