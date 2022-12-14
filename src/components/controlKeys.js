import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function createKeys(scene) {
  //load Keycap W
  const manager = new THREE.LoadingManager();

  // const progressBar = document.getElementById('progress-bar')
  const progressBarContainer = document.querySelector('.progress-bar-container')

  manager.onLoad = function () {
    progressBarContainer.style.display = 'none'
  };

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    // progressBar.value = itemsLoaded/itemsTotal * 100;
  };

  // manager.onError = function (url) {
  //   console.log("There was an error loading " + url);
  // };

  const loaderW = new GLTFLoader(manager);
  loaderW.load("./KeycapDark/scene.gltf", function (gltf) {
    const object = gltf.scene;
    const objectW = object.clone();
    objectW.position.set(-3900, -2, 3975);
    objectW.scale.set(5, 5, 5);
    objectW.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    scene.add(objectW);

    const objectS = object.clone();
    objectS.position.set(-3905, -5.5, 3975);
    objectS.scale.set(5, 5, 5);
    objectS.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    scene.add(objectS);

    const objectA = object.clone();
    objectA.position.set(-3905, -5.5, 3970);
    objectA.scale.set(5, 5, 5);
    objectA.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    scene.add(objectA);

    const objectD = object.clone();
    objectD.position.set(-3905, -5.5, 3980);
    objectD.scale.set(5, 5, 5);
    objectD.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    scene.add(objectD);
  });
}

export { createKeys };
