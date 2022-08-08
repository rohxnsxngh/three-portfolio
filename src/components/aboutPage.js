import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function aboutPage(scene) {
  const fontLoaderEducation = new FontLoader();
  fontLoaderEducation.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry(
        "                   Education | Texas A&M University\n                   Major | Mechanical Engineering\n                   Minor | Computer Science, Applied Mathematics",
        {
          height: 2,
          size: 8,
          font: droidFont,
        }
      );
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3400, 60, 3400);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), (-1 * Math.PI) / 2);
      scene.add(textMeshHome);
    }
  );

  const fontLoaderDesc = new FontLoader();
  fontLoaderDesc.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("About Me", {
        height: 2,
        size: 8,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3050, 65, 2900);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
      scene.add(textMeshHome);
    }
  );

  const fontLoaderDesc2 = new FontLoader();
  fontLoaderDesc2.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("I love exploring the world of Software Development and\nMechanical Engineering. My primary interests are web \ndevelopment, robotics, and machine learning.", {
        height: 1,
        size: 5,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3125, 45, 2900);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
      scene.add(textMeshHome);
    }
  );

  //load Card Background
  const loaderBg = new GLTFLoader();
  loaderBg.load(
    "./src/assets/AbstractAquarium/scene.gltf",
    function (gltf) {
      const object = gltf.scene;
      object.position.set(-3395, 35, 3450);
      object.scale.set(0.9, 1, 0.025);
      object.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
      object.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI/2);
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

    //load Card Background 2
    const loaderBg2 = new GLTFLoader();
    loaderBg2.load(
      "./src/assets/AbstractAquarium/scene.gltf",
      function (gltf) {
        const object = gltf.scene;
        object.position.set(-2925, 0, 2898);
        object.scale.set(0.9, 0.75, 0.025);
        object.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
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
}

export { aboutPage };
