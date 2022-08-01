import * as THREE from "three";

function createFog(scene) {
    const fogColor = new THREE.Color(0xffffff)
    scene.fog = new THREE.Fog(fogColor, 100, 500)
}

export {createFog}