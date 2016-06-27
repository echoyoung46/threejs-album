var group = new THREE.Object3D(),
	scene = new THREE.Scene(),
    stats = null, camera = null, webGLRenderer = null, 
    orbitControls = null, clock = null;
    
    

function init() {
    var stats = initStats();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xcccccc, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 350;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var spotLight = new THREE.AmbientLight(0xffffff);
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
    initTriangle();

    orbitControls = new THREE.OrbitControls(camera);
    orbitControls.autoRotate = true;
    clock = new THREE.Clock();


    //视角
    // group.rotation.x = toRad(-15);
    // group.rotation.y = toRad(-15);

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

var triangleAnimation = null, lineAnimation = null;

var curveAngle = 0, curve_radius = 0.1;

var stringTopY = 10,
    stringDec = 20,
    omegaBase = 4,
    omegaInc = 0.15,
    swingWidth = 10,
    swingHeight = 10;

var render = function() {
    stats.update();

    // var delta = clock.getDelta();
    // orbitControls.update(delta);
    
    // group.rotation.x += 0.01;
    // group.rotation.y += 0.01;
    // group.position.x += 0.01;

    triangleAnimation = new Animation(group);
    triangleAnimation.rotate('y', 0.03);
    if(group.rotation.y > 15){
        triangleAnimation.rotate('y', -0.03);

        var threeChildrens = group.children;
        
        var timer = Date.now() * 0.00025;
        

        for(var i = 0; i < threeChildrens.length; i++) {
            // var xy = pendulumXY(i, timer);
            // threeChildrens[i].position.x = xy[0];
            // threeChildrens[i].position.z = xy[1];
            // console.log(xy);
            threeChildrens[i].rotation.z = 40;
        }

        // for( var i = 0; i < threeChildrens.length; i++) {
        //     lineAnimation = new Animation(group);
        //     lineAnimation.lineUp({x: 0.1, z: 0.1});
        // }

        // TweenMax.to(group, 5, {bezier:[{x:100, z:250}, {x:300, z:0}, {x:500, z:400}], ease:Power1.easeInOut});
    }
    

    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);

}

var number_of_triangle = 3,
    p_radius = 15;


var initTriangle = function() {
    for( var i = 0; i < number_of_triangle; i++ ) {
        var ang = 180 / number_of_triangle * i;
        var pos = orbitPos( p_radius, toRad(ang) );
        if( i == 0 ){
            pos.x = 0;
        }
        if( i == 1 ){
            ang += 180;
        }
        createMobile(group, {
            rotate:{x:toRad(90),y:toRad(0),z:toRad(ang)}, position:{x:pos.x,y:pos.y, z:pos.z}
        })
    }
    scene.add(group);

}



var createMobile = function (_group, _position) {
    var mobile = new Mobile();
    var animationFun = function (_obj) {
        TweenMax.from(_obj.rotation, 3, {x:toRad(-45), y:toRad(-45), z:toRad(-45), yoyo:true, repeat:0, repeatDelay:2});
        TweenMax.from(_obj.position, 3, {x:toRad(-45), y:toRad(-45), z:toRad(-45), yoyo:true, repeat:0, repeatDelay:2});
    }
    mobile.init(_group, _position, animationFun, function(){
        render();
    });
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
    x: Math.round(Math.cos(angle) * radius),
    y: Math.sin(angle) * 0,
    z: Math.round(-Math.sin(angle) * radius) + radius * Math.tan(toRad(30))
  };
}

function pendulumXY(i, t) {
    // 9800 as in 9.8 in millimeters
    // real world physics can be a bitch
    //var g = 16000
    //var b = 0.1
    //var denom = (Math.sqrt(g) + b * Math.sqrt(stringTopY))
    //var k = g / (denom * denom)
    //var stringLen = stringTopY * Math.pow(k, i)
    //return i * stringDec * i * stringDec;
    //var omega = Math.sqrt(g / stringLen)

    var stringLen = stringTopY - i * stringDec;
    var omega = omegaBase + i * omegaInc;
    var x = Math.sin(t * omega) * swingWidth;
    var z = Math.cos(t * omega) * swingWidth;
    // var y = stringTopY - Math.sqrt(stringLen * stringLen - x * x);
    return [x, z];
}

window.onload = init;