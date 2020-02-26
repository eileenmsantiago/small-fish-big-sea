// import * as THREE from 'three.module.js';

// ========== COLORS
var Colors = {
    red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0
};

window.addEventListener('load', init, false);

let 
    scene, 
    camera, 
    fov, 
    aspectRatio, 
    nearFish, 
    farFish,
    HEIGHT,
    WIDTH, 
    renderer,
    container;

function init(event) {

    // Set up the scene, the camera and the renderer
    createScene();

    // Add the lights
    createLights(); 

    // Add the objects (fish, sea, sand)
    // createFish();
    createSea();
    // createSand();

    document.addEventListener('mousemove', handleMouseMove, false);

    // Loop - render the scene on each frrame
    loop();
}

function createScene() {

    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    // Scene
    var scene = new THREE.Scene();

    // Camera
    aspectRatio = WIDTH / HEIGHT;
    fov = 60;
    nearPlane = 1; 
    farPlane = 1000; 
    var camera = new THREE.PerspectiveCamera(
        fov,
        aspectRatio,
        nearFish,
        farFish
    );

    // Camera - position
    camera.position.x = 0;
    camera.position.z = 250;
    camera.position.y = 150;

    // Create the renderer 
    var renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

    container = document.getElementById('sea');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', handleWindowResize, false);

};

function handleWindowResize() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectMatrix();
}

function handleMouseMove(event) {
    var tx = -1 + (event.clientX / WIDTH) * 2;
    var ty = 1 - (event.clientY / HEIGHT) * 2;
    mousePos = {x: tx, y: ty};
}



var hemisphereLight, shadowLight;

function createLights() {
    hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1 );

    // LIGHTS - Directional to give it perspective
    shadowLight = new THREE.DirectionalLight(0xaaaaaa,0x000000, .9)
    shadowLight.position.set(200, 250, 250);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -350;
    shadowLight.shadow.camera.right = 350;
    shadowLight.shadow.camera.top = 350;
    shadowLight.shadow.camera.bottom = -350;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    // ACTIVATE LIGHTS - Add to scene
    scene.add(hemisphereLight);
    scene.add(shadowLight);

}

// ========== SEA
Sea = function() {
    // CREATE GEOMETRY SHAPE - cyclinder
    var geometry = new THREE.CyclinderGeometry(600,600,800,70,20);

    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2))

    // MATERIAL 
    var material = new THREE.MeshPhongMaterial({
        color:Colors.blue,
        transparent: true,
        opacity: .5,
        shading: THREE.FlatShading
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.receiveShadow = true;

    var sea;

    function createSea() {
        sea = new Sea();
        sea.mesh.position.y = -50;
        scene.add(sea.mesh);
    }

}

function loop() {
    sea.mesh.rotation.z += .005;

    // update fish on each frame
    // updateFish();

    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

init();



