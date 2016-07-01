var triGroup = new THREE.Object3D(),
	lineGroup = new THREE.Object3D(),
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
    camera.position.z = 150;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var spotLight = new THREE.AmbientLight(0xffffff);
    spotLight.position.set(150, 150, 150);
    spotLight.intensity = 2;
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    initTriangle();

    orbitControls = new THREE.OrbitControls(camera);
    orbitControls.autoRotate = true;
    clock = new THREE.Clock();


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

    if( triangleAnimation != null ){
        triangleAnimation.rotate('y', 0.03);
    }

    if(triGroup.rotation.y > 15){
        initLine(triGroup.children[0]);
        triGroup.rotation.y = 0;
        triangleAnimation = null;
        scene.remove(triGroup);
    }

    if( lineAnimation != null ){
        for( var i = 0; i < lineGroup.children.length; i++ ){
            var _children = new Animation(lineGroup.children[i]);
            _children.rotate('z', -0.03-0.0005*i);
            var step = plankBob(i);
            lineGroup.children[i].position.x = step[0];
            wagCount++;
        }

        if( wagCount >= 7000 ){
            lineAnimation = null;
            scene.remove(lineGroup);
        }
    }
    

    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);

}

var bobRange = 0,
    sign = -1,
    bob_radius = 200,
    lineArr = [5,4,3,2,1,-2,-4,-8,-12,-16,-20],
    wagCount = 0;

var plankBob = function(_i) {
    // bob_radius += 0.1;
    
    if( bobRange >= 10 ){
        sign = -1;
    }else if( bobRange <= -10 ){
        sign = 1;
    }

    bobRange += 0.01 * sign;

    var x = bob_radius * lineArr[_i] * Math.sin(toRad(bobRange));
    var z = bob_radius * lineArr[_i] * Math.tan(toRad(bobRange));
    return [x,z];
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
        createMobile(triGroup, {
            rotate:{x:toRad(90),y:toRad(0),z:toRad(ang)}, position:{x:pos.x,y:pos.y, z:pos.z}
        })
    }
    scene.add(triGroup);
    triangleAnimation = new Animation(triGroup);
}

var initLine = function(_obj) {
    var lineLength = 11;

    for( var i = 0; i < lineLength; i++ ){
        var mobileCopy = _obj.clone();
        mobileCopy.position.z -= i * 100;
        lineGroup.add(mobileCopy);
    }
    
    scene.add(lineGroup);
    lineAnimation = new Animation(lineGroup);
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