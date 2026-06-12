// VoidCore.frag (GLSL ES 3.0)
precision highp float;
uniform vec3 u_coreColor; // white-gold
uniform float u_time;
in vec3 v_worldPos;
out vec4 fragColor;

float noise(vec3 p); // assume noise function provided

void main() {
  float r = length(v_worldPos);
  float pulse = 0.5 + 0.5 * sin(u_time * 2.0 + r * 6.2831);
  float corona = exp(-r * 4.0) * (1.0 + 0.6 * noise(v_worldPos * 3.0 + u_time));
  vec3 color = u_coreColor * (pulse * corona);
  // rim neon
  float rim = smoothstep(0.9, 1.0, r) * 0.6;
  color += vec3(0.0, 0.6, 1.0) * rim; // cyan rim
  fragColor = vec4(color, clamp(corona, 0.0, 1.0));
}
