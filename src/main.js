import './style.css';

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

let camera;
let scene;
let renderer;
let controls;

init();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(5, 3, 7);

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1.5, 0);
  controls.update();

  scene.add(new THREE.AxesHelper(3));

  addLights();
  addSnowman();
  addGround();

  window.addEventListener('resize', onWindowResize);

  animate();
}

function addLights() {
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xffffff, 1.2);
  sun.position.set(4, 8, 3);
  scene.add(sun);

  const lamp = new THREE.PointLight(0xffcc88, 8, 12);
  lamp.position.set(-2, 3, 2);
  scene.add(lamp);
}

function addSnowman() {
  const snow = new THREE.MeshPhongMaterial({color: 0xffffff});
  const carrot = new THREE.MeshLambertMaterial({color: 0xff6600});
  const coal = new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.6,
  });

  const bottom = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 24), snow);
  bottom.position.y = 0.9;
  scene.add(bottom);

  const middle = new THREE.Mesh(new THREE.SphereGeometry(0.65, 32, 24), snow);
  middle.position.y = 2.15;
  scene.add(middle);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 24), snow);
  head.position.y = 3.0;
  scene.add(head);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.45, 16), carrot);
  nose.position.set(0, 3.0, 0.42);
  nose.rotation.x = Math.PI / 2;
  scene.add(nose);

  const hat = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.28, 0.4, 24),
    coal
  );
  hat.position.y = 3.5;
  scene.add(hat);

  const brim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 0.06, 24),
    coal
  );
  brim.position.y = 3.3;
  scene.add(brim);
}

function addGround() {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshLambertMaterial({color: 0xe8f4ff})
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
