import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { createCurve } from "./components/curve";
import { homePage } from "./components/homePage";
import { aboutPage } from "./components/aboutPage";
import { expPage } from "./components/experiencePage";
import { contactPage } from "./components/contactPage";
import { createAmbientSound } from "./components/ambientSound";
import { createKeys } from "./components/controlKeys";
import { createBackground } from "./components/createBackground";
import { createWelcome } from "./components/welcomePage";
import { MarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";

let container;
let camera, scene, renderer, clock, composer, planeMesh;
let controls, water, upperwater, sun;
let pointLight, ambientLight;
let materials, current_material;
let resolution;
let effectController;
let effect,
  effect_home,
  effect_edu,
  effect_about,
  effect_exp,
  effect_contact1,
  effect_contact2;
let time = 0;

function init() {
  container = document.getElementById("container");

  // Scene & Camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    20000
  );
  camera.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 4);
  camera.position.set(-4000, 30, 4000);

  //fog
  const color = 0xeb4950; // change color
  const near = 100;
  const far = 1000;
  scene.fog = new THREE.Fog(color, near, far);

  setupGui();

  // MATERIALS

  materials = generateMaterials();
  current_material = "matte";

  // MARCHING CUBES
  resolution = 28;

  effect = new MarchingCubes(
    resolution,
    materials[current_material],
    true,
    true,
    100000
  );
  effect.position.set(-3800, 50, 3800);
  effect.scale.set(100, 100, 100);
  effect.enableUvs = false;
  effect.enableColors = false;
  scene.add(effect);

  //HOME

  effect_home = new MarchingCubes(
    resolution,
    materials[current_material],
    true,
    true,
    100000
  );
  effect_home.position.set(-3200, 50, 3750);
  effect_home.scale.set(100, 100, 100);
  effect_home.enableUvs = false;
  effect_home.enableColors = false;
  scene.add(effect_home);

  // ABOUT
  effect_about = new MarchingCubes(
    resolution,
    materials[current_material],
    true,
    true,
    100000
  );
  effect_about.position.set(-3500, 0, 2898);
  effect_about.scale.set(200, 200, 200);
  effect_about.enableUvs = false;
  effect_about.enableColors = false;
  scene.add(effect_about);

  //EXP1
  effect_exp = new MarchingCubes(
    resolution,
    materials[current_material],
    true,
    true,
    100000
  );
  effect_exp.position.set(-2600, 0, 2400);
  effect_exp.scale.set(150, 150, 150);
  effect_exp.enableUvs = false;
  effect_exp.enableColors = false;
  scene.add(effect_exp);

  //EDU
  effect_edu = new MarchingCubes(
    resolution,
    materials[current_material],
    true,
    true,
    100000
  );
  effect_edu.position.set(-2600, 0, 3200);
  effect_edu.scale.set(150, 150, 150);
  effect_edu.enableUvs = false;
  effect_edu.enableColors = false;
  scene.add(effect_edu);

  //CONTACT1
  effect_contact1 = new MarchingCubes(
    resolution,
    materials[current_material],
    true,
    true,
    100000
  );
  effect_contact1.position.set(-1975, 0, 1920);
  effect_contact1.scale.set(25, 25, 25);
  effect_contact1.enableUvs = false;
  effect_contact1.enableColors = false;
  scene.add(effect_contact1);

  //CONTACT2
  effect_contact2 = new MarchingCubes(
    resolution,
    materials[current_material],
    true,
    true,
    100000
  );
  effect_contact2.position.set(-1875, 0, 1975);
  effect_contact2.scale.set(25, 25, 25);
  effect_contact2.enableUvs = false;
  effect_contact2.enableColors = false;
  scene.add(effect_contact2);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  //LIGHT
  pointLight = new THREE.PointLight(0xeb4950);
  pointLight.position.set(-4000, 0, 4100);
  scene.add(pointLight);

  ambientLight = new THREE.AmbientLight(0x080808);
  scene.add(ambientLight);

  // White directional light at half intensity shining from the top.
  const directionalLight = new THREE.DirectionalLight(0xffffff, 15);
  scene.add(directionalLight);

  //clock
  clock = new THREE.Clock();

  //Sun
  sun = new THREE.Vector3();

  //Water
  const waterGeometry = new THREE.PlaneGeometry(20000, 20000);

  water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      "/waternormals.jpg",
      function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xe27d60,
    waterColor: 0x6aeff5,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  });
  water.rotation.x = -Math.PI / 2;
  scene.add(water);

  upperwater = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      "/waternormals.jpg",
      function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xe27d60,
    waterColor: 0xc38d9e,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  });
  upperwater.rotation.x = -Math.PI / 2;
  upperwater.position.set(0, 100, 0);
  upperwater.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
  scene.add(upperwater);

  //SkyBox
  const sky = new Sky();
  sky.scale.setScalar(20000);
  scene.add(sky);

  const skyUniforms = sky.material.uniforms;

  skyUniforms["turbidity"].value = 0.1;
  skyUniforms["rayleigh"].value = 4; // twilight mode is 0, sunset mode is 3
  skyUniforms["mieCoefficient"].value = 0.5;
  skyUniforms["mieDirectionalG"].value = 0.7;

  const parameters = {
    elevation: 0,
    azimuth: 135,
  };

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  let renderTarget;

  function updateSun() {
    const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
    const theta = THREE.MathUtils.degToRad(parameters.azimuth);
    sun.setFromSphericalCoords(1, phi, theta);
    sky.material.uniforms["sunPosition"].value.copy(sun);
    water.material.uniforms["sunDirection"].value.copy(sun).normalize();
    if (renderTarget !== undefined) renderTarget.dispose();
    renderTarget = pmremGenerator.fromScene(sky);
    scene.environment = renderTarget.texture;
  }

  updateSun();

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //curve
  createCurve(scene);
  homePage(scene);
  aboutPage(scene);
  expPage(scene);
  contactPage(scene);
  createKeys(scene);
  createWelcome(scene);
  createAmbientSound(camera);
  planeMesh = createBackground(scene); // pretty detailed background


  //Controls
  //First Person Controls
  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 300;
  controls.lookSpeed = 0.125;
  controls.heightMin = 10;
  controls.heightCoef = 10;
  controls.constrainVertical = true;
  controls.mouseDragOn = false;
  //controls mouse look around
  controls.activeLook = true;
  controls.lookVertical = false;
  window.addEventListener("resize", onWindowResize);
}

//Fit to Window
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // composer.setSize(window.innerWidth, window.innerHeight);
}

//Animate
function animate(keys) {
  setTimeout(function () {
    requestAnimationFrame(animate);
  }, 1000 / 500);
  render();
}

//Render
function render() {
  const timer = performance.now() * 0.0025;
  water.material.uniforms["time"].value += 1.0 / 60.0;
  upperwater.material.uniforms["time"].value += 1.0 / 60.0;

  const delta = clock.getDelta();

  time += delta * 1.0 * 0.5;

  // marching cubes

  if (effectController.resolution !== resolution) {
    resolution = effectController.resolution;
    effect.init(Math.floor(resolution));
  }

  if (effectController.isolation !== effect.isolation) {
    effect.isolation = effectController.isolation;
  }

  updateCubes(
    effect,
    time,
    effectController.numBlobs,
    effectController.floor,
    effectController.wallx,
    effectController.wallz
  );
  updateCubes(
    effect_home,
    time,
    effectController.numBlobs,
    effectController.floor,
    effectController.wallx,
    effectController.wallz
  );
  updateCubes(
    effect_about,
    time,
    effectController.numBlobs,
    effectController.floor,
    effectController.wallx,
    effectController.wallz
  );
  updateCubes(
    effect_exp,
    time,
    effectController.numBlobs,
    effectController.floor,
    effectController.wallx,
    effectController.wallz
  );
  updateCubes(
    effect_exp,
    time,
    effectController.numBlobs,
    effectController.floor,
    effectController.wallx,
    effectController.wallz
  );
  updateCubes(
    effect_edu,
    time,
    effectController.numBlobs,
    effectController.floor,
    effectController.wallx,
    effectController.wallz
  );
  updateCubes(
    effect_contact1,
    time,
    effectController.numBlobs,
    effectController.floor,
    effectController.wallx,
    effectController.wallz
  );
  updateCubes(
    effect_contact2,
    time,
    effectController.numBlobs,
    effectController.floor,
    effectController.wallx,
    effectController.wallz
  );
  controls.update(clock.getDelta());
  renderer.render(scene, camera);
}

init();
animate();

console.log("Scene Polycount:", renderer.info.render.triangles);
console.log("Active Drawcalls:", renderer.info.render.calls);
console.log("Textures in Memory", renderer.info.memory.textures);
console.log("Geometries in Memory", renderer.info.memory.geometries);

function generateMaterials() {
  const materials = {
    matte: new THREE.MeshPhongMaterial({ specular: 0x111111, shininess: 1 }),
    colors: new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      shininess: 2,
      vertexColors: true,
    }),
  };
  return materials;
}

function setupGui() {
  effectController = {
    material: "matte",
    speed: 1.0,
    numBlobs: 12,
    resolution: 35,
    isolation: 80,
    floor: false,
    wallx: false,
    wallz: false,
  };
}

// this controls content of marching cubes voxel field
function updateCubes(object, time, numblobs, floor, wallx, wallz) {
  object.reset();

  //filling the field
  const subtract = 12;
  const strength = 1.2 / ((Math.sqrt(numblobs) - 1) / 4 + 1);

  for (let i = 0; i < numblobs; i++) {
    const ballx =
      Math.sin(i + 1.26 * time * (1.03 + 0.5 * Math.cos(0.21 * i))) * 0.27 +
      0.5;
    const bally =
      Math.abs(Math.cos(i + 1.12 * time * Math.cos(1.22 + 0.1424 * i))) * 0.77; // dip into the floor
    const ballz =
      Math.cos(i + 1.32 * time * 0.1 * Math.sin(0.92 + 0.53 * i)) * 0.27 + 0.5;

    object.addBall(ballx, bally, ballz, strength, subtract);
  }

  if (floor) object.addPlaneY(2, 12);
  if (wallz) object.addPlaneZ(2, 12);
  if (wallx) object.addPlaneX(2, 12);

  object.update();
}
