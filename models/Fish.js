class Fish {
    constructor() {

        this.radius = 4;
        this.height = 15;
        this.segments = 12;

        //the fish is created with three cones
        this.mesh = new THREE.Object3D();
        this.mesh.name = "fish";

        const geomHead = new THREE.ConeGeometry(this.radius, this.height * 8 / 15, this.segments);
        const material = new THREE.MeshPhongMaterial({color: new THREE.Color("rgb(255," + Math.floor(95 + Math.random() * 100) + "," + (Math.floor(Math.random() * 20)) + ")"),});
        const head = new THREE.Mesh(geomHead, material);
        head.castShadow = true;
        head.receiveShadow = true;
        this.mesh.add(head);

        const geomBody = new THREE.ConeGeometry(this.radius, this.height, this.segments);
        const body = new THREE.Mesh(geomBody, material);
        body.rotation.x = Pi;
        body.position.y -= this.height * .77;
        body.castShadow = true;
        body.receiveShadow = true;
        this.mesh.add(body);

        const geomTail = new THREE.ConeGeometry(this.radius / 2, this.height * 7 / 15, this.segments / 3);
        const tail = new THREE.Mesh(geomTail, material);
        tail.position.y -= this.height * 4 / 3;
        tail.castShadow = true;
        tail.receiveShadow = true;
        this.mesh.add(tail);
    }
}
