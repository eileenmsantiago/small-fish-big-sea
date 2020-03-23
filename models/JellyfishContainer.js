
class JellyfishContainer {

    constructor(seabedHeight) {

        this.seabedHeight = seabedHeight;
        this.numOfJellyFish = 15;
        this.innerR = 8;
        this.outerR = 16;
        this.rSegments = 8;
        this.tSegments = 20;
        this.number = 25;
        this.step = .003;

        // store jellyfish
        this.mesh = new THREE.Object3D();
        this.elements = [];
        //putting jellyfishes around the seabed
        for (let i = 0; i < this.numOfJellyFish; i++) {
            const jelly = new JellyFish();
            jelly.angle = 2 * Pi * i / this.numOfJellyFish - Math.random() * .3;
            jelly.angleCopy = jelly.angle;
            jelly.distance = this.seabedHeight + 50 + Math.random() * 50;
            jelly.offset = Math.random() * 350;
            jelly.mesh.rotation.y = Math.random() * Pi;
            jelly.mesh.rotation.z = Math.random() * Pi;
            jelly.mesh.position.z = 110;
            jelly.mesh.position.y = jelly.offset - this.seabedHeight + Math.sin(jelly.angle) * jelly.distance;
            jelly.mesh.position.x = Math.cos(jelly.angle) * jelly.distance;
            this.mesh.add(jelly.mesh);
            this.elements.push(jelly);
        }
    }

    rotateJellyfish(step, scale) {
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
                singleTrash.mesh.position.y= singleTrash.offset - this.seabedHeight*.95 + Math.sin(singleTrash.angle )*(singleTrash.distance) - jellyDisplacementY/10;
                singleTrash.mesh.position.x= Math.cos(singleTrash.angle)*(singleTrash.distance) - jellyDisplacementX/5 ;
            }
        }
    };
    // hide elements 
    hide() {
        for(let i = 0; i <this.elements.length; i++){
            if(this.elements[i].mesh.position.y<-50) this.elements[i].mesh.visible = false;
            else  this.elements[i].mesh.visible = true;
        }
    };
}
