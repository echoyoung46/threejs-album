function initScene() {
    var scene = new THREE.Scene();
    
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xffffff, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnable = true;
    
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 50;
    camera.lookAt(new THREE.Vector3(10, 0, 0));
    
    document.getElementById("scene-output").appendChild(webGLRenderer.domElement);
}

function createBall() {
    
}

function init() {
    initScene();
    createBall();
}

window.onload = init;