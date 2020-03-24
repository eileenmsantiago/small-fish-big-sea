class Water {
    constructor(seabedY, seabedHeight) {

        this.groupNumber = 22;
        this.membersNumber = 20;
        this.depth= 450;
        this.step= .0015;

        this.mesh = new THREE.Object3D();
        this.objects = [];
        const step = Pi*2 / this.groupNumber;
        let angle , object , type,offset,depth;
        for(let j = 0; j < this.groupNumber; j++){
            angle = step*j;
            offset = (Pi/16)*(Math.random()*0.4 + 0.8); // put the next object on random place

            // for(let i = 0; i  < this.membersNumber; i++){
            //     type = Math.floor(Math.random() * 30); 
            //     object = new Fish();
            //     if (type < 8) {
            //         offset = (Pi / 4) * (Math.random() * 0.4 - 0.8);
            //         object.mesh.rotation.z = Math.random() * Pi * 2;
            //     } else {
            //         offset = (Pi / 8) * (Math.random() * 0.4 - 0.8);
            //         object.mesh.rotation.z = angle + offset;
            //     }
            //     object.mesh.position.z = 0-Math.random()* this.depth;
            //     this.objects.push(object);
            //     depth = seabedHeight + Math.random() * this.depth * 1.5;
            //     object.mesh.position.y = Math.sin(angle + offset) * (depth);
            //     object.mesh.position.x = Math.cos(angle + offset) * (depth);
            //     object.angle = angle + offset;
            //     this.mesh.add(object.mesh);
            // }
        }

        this.mesh.position.y = seabedY;
    }

    move(speed) {
        this.mesh.rotation.z += this.step * speed;
    }
}
