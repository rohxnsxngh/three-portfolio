import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function contactPage(scene) {
  const fontLoaderContact = new FontLoader();
  fontLoaderContact.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("Contact Me", {
        height: 2,
        size: 8,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-1950, 60, 1900);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
      scene.add(textMeshHome);
    }
  );

  const fontLoaderContactDesc = new FontLoader();
  fontLoaderContactDesc.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("Hover near the top of the page\nfor more information", {
        height: 1,
        size: 5,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-1950, 45, 1900);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
      scene.add(textMeshHome);
    }
  );
}

export { contactPage };