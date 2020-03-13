Fishes = function(r,h,seg){
    //the fish is created with three cones
    this.mesh = new THREE.Object3D();
    this.mesh.name = "fishes";
 
    const geomHead =  new THREE.ConeGeometry( r, h*8/15, seg);
    const material = new THREE.MeshPhongMaterial({ color:new THREE.Color("rgb(255,"+ Math.floor(95 + Math.random()*100) +","+ (Math.floor(Math.random()*20))+")"),});
    const head = new THREE.Mesh(geomHead, material);
    head.castShadow = true;
    head.receiveShadow = true;
    this.mesh.add(head);
    
    const geomBody = new THREE.ConeGeometry(r, h, seg);
    const body = new THREE.Mesh(geomBody,material);
    body.rotation.x= Pi;
    body.position.y-=h*.77;
    body.castShadow= true;
    body.receiveShadow = true;
    this.mesh.add(body);

    const geomTail = new THREE.ConeGeometry(r/2, h*7/15, seg/3);
    const tail = new THREE.Mesh(geomTail,material);
    tail.position.y-=h*4/3;
    tail.castShadow = true;
    tail.receiveShadow = true;
    this.mesh.add(tail);
}