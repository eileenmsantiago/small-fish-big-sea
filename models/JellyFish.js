class JellyFish {

    constructor() {

        this.mesh = new THREE.Object3D();

        const points = [];
        points.push(new THREE.Vector2(0, -12));
        points.push(new THREE.Vector2(0.5, -12));
        points.push(new THREE.Vector2(1.5, -11.75));
        points.push(new THREE.Vector2(2.5, -11.5));
        points.push(new THREE.Vector2(3.5, -11));
        for ( let i = 0; i < 12; i+=2.25 ) points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
        points.push(new THREE.Vector2(0, 11));


        const geomBody = new THREE.LatheBufferGeometry( points , 8 ,0, Pi*2);
        const material = new THREE.MeshPhongMaterial({color:0xf7a0a0, flatShading:true, transparent:true, opacity:.8});
        const body = new THREE.Mesh(geomBody, material);
        const geomInside = new THREE.SphereGeometry(10,8,8);
        const materialIn = new THREE.MeshPhongMaterial({color:0xfF90a0, flatShading:true, side:THREE.DoubleSide});
        const inside = new THREE.Mesh(geomInside, materialIn);
        inside.scale.set(.5,.9,1);
        inside.position.x-= 5.25;
        this.mesh.add(inside);
        body.rotation.z = Pi/2;
        body.castShadow = true;
        body.receiveShadow = true;
        this.mesh.add(body);

        this.tentacles = [
            this.createTentacle(0,0),
            this.createTentacle(-4,-4),
            this.createTentacle(4,-4)
        ];

        for(let i = 0; i < 3; i++) {
            this.mesh.add(this.tentacles[i].mesh)
        }
    }

    createTentacle(y,z) {
        const tentacle = new Tentacle();
        tentacle.mesh.position.z = 4;
        tentacle.mesh.position.z+=z;
        tentacle.mesh.position.y+=y;
        tentacle.moveTentacle(this);
        return tentacle
    }

    update() {
        for(let i = 0; i < 3; i++) {
            this.tentacles[i].moveTentacle(this);
        }
    }

};

class TentaclePart {

    constructor() {
        //the tentacles are made of multiple little spheres
        const geometry = new THREE.SphereGeometry( 2, 6, 6);
        const material = new THREE.MeshPhongMaterial({color: 0xfF90a0, flatShading:true, opacity:.65, transparent:true});
        this.xpos=0;
        this.ypos=0;
        this.oldxpos=0;
        this.oldypos=0;
        this.mesh= new THREE.Mesh(geometry,material);
    }

    movePart() {
        this.oldxpos=this.mesh.position.x;
        this.oldypos=this.mesh.position.y;
        this.mesh.position.x=this.xpos;
        this.mesh.position.y=this.ypos;
    }
}

class Tentacle {

    constructor() {


        this.n = 20;
        this.offset = 5;
        this.firstOff = 10;
        this.mesh = new THREE.Object3D();
        this.parts = [];
        for (let i = 0; i < this.n; i++) {
            const part = new TentaclePart();
            part.mesh.position.x = -i * this.offset;
            part.xpos = i;
            part.ypos = part.mesh.position.y;
            this.mesh.add(part.mesh);
            this.parts.push(part);
        }
    }

    moveTentacle(target) {
        const targetX = target.mesh.position.x;
        const targetY = target.mesh.position.y;
        const t = this.parts[0];
        t.xpos = targetX-this.firstOff;
        t.ypos = targetY ;
        t.movePart();
        for(let i=1; i<this.n; i++){
            const a = this.parts[i-1];
            const b = this.parts[i];
            b.xpos = a.oldxpos-(i+1)*.3;
            b.ypos = a.oldypos;
            b.movePart();
        }
    }

}
