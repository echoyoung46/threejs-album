var woolNodes = 10,
    woolSegLength = 2,
    gravity = -0.8,
    accuracy = 1;

Ball = function(){
    //material
    var redMat = new THREE.MeshLamberMaterial({
        color: 0x630d15,
        shading: THREE.FlatShading
    });
    
    var stringMat = new THREE.LineBasicMaterial({
        color: 0x630d15,
        linewidth: 3
    });
    
    this.threeGroup = new THREE.Group();
    this.ballRay = 8;
    
    this.verts = [];
    
    //string
    var stringGeom = new THREE.Geometry();
    
    for (var i = 0; i < woolNodes; i++){
        var v = new THREE.Vector3(0, -i * woolSegLength, 0);
        stringGeom.vertices.push(v);
        
        var woolV = new WoolVert();
        woolV.x = woolV.oldx = v.x;
        woolV.y = woolV.oldy = v.y;
        woolV.z = 0;
        woolV.fx = woolV.fy = 0;
        woolV.isRootNode = (i == 0);
        woolV.vertex = v;
        if(i > 0) woolV.attach(this.verts[(i - 1)]);
        this.verts.push(woolV);
    }
    
    this.string = new THREE.Line(stringGeom, stringMat);
    
    //body
    var bodyGeom = new THREE.SphereGeometry(this.ballRay, 5, 4);
    this.body = new THREE.Mesh(bodyGeom, redMat);
    this.body.position.y = -woolSegLength * woolNodes;
    
    var wireGeom = new THREE.TorusGeometry( this.ballRay, .5, 3, 10, Math.PI * 2);
    
    
}

WoolVert = function() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.oldx = 0;
    this.oldy = 0;
    this.fx = 0;
    this.fy = 0;
    this.isRootNode = false;
    this.constraints = [];
    this.vertex = null;
}

WoolVert.prototype.update = function() {
    var wind = 0;
    this.add_force(wind, gravity);
    
    nx = this.x + ((this.x - this.oldx)*.9) + this.fx;
    ny = this.y + ((this.y - this.oldy)*.9) + this.fy;
    this.oldx = this.x;
    this.oldy = this.y;
    this.x = nx;
    this.y = ny;
    
    this.vertex.x = this.x;
    this.vertex.y = this.y;
    this.vertex.z = this.z;
    
    this.fy = this.fx = 0;
}

WoolVert.prototype.attach = function(point) {
    this.constraints.push(new Constraint(this, point));
}

WoolVert.prototype.add_force = function(x, y) {
    this.fx += x;
    this.fy += y;
}

