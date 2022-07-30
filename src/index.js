import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createCurve } from "./components/curve";


let container, stats;
let camera, scene, renderer, clock;
let controls, water, sun;
let home;

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
    azimuth: 180,
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
  homePage()

  //Controls - for development
  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set(0, 10, 0);
  // controls.minDistance = 40.0;
  // controls.maxDistance = 200.0;

  //First Person Controls
  // controls = new FirstPersonControls(camera, renderer.domElement);
  // controls.movementSpeed = 100;
  // controls.lookSpeed = 0.025;
  // controls.heightMin = 10;
  // controls.heightCoef = 10;
  // controls.constrainVertical = true;
  // controls.mouseDragOn = false;
  // //controls mouse look around
  // controls.activeLook = true;
  // controls.lookVertical = false;

  //Stats
  stats = new Stats();
  container.appendChild(stats.dom);

  window.addEventListener("resize", onWindowResize);
}

function homePage() {
  const fontLoaderHome = new FontLoader();
  fontLoaderHome.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("WELCOME", {
        height: 2,
        size: 8,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      home = new THREE.Mesh(textGeometryHome, textMaterialHome);
      home.position.set(-3900, 0, 3900);
      home.rotateOnAxis(new THREE.Vector3(0, 1, 0), (7 * Math.PI) / 4);
      scene.add(home);
    }
  );
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
  home.position.y = Math.sin( time );
  controls.update(clock.getDelta());
  renderer.render(scene, camera);
}

init();
animate();
