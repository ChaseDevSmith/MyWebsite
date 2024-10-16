import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

///starting to make the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const light = new THREE.DirectionalLight(0x404040, 500);
const light2 = new THREE.HemisphereLight(0x404040, 0x404040, 3);

//scene helper
let helper = new THREE.CameraHelper(camera);
// scene.add(helper);

// const light = new THREE.DirectionLightLight( 0x404040 ); // soft white light
scene.add( light, light2 );

// particles 

const torusGeo = new THREE.TorusGeometry(2, 4, 27 ,15 );
//materials
const material = new THREE.PointsMaterial({
  size: 0.115
})
const torus = new THREE.Points(torusGeo,material)

scene.add(torus)
// /// gltf loader start

const loader = new GLTFLoader();

loader.load( "assets/Monkey D. Blender.glb"
  
  
  , function ( gltf ) {
//

  console.log("loaded!!1")
  scene.add( gltf.scene );
  gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
  


}, function ( xhr ) {

  console.log( xhr )

  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );


}, function ( error ) {

	console.error( error );

} );

///orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();
// ///basic cube logic
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// // scene.add( cube );





//background?

///rendering it all
torus.rotation.x = 0.36;

function animate() {
	renderer.render( scene, camera );
  // torus.rotation.x += 0.01;
  torus.rotation.z += 0.01;


  
}
renderer.setAnimationLoop( animate );



