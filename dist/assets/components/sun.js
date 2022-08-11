import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";

function createSun(scene, sun, water, elevation) {
  const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
  const theta = THREE.MathUtils.degToRad(parameters.azimuth);
  sun.setFromSphericalCoords(1, phi, theta);
  sky.material.uniforms["sunPosition"].value.copy(sun);
  water.material.uniforms["sunDirection"].value.copy(sun).normalize();
  if (renderTarget !== undefined) renderTarget.dispose();
  renderTarget = pmremGenerator.fromScene(sky);
  scene.environment = renderTarget.texture;
}

export { createSun };
