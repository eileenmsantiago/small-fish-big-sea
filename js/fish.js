// FISH BODY PARTS
var fish, 
bodyFish,
tailFish,
topFish,
rightIris,
leftIris,
rightEye,
leftEye,
lipsFish;

//  FISH SPEED
var fastColor = {r:105, g:151, b:255};
    fishSlowColor = {r:255, g:95, b:84}; 
    angleFin = 0; 

function createFish() {
    fish = new THREE.Group();

    // Body
    var bodyGeom = new THREE.BoxGeometry(150, 120, 120);
    var bodyMat = new THREE.MeshLambertMaterial({
        color: 0xff3333,
        shading: THREE.FlatShading
    });
    bodyFish = new THREE.Mesh(bodyGeom,bodyMat);

    // Tail
    console.log(THREE.CyclinderGeometry)
    var tailGeom = new THREE.CylinderGeometry(0, 80, 80, 10, false);
    var tailMat = new THREE.MeshLambertMaterial({
        color: 0xff8800,
        shading: THREE.FlatShading
    });

    tailFish = new THREE.Mesh(tailGeom, tailMat);
    tailFish.scale.set(.8, 1, .1);
    tailFish.position.x = -60;
    tailFish.rotation.z = -halfPI;

    // Fins
    topFish = new THREE.Mesh(tailGeom, tailMat);
    topFish.scale.set(.8,1,.1);
    topFish.position.x = -20; 
    topFish.position.y = 60; 
    topFish.rotation.z = -halfPI;

    sideRightFish = new THREE.Mesh(tailGeom, tailMat);
    sideRightFish.scale.set(.8,1,.1);
    sideRightFish.rotation.x = halfPI;
    sideRightFish.rotation.z = -halfPI;
    sideRightFish.position.x = 0; 
    sideRightFish.position.y = -50; 
    sideRightFish.position.z = -60; 

    sideLeftFish = new THREE.Mesh(tailGeom, tailMat);
    sideLeftFish.scale.set(.8,1,.1);
    sideLeftFish.rotation.x = halfPI;
    sideLeftFish.rotation.z = -halfPI;
    sideLeftFish.position.x = 0; 
    sideLeftFish.position.y = -50; 
    sideLeftFish.position.z = 60; 

    // Eyes
    var eyeGeom = new THREE.BoxGeometry(40, 40,5);
    var eyeMat = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });

    rightEye = new THREE.Mesh(eyeGeom,eyeMat );
    rightEye.position.z = -60;
    rightEye.position.x = 25;
    rightEye.position.y = -10;

    var irisGeom = new THREE.BoxGeometry(10, 10,3);
    var irisMat = new THREE.MeshLambertMaterial({
        color: 0x330000,
        shading: THREE.FlatShading
    });

    rightIris = new THREE.Mesh(irisGeom,irisMat );
    rightIris.position.z = -65;
    rightIris.position.x = 35;
    rightIris.position.y = -10;

    leftEye = new THREE.Mesh(eyeGeom,eyeMat );
    leftEye.position.z = 60;
    leftEye.position.x = 25;
    leftEye.position.y = -10;

    leftIris = new THREE.Mesh(irisGeom,irisMat );
    leftIris.position.z = 65;
    leftIris.position.x = 35;
    leftIris.position.y = -10;

    fish.add(bodyFish);
    fish.add(tailFish);
    fish.add(topFish);
    fish.add(sideRightFish);
    fish.add(sideLeftFish);
    fish.add(rightEye);
    fish.add(rightIris);
    fish.add(leftEye);
    fish.add(leftIris);

    fish.rotation.y = -Math.PI/4;

    return fish;
    scene.add(fish);
}