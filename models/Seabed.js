
class Seabed {
    constructor() {

        this.radius= 660;
        this.height= 600;
        this.rSeg=30;
        this.hSeg=20;
        this.ampR= 20;
<<<<<<< HEAD
        this.speedC= .015;
        this.color= 0xb6cbd9;
=======
        this.speedC= .01;
        this.color= 0xCEBD9B;
>>>>>>> fe69fc4af95f0db51bdf3e2a2795ee22f1552d9f
        this.rotation= .001;
        this.x= 0;
        this.y= -620;
        this.z= -50;
        this.step= .000005;

        //the seabed is rotated cylinder
        const geometry = new THREE.CylinderGeometry(this.radius, this.radius, this.height, this.rSeg, this.hSeg);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Pi / 2));
        geometry.mergeVertices();
        const length = geometry.vertices.length;
        this.bumps = [];
        for (let i = 0; i < length; i++) {
            const v = geometry.vertices[i];

            this.bumps.push({
                x: v.x,
                y: v.y,
                z: v.z,
                ang: Math.random() * Pi * 2,
                amp: Math.random() * this.ampR,
                speed: this.speedC + Math.random() * this.speedC
            });
        }

        const material = new THREE.MeshPhongMaterial({
            color: this.color,
<<<<<<< HEAD
            transparent: true,
=======
>>>>>>> fe69fc4af95f0db51bdf3e2a2795ee22f1552d9f
            opacity: 1,
            flatShading: true,
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.receiveShadow = true;
        this.mesh.position.set(this.x, this.y, this.z);
    }

    move(speed) {
        this.mesh.rotation.z += this.step * speed;
        this.moveBumps(this.rotation);
    }

    moveBumps(rotation) {
        const verts = this.mesh.geometry.vertices;
        const length = verts.length;

        for (let i=0; i<length; i++){
            const v = verts[i];
            const vprops = this.bumps[i];
            v.x = vprops.x + Math.cos(vprops.ang)*vprops.amp;
            v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;
            vprops.ang += vprops.speed;
        }

        this.mesh.geometry.verticesNeedUpdate=true;
        this.mesh.rotation.z += rotation;
    };
};
