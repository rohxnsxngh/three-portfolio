import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function createBackground(scene) {
  //load Card Background
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  const path =
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/";
  dracoLoader.setDecoderPath(path);
  loader.setDRACOLoader(dracoLoader);
  loader.load("./src/assets/AbstractAquarium/scene.gltf", function (gltf) {
    const object = gltf.scene;
    const objectHome = object.clone();
    objectHome.position.set(-3850, 10, 3798);
    objectHome.scale.set(0.9, 0.6, 0.025);
    objectHome.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    objectHome.castShadow = true;
    scene.add(objectHome);

    const objectAbout = object.clone();
    objectAbout.position.set(-3395, 35, 3450);
    objectAbout.scale.set(1, 1, 0.025);
    objectAbout.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    objectAbout.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    objectAbout.castShadow = true;
    scene.add(objectAbout);

    const objectAbout2 = object.clone();
    objectAbout2.position.set(-3000, 0, 2898);
    objectAbout2.scale.set(1, 0.75, 0.025);
    objectAbout2.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    objectAbout2.castShadow = true;
    scene.add(objectAbout2);

    const objectExp = object.clone();
    objectExp.position.set(-2395, 45, 2500);
    objectExp.scale.set(1, 0.85, 0.025);
    objectExp.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    objectExp.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    objectExp.castShadow = true;
    scene.add(objectExp);

    const objectContact = object.clone();
    objectContact.position.set(-1925, 0, 1920);
    objectContact.scale.set(1, 0.5, 0.025);
    objectContact.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 4);
    objectContact.castShadow = true;
    scene.add(objectContact);

    const objectWelcome = object.clone();
    objectWelcome.position.set(-3875, 10, 4005);
    objectWelcome.scale.set(0.9, 0.125, 0.005);
    objectWelcome.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    objectWelcome.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/4);
    objectWelcome.castShadow = true;
    scene.add(objectWelcome);
  });
}

export { createBackground };
