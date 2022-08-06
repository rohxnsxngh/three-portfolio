import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function createKeys(scene) {
  //load Keycap W
  const loaderW = new GLTFLoader();
  loaderW.load("./src/assets/KeycapDark/scene.gltf", function (gltf) {
    const objectW = gltf.scene;
    objectW.position.set(-3900, -2, 3975);
    objectW.scale.set(5, 5, 5);
    objectW.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    scene.add(objectW);
  });

  //Load Keycap S
  const loaderS = new GLTFLoader();
  loaderS.load("./src/assets/KeycapDark/scene.gltf", function (gltf) {
    const objectS = gltf.scene;
    objectS.position.set(-3905, -5.5, 3975);
    objectS.scale.set(5, 5, 5);
    objectS.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    scene.add(objectS);
  });

  //Load Keycap A
  const loaderA = new GLTFLoader();
  loaderA.load("./src/assets/KeycapDark/scene.gltf", function (gltf) {
    const objectA = gltf.scene;
    objectA.position.set(-3905, -5.5, 3970);
    objectA.scale.set(5, 5, 5);
    objectA.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    scene.add(objectA);
  });

    //Load Keycap D
    const loaderD = new GLTFLoader();
    loaderD.load("./src/assets/KeycapDark/scene.gltf", function (gltf) {
      const objectD = gltf.scene;
      objectD.position.set(-3905, -5.5, 3980);
      objectD.scale.set(5, 5, 5);
      objectD.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
      scene.add(objectD);
    });
}

export { createKeys };
