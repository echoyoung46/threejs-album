var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

//Material used in demo

var phongy = new THREE.MeshPhongMaterial( { 
  ambient: 0xfff000, 
  color: 0xdddddd, 
  specular: 0x009900, 
  shininess: 30, 
  shading: THREE.FlatShading 
} ); // Here is the fancy one I actually use

//This is the material I used when testing stuff (requires no lights)
var material = new THREE.MeshBasicMaterial( { 
  color: 0xffffff , 
  wireframe:true
} ); 
var group = new THREE.Object3D();//create an empty container

// Utility Functions
//  Degrees to Radians
var toRad = function(a) {
  return a * Math.PI / 180;
}
//  Calculate orbital postion based on a radius and (2d) angle
var orbitPos = function(radius, angle) {
  return {
    x: Math.sin(angle) * radius,
    y: Math.cos(angle) * radius,
    z: Math.atan(angle) * radius
  };
}

//Settings
var p_radius = 4; //Distance of the shapes' center from world center
var number_of_shapes = 30; //How many shapes to use

// Create Shape Group
var createShapeGroup = function(group, material, t) {
  var g = [
    new THREE.CubeGeometry(1,4,0.25),
    new THREE.CubeGeometry(1,1,0.25)
          ]; //Geometries used

  var b = [
    new THREE.Mesh( g[0], material ),
    new THREE.Mesh( g[0], material ),
    new THREE.Mesh( g[1], material ),
    new THREE.Mesh( g[1], material )
  ]; //Create Meshes

  var p = [
    {x:1, y:0, z:0},
    {x:-1, y:0, z:0},
    {x:0, y:1.5, z:0},
    {x:0, y:-1.5, z:0}
  ]; //Mesh offsets
	
  var g = new THREE.Object3D();//create an empty container
  for (var i = 0; i < b.length; i++ ) {
    b[i].position.x = p[i].x;
    b[i].position.y = p[i].y;
    b[i].position.z = p[i].z;
    g.add(b[i]);//Add all geometries to the container group
  }
  //Manipulate group position/rotation
  g.position = t.position;
  g.rotation.x = t.rotate.x;
  g.rotation.y = t.rotate.y;
  g.rotation.z = t.rotate.z;
  
  //Animate it in
  //GSAP users - I am pretty sure that there is a better way to animate the position/rotation, so I apologize. GSAP just makes it too easy to modify properties! 
  TweenMax.from(g.rotation, 3, {x:toRad(-45), y:toRad(-45), z:toRad(-45), yoyo:true, repeat:-1, repeatDelay:2});
  TweenMax.from(g.position, 3, {x:toRad(-45), y:toRad(-45), z:toRad(-45), yoyo:true, repeat:-1, repeatDelay:2});
  group.add(g);
  
};

for (var i = 0; i < number_of_shapes; i++) {
  var ang = 360/number_of_shapes * i;
  var pos = orbitPos( p_radius, toRad(ang) );
  createShapeGroup(group, phongy, { 
    rotate:{x:toRad(90),y:toRad( (ang%180 + 90)*-1 ),z:toRad(90)}, position:{x:pos.x,y:pos.y, z:pos.z}
  });
}	
scene.add( group );//when done, add the group to the scene

/*

	Set up Lights…
  
*/
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
var directionalLight = new THREE.DirectionalLight(0xffffff);// Spot Light
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Camera…
camera.position.z = 15;

/*

Action! Set up the renderer…

*/
function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();

/*

 Set our scene into motion!

*/

//视角
group.rotation.x = toRad(-15);
group.rotation.y = toRad(-15);

//保持移动
TweenMax.to(group.rotation, 6, { z:toRad(360), ease:Linear.easeNone, repeat:-1, overwrite:false });

TweenMax.from(camera.position, 10, {z:12});