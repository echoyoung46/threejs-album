var group = new THREE.Object3D(),
	scene = new THREE.Scene(),
    stats = null, camera = null, webGLRenderer = null, 
    orbitControls = null, clock = null;

function init() {
    var stats = initStats();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xcccccc, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    camera.position.x = 150;
    camera.position.y = 150;
    camera.position.z = 150;
    camera.lookAt(new THREE.Vector3(0, 20, 0));

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(150, 150, 150);
    spotLight.intensity = 2;
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    // var loader = new THREE.ColladaLoader();
    // var mesh = null;

    // loader.load("./models/m80/m80_dae.dae", function (result) {
    //     var geom = result.scene.children[0].children[0].geometry;

    //     var texture = THREE.ImageUtils.loadTexture('models/m80/m80_map.jpg', {}, function() {
    //         var mat = new THREE.MeshLambertMaterial();
    //         mat.map = texture;
    //         mesh = new THREE.Mesh(geom, mat);
    //         mesh.scale.set(0.3, 0.3, 0.3);
            
    //         scene.add(mesh);                
    //         render();
    //     });
    // });

    // var mobile = new Mobile();
    // mobile.init(group, pos, function(){
    //     console.log('finish mobile init');
    //     render();
    // });
    initMobileGroup();


    orbitControls = new THREE.OrbitControls(camera);
    orbitControls.autoRotate = true;
    clock = new THREE.Clock();


    //视角
    group.rotation.x = toRad(-15);
    group.rotation.y = toRad(-15);

    //保持移动
    // TweenMax.to(group.rotation, 6, { z:toRad(360), ease:Linear.easeNone, repeat:-1, overwrite:false });

    // TweenMax.from(camera.position, 10, {z:500});
}

var initStats = function() {

    stats = new Stats();
    stats.setMode(0); 

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.getElementById("Stats-output").appendChild(stats.domElement);

    return stats;
}

var render = function() {
    stats.update();

    var delta = clock.getDelta();
    orbitControls.update(delta);
    
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    // mesh.rotation.z += 0.01;

    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);

}

var number_of_mobile = 10,
    p_radius = 80;

var initMobileGroup = function() {
    for( var i = 0; i < number_of_mobile; i++ ) {
        var ang = 360 / number_of_mobile * i;
        var pos = orbitPos( p_radius, toRad(ang) );
        createMobile(group, {
            rotate:{x:toRad(90),y:toRad( (ang%180 + 90)*-1 ),z:toRad(90)}, position:{x:pos.x,y:pos.y, z:pos.z}
        })
    }
    scene.add(group);
}

var createMobile = function (_group, _position) {
    var mobile = new Mobile();
    mobile.init(_group, function(){
        render();
    }, _position);
}

/** 
 * 角度转化为弧度
 * a 角度
 */
var toRad = function(a) {
  return a * Math.PI / 180;
}

/**
 * 根据半径和角度计算物体在轨道上的位置
 * radius 轨道半径
 * angle 物体角度
 */
var orbitPos = function(radius, angle) {
  return {
    x: Math.sin(angle) * radius * 2,
    y: Math.cos(angle) * radius,
    z: Math.atan(angle) * radius
  };
}

window.onload = init;