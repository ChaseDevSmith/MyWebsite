// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
    import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';
import { TextGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/FontLoader.js';


// import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.11.0/dist/gsap.min.js';
import { initScene } from '/init.js';
import {Planet} from '/planets.js'

///scene init, camera init, light init
let {camera, scene, renderer, controlsEnabled, controls} = initScene()
//loaders 
const loader = new GLTFLoader();
const toggleButton = document.getElementById('toggle-controls');

//load planets
const monkeyGLB = await loader.loadAsync("/assets/Monkey D. Blender.glb")
const monkeyScale ={x:1,y:1,z:1}
const monkeyPosition = {
  x:0, 
  y:0, 
  z:0
}
const monkey = new Planet(monkeyGLB,monkeyScale,monkeyPosition)
      scene.add(monkey.planet.scene)
const purplePlanetglb = await loader.loadAsync('/assets/PURPLEPLANET.glb');
const purpleScale = {
  x : .7,
  y : .7,
  z : .7
}
const purplePosition = {
  x : -1.5,
  y : -2,
  z : 1.3
}
const purplePlanet = new Planet(purplePlanetglb,purpleScale,purplePosition)
     scene.add(purplePlanet.planet.scene)
const tigerPlanetGLB = await loader.loadAsync( "/assets/TiggerPlanet.glb")
const tigerScale = {
  
  x : .7,
  y : .7,
  z : .7
}
const tigerPosition = {
  //1.5,1.2,2.3
  x : 1.5,
  y : 2,
  z : 1.2
}
const tigerPlanet = new Planet(tigerPlanetGLB, tigerScale,tigerPosition)
    scene.add(tigerPlanet.planet.scene)
const orbitObject = new THREE.Object3D;
     scene.add(orbitObject)
orbitObject.position.set(-1.5,-1.5,1.3)
const blueMoonglb = await loader.loadAsync('/assets/blueMoonWithDarkBlueSpots.glb');
const blueMoonScale = {
  
  x : .7,
  y : .7,
  z : .7
}
const blueMoonPosition = {
  // 3.9,-1.3,.4
  x : 3.9,
  y : -1.3,
  z : .4
}
const blueMoon = new Planet(blueMoonglb,blueMoonScale,blueMoonPosition)
//empty obj
     orbitObject.add(blueMoon.planet.scene)
const maroonPlanetglb = await loader.loadAsync("/assets/maroonPlanet.glb");
const maroonPlanetScale = {
  
  x : .7,
  y : .7,
  z : .7
}
const maroonPlanetPosition = {
  // -3,3,-3
  x : -3,
  y : 3,
  z : -3
}
const maroonPlanet =new Planet(maroonPlanetglb,maroonPlanetScale,maroonPlanetPosition)
      scene.add(maroonPlanet.planet.scene)
//planets^^




//points
const tLoader = new THREE.TextureLoader()
const orbitStars = tLoader.load("/assets/Untitled_Artwork 2.png")
const bgStars = await tLoader.load("/assets/Untitled_Artwork 2.png")
const blueEight = await tLoader.loadAsync("/assets/blueEigth.png")
const greenQrest = await tLoader.loadAsync("/assets/quarterRest.png")
const wholeNote = await tLoader.loadAsync("/assets/wholeNote.png")
const sixteenthNote = await tLoader.loadAsync("/assets/16thnote.png")
const halfRest = await tLoader.loadAsync("/assets/halfRest.png")
const dotHalf = await tLoader.loadAsync("/assets/dotHalf.png")
// geos
const halfNoteTorusGeo = new THREE.TorusGeometry(3, 1.3, 16 ,48);
const particlesGeometry = new THREE.BufferGeometry;
const particlesCount = 250
//materials
const blueNotes = new THREE.PointsMaterial({
  size: 0.08,
  map: blueEight,
  transparent: true,
  color: "#2b83f3"
  

})
const bgStarsMat = new THREE.PointsMaterial({
  size: 0.05,
  map: blueEight,
  transparent: true,
  // color: "#FFFFFF"
  

})
const greenRest = new THREE.PointsMaterial({
  size:0.07,
  map: greenQrest,
  transparent:true
})
const wholeNoteMat = new THREE.PointsMaterial({
  size: 0.07,
  map: wholeNote,
  transparent: true

})
const sixteenthNoteMat = new THREE.PointsMaterial({
  size: 0.07,
  map: sixteenthNote,
  transparent: true
})
const halfRestMat = new THREE.PointsMaterial({
  size: 0.07,
  map: halfRest,
  transparent: true
})
const dotHalfMat = new THREE.PointsMaterial({
  size: 0.07,
  map: dotHalf,
  transparent: true
})
//PARTICLE BACKGROUND STARS
const particlesMesh = new THREE.Points(particlesGeometry, bgStarsMat);
scene.add(particlesMesh)
const posArray = new Float32Array(particlesCount *3);////xyz attached
for(let i = 0; i <particlesCount *3; i++){
  posArray[i]=  (Math.random() - 0.5) * 7
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray,3))
//BIG TORUS
const torusGeo = new THREE.TorusGeometry(3, 1.3, 16 ,48 );
const torusPoints = torusGeo.attributes.position.array;
//console.log(torusGeo.attributes.position.array)
const tPointsGeo = new THREE.BufferGeometry().setFromPoints(torusPoints);
const newTorusMesh = new THREE.Points(tPointsGeo, blueNotes)
tPointsGeo.setAttribute('position', new THREE.BufferAttribute(torusGeo.attributes.position.array,3))
scene.add(newTorusMesh)

//SIXTEENTHNOTES
const sixteenthRingGeo = new THREE.TorusGeometry(2, 3, 28 )
const sixteenthPoints = sixteenthRingGeo.attributes.position.array
console.log(sixteenthPoints)
const sixteethPointsGeo = new THREE.BufferGeometry().setFromPoints(sixteenthPoints)
const sixthRing = new THREE.Points(sixteethPointsGeo,sixteenthNoteMat )
sixteethPointsGeo.setAttribute('position', new THREE.BufferAttribute(sixteenthRingGeo.attributes.position.array,3))
scene.add(sixthRing)
// DOTTED HALFNOTE
const dotHalfGeo = new THREE.TorusGeometry(2, 3, 32 )
const dotHalfPoints = dotHalfGeo.attributes.position.array
console.log(dotHalfPoints)
const dotHalfPointsGeo = new THREE.BufferGeometry().setFromPoints(dotHalfPoints)
const dotHalfRing = new THREE.Points(dotHalfPointsGeo,dotHalfMat )
dotHalfPointsGeo.setAttribute('position', new THREE.BufferAttribute(sixteenthRingGeo.attributes.position.array,3))
scene.add(dotHalfRing)




const halfRestRingGeo = new THREE.RingGeometry(2, 3, 48 )
const halfRestPoints = halfRestRingGeo.attributes.position.array
console.log(halfRestPoints)
const halfRestPGeo = new THREE.BufferGeometry().setFromPoints(halfRestPoints)
const halfRestRing = new THREE.Points(halfRestPGeo,halfRestMat )
halfRestPGeo.setAttribute('position', new THREE.BufferAttribute(halfRestRingGeo.attributes.position.array,3))

scene.add(halfRestRing)


//background?--- starrfield
const ringGeo = new THREE.RingGeometry(2, 3, 48 )
const ringPoints = ringGeo.attributes.position.array
console.log(ringPoints)
const rPointsGeo = new THREE.BufferGeometry().setFromPoints(ringPoints)
const firstRing = new THREE.Points(rPointsGeo,wholeNoteMat )
rPointsGeo.setAttribute('position', new THREE.BufferAttribute(ringGeo.attributes.position.array,3))

scene.add(firstRing)



//moving planets
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


//trying to make object not selectable
// const nonSelectableLayer = 2;
// particlesMesh.layers.set(nonSelectableLayer);
// raycaster.layers.enable(0);
// raycaster.layers.disable(nonSelectableLayer);



///rendering it all
//position change for shapes.
newTorusMesh.rotation.x = 1.79;
newTorusMesh.rotation.z = .5;
newTorusMesh.rotation.y = .7;
newTorusMesh.raycast = () => false;
particlesMesh.raycast = () => false;

firstRing.rotation.z = .5;
firstRing.rotation.x = 1.79;
firstRing.rotation.y = .7;
firstRing.raycast = () => false;

sixthRing.rotation.z = .5;
sixthRing.rotation.x = 1.79;
sixthRing.rotation.y = .7;
sixthRing.position.y = 1
sixthRing.position.z = -1

sixthRing.raycast = () => false;

dotHalfRing.rotation.z = .5;
dotHalfRing.rotation.x = 1.79;
dotHalfRing.rotation.y = .7;
dotHalfRing.position.y = -1
dotHalfRing.raycast = () => false;


halfRestRing.rotation.z = .5;
halfRestRing.rotation.x = 1.79;
halfRestRing.rotation.y = .7;
halfRestRing.position.y = -1
halfRestRing.raycast = () => false;


tigerPlanet.planet.scene.rotation.z = .7
tigerPlanet.planet.scene.rotation.x = .7

maroonPlanet.planet.scene.rotation.z = -.7
maroonPlanet.planet.scene.rotation.x = .7
//functions for clicking
toggleButton.addEventListener('click', function() {
  // Toggle the OrbitControls enabled state
  controlsEnabled = !controlsEnabled;
  controls.enabled = controlsEnabled;  // Update OrbitControls based on the new state
  
  console.log(`OrbitControls ${controlsEnabled ? 'enabled' : 'disabled'}`);
});


///mouse things
// document.addEventListener("mousedown", onMouseClick)

window.addEventListener('click', onMouseClick, false);

        function onMouseClick(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.update(camera, mouse);

            const intersects = raycaster.intersectObjects(scene.children);
            for (let i = 0; i < intersects.length; i++) {
                const object = intersects[i].object;
                console.log(object)
               
            }
        }
const fontLoader = new FontLoader();
let jetFont
const ttfLoader = new TTFLoader();
ttfLoader.load("assets/fonts/JetBrainsMono-SemiBold.ttf",(json)=>{


   jetFont = fontLoader.parse(json);
   console.log("*font voice*---im in");
   createText("projects", purplePlanet.planet.scene, new THREE.Vector3(1.8,2,-.6));
   createText("MUSIC", tigerPlanet.planet.scene, new THREE.Vector3(-2.4,-1,0) );
   createText("CONTACT", maroonPlanet.planet.scene, new THREE.Vector3(2,-2,4))
  //  createText("howdy", blueMoon.planet.scene, new THREE.Vector3(-3,0,-1))
  createText("about me", monkey.planet.scene, new THREE.Vector3(-1,-.5,0.77))


 

})
function createText(text, planetScene,offset = new THREE.Vector3(0, 2, 0)) {
  if (!jetFont) {
    console.error("Font not loaded yet!");
    return;
  }

  // Create the geometry for the text
  const textGeometry = new TextGeometry(text, {
    font: jetFont,
    size: 0.28,  // Size of the text
    depth: 0.01  // Depth of the text
  
  });

  const textMaterial = new THREE.MeshBasicMaterial({  color: 0xFFD700   });

  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  const planetPosition = planetScene.position;
  textMesh.position.set(
    planetPosition.x + offset.x ,        
    planetPosition.y + offset.y,     
    planetPosition.z + offset.z        
  );

  planetScene.add(textMesh);
  console.log(`Text placed at: ${textMesh.position.x}, ${textMesh.position.y}, ${textMesh.position.z}, ${textMesh.name}`);
}

function moveCamera(targetPlanet){
  const planetPosition = targetPlanet.position.clone()
  const targetCameraPosition = targetPlanet.close().add(new THREE.Vector3(0,0,5));

  
}
  


function onMouseMove(event){
  //normalize mouse inputs
  mouse.x =(event.clientX/window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY /window.innerHeight) *2 +1;

}




function animate() {

  raycaster.setFromCamera(mouse, camera)
	renderer.render( scene, camera );
  // newTorusMesh.rotation.y += 0.01;
  // torus.rotation.z += 0.0019;
  //MOTION
  newTorusMesh.rotation.z += 0.0006;
firstRing.rotation.z += 0.0007;  
sixthRing.rotation.z += 0.0012;
halfRestRing.rotation.z += 0.0005;  
dotHalfRing.rotation.z +=  - 0.0010;
orbitObject.rotation.y += 0.0019;  
orbitObject.rotation.x += 0.0019;  

//mouse
raycaster.setFromCamera(mouse, camera);
const intersects = raycaster.intersectObjects(scene.children);
for (let i = 0; i < intersects.length; i++) {
    const object = intersects[i].object;
    // console.log(object)
    // gsap.to(object.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.2 });
  }
  // scene.children.forEach((obj) => {
  //   if (!intersects.some(intersect => intersect.object === obj)) {
  //     // gsap.to(obj.scale, { x: 1, y: 1, z: 1, duration: 0.2 });
  //   }
  // });


}
renderer.setAnimationLoop( animate );



