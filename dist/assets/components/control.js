import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";

function createControl(controls) {
  //Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.725;
  controls.target.set(0, 10, 0);
  controls.minDistance = 40.0;
  controls.maxDistance = 200.0;

  //First Person Controls
  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 100;
  controls.lookSpeed = 0.025;
  controls.heightMin = 10;
  controls.heightCoef = 10;
  controls.constrainVertical = true;
  controls.mouseDragOn = false;
  //controls mouse look around
  controls.activeLook = true;
  controls.lookVertical = false;
}

export { createControl };
