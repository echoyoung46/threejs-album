//先引用THree.js

function Mobile(){
    this.mesh = null;
}


Mobile.prototype.init = function() {
    this.mesh = 'I am a mesh';
    var loader = new THREE.ColladaLoader();
    // var mesh = null, isLoadFlag = false;

    loader.load("./models/m80/m80_dae.dae", function (result) {
        var geom = result.scene.children[0].children[0].geometry;

        var texture = THREE.ImageUtils.loadTexture('./models/m80/m80_map.jpg', {}, function() {
            var mat = new THREE.MeshLambertMaterial();
            mat.map = texture;
            this.mesh = new THREE.Mesh(geom, mat);
            this.mesh.scale.set(0.3, 0.3, 0.3);
            console.log('I am a mesh3');
        });
        
        console.log('I am a mesh2');
    });

    this.mesh = 'I am a mesh1';
}

Mobile.prototype.isLoaded =  function(_para) {
    if( _para == null ) {
        return false;
    }else {
        return true;
    }
}