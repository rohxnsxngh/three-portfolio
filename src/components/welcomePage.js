import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createWelcome(scene) {
  const fontLoaderWelcome = new FontLoader();
  fontLoaderWelcome.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("WELCOME", {
        height: 0.5,
        size: 3,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3898, 60, 3985);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 4);
      scene.add(textMeshHome);
    }
  );
}

export { createWelcome };
