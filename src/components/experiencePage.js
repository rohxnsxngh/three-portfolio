import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function expPage(scene) {
  const fontLoaderExp = new FontLoader();
  fontLoaderExp.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("Experience", {
        height: 2,
        size: 8,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-2400, 0, 2400);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), (7 * Math.PI) / 4);
      scene.add(textMeshHome);
    }
  );

  // //load Tesla Logo
  const loader = new GLTFLoader();
  loader.load(
    "./src/assets/TeslaLogo/scene.gltf",
    function (gltf) {
      const object = gltf.scene;
      object.position.set(-2400, 20, 2300);
      object.scale.set(50, 50, 50);
      object.rotateOnAxis(new THREE.Vector3(0, 1, 0), (3 * Math.PI) / 4);
      object.castShadow = true;
      scene.add(object);
    },
    // onProgress callback
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded - Tesla Logo");
    },

    // onError callback
    function (err) {
      console.log("An error happened");
    }
  );

  //Cyber Truck
  // const loaderCyber = new GLTFLoader();
  // loaderCyber.load(
  //   "./src/assets/CyberTruck/scene.gltf",
  //   function (gltf) {
  //     const object = gltf.scene;
  //     object.position.set(-2400, -5, 2500);
  //     object.scale.set(20,20,20)
  //     object.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
  //     object.castShadow = true;
  //     scene.add(object);
  //   },
  //   // onProgress callback
  //   function (xhr) {
  //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded - Tesla Logo");
  //   },

  //   // onError callback
  //   function (err) {
  //     console.log("An error happened");
  //   }
  // );
}

export { expPage };
