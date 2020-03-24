

let mousePos = {x:0, y:0};
let HEIGHT = window.innerHeight;
let WIDTH = window.innerWidth;
let flag = true;
let windowHalfX = WIDTH / 2;
let windowHalfY = HEIGHT / 2;


// SPEED
let speed = {x:0, y:0};
var smoothing = 10;
const   Pi = Math.PI,
        halfPI = Math.PI / 2;
        scene = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera(60, WIDTH/HEIGHT, 1, 10000),
        renderer = new THREE.WebGLRenderer({alpha: true, antialias: true}),
        container = document.getElementById('ocean'),
        ambientLight = new THREE.AmbientLight(0x404040, .5),
        hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .1),
        shadowLight = new THREE.DirectionalLight(0xffffff, 1);

const settings={
    camera: {
        x:0,
        y:350,
        z:600,
        xRot: -Pi/32,
    },
    oNpause: false,
},
    params = {
        jsize:1,
        speed:1,
        tsize:1,
};

let water,
    jellyFishContainer,
    seabed,
    whale,
    // tentacles = [],
    jellyDisplacementX = 0,
    jellyDisplacementY = 0,
    crashSpeedX = 0,
    crashSpeedY = 0,
    crash,
    bottle,
    bottles,
    countTentacles=0;

function initScene() { //scene initialisation
    scene.fog = new THREE.Fog(0xc9f2ec, -170,900);
    camera.position.set(settings.camera.x,settings.camera.y,settings.camera.z);
    camera.rotation.x=settings.camera.xRot;
    renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMap.enabled = true;
	container.appendChild(renderer.domElement);
	window.addEventListener('resize', handleWindowResize, false);
}

function handleMouseMove(event) {
    const tx = -1 + (event.clientX / WIDTH)*2;
    const ty = 1 - (event.clientY / HEIGHT)*2;
    mousePos = {x:tx, y:ty};
}

function handleWindowResize() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

function initLights() {
    scene.add(hemisphereLight);
    scene.add(shadowLight);
    scene.add(ambientLight);
}

function createSeabed() {
    seabed = new Seabed();
    scene.add(seabed.mesh);
}

function createWater(){
    water = new Water(seabed.mesh.position.y, seabed.height);
    scene.add(water.mesh);
}

function createJellyFishContainer() {
    jellyFishContainer = new JellyfishContainer(seabed.height);
    scene.add(jellyFishContainer.mesh)
}

function createJellyFish(){
	whale = new Whale();
    scene.add(whale.mesh);
}

function createBottles(){
    bottles = new Bottles(seabed.height);
    scene.add(bottle);
}


function loop(){
    whale.moveFin();
    whale.update();
    seabed.move(params.speed);
    water.move(params.speed);
    jellyFishContainer.rotateJellyfish(.003* params.speed, params.tsize);
    jellyFishContainer.hide();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

function init(event){
    document.addEventListener('mousemove', handleMouseMove, false);
    initScene();
    initLights();
    createSeabed();
    createWater();
    createJellyFish();
    createJellyFishContainer();
    createBottles();
    loop();
}

window.addEventListener('load', init, false);

document.onkeydown = function(evt) {
    evt = evt || window.event;
    let isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
        isEscape = (evt.keyCode == 27);
    }
    if (isEscape) {
        const x = document.getElementById("overlay");
        if(settings.oNpause){
            x.style.display="none";
        }
        else{
            x.style.display="block";
        }
        settings.oNpause=!settings.oNpause;
    }
};

document.addEventListener('click', function (event) {
    if(!flag){
        clock.start();
        flag=true;
    }
 }, false);
