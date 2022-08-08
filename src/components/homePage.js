import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function homePage(scene) {
  const fontLoaderHome = new FontLoader();
  fontLoaderHome.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("ROHAN SINGH", {
        height: 2,
        size: 8,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3900, 60, 3800);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
      scene.add(textMeshHome);
    }
  );

  const fontLoaderHomeBelow = new FontLoader();
  fontLoaderHomeBelow.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_bold.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry(
        "MECHANICAL ENGINEER | SOFTWARE DEVELOPMENT",
        {
          height: 1,
          size: 4,
          font: droidFont,
        }
      );
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3925, 40, 3800);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
      scene.add(textMeshHome);
    }
  );

   //load Card Background
   const loader = new GLTFLoader();
   loader.load(
     "./src/assets/AbstractAquarium/scene.gltf",
     function (gltf) {
       const object = gltf.scene;
       object.position.set(-3775, 10, 3798);
       object.scale.set(0.9, 0.60, 0.025);
       object.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI/2);
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

export { homePage };
