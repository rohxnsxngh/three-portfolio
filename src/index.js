import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { createCurve } from "./components/curve";
import { homePage } from "./components/homePage";
import { aboutPage } from "./components/aboutPage";
import { expPage } from "./components/experiencePage";
import { contactPage } from "./components/contactPage";

let container, stats;
let camera, scene, renderer, clock;
let controls, water, sun;
let textMeshHome;

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
  camera.position.set(-4000, 30, 4000);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  //Ambient Lighting
  const light = new THREE.AmbientLight(0x404040);
  scene.add(light);

  //clock
  clock = new THREE.Clock();

  sun = new THREE.Vector3();

  // Water
  const waterGeometry = new THREE.PlaneGeometry(20000, 20000);

  water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      "/src/assets/waternormals.jpg",
      function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xfb3535,
    waterColor: 0xe67cd3,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  });

  water.rotation.x = -Math.PI / 2;

  scene.add(water);

  //SkyBox
  const sky = new Sky();
  sky.scale.setScalar(20000);
  scene.add(sky);

  const skyUniforms = sky.material.uniforms;

  skyUniforms["turbidity"].value = 15;
  skyUniforms["rayleigh"].value = 10; // twilight mode is 0, sunset mode is 10
  skyUniforms["mieCoefficient"].value = 0.007;
  skyUniforms["mieDirectionalG"].value = 0.8;

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

  //Controls - for development
  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.725;
  controls.target.set(0, 10, 0);

  //Stats
  stats = new Stats();
  container.appendChild(stats.dom);
  window.addEventListener("resize", onWindowResize);
}

//Fit to Window
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//Animate
function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}

//Render
function render() {
  const time = performance.now() * 0.0025;
  water.material.uniforms["time"].value += 1.0 / 60.0;
  // textMeshHome.position.x += 0.001
  controls.update(clock.getDelta());
  renderer.render(scene, camera);
}

init();
animate();
