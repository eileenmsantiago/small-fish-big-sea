
class BottleContainer {

    constructor(seabedHeight) {

        this.seabedHeight = seabedHeight;
        this.numOfBottles = 10;
        this.innerR = 8;
        this.outerR = 16;
        this.rSegments = 8;
        this.tSegments = 20;
        this.number = 25;
        this.step = .003;

        // store bottles
        this.mesh = new THREE.Object3D();
        this.elements = [];
        //putting bottles around the seabed
        for (let i = 0; i < this.numOfBottles; i++) {
            const bottle = new JellyFish();
            bottle.angle = 2 * Pi * i / this.numOfBottles - Math.random() * .3;
            bottle.angleCopy = bottle.angle;
            bottle.distance = this.seabedHeight + 50 + Math.random() * 50;
            bottle.offset = Math.random() * 350;
            bottle.mesh.rotation.y = Math.random() * Pi;
            bottle.mesh.rotation.z = Math.random() * Pi;
            bottle.mesh.position.z = 110;
            bottle.mesh.position.y = bottle.offset - this.seabedHeight + Math.sin(bottle.angle) * bottle.distance;
            bottle.mesh.position.x = Math.cos(bottle.angle) * bottle.distance;
            this.mesh.add(bottle.mesh);
            this.elements.push(bottle);
        }
    }

    rotateBottle(step, scale) {
        for(let i = 0; i <this.elements.length; i++){
            const singleTrash = this.elements[i];
            singleTrash.angle+=this.step;
            singleTrash.mesh.position.y= singleTrash.offset - this.seabedHeight*.95 + Math.sin(singleTrash.angle)*(singleTrash.distance) ;
            singleTrash.mesh.position.x = Math.cos(singleTrash.angle)*(singleTrash.distance);
            singleTrash.mesh.scale.set(scale,scale,scale);
            const diffPos = whale.mesh.position.clone().sub(singleTrash.mesh.position.clone());
            const d = diffPos.length();
            if(d<2* this.outerR * params.tsize + params.jsize*4){
                crashSpeedX = 120*diffPos.x / (d);
                crashSpeedY = 120*diffPos.y / (d);
                crash = i;
            }
            if(crash == i && crashSpeedX!=0){
                singleTrash.mesh.position.y= singleTrash.offset - this.seabedHeight*.95 + Math.sin(singleTrash.angle )*(singleTrash.distance) - bottleDisplacementY/10;
                singleTrash.mesh.position.x= Math.cos(singleTrash.angle)*(singleTrash.distance) - bottleDisplacementX/5 ;
            }
        }
    };
    // hide elements 
    // hide() {
    //     for(let i = 0; i <this.elements.length; i++){
    //         if(this.elements[i].mesh.position.y<-50) this.elements[i].mesh.visible = false;
    //         else  this.elements[i].mesh.visible = true;
    //     }
    // };
}
