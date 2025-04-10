// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js';
    import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/loaders/GLTFLoader.js';
import { TextGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/loaders/FontLoader.js';
import { initScene } from '/init.js';
import {Planet} from '/planets.js'
import { LoadingManager } from 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js';

///scene init, camera init, light init
let {camera, scene, renderer, controlsEnabled, controls} = initScene()
//tone setting camera
const tColor = 0xffb49b;
const tIntensity = 2.5;
const dlight = new THREE.DirectionalLight(tColor, tIntensity);
dlight.position.set(0, -1, 1);
dlight.target.position.set(10, 0, -100);
scene.add(dlight);
scene.add(dlight.target);

//loaders 
const toggleButton = document.getElementById('toggle-controls');
const loadingManager = new LoadingManager();
console.log(loadingManager)
const initialCameraPosition = camera.position.clone();
const loader = new GLTFLoader(loadingManager);
const raycaster = new THREE.Raycaster();
console.log("three.js version:", THREE.REVISION);



let planetInitData = []

const monkeyGLB = await loader.loadAsync("assets/trueHead.glb")
const monkeyScale ={x:1,y:1,z:1}
const monkeyPosition = {
  x:0, 
  y:0, 
  z:0
}
const monkey = new Planet(monkeyGLB,monkeyScale,monkeyPosition)
      scene.add(monkey.planet.scene)
     const monkeyWp = new THREE.Vector3();
      monkey.planet.scene.getWorldPosition(monkeyWp)
      planetInitData.push({object: monkey.planet.scene, worldPosition: monkeyWp})
      console.log(planetInitData)
const purplePlanetglb = await loader.loadAsync('assets/PURPLEPLANET.glb');
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
//can be made better myb
     scene.add(purplePlanet.planet.scene)
    
    const ppWp = new THREE.Vector3();
    const ppinitialRotation = purplePlanet.planet.scene.rotation.clone();
    purplePlanet.planet.scene.getWorldPosition(ppWp)
    console.log('Project planet world position:', ppWp);
    planetInitData.push({object: purplePlanet.planet.scene, worldPosition: ppWp ,initialRotation:ppinitialRotation})
    console.log("updated initial position array w purple planet",planetInitData)

const tigerPlanetGLB = await loader.loadAsync( "assets/TiggerPlanet.glb")
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
    const musicWp = new THREE.Vector3();
      tigerPlanet.planet.scene.getWorldPosition(musicWp)
      const mInitalRotation = tigerPlanet.planet.scene.rotation.clone();
      planetInitData.push({object: tigerPlanet.planet.scene, worldPosition: musicWp , initialRotation: mInitalRotation})
      console.log(planetInitData)
const orbitObject = new THREE.Object3D;
     scene.add(orbitObject)
orbitObject.position.set(-1.5,-1.5,1.3)
const blueMoonglb = await loader.loadAsync('assets/blueMoonWithDarkBlueSpots.glb');
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
const maroonPlanetglb = await loader.loadAsync("assets/maroonPlanet.glb");
const maroonPlanetScale = {
  
  x : .7,
  y : .7,
  z : .7
}
const maroonPlanetPosition = {
  // -3,3,-3
  x : -2,
  y : 3,
  z : -.37
}
const maroonPlanet =new Planet(maroonPlanetglb,maroonPlanetScale,maroonPlanetPosition)
      scene.add(maroonPlanet.planet.scene)
      console.log("DEBIGGING AGAINNNNNN" ,maroonPlanet.planet.scene)
      const contactWp = new THREE.Vector3();
      maroonPlanet.planet.scene.getWorldPosition(contactWp)
      const maroonInitialRotation = maroonPlanet.planet.scene.rotation.clone();
      planetInitData.push({object: maroonPlanet.planet.scene, worldPosition: contactWp ,initialRotation:maroonInitialRotation})
      console.log(planetInitData)
//planets^^




//points
const tLoader = new THREE.TextureLoader(loadingManager)

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
//// back rockkkk
const backRockGeo = new THREE.SphereGeometry(0.1,32,32);
// const backRockNewGeo = new THREE
const backRockMat = new THREE.MeshBasicMaterial({color: 0xffff00})
const backRock = new THREE.Mesh(backRockGeo,backRockMat);
scene.add(backRock)
backRock.visible = false;

//loading screen logic
const progressBar = document.getElementById("progress-bar");
let totalAssetsToLoad = 0;
let assetsLoaded = 0;


scene.background = new THREE.Color(0x121212); 
renderer.setClearColor(0x121212, 1);


let currentColorIndex = 0;
const colors = [
  0x03042E,  // Space Blue 
  0x000000,  // black
  0x76697E,  // brightwhite
  0xF4E1C1,   // sheetmusic
  0x121212, //charcoal gray
    0x1D1B47,//dark purpleeeeeee
    0xa0d8a0, //greeenn
    0xb4dbf2,//some blue i think
    0xf1b5c1,// pinkkkk
];

function toggleBackgroundColor() {
  // reset if it exceeds the length of the array
  currentColorIndex = (currentColorIndex + 1) % colors.length;

  const newColor = colors[currentColorIndex];

  scene.background = new THREE.Color(newColor);

  renderer.setClearColor(newColor, .7);  // Full opacity ---changed to .7 for style
}
loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
  totalAssetsToLoad = itemsTotal; 
  console.log('Loading started. Total assets to load:', totalAssetsToLoad);
  document.body.style.overflow = 'hidden'; // Disable scroll
  progressBarContainer.style.display = 'flex'; 
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  const progress = (itemsLoaded / itemsTotal) * 100;
  progressBar.value = progress;
  console.log(`Loading: ${progress}% - Loaded ${itemsLoaded} of ${itemsTotal}`);
};


const progressBarContainer = document.querySelector('.progress-bar-container');
loadingManager.onLoad = function () {
  console.log('All assets loaded');
  console.log("ok")
  progressBarContainer.style.display = 'none';
 
  
  renderer.setSize( window.innerWidth, window.innerHeight );
};



//moving planets
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
// toggleButton.addEventListener('click', function() {
//   // Toggle the OrbitControls enabled state
//   controlsEnabled = !controlsEnabled;
//   controls.enabled = controlsEnabled;  // Update OrbitControls based on the new state
  
//   console.log(`OrbitControls ${controlsEnabled ? 'enabled' : 'disabled'}`);
// });


///mouse things
// document.addEventListener("mousedown", onMouseClick)
   window.addEventListener('click', onMouseOrTouch, false);
window.addEventListener('click', onRockClick, false);
window.addEventListener('touchstart', onRockClick, false);
window.addEventListener('touchstart', onMouseOrTouch, false);
// window.addEventListener('click', onMouseClick, false);

        function onMouseClick(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            
  raycaster.setFromCamera(mouse,camera);

            const intersects = raycaster.intersectObjects(scene.children);
            for (let i = 0; i < intersects.length; i++) {
                const object = intersects[i].object;
                console.log(object)
               
            }
        }
const fontLoader = new FontLoader(loadingManager);
let jetFont
const ttfLoader = new TTFLoader(loadingManager);
ttfLoader.load("assets/fonts/JetBrainsMono-SemiBold.ttf",(json)=>{


   jetFont = fontLoader.parse(json);
   console.log("*font voice*---im in");
   createText("projects", purplePlanet.planet.scene, new THREE.Vector3(1.8,2,-.6));
   createText("MUSIC", tigerPlanet.planet.scene, new THREE.Vector3(-2.4,-1,0) );
   createText("CONTACT", maroonPlanet.planet.scene, new THREE.Vector3(2,-3,1.8))
  //  createText("howdy", blueMoon.planet.scene, new THREE.Vector3(-3,0,-1))
  createText("about me", monkey.planet.scene, new THREE.Vector3(-1,-1,0.77))

  createBackText();

 

})
function createBackText() {
  const backGeometry = new TextGeometry("BACK <<<<", {
    font: jetFont,   
    size: 0.07,       
    depth:0.02
  });

  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD700 });  // Gold color
  const backTextMesh = new THREE.Mesh(backGeometry, textMaterial);


  backTextMesh.position.set(-.2, 0.2, 0);  

  backRock.add(backTextMesh);
}
function createText(text, planetScene,offset = new THREE.Vector3(0, 2, 0)) {
  if (!jetFont) {
    console.error("Font not loaded yet!");
    return;
  }

function moveText(planetText){

  planetText = maroonPlanet.planet.scene
  console.log(planetText)

}

  // Create the geometry for the text
  const textGeometry = new TextGeometry(text, {
    font: jetFont,
    size: 0.28, 
    depth: 0.01  
  
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


  
//HEAD
const headCamLookAt = new THREE.Vector3(0, 2.5, -4.7)
const headCamEnd = new THREE.Vector3( 0,4,.7)
const headBaclRockPos = new THREE.Vector3( -1.57, 5.3, -4)
const headEndPos = new THREE.Vector3( 0, 4.5, -4) 
const headOffset = new THREE.Vector3(0,0,0)


///projectCamlookat storage lol 0.591670062331277,5.406932019368488,-1.0774300067032505
const projectCamLookAt = new THREE.Vector3(2.5669673011128603, 
  3,
  -1.700849382757599)
///heald prokect cam end 2.3477631473771123, 1.4765293806729867, 3.240691339724009-----BEST ONE SO FAR---- 2.1579061291178214,  0.9170801420241994, 1.2498683907279364
const projectCamEnd = new THREE.Vector3(  2.197789476858504,  1.1201647000000012, 0.9621730551811336)
const projectBaclRockPos = new THREE.Vector3(1.0791670062331277,  5.06932019368488, -1.0774300067032505)
//held porjectEndPos 3.082323201479494,  3.854308316854188, -1.08998659916984442--- 0.5669673011128603, 2.0157311506661073,-3.700849382757599
const projectEndPos = new THREE.Vector3( 3.669673011128603, 
  5,
  -1.700849382757599) 
const purpleOffset = new THREE.Vector3(0,0,0)


//------PROJECT PLANET MOVESTATS
//projectCamlookat storage lol 0.591670062331277,5.406932019368488,-1.0774300067032505
const gomuCamLookAt = new THREE.Vector3(-1.7326927573614003,  -0.554746152235827,  -4.90009448836733)
//// gomu cam end sabe/-3.3827450884620736,  -0.36571909988491136, 1.579889478963024----BETTER----0.9422707208646721,  -0.8493511332371845, -1.057894239940426-
const gomuCamEnd = new THREE.Vector3( -1.232968674275519,  0.192002716033421, -1.0703810353568932)

const gomuBaclRockPos = new THREE.Vector3(  -2.9326927573614003,  1.254746152235827,  -4.40009448836733)
//end pos save -2.967721792029532, 2.5324021833839303,  -2.128918451046548 
const gomuEndPos = new THREE.Vector3(  -1.9326927573614003,  0.9254746152235827,  -4.70009448836733 ) 
const gomuOffset = new THREE.Vector3(0,0,0)

//------CONTACT PLANET MOVESTATS
//projectCamlookat storage lol 0.591670062331277,5.406932019368488,-1.0774300067032505
const contactCamLookAt = new THREE.Vector3(-2.2181558775303993, 1.0331468446312923, -3.0112621993613486)
const contactCamEnd = new THREE.Vector3( -2.4233104995951678,  0.23117295724910703,  0.0485703005223230)
const contactBaclRockPos = new THREE.Vector3(-3.402181558775303993, 2.9331468446312923, -3.0112621993613486)
/// end pos save! -2.2181558775303993, 2.9331468446312923, -3.0112621993613486
const contactEndPos = new THREE.Vector3( -2.02181558775303993, 2.9331468446312923, -3.0112621993613486) 
const contactOffset = new THREE.Vector3(0,0,0)


function onMouseOrTouch(event) {
  // Normalize mouse/touch coordinates
  const x = event.clientX || event.touches[0]?.clientX; 
  const y = event.clientY || event.touches[0]?.clientY;
  
  if (!x || !y) return; 
  
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    console.log('Clicked on:', clickedObject);
    console.log('Clicked object UUID:', clickedObject.uuid);
    console.log("position of clicked obj", clickedObject.position)

    // Prevent the camera from being moved if it's already in a transition
    if (clickedObject.uuid === tigerPlanet.planet.scene.children[0].uuid) {
      controls.enabled = false;
      launchPlanet(tigerPlanet.planet.scene, projectEndPos, projectCamEnd, projectCamLookAt, projectBaclRockPos, purpleOffset, "music");
    } else if (clickedObject.uuid === maroonPlanet.planet.scene.children[0].uuid) {
        console.log("contacts!!!!! good job babyboy!!");
        controls.enabled = false;
        launchPlanet(maroonPlanet.planet.scene, contactEndPos, contactCamEnd, contactCamLookAt, contactBaclRockPos, contactOffset, "contact");
        
    } else if (clickedObject.uuid === purplePlanet.planet.scene.children[0].uuid) {
      console.log("PROJECTS!!!!! good job babyboy!!")
      controls.enabled = false;

      launchPlanet(purplePlanet.planet.scene, gomuEndPos, gomuCamEnd, gomuCamLookAt, gomuBaclRockPos, gomuOffset, "project");

    }

    else if (clickedObject.uuid === blueMoon.planet.scene.children[0].uuid) {
      controls.enabled = false;
      console.log("PROJECTS!!!!! good job babyboy!!");
      resetCamera();
      resetPlanets();
      toggleBackgroundColor();
    } else if (clickedObject.uuid === monkey.planet.scene.children[8].uuid || 
         clickedObject.uuid === monkey.planet.scene.children[6].uuid || 
         clickedObject.uuid === monkey.planet.scene.children[2].uuid || 
         clickedObject.uuid === monkey.planet.scene.children[7].uuid || 
         clickedObject.uuid === monkey.planet.scene.children[4].uuid ||

              clickedObject.name === "Cube003_1") {
      launchPlanet(monkey.planet.scene, headEndPos, headCamEnd, headCamLookAt, headBaclRockPos, headOffset, "bio");
    }

  }
}



function launchPlanet(planet,planetEndPosition,cameraEndPosition, cameraLookAt, backPointPosition, offset, section){
  controls.target.set(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z);
  console.log("Camera target set to:", cameraLookAt);  // move object to a certain plantet end point position.x.y.z etc w gsap 2.3477631473771123, y: 1.4765293806729867, z: 3.240691339724009??
  gsap.to(planet.position, {
    x: planetEndPosition.x,
    y: planetEndPosition.y,
    z: planetEndPosition.z,
    duration: 1.25,
    ease: 'power2.inOut',
    onUpdate:()=>{
      gsap.to(camera.position, {
        x:cameraEndPosition.x,
        y:cameraEndPosition.y,
        z:cameraEndPosition.z,
        duration: 1,
        ease:"power2.inOut",

      })
      // console.log(`${planet} ^^^should be planet obj,${planetEndPosition} shold be a planetPosEnd vector,${cameraEndPosition} -----cam end pos ofc, ${cameraLookAt}CAM.LOOKAT, ${backPointPosition}BACLPOINTPOS, ${offset}OFFSETTT`)
    }
    ,
    onComplete: ()=>{
      console.log("GETTING CLOSERRRRR YES <3 STARTING TO MOVE CAM");
      gsap.delayedCall(1, () => {  
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          sectionElement.style.display = 'block'; // Show the targeted section
        }
      });
      
    },    


  },
 
  )
  showBackRock(backPointPosition, offset);
  

}
function showBackRock(position, offset = new THREE.Vector3()){
  //maybe dont need to set offset like that with new launchPlanet format.
  backRock.position.set(position.x +offset.x ,position.y +offset.y  ,position.z +offset.z)
  backRock.visible = true;

  console.log( "hey im RIGHT HERERERE" ,backRock)
}
function onRockClick(event){

    ////// tryingggg 1.2.0
  const x = event.clientX || event.touches[0]?.clientX; 
  const y = event.clientY || event.touches[0]?.clientY;
  
  if (!x || !y) return; 
  
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(backRock);
    if (intersects.length > 0) {
        event.stopImmediatePropagation(); 
        resetCamera();
        resetPlanets();
        hideAllText();
        backRock.visible = false;
        controls.enabled = true;
    }


}


let hiddenElements = [];
let textTimeout;

function hideAllText() {

  const textElements = document.querySelectorAll('.overlay');
  
  textElements.forEach(element => {
      element.style.display = 'none';  
  });

 
  if (textTimeout) {
    clearTimeout(textTimeout);
  }
}

function restoreTextElements() {
  hiddenElements.forEach(item => {
    item.element.style.display = item.display || 'block'; 
  });
  hiddenElements = []; 
}

function resetPlanetRotation() {
  planetInitData.forEach(planetData => {
      const planetObject = planetData.object;
      const initialRotation = planetData.initialRotation;

      planetObject.rotation.copy(initialRotation);
  });
}


function resetCamera(){
  controls.target.set(0,0,0)
  gsap.to(camera.position, {
    x: initialCameraPosition.x,
    y: initialCameraPosition.y,
    z: initialCameraPosition.z,
    duration:2.0,
    ease:"power3.out"
  });
}
function resetPlanets(){
  planetInitData.forEach(planetData => {
    const { object, worldPosition } = planetData;
    
 
    gsap.to(object.position, {
      x: worldPosition.x,
      y: worldPosition.y,
      z: worldPosition.z,
      duration: 2,  
      ease: 'power2.inOut',  
      onUpdate: () => {
        object.updateMatrixWorld(true);
      },
      onComplete: () => {
        console.log(`${object.name} reset to initial position`);
      }
    });
  });


}

let rotationSpeed = - 0.0002; // Speed of rotation
let lastTouchY = 0; // For tracking touch scroll position

// Handle desktop scroll (wheel event)
function onWheel(event) {
    const delta = event.deltaY; // Positive for scrolling down, negative for up
    newTorusMesh.rotation.z += delta * rotationSpeed; 

}
const carousel = document.querySelector('.carousel-section');
carousel.addEventListener('wheel', (event) => {
  if (event.deltaY !== 0) {
   
    carousel.scrollLeft += event.deltaY;

  }
});
// Handle mobile scroll (touch events)
function onTouchStart(event) {
    if (event.touches.length === 1) {
        lastTouchY = event.touches[0].clientY;
    }
}
function onTouchMove(event) {
    if (event.touches.length === 1) {
        const touchY = event.touches[0].clientY;
        const delta = touchY - lastTouchY; 
        newTorusMesh.rotation.z += delta * rotationSpeed * 0.1; 
        lastTouchY = touchY; 
    }
}

if ('ontouchstart' in window) {
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
} else {
    window.addEventListener('wheel', onWheel, { passive: true });
}
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function animate() {

  renderer.render(scene, camera);
  
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
 
  newTorusMesh.rotation.z += 0.0006;
  firstRing.rotation.z += 0.0007;
  sixthRing.rotation.z += 0.0012;
  halfRestRing.rotation.z += 0.0005;
  dotHalfRing.rotation.z += -0.0010;
  orbitObject.rotation.y += 0.0019;
  orbitObject.rotation.x += 0.0019;
  if (controlsEnabled) {
    controls.update(); 

  } else {
    controls.update();
  }
  if (!controlsEnabled) {
    controls.enabled = false;  
  }
}
renderer.setAnimationLoop(animate);
console.log("CHASEDEV VER 1.1.0 tone ");


