// ========== COLORS
var colors = [
    '#dff69e', 
    '#00ceff', 
    '#002bca', 
    '#ff00e0', 
    '#3f159f', 
    '#71b583', 
    '#00a2ff'
];

var scene, 
    camera, 
    fov, 
    sea,
    aspectRatio, 
    nearFish, 
    farFish,
    renderer,
    container;

var HEIGHT, 
    WIDTH,
    windowHalfX,
    windowHalfY,
    xLimit,
    yLimit;

// FISH BODY PARTS
var fish, 
    bodyFish,
    tailFish,
    topFish,
    rightIris,
    leftIris,
    rightEye,
    leftEye;

//  FISH SPEED
// var fastColor = {r:105, g:151, b:255};
//     fishSlowColor = {r:255, g:95, b:84}; 
//     angleFin = 0; 

// var flyingParticles = [];
// var waitingParticles = [];
var maxParticlesZ = 600;

// SPEED
let speed = {x:0, y:0};
var smoothing = 10;

// MISC
let mousePos = {x:0, y:0};
var halfPI = Math.PI/2;


function init() {

    scene = new THREE.Scene();

    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    aspectRatio = WIDTH/ HEIGHT;
    fieldOfView = 60;
    nearFish = 1;
    farFish = 2000;
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearFish,
        farFish
    );
    camera.position.z = 1000;

    // renderer
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    container = document.getElementById('ocean');
    container.appendChild(renderer.domElement);

    var ang = (fieldOfView/2)* Math.PI / 180; 
    yLimit = (camera.position.z + maxParticlesZ) * Math.tan(ang); 
    xLimit = yLimit *camera.aspect;

    windowHalfX = WIDTH / 2;
    windowHalfY = HEIGHT / 2;

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', handleMouseMove, false);
}

function onWindowResize() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    windowHalfX = WIDTH / 2;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectMatrix();

    var ang = (fieldOfView/2) * Math.PI / 180;
    yLimimt = (camera.position.z + maxParticlesZ) * Math.tan(ang);
    xLimit = xLimit * camera.aspect;
}

function handleMouseMove(event) {
    mousePos = {x:event.clientX, y:event.clientY};
    updateSpeed()
}

function handleTouchStart(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
            mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
        updateSpeed();
    }
}

function handleTouchEnd(event) {
    mousePos = {x:windowHalfX, y:windowHalfY};
    updateSpeed();
}

function handleTouchMove(event) {
    if (event.touches.length == 1) {  
        event.preventDefault();
            mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
        updateSpeed();
    }
}

function updateSpeed(){
    speed.x = (mousePos.x / WIDTH)*100;
    speed.y = (mousePos.y-windowHalfY) / 10;
}

function loop() {
    fish.rotation.z += ((-speed.y/50)-fish.rotation.z)/smoothing;
    fish.rotation.x += ((-speed.y/50)-fish.rotation.x)/smoothing;
    fish.rotation.y += ((-speed.y/50)-fish.rotation.y)/smoothing;

    // make the fish move based on the mouse direction
    fish.position.x += (((mousePos.x - windowHalfX)) - fish.position.x) / smoothing;
    fish.position.y += ((-speed.y*10)-fish.position.y)/smoothing;

    // make the eyes follow the mouse direction
    rightEye.rotation.z = leftEye.rotation.z = -speed.y/150;
    rightIris.position.x = leftIris.position.y = -10 - speed.y/2;

    var s2 = speed.x/100; // used for the wagging speed and color 
    var s3 = speed.x/250; // used for the scale

    angleFin += s2;
    var backTailCycle = Math.cos(angleFin); 
    var sideFinsCycle = Math.sin(angleFin/5);

    tailFish.rotation.y = backTailCycle*.5;
    topFish.rotation.x = sideFinsCycle*.5;
    sideRightFish.rotation.x = halfPI + sideFinsCycle*.2;
    sideLeftFish.rotation.x = halfPI + sideFinsCycle*.2;

    // color changes based on speed
    var rvalue = (fishSlowColor.r + (fastColor.r - fishSlowColor.r)*s2)/255;
    var gvalue = (fishSlowColor.g + (fastColor.g - fishSlowColor.g)*s2)/255;
    var bvalue = (fishSlowColor.b + (fastColor.b - fishSlowColor.b)*s2)/255;
    bodyFish.material.color.setRGB(rvalue,gvalue,bvalue);

    // scale of fish updates depending on the speed 
    fish.scale.set(1+s3,1-s3,1-s3);

    // // particles update 
    // for (var i=0; i<flyingParticles.length; i++){
    //   var particle = flyingParticles[i];
    //   particle.rotation.y += (1/particle.scale.x) *.05;
    //   particle.rotation.x += (1/particle.scale.x) *.05;
    //   particle.rotation.z += (1/particle.scale.x) *.05;
    //   particle.position.x += -10 -(1/particle.scale.x) * speed.x *.2;
    //   particle.position.y += (1/particle.scale.x) * speed.y *.2;
    //   if (particle.position.x < -xLimit - 80){ // check if the particle is out of the field of view
    //     scene.remove(particle);
    //     waitingParticles.push(flyingParticles.splice(i,1)[0]); // recycle the particle
    //     i--;
    //   }
    // }
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

// LIGHTS
function createLights() {
    light = new THREE.HemisphereLight(0xffffff, 0xffffff, .3)
    scene.add(light);
    shadowLight = new THREE.DirectionalLight(0xffffff, .8);
    shadowLight.position.set(1, 1, 1);
    scene.add(shadowLight);
}

// function createFish() {
//     fish = new THREE.Group();

//     // Body
//     var bodyGeom = new THREE.BoxGeometry(150, 120, 120);
//     var bodyMat = new THREE.MeshLambertMaterial({
//         color: 0xff3333,
//         shading: THREE.FlatShading
//     });
//     bodyFish = new THREE.Mesh(bodyGeom,bodyMat);

//     // Tail
//     console.log(THREE.CyclinderGeometry)
//     var tailGeom = new THREE.CylinderGeometry(0, 80, 80, 10, false);
//     var tailMat = new THREE.MeshLambertMaterial({
//         color: 0xff8800,
//         shading: THREE.FlatShading
//     });

//     tailFish = new THREE.Mesh(tailGeom, tailMat);
//     tailFish.scale.set(.8, 1, .1);
//     tailFish.position.x = -60;
//     tailFish.rotation.z = -halfPI;

//     // Fins
//     topFish = new THREE.Mesh(tailGeom, tailMat);
//     topFish.scale.set(.8,1,.1);
//     topFish.position.x = -20; 
//     topFish.position.y = 60; 
//     topFish.rotation.z = -halfPI;

//     sideRightFish = new THREE.Mesh(tailGeom, tailMat);
//     sideRightFish.scale.set(.8,1,.1);
//     sideRightFish.rotation.x = halfPI;
//     sideRightFish.rotation.z = -halfPI;
//     sideRightFish.position.x = 0; 
//     sideRightFish.position.y = -50; 
//     sideRightFish.position.z = -60; 

//     sideLeftFish = new THREE.Mesh(tailGeom, tailMat);
//     sideLeftFish.scale.set(.8,1,.1);
//     sideLeftFish.rotation.x = halfPI;
//     sideLeftFish.rotation.z = -halfPI;
//     sideLeftFish.position.x = 0; 
//     sideLeftFish.position.y = -50; 
//     sideLeftFish.position.z = 60; 

//     // Eyes
//     var eyeGeom = new THREE.BoxGeometry(40, 40,5);
//     var eyeMat = new THREE.MeshLambertMaterial({
//         color: 0xffffff,
//         shading: THREE.FlatShading
//     });

//     rightEye = new THREE.Mesh(eyeGeom,eyeMat );
//     rightEye.position.z = -60;
//     rightEye.position.x = 25;
//     rightEye.position.y = -10;

//     var irisGeom = new THREE.BoxGeometry(10, 10,3);
//     var irisMat = new THREE.MeshLambertMaterial({
//         color: 0x330000,
//         shading: THREE.FlatShading
//     });

//     rightIris = new THREE.Mesh(irisGeom,irisMat );
//     rightIris.position.z = -65;
//     rightIris.position.x = 35;
//     rightIris.position.y = -10;

//     leftEye = new THREE.Mesh(eyeGeom,eyeMat );
//     leftEye.position.z = 60;
//     leftEye.position.x = 25;
//     leftEye.position.y = -10;

//     leftIris = new THREE.Mesh(irisGeom,irisMat );
//     leftIris.position.z = 65;
//     leftIris.position.x = 35;
//     leftIris.position.y = -10;

//     fish.add(bodyFish);
//     fish.add(tailFish);
//     fish.add(topFish);
//     fish.add(sideRightFish);
//     fish.add(sideLeftFish);
//     fish.add(rightEye);
//     fish.add(rightIris);
//     fish.add(leftEye);
//     fish.add(leftIris);

//     fish.rotation.y = -Math.PI/4;
//     scene.add(fish);
// }

init();
createLights();
createFish();
// Fishes();
loop();

