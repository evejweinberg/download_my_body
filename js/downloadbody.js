if (!Detector.webgl) Detector.addGetWebGLMessage();

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
console.log(check)
  return check;
};

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
