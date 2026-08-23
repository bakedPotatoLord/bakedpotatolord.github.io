

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) pos: vec2f,
};

struct UniformData {
  origin: vec2f,
  zoom: f32,
  depth: f32
}
 

const maxIteration = 64u;
const countPerColor = 16u;
const inverseCountPerColor = 1.0 / f32(countPerColor);
const inverseMaxIteration = 1.0 / f32(maxIteration);

@group(0) @binding(0) var<uniform> uniforms:UniformData;

fn mandlebrot(pos: vec2f) -> u32 {
  var count = 0u;

  //current point location
  var p = vec2f(0.0);

  loop{
    //if past max iteration, or definitively outside bounds:
    if( count >= maxIteration || dot(p,p) > 4.0){
      break;
    }
    //otherwise, square the complex number, and add pos
    p = vec2(p.x * p.x - p.y * p.y , 2.0 * p.x * p.y) + pos;
    count += 1u;

  }


  return count;
}

fn gradient(depth: u32) -> vec4f{

  const colors: array<vec4f,4> = array<vec4f,4>(
    vec4f(0.255, 0.58, 0.839,1.0),
    vec4f(0.773, 0.255, 0.839,1.0),
    vec4f(0.271, 0.839, 0.255,1.0),
    vec4f(0.839, 0.639, 0.255,1.0),
  );

  if(depth == 0u || depth == maxIteration){
    return vec4f(0.0,0.0,0.0,1.0);
  }

  var depthf = f32(depth);
  var innerDepth = depthf * inverseCountPerColor; // integer part contains depth, fractional part contains gradient
  var colorInt = u32(innerDepth);
  var colorFractional = fract(innerDepth);
  var colorOut = mix(colors[colorInt], colors[((colorInt + 1u) & 0x3u)], colorFractional);

  return colorOut;
}

@vertex
fn vs_main(@builtin(vertex_index) in_vertex_index: u32) -> VertexOutput {
  var pos = array<vec2f, 4>(
    vec2f( -1.0,  -1.0), 
    vec2f(-1.0, 1.0),  
    vec2f( 1.0, -1.0),
    vec2f(1.0,1.0),
  );   
  return VertexOutput(vec4f(pos[in_vertex_index], 0.0, 1.0),pos[in_vertex_index]);
}

@fragment
fn fs_main(input:VertexOutput) -> @location(0) vec4f {
  var pickpos = input.pos * uniforms.zoom + uniforms.origin;

  if( pickpos.x * pickpos.x + pickpos.y * pickpos.y > 4.0 ){ 
    return vec4f(0.0,0.0,0.0,0.0);
  }
  var count = mandlebrot(pickpos );

  return gradient(count);
}

