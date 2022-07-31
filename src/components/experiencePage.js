import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function expPage(scene) {
  const fontLoaderExp = new FontLoader();
  fontLoaderExp.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("Experience", {
        height: 2,
        size: 8,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-2400, 0, 2400);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), (7 * Math.PI) / 4);
      scene.add(textMeshHome);
    }
  );
}

export { expPage };