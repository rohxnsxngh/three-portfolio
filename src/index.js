import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";
import { MarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";

let container, stats;
let camera, scene, renderer, clock, composer;
let controls, water, upperwater, sun;
let light, pointLight, ambientLight;
let materials, current_material;
let effect, resolution;
let effectController;
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

  // STATS

  stats = new Stats();
  container.appendChild(stats.dom);
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
  effect.position.set(-3800, 0, 3800);
  effect.scale.set(50, 50, 50);

  effect.enableUvs = false;
  effect.enableColors = false;

  scene.add(effect);

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
  
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0.5, 0.5, 1);
  scene.add(light);

  pointLight = new THREE.PointLight(0xff3300);
  pointLight.position.set(0, 0, 100);
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
    //135 degrees to match curve
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
  // createAmbientSound(camera);
  createBackground(scene); // pretty detailed background seems to require high performance

  //Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.725;
  // controls.target.set(0, 10, 0);
  // controls.minDistance = 40.0;
  // controls.maxDistance = 200.0;

  //Stats
  // stats = new Stats();
  // container.appendChild(stats.dom);
  window.addEventListener("resize", onWindowResize);
}

//Fit to Window
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}

//Animate
function animate(keys) {
  setTimeout(function () {
    requestAnimationFrame(animate);
  }, 1000 / 500);
  render();
  stats.update();
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
    flat: new THREE.MeshLambertMaterial({
    }),
    colors: new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      shininess: 2,
      vertexColors: true,
    }),
    multiColors: new THREE.MeshPhongMaterial({
      shininess: 2,
      vertexColors: true,
    }),
    plastic: new THREE.MeshPhongMaterial({
      specular: 0x888888,
      shininess: 250,
    }),
  };
  return materials;
}

function setupGui() {
  effectController = {
    material: "matte",
    speed: 1.0,
    numBlobs: 10,
    resolution: 28,
    isolation: 80,
    floor: true,
    wallx: false,
    wallz: false,
  };
}


// this controls content of marching cubes voxel field

function updateCubes(object, time, numblobs, floor, wallx, wallz) {
  object.reset();

  //filling the field
  const rainbow = [
    new THREE.Color(0xff0000),
    new THREE.Color(0xff7f00),
    new THREE.Color(0xffff00),
    new THREE.Color(0x00ff00),
    new THREE.Color(0x0000ff),
    new THREE.Color(0x4b0082),
    new THREE.Color(0x9400d3),
  ];
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

    if (current_material === "multiColors") {
      object.addBall(ballx, bally, ballz, strength, subtract, rainbow[i % 7]);
    } else {
      object.addBall(ballx, bally, ballz, strength, subtract);
    }
  }

  if (floor) object.addPlaneY(2, 12);
  if (wallz) object.addPlaneZ(2, 12);
  if (wallx) object.addPlaneX(2, 12);

  object.update();
}