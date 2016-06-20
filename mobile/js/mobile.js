//先引用THree.js
function Mobile(){
    this.mesh = null;
}

/** 
 * 建立手机模型、
 * _scene 场景
 * _callback 回调函数
 */
Mobile.prototype.init = function(_obj, _callback, _pos) {
    var loader = new THREE.ColladaLoader();

    loader.load("./models/m80/m80_dae.dae", function (result) {
        var geom = result.scene.children[0].children[0].geometry;

        var texture = THREE.ImageUtils.loadTexture('./models/m80/m80_map.jpg', {}, function() {
            var mat = new THREE.MeshLambertMaterial();
            mat.map = texture;
            this.mesh = new THREE.Mesh(geom, mat);
            this.mesh.scale.set(0.5, 0.5, 0.5);
            this.mesh.position.x = _pos.position.x;
            this.mesh.position.y = _pos.position.y;
            this.mesh.position.z = _pos.position.z;
            this.mesh.rotation.x = _pos.rotate.x;
            this.mesh.rotation.y = _pos.rotate.y;
            this.mesh.rotation.z = _pos.rotate.z;
            
            TweenMax.from(this.mesh.rotation, 3, {x:toRad(-45), y:toRad(-45), z:toRad(-45), yoyo:true, repeat:-1, repeatDelay:2});
            TweenMax.from(this.mesh.position, 3, {x:toRad(-45), y:toRad(-45), z:toRad(-45), yoyo:true, repeat:-1, repeatDelay:2});

            _obj.add(this.mesh);
            _callback();
        });
        
    });
}