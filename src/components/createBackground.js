import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function createBackground(scene) {
  //load Card Background

  const Geometry = new THREE.PlaneGeometry(200, 200);
  const Material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
  });
  const Plane = new THREE.Mesh(Geometry, Material);

  //Home Plane Creation
  const HomePlane = Plane.clone();
  HomePlane.position.set(-3900, 10, 3798);
  HomePlane.castShadow = true;
  scene.add(HomePlane);

  //Welcome Plane Creation
  const WelcomePlane = Plane.clone();
  WelcomePlane.scale.set(0.3, 1, 1);
  WelcomePlane.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 4);
  WelcomePlane.position.set(-3881, 10, 4001);
  WelcomePlane.castShadow = true;
  scene.add(WelcomePlane);

  //Education Plane Creation
  const EduPlane = Plane.clone();
  EduPlane.position.set(-3395, 35, 3550);
  EduPlane.scale.set(1.25, 1, 1.25);
  EduPlane.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
  scene.add(EduPlane);

  //About Plane Creation
  const AboutPlane = Plane.clone();
  AboutPlane.position.set(-3100, 0, 2898);
  AboutPlane.scale.set(1.25, 1, 1);
  scene.add(AboutPlane);

  //Experience Plane creation
  const ExpPlane = Plane.clone();
  ExpPlane.position.set(-2395, 45, 2600);
  ExpPlane.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
  ExpPlane.scale.set(1.25, 1, 1);
  scene.add(ExpPlane);

  //Contact Plane Creation
  const ContactPlane = Plane.clone();
  ContactPlane.position.set(-1925, 0, 1920);
  ContactPlane.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 4);
  scene.add(ContactPlane);

  return Plane
}

export { createBackground };
