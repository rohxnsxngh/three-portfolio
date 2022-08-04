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
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3400, 50, 3400);
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
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3050, 45, 2900);
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
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3125, 30, 2900);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
      scene.add(textMeshHome);
    }
  );

  const geometry = new THREE.PlaneGeometry(3, 1.3);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  const plane2 = new THREE.Mesh(geometry, material);
  plane.position.set(-3400, 0, 3575);
  plane2.position.set(-3000, 0, 2900);
  plane.scale.set(100, 100, 100);
  plane2.scale.set(100, 100, 100);
  plane.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
  plane2.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
  scene.add(plane);
  scene.add(plane2)
}

export { aboutPage };
