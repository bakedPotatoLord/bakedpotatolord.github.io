
// shader.wgsl
// Vertex shader uses per-vertex quad offsets and per-instance center (pixels).
// A uniform supplies the canvas resolution and the radius (in pixels).

struct Uniforms {
  resolution: vec2<f32>,
  radius: f32,
  _pad: f32, // padding to 16 bytes
};
@binding(0) @group(0) var<uniform> uniforms: Uniforms;

struct VSOut {
  @builtin(position) position: vec4<f32>,
  @location(0) v_color: vec3<f32>,
};

@vertex
fn vs_main(
  @location(0) quadPos: vec2<f32>,      // [-1,-1] .. [1,1]
  @location(1) centerPx: vec2<f32>,     // center in pixels
) -> VSOut {
  // Convert pixel-space position to NDC:
  let pixelPos: vec2<f32> = centerPx + quadPos * uniforms.radius;
  var ndc: vec2<f32> = (pixelPos / uniforms.resolution) * 2.0 - vec2<f32>(1.0, 1.0);
  // In WebGPU/WebGL, +Y is down in pixel coords; we flip Y for NDC
  ndc.y = -ndc.y;
  var out: VSOut;
  out.position = vec4<f32>(ndc, 0.0, 1.0);

  // give each dot a pleasant color based on its center (cheap hashing)
  let hue = fract((centerPx.x * 0.0023) + (centerPx.y * 0.0037));
  let col = vec3<f32>(
    0.6 + 0.4 * sin(6.2831853 * (hue + 0.0)),
    0.6 + 0.4 * sin(6.2831853 * (hue + 0.33)),
    0.6 + 0.4 * sin(6.2831853 * (hue + 0.66))
  );
  out.v_color = col;
  return out;
}

@fragment
fn fs_main(@location(0) v_color: vec3<f32>) -> @location(0) vec4<f32> {
  return vec4<f32>(v_color, 1.0);
}

