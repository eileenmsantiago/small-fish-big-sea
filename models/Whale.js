class Whale {
    constructor() {

        this.displacementX = 0;
        this.displacementY = 0;
        this.y = 100;
        this.z = 110;
        this.minX= -350;
        this.maxX= 350;
        this.minY= 70;
        this.maxY= 450;

        this.mesh = new THREE.Group();

        // Body
        var bodyGeom = new THREE.BoxGeometry(130/2, 100/2, 100/2);
        var bodyMat = new THREE.MeshLambertMaterial({
            color: 0xff3333,
            shading: THREE.FlatShading
        });
        this.bodyFish = new THREE.Mesh(bodyGeom,bodyMat);

        // Tail
        var tailGeom = new THREE.CylinderGeometry(0, 80/2, 80/2, 10/2, false);
        var tailMat = new THREE.MeshLambertMaterial({
            color: 0xff8800,
            shading: THREE.FlatShading
        });

        this.tailFish = new THREE.Mesh(tailGeom, tailMat);
        this.tailFish.scale.set(.8/2, 1/2, .1/2);
        this.tailFish.position.x = -60;
        this.tailFish.rotation.z = -halfPI;

        // Fins
        this.topFish = new THREE.Mesh(tailGeom, tailMat);
        this.topFish.scale.set(.8/2,1/2,.1/2);
        this.topFish.position.x = -20/2;
        this.topFish.position.y = 60/2;
        this.topFish.rotation.z = -halfPI;

        this.sideRightFish = new THREE.Mesh(tailGeom, tailMat);
        this.sideRightFish.scale.set(.8/2,1/2,.1/2);
        this.sideRightFish.rotation.x = halfPI;
        this.sideRightFish.rotation.z = -halfPI;
        this.sideRightFish.position.x = 0;
        this.sideRightFish.position.y = -5/20;
        this.sideRightFish.position.z = -60/2;

        this.sideLeftFish = new THREE.Mesh(tailGeom, tailMat);
        this.sideLeftFish.scale.set(.8/2,1/2,.1/2);
        this.sideLeftFish.rotation.x = halfPI;
        this.sideLeftFish.rotation.z = -halfPI;
        this.sideLeftFish.position.x = 0;
        this.sideLeftFish.position.y = -50/2;
        this.sideLeftFish.position.z = 60/2;

        // Eyes
        var eyeGeom = new THREE.BoxGeometry(40/2, 40/2,5/2);
        var eyeMat = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading
        });

        this.rightEye = new THREE.Mesh(eyeGeom,eyeMat );
        this.rightEye.position.z = -60/2;
        this.rightEye.position.x = 25/2;
        this.rightEye.position.y = -10/2;

        var irisGeom = new THREE.BoxGeometry(10/2, 10/2,3/2);
        var irisMat = new THREE.MeshLambertMaterial({
            color: 0x330000,
            shading: THREE.FlatShading
        });

        this.rightIris = new THREE.Mesh(irisGeom,irisMat );
        this.rightIris.position.z = -65/2;
        this.rightIris.position.x = 35/2;
        this.rightIris.position.y = -10/2;

        this.leftEye = new THREE.Mesh(eyeGeom,eyeMat );
        this.leftEye.position.z = 60/2;
        this.leftEye.position.x = 25/2;
        this.leftEye.position.y = -10/2;

        this.leftIris = new THREE.Mesh(irisGeom,irisMat );
        this.leftIris.position.z = 65/2;
        this.leftIris.position.x = 35/2;
        this.leftIris.position.y = -10/2;

        this.mesh.add(this.bodyFish);
        this.mesh.add(this.tailFish);
        this.mesh.add(this.topFish);
        this.mesh.add(this.sideRightFish);
        this.mesh.add(this.sideLeftFish);
        this.mesh.add(this.rightEye);
        this.mesh.add(this.rightIris);
        this.mesh.add(this.leftEye);
        this.mesh.add(this.leftIris);

        this.mesh.rotation.y = -Math.PI/6;


        this.mesh.scale.set(1.35,1.5,1.5);
        this.mesh.position.y = this.y;
        this.mesh.position.z = this.z;

        this.angleFin = 0;
        this.mesh.scale.set(0.2,.2,.2);
    }

    moveFin() {
        // console.log(speed);
        var s2 = 0.4; // used for the wagging speed and color
        //
        this.angleFin += s2;
        var backTailCycle = Math.cos(this.angleFin);
        var sideFinsCycle = Math.sin(this.angleFin/5);

        this.tailFish.rotation.y = backTailCycle*.5;
        this.topFish.rotation.x = sideFinsCycle*.5;
        this.sideRightFish.rotation.x = halfPI + sideFinsCycle*.2;
        this.sideLeftFish.rotation.x = halfPI + sideFinsCycle*.2;
    }

    update() {
        this.mesh.rotation.x+=.005;
        let targetX = normalize(mousePos.x, -1, 1, this.minX, this.maxX);
        let targetY = normalize(mousePos.y, -1, 1, this.minY, this.maxY);

        this.displacementX+= crashSpeedX;
        targetX+=this.displacementX;

        this.displacementY+= crashSpeedY;
        targetY+=this.displacementY;

        this.mesh.position.y+= (targetY - this.mesh.position.y)*0.02;
        this.mesh.position.x+= (targetX - this.mesh.position.x)*0.03;
        this.mesh.rotation.z = (targetY-this.mesh.position.y)*0.0050;
        this.mesh.rotation.x = (this.mesh.position.x-targetX)*0.0025;

        crashSpeedX+= -1*crashSpeedX*0.07;
        crashSpeedY+= -1*crashSpeedY*0.07;
        this.displacementX+= -1*this.displacementX*0.3;
        this.displacementY+= -1*this.displacementY*0.3;

        this.mesh.scale.set(1, 1, 1);

    }
}
