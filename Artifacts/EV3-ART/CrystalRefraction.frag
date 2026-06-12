// CrystalRefraction.frag (GLSL ES 3.0)
precision highp float;
uniform samplerCube u_envMap;
uniform float u_ior; // 1.45 - 2.0
in vec3 v_normal;
in vec3 v_viewDir;
out vec4 fragColor;

void main() {
  vec3 N = normalize(v_normal);
  vec3 V = normalize(v_viewDir);
  vec3 R = refract(V, N, 1.0 / u_ior);
  vec3 env = texture(u_envMap, R).rgb;
  // chromatic dispersion
  vec3 envR = texture(u_envMap, refract(V, N, 1.0 / (u_ior + 0.02))).rgb;
  vec3 envB = texture(u_envMap, refract(V, N, 1.0 / (u_ior - 0.02))).rgb;
  vec3 color = mix(envB, envR, 0.5) * 1.2;
  // add mapping-light glow
  color += vec3(1.0, 0.9, 0.6) * pow(max(dot(N, vec3(0.0,1.0,0.0)), 0.0), 8.0) * 0.4;
  fragColor = vec4(color, 1.0);
}
