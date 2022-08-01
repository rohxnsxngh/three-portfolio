import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function homePage(scene) {
  const fontLoaderHome = new FontLoader();
  fontLoaderHome.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_bold.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("ROHAN SINGH", {
        height: 4,
        size: 8,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0x172E4F });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3900, 25, 3838);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), (7 * Math.PI) / 4);
      scene.add(textMeshHome);
    }
  );

  const fontLoaderHomeBelow = new FontLoader();
  fontLoaderHomeBelow.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_bold.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("MECHANICAL ENGINEER | SOFTWARE DEVELOPER | DESIGN", {
        height: 1,
        size: 4,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3900, 10, 3785);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), (7 * Math.PI) / 4);
      scene.add(textMeshHome);
    }
  );
}

export { homePage };
