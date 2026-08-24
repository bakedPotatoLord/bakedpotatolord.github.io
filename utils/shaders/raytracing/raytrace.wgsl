

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) pos: vec2f,
};

struct UniformData {
  origin: vec2f,
  zoom: f32,
  depth: f32
}

struct NoiseDescriptor{
  transform: mat3x3<f32>,
  amplitude: f32,
}
 
@group(0) @binding(0) var<uniform> uniforms:UniformData;

const origin = vec3(0.0,0.0,-2.0);
const maxSteps = 256u;

const rayDistMin = 0.1;
const rayDistMax = 32.0;

const lightDirection = normalize(vec3f(0.05,1.0,0.15));
const lightColor = vec3f(1.0,1.0,1.0);

const sphereColor = vec3f(1.0,0.5,0.5);



// returns a nice face from [1,0] and outputs [1,0]
fn fade(t: f32) -> f32 {
    return t * t * (3.0 - 2.0 * t);
}

fn hash12(n:vec2f) -> f32{
  var p2 = fract(n * vec2(123.34, 456.21));
  p2 += dot(p2, p2 + 34.56);
  return fract(p2.x * p2.y);
}

fn hash13( n:vec3f ) -> f32 {
  var p3 = fract(n * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yxz + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

fn hash33(p3: vec3f) -> vec3f {
    var p = fract(p3 * vec3f(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yxz + 33.33);
    return fract((p.xxy + p.yxx) * p.zyx);
}

fn gradient(p:vec3f,d:vec3f) -> f32 {
  let hash = hash33(p);
  return dot(hash,d);
}

fn gradNoise3(n:vec3f,transform: mat3x3<f32>)-> f32{


  let nScaled = transform * n;
  let intPart = floor(nScaled);
  let fracPart = fract(nScaled);

  let fadeX = fade(fracPart.x);
  let fadeY = fade(fracPart.y);
  let fadeZ = fade(fracPart.z);

  let n000 = gradient(intPart,fracPart);
  let n100 = gradient(intPart+ vec3f(1f,0f,0f),fracPart - vec3f(1f,0f,0f));
  let n010 = gradient(intPart+ vec3f(0f,1f,0f),fracPart - vec3f(0f,1f,0f));
  let n110 = gradient(intPart+ vec3f(1f,1f,0f),fracPart - vec3f(1f,1f,0f));
  let n001 = gradient(intPart+ vec3f(0f,0f,1f),fracPart - vec3f(0f,0f,1f));
  let n101 = gradient(intPart+ vec3f(1f,0f,1f),fracPart - vec3f(1f,0f,1f));
  let n011 = gradient(intPart+ vec3f(0f,1f,1f),fracPart - vec3f(0f,1f,1f));
  let n111 = gradient(intPart+ vec3f(1f,1f,1f),fracPart - vec3f(1f,1f,1f));

  return mix(
    mix(
      mix(n000,n100,fadeX),
      mix(n010, n110,fadeX),
      fadeY
    ),
    mix(
      mix(n001,n101,fadeX),
      mix(n011, n111,fadeX),
      fadeY
    ),
    fadeZ
  );
}

fn spheresdf(p:vec3f)-> f32{

  const noiseLayers = 3u;
  const noiseParams: array<NoiseDescriptor,noiseLayers> = array<NoiseDescriptor,noiseLayers>(
    NoiseDescriptor(
      mat3x3<f32>( //scale by 10
        10.0,0.0,0.0, 
        0.0,10.0,0.0,
        0.0,0.0,10.0,
      )* mat3x3<f32>( //rotate around
        1.0,0.0,2.0, 
        0.0,2.0,4.0,
        2.0,3.0,1.0,
      ),
      0.03
    ),
    NoiseDescriptor(
      mat3x3<f32>( //scale by 8
        8.0,0.0,0.0, 
        0.0,8.0,0.0,
        0.0,0.0,8.0,
      )* mat3x3<f32>( //rotate around
        1.0,2.0,0.0, 
        0.3,1.0,3.5,
        2.0,3.0,1.0,
      ),
      0.003
    ),
    NoiseDescriptor(
      mat3x3<f32>(
        1.0,0.0,0.0, 
        0.0,1.0,0.0,
        0.0,0.0,1.0,
      ),
      0.4
    )
  );

  var n = length(p) -1.0;
  for(var i=0u;i<noiseLayers;i++){
    n += gradNoise3(p,noiseParams[i].transform)*noiseParams[i].amplitude;
  }
  return n ;
}

fn sphereNormal(p:vec3f) -> vec3f{
  return normalize(p);
}

fn sphereSDFNormal(p:vec3f) -> vec3f{
  const e = 0.001;

  let dx = vec3f(e, 0.0, 0.0);
  let dy = vec3f(0.0, e, 0.0);
  let dz = vec3f(0.0, 0.0, e);

  return normalize(vec3f(
      spheresdf(p + dx) - spheresdf(p - dx),
      spheresdf(p + dy) - spheresdf(p - dy),
      spheresdf(p + dz) - spheresdf(p - dz)
  ));
}

fn mymod(a: vec3f, b: f32) -> vec3f {
    return a - b * floor(a / b);
}

fn repeat(p:vec3f)-> vec3f{

  const spacing = 4.0;
  const halfspacing = spacing * 0.5;

  return mymod((p + halfspacing) , spacing) - halfspacing;

}

fn identity(p:vec3f) -> vec3f{
  const spacing = 4.0;
  const halfspacing = spacing * 0.5;

  return  floor((p+halfspacing) / spacing);
}

fn sdf(p:vec3f) -> f32{
  let i = identity(p);
  let h = hash33(i);
  
  return spheresdf(repeat(p) + ( (h*1.5) - 0.75) );
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
  var pickpos = input.pos * uniforms.zoom;

  //generally pointing in the +z direction
  var direction = normalize( vec3f(pickpos, 1.0) );

  var pos = origin + vec3f(uniforms.origin,0.0) ;

  var accumulatedDist = 0f;
  var dist: f32;
  for(var s = 0u; s < maxSteps; s++){
    dist = sdf(pos); //dist from SDF
    pos += dist * direction; // trace toward sdf
    accumulatedDist += dist;
    if(accumulatedDist > rayDistMax){
      return vec4f(0.0,0.0,0.0,1.0);
    }
    if(dist < 0.05){
      //if hitting sphere
      break;
    }
  }

  let ident = identity(pos);

  let color = hash33(ident);

  let normal = sphereSDFNormal(pos);
  let reflection = dot(normal,lightDirection);
  return vec4f( 
    (color*0.7  )+
    (lightColor * reflection * 0.2 ),
    1.0
  );
 

}

