if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats;

var camera, scene, renderer, objects, controls;
var particleLight;
var dae;
var model_scale = 0.002;

console.log('hi, page loaded')


var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;
//load the model
loader.load('models/neutral_idle.dae', function(collada) {

  dae = collada.scene;

  dae.traverse(function(child) {

    if (child instanceof THREE.SkinnedMesh) {

      var animation = new THREE.Animation(child, child.geometry.animation);
      animation.play();

    }

  });

  dae.scale.x = dae.scale.y = dae.scale.z = model_scale;
  dae.updateMatrix();

  init();
  animate();

}, function(xhr) {
  preload()
  console.log(('progress ' + xhr.loaded / xhr.total * 100) + '% loaded')
});

function init() {
  loading = false
    clearInterval(timerId);
  document.getElementById('loader').style.display='none'

  loadfont()

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.set(2, 2, 20);

  //controls:
  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
  controls.keys = [65, 83, 68];
  controls.addEventListener('change', render);

  scene = new THREE.Scene();

  // Grid

  var size = 14,
    step = 1;

  var geometry = new THREE.Geometry();
  var material = new THREE.LineBasicMaterial({
    color: 0x303030
  });

  for (var i = -size; i <= size; i += step) {

    geometry.vertices.push(new THREE.Vector3(-size, -0.04, i));
    geometry.vertices.push(new THREE.Vector3(size, -0.04, i));

    geometry.vertices.push(new THREE.Vector3(i, -0.04, -size));
    geometry.vertices.push(new THREE.Vector3(i, -0.04, size));

  }

  var line = new THREE.LineSegments(geometry, material);
  scene.add(line);

  // Add the COLLADA

  scene.add(dae);

  particleLight = new THREE.Mesh(new THREE.SphereGeometry(4, 8, 8), new THREE.MeshBasicMaterial({
    color: 0xffffff
  }));
  scene.add(particleLight);

  // Lights

  scene.add(new THREE.AmbientLight(0xcccccc));

  var directionalLight = new THREE.DirectionalLight( /*Math.random() * 0xffffff*/ 0xeeeeee);
  directionalLight.position.x = Math.random() - 0.5;
  directionalLight.position.y = Math.random() - 0.5;
  directionalLight.position.z = Math.random() - 0.5;
  directionalLight.position.normalize();
  scene.add(directionalLight);

  var pointLight = new THREE.PointLight(0xffffff, 4);
  particleLight.add(pointLight);

  // renderer = new THREE.WebGLRenderer();
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setClearColor(0xfff4e5);
  renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.sortObjects = false;
  // container.appendChild(renderer.domElement);
  // renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  stats = new Stats();
  container.appendChild(stats.dom);

  //

  window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  controls.handleResize();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function animate() {

  requestAnimationFrame(animate);

  render();
  controls.update();
  stats.update();

}

var clock = new THREE.Clock();

function render() {
  if (loading){
    console.log('loading')
  }

  var timer = Date.now() * 0.0005;

  // camera.position.x = Math.cos(timer) * 10;
  // camera.position.y = 2;
  // camera.position.z = Math.sin(timer) * 10;

  camera.lookAt(scene.position);

  particleLight.position.x = Math.sin(timer * 4) * 3009;
  particleLight.position.y = Math.cos(timer * 5) * 4000;
  particleLight.position.z = Math.cos(timer * 4) * 3009;

  THREE.AnimationHandler.update(clock.getDelta());

  renderer.render(scene, camera);

}

function loadfont() {
  var loader = new THREE.FontLoader();

  loader.load('hel.typeface.json', function(font) {
    // console.log('font loader done')



    var textGeo = new THREE.TextGeometry("Download My Body.com", {

      font: font,

      size: 20,
      height: 1.3,
      curveSegments: 12,
      bevelThickness: 0,
      bevelSize: 0,
      bevelEnabled: true

    });

    var textMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000
    });

    var type = new THREE.Mesh(textGeo, textMaterial);
    var scalar = 0.08
    type.scale.set(scalar, scalar, scalar);
    type.position.set(-12, 5, 4);

    scene.add(type);


  });

  document.getElementById("x").onclick = function() {
    document.getElementById('about-tab').style.display = "none"
  };
  document.getElementById("about").onclick = function() {
    document.getElementById('about-tab').style.display = "block"

  };



}
