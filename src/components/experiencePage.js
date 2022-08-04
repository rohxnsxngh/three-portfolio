import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function expPage(scene) {
  const fontLoaderExp = new FontLoader();
  fontLoaderExp.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("Professional Experience\nSoftware Developer Intern", {
        height: 2,
        size: 8,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-2400, 60, 2450);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), (-1 * Math.PI) / 2);
      scene.add(textMeshHome);
    }
  );

  const fontLoaderExp2 = new FontLoader();
  fontLoaderExp2.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("Vue.js, Bootstrap 5, Tailwind CSS, .NET 4.7.2, \nPostgreSQL, Javascript, CSS, HTML, Express.js,\nThree.js, Python, C#", {
        height: 1,
        size: 5,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-2400, 30, 2450);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), (-1 * Math.PI) / 2);
      scene.add(textMeshHome);
    }
  );

  //load Tesla Logo
  const loader = new GLTFLoader();
  loader.load(
    "./src/assets/TeslaLogo/scene.gltf",
    function (gltf) {
      const object = gltf.scene;
      object.position.set(-2400, 35, 2415);
      object.scale.set(55, 55, 55);
      object.rotateOnAxis(new THREE.Vector3(0, 1, 0), (5 * Math.PI) / 3.075);
      object.castShadow = true;
      scene.add(object);
    },
    // onProgress callback
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },

    // onError callback
    function (err) {
      console.log("An error happened");
    }
  );

  const geometry = new THREE.PlaneGeometry(2.5, 1.5);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(-2400, 0, 2500);
  plane.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
  plane.scale.set(100, 100, 100);
  scene.add(plane);
}

export { expPage };
