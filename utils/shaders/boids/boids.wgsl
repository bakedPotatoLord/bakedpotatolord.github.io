

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
  @location(1) direction:vec2f
};

struct UniformData {
  origin: vec2f,
  zoom: f32,
  depth: f32
}
 
struct Boid {
    position: vec2f,
    velocity: vec2f,
};


@group(0) @binding(0)
var<storage, read> source: array<Boid>;

@group(0) @binding(1)
var<storage, read_write> destination: array<Boid>;

const size = 0.08;

const perceptionRadius = 0.25;
const separationRadius = 0.40;

const maxSpeed = 0.45;
const maxAcceleration = 0.50;
const dt = 1.0 / 60.0;

fn insideEllipse(
    point: vec2f,
    center: vec2f,
    direction: vec2f,
    semiMajor: f32,
    semiMinor: f32,
) -> bool {
    // Fall back to the x-axis for a zero direction.
    var axis = vec2f(1.0, 0.0);
    let lengthSquared = dot(direction, direction);
    if (lengthSquared > 0.0) {
        axis = direction * inverseSqrt(lengthSquared);
    }

    let perpendicular = vec2f(-axis.y, axis.x);
    let delta = point - center;

    let local = vec2f(
        dot(delta, axis) / semiMajor,
        dot(delta, perpendicular) / semiMinor,
    );

    return dot(local, local) <= 1.0;
}

fn limitLength(value: vec2f, maximum: f32) -> vec2f {
    let lengthSquared = dot(value, value);
    if (lengthSquared > maximum * maximum) {
        return value * (maximum * inverseSqrt(lengthSquared));
    }
    return value;
}

@compute @workgroup_size(64)
fn cs_main(@builtin(global_invocation_id) id: vec3u) {
    let i = id.x;
    let count = arrayLength(&source);
    if (i >= count) {
        return;
    }

    var boid = source[i];

    var separation = vec2f(0.0);
    var velocitySum = vec2f(0.0);
    var positionSum = vec2f(0.0);
    var neighborCount = 0u;

    for (var j = 0u; j < count; j++) {
      if(j == i){
        continue;
      }

      let other = source[j];

      let delta = other.position - boid.position;
      let distanceSquared = dot(delta, delta);


      if (distanceSquared < perceptionRadius * perceptionRadius) {
        velocitySum += other.velocity;
        positionSum += other.position;
        neighborCount++;
      }

      if (distanceSquared < separationRadius * separationRadius) {
        // Stronger repulsion for closer neighbors.
        separation -= delta / max(distanceSquared, 0.000001);
      }
    }

    var alignment = vec2f(0.0);
    var cohesion = vec2f(0.0);

    if(neighborCount > 0u){
      let inverseCount = 1.0 / f32(neighborCount);

      alignment = velocitySum * inverseCount - boid.velocity;
      cohesion = positionSum * inverseCount - boid.position;
    }

    let acceleration = limitLength(
        separation * 1.5 +
        alignment * 1.5 +
        cohesion * 0.8,
        maxAcceleration,
    );

    let velocity = limitLength(
        boid.velocity + acceleration * dt,
        maxSpeed,
    );

    boid.position = boid.position + velocity * dt;
    boid.velocity = velocity;
  

    if(boid.position.x > 1.1){
       boid.position.x -= 2.2;
    }else if(boid.position.x < -1.1){
       boid.position.x += 2.2;
    }

    if(boid.position.y > 1.1){
       boid.position.y -= 2.2;
    }else if(boid.position.y < -1.1){
       boid.position.y += 2.2;
    }

    destination[i] = boid;
}

@vertex
fn vs_main(
  @location(0) point: vec2f, // Unique position per point,  (Instanced)
  @location(1) direction: vec2f, // Unique direction per point,  (Instanced)
  @builtin(vertex_index) vertex_index: u32,
  ) -> VertexOutput {
  
  var corners = array<vec2f, 6>(
        vec2f(-1.0, -1.0), vec2f( 1.0, -1.0), vec2f(-1.0,  1.0),
        vec2f(-1.0,  1.0), vec2f( 1.0, -1.0), vec2f( 1.0,  1.0)
    );

  let offset = corners[vertex_index];
    
    return VertexOutput(
      vec4f(point.xy+ (offset * size), 0.0,1.0),
      offset,
      direction
    );

}

@fragment
fn fs_main(input:VertexOutput) -> @location(0) vec4f {
 
  if(insideEllipse(input.uv,vec2f(0.0),input.direction,1.0,0.5)){
    return vec4f((input.uv*0.5) +0.5 , 0.5,1.0) ;

  }else{
    discard;
  }
  return vec4f(0.0);
}

