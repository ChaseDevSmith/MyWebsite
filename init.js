import { OrbitControls } from 'https://unpkg.com/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';

export function initScene(){
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const light = new THREE.DirectionalLight(0x404040, 500);
const light2 = new THREE.HemisphereLight(0x404040, 0x404040, 3);
const light4 = new THREE.AmbientLight(0xffffff, 1);
scene.add( light, light2 ,);
//orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();
return {camera,scene, renderer}
}
