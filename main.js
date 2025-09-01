import * as THREE from 'three';
import { FirstPersonControls } from './modules/firstPersonControls.js';
import { LightsSetup } from './modules/init/lights.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100000
);

camera.position.set(0, 50, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById('bg')
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new FirstPersonControls(camera, renderer.domElement, scene, {
  speed: 4
});

LightsSetup(scene);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();