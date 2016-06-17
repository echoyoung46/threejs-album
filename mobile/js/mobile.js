//先引用THree.js

function Mobile(){

}


Mobile.prototype.init = function() {
    var loader = new THREE.ColladaLoader();
    var mesh = null, isLoadFlag = false;

    loader.load("./models/m80/m80_dae.dae", function (result) {
        var geom = result.scene.children[0].children[0].geometry;

        var texture = THREE.ImageUtils.loadTexture('./models/m80/m80_map.jpg', {}, function() {
            var mat = new THREE.MeshLambertMaterial();
            mat.map = texture;
            mesh = new THREE.Mesh(geom, mat);
            mesh.scale.set(0.3, 0.3, 0.3);
            
            isLoadFlag = true;
        });
        
    });

    if(isLoadFlag) {
        return res;
    }else{
        
    }
}

Mobile.prototype.isLoaded =  function(_para) {
    if( _para == null ) {
        return false;
    }else {
        return true;
    }
}