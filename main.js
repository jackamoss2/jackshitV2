import * as THREE from 'three';
import { FirstPersonControls } from './modules/firstPersonControls.js';
import { LightsSetup } from './modules/init/lights.js';
import { SceneObjectManager } from './modules/sceneObjectManager.js';
import { UIManager } from './modules/ui/uiManager.js';



const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  2,
  0.1,
  100000
);
camera.position.set(0, 50, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const canvas = document.getElementById('bg');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new FirstPersonControls(camera, renderer.domElement, scene, {
  speed: 4
});

LightsSetup(scene);

const objectManager = new SceneObjectManager(scene);
window.objectManager = objectManager;



// temp test cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
objectManager.addObject('cube1', cube);
objectManager.setColor('cube1', 0x00ff00);



// --- UI Manager ---
const uiManager = new UIManager(resizeRendererToDisplaySize);

function resizeRendererToDisplaySize() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resizeRendererToDisplaySize);
resizeRendererToDisplaySize();

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();