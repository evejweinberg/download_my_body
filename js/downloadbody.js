if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats;

var camera, scene, renderer, objects, controls;
var particleLight;
var dae_joe;
var dae_matt;
var model_scale = 0.046;
var cameraZstart = 24;
var cameraYstart = 14;
var type;
var textSize = .4;
var Typescalar;
var typeLeft = -8;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var centerOffset;
var typeRotatio = .01
var spinning = false;
var group;



var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;
//load the model
loader.load('models/neutral_idle.dae', function(collada) {

  dae_joe = collada.scene;

  dae_joe.traverse(function(child) {

    if (child instanceof THREE.SkinnedMesh) {

      var animation = new THREE.Animation(child, child.geometry.animation);
      animation.play();

    }

  });

  dae_joe.scale.x = dae_joe.scale.y = dae_joe.scale.z = model_scale;
  dae_joe.updateMatrix();

  init();
  animate();

}, function(xhr) {
  // preload()
  console.log(('progress ' + xhr.loaded / xhr.total * 100) + '% loaded')
});


var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;
//load the model
loader.load('models/Matt_Skel_Mesh.dae', function(collada) {

  dae_matt = collada.scene;

  dae_matt.traverse(function(child) {

    if (child instanceof THREE.SkinnedMesh) {

      var animation = new THREE.Animation(child, child.geometry.animation);
      animation.play();

    }

  });

  dae_matt.scale.x = dae_matt.scale.y = dae_matt.scale.z = model_scale*2.1;
  dae_matt.updateMatrix();



}, function(xhr) {
  // preload()
  console.log(('progress ' + xhr.loaded / xhr.total * 100) + '% loaded')
});




//////////////////////////////////////////////////////////////

function init() {
  // loading = false
  // clearInterval(timerId);
  document.getElementById('loader').style.display='none'

  loadfont()

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.set(2, cameraYstart, cameraZstart);

  //controls:
  // controls = new THREE.TrackballControls(camera);
  // controls.rotateSpeed = 1.0;
  // controls.zoomSpeed = 1.2;
  // controls.panSpeed = 0.8;
  // controls.noZoom = false;
  // controls.noPan = false;
  // controls.staticMoving = true;
  // controls.dynamicDampingFactor = 0.3;
  // controls.keys = [65, 83, 68];
  // controls.addEventListener('change', render);

  scene = new THREE.Scene();

  // Grid

  var size = 10,
    step = 1;
    var geometry = new THREE.Geometry();
  var material = new THREE.LineBasicMaterial({
    color: 0xffffff
  });

  for (var i = -size; i <= size; i += step) {

    geometry.vertices.push(new THREE.Vector3(-size, -0.04, i));
    geometry.vertices.push(new THREE.Vector3(size, -0.04, i));

    geometry.vertices.push(new THREE.Vector3(i, -0.04, -size));
    geometry.vertices.push(new THREE.Vector3(i, -0.04, size));

  }

  var line = new THREE.LineSegments(geometry, material)
  //add grid to scene
  scene.add(line);


  particleLight = new THREE.Mesh(new THREE.SphereGeometry(4, 8, 8), new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: .5
  }));
  // scene.add(particleLight);

  // Lights

  // scene.add(new THREE.AmbientLight(0xcccccc, .3));

  var lightB = new THREE.HemisphereLight( 0xcccccc, 0xffffff, .7 );
  scene.add(lightB)

  var directionalLight = new THREE.DirectionalLight( /*Math.random() * 0xffffff*/ 0xeeeeee, .7);
  directionalLight.position.x = Math.random() - 0.5;
  directionalLight.position.y = Math.random() - 0.5;
  directionalLight.position.z = Math.random() - 0.5;
  directionalLight.position.normalize();
  scene.add(directionalLight);

  var pointLight = new THREE.PointLight(0xffffff, 4);
  // particleLight.add(pointLight);

  // renderer = new THREE.WebGLRenderer();
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.sortObjects = false;

  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // stats = new Stats();
  // container.appendChild(stats.dom);

  group = new THREE.Group();
   group.name = "infoTag";

   group.add( line )

   scene.add(group)
   group.rotation.x = -0.16
   group.position.y = -2

  window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // controls.handleResize();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function animate() {
  //  camera.rotation.y ++

  if (spinning){
    dae_joe.rotation.y +=.05
    dae_matt.rotation.y +=.05
    // console.log('spinning')
  } else {
    // console.log('not spinning')
  }



  requestAnimationFrame(animate);

  render();
  // stats.update();

}

var clock = new THREE.Clock();

function render() {
  // if (loading){
  // }

  var timer = Date.now() * 0.0005;


  camera.lookAt(scene.position);
  if (type){
    type.rotation.y += typeRotatio
    // console.log(type.rotation.y)
    if (type.rotation.y > .5){
      typeRotatio = -.006
    }
    if (type.rotation.y < -.5){
      typeRotatio = .006
    }
    type.scale.set(window.innerWidth/530,window.innerWidth/530,window.innerWidth/530)
    // type.position.set(window.innerWidth/750, 4, 4);

    // type.lookAt(camera.position)
  }

  particleLight.position.x = Math.sin(timer * 4) * 3009;
  particleLight.position.y = Math.cos(timer * 5) * 4000;
  particleLight.position.z = Math.cos(timer * 4) * 3009;

  THREE.AnimationHandler.update(clock.getDelta());

  renderer.render(scene, camera);

}

function loadfont() {
  var loader = new THREE.FontLoader();
  loader.load('hel.typeface.json', function(font) {

    var textGeo = new THREE.TextGeometry("downloadmybody.com", {

      font: font,

      size: textSize,
      height: .3,
      curveSegments: 12,
      bevelThickness: 0,
      bevelSize: 0,
      bevelEnabled: true

    });

    textGeo.computeBoundingBox();
    centerOffset = -.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
    var centerOffsetY = -.5 * ( textGeo.boundingBox.max.y - textGeo.boundingBox.min.y );
    var textMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      metalness: 0.5,
      roughness: 0.5,
      // emissive: 0x000000,
      // emissiveIntensity:.1

    });

    type = new THREE.Mesh(textGeo, textMaterial);
    type.position.x = 0
    type.position.y = 10.5
    type.position.z = 4
    type.geometry.translate(centerOffset, centerOffsetY, 0 );

    scene.add(type);


  });

  document.getElementById("x").onclick = function() {
    document.getElementById('about-tab').style.display = "none"
  };
  document.getElementById("about").onclick = function() {
    document.getElementById('about-tab').style.display = "block"

  };

  document.getElementById('spin').onclick = function(){
    if (spinning){
      spinning = false
      return;
    } else {
      spinning = true;
    }
  }

  document.getElementById('matt').onclick = function(){

    scene.add(dae_matt)
    group.add(dae_matt)
    scene.remove(dae_joe)
    group.remove(dae_joe)
    document.getElementById("download").download="models/Matt_SkeletalMesh.zip";
  }

  document.getElementById('joe').onclick = function(){

    scene.add(dae_joe)
    group.add(dae_joe)
    scene.remove(dae_matt)
    group.remove(dae_matt)
    document.getElementById("download").download="models/Joe_SkeletalMesh.zip";
  }



}
