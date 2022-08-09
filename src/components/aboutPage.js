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
        "                 EDUCATION | Texas A&M University",
        {
          height: 2,
          size: 8,
          font: droidFont,
        }
      );
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3400, 70, 3400);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), (-1 * Math.PI) / 2);
      scene.add(textMeshHome);
    }
  );

  const fontLoaderEducationDesc = new FontLoader();
  fontLoaderEducationDesc.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry(
        "                      B.S | Mechanical Engineering & Computer Science",
        {
          height: 2,
          size: 6,
          font: droidFont,
        }
      );
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3400, 45, 3400);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), (-1 * Math.PI) / 2);
      scene.add(textMeshHome);
    }
  );

  const fontLoaderDesc = new FontLoader();
  fontLoaderDesc.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("ABOUT ME", {
        height: 2,
        size: 8,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3200, 65, 2900);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
      scene.add(textMeshHome);
    }
  );

  const fontLoaderDesc2 = new FontLoader();
  fontLoaderDesc2.load(
    "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
    (droidFont) => {
      const textGeometryHome = new TextGeometry("I love exploring the world of Software Development and\nMechanical Engineering. My primary interests are web \ndevelopment, robotics, and machine learning. In my\nfree time I enjoy play basketball and video games", {
        height: 1,
        size: 5,
        font: droidFont,
      });
      const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
      textMeshHome.position.set(-3200, 45, 2900);
      textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
      scene.add(textMeshHome);
    }
  );
}

export { aboutPage };
