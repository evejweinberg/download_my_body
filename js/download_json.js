if (!Detector.webgl) Detector.addGetWebGLMessage();

// window.mobilecheck = function() {
//   var check = false;
//   (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
// console.log(check)
//   return check;
// };

var container, stats;

var camera, scene, renderer, objects, controls;
var particleLight;
var joe, matt;
var model_scale = 0.046;
var cameraZstart = 24;
var cameraYstart = 14;
var type;
var textSize = .4;
var typeRotatio = .01
var Typescalar;
var typeLeft = -8;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var centerOffset;
var spinning = true;
var spinSpeed = .01
var group;

var clock = new THREE.Clock();

var texture = new THREE.Texture();

//Init the scene so we can push shit to it?
window.onload = function(){
  init();
};

//Loading manager - decides when to render the scene in onProgress under the loaders
var loadingManager = new THREE.LoadingManager();

/////////////////////////////////////
//Joe model call the global loader///
/////////////////////////////////////
var loader = new THREE.ObjectLoader(loadingManager);

////////////////
//Joe model ///
////////////////

loader.load('models/joeB.json', function( object ){

      //Assign global varialbe to matt object
      joe = object;

      //Building a new material (even though you can just have one in the json file and use it)
      var material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: THREE.ImageUtils.loadTexture('./models/textures/Joe_Skeletal_Mesh.jpg')
      })

      //Just so I can see, you can get rid of this
      joe.scale.set(5,5,5);

      joe.position.z = 6
      joe.position.y = 1
      joe.rotation.y = 60
      // joe.rotation.z = -1.57

      //Since you decided to use the object loader you need to find the child element
      //material and re-assign it or rewrite the json - you should know both!
      joe.traverse(function (child) {

            if (child instanceof THREE.Mesh) {

                child.material = material;

            }

        });


      //Push the mesh to the scene
      scene.add( joe );

        //Animating
           joe.traverse(function(child) {

              if (child instanceof THREE.SkinnedMesh) {

                //console.log(child.geometry.animations[0]);

                //var animation = new THREE.Animation(matt, child.geometry.animations[0]);

                // animation.play();

           }

        });

  });





////////////////
//Matt model ///
////////////////

loader.load('models/matt-model.json', function( object ){

      //Assign global varialbe to matt object
      matt = object;

      //Building a new material (even though you can just have one in the json file and use it)
      var material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: THREE.ImageUtils.loadTexture('./models/textures/kotaku.1001.jpg')
      })

      //Just so I can see, you can get rid of this
      matt.scale.set(10,10,10);

      matt.position.z = 6
      matt.position.y = 1

      //Since you decided to use the object loader you need to find the child element
      //material and re-assign it or rewrite the json - you should know both!
      matt.traverse(function (child) {

            if (child instanceof THREE.Mesh) {

                child.material = material;

            }

        });


      //Push the mesh to the scene
      scene.add( matt );

        //Animating
           matt.traverse(function(child) {

              if (child instanceof THREE.SkinnedMesh) {

                //console.log(child.geometry.animations[0]);

                //var animation = new THREE.Animation(matt, child.geometry.animations[0]);

                // animation.play();

           }

        });

  });

//Track global loading
loadingManager.onProgress = function(item, loaded, total){

  //Loading precentage pattern
  console.log(loaded / total * 100 + '%');

}

//Signify loading done
loadingManager.onLoad = function(){

  //get rid of the loading screen
  document.getElementById('loader').style.display='none';

  scene.add(group)
  // scene.add(matt)
  group.add(matt)
  // group.add(joe)
  scene.remove(joe)

  //Start redrawing when the models are done loading
  animate();

}

function init() {


  loadfont()

  container = document.createElement('div');

  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);

  camera.position.set(2, cameraYstart, cameraZstart);

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


  var lightB = new THREE.HemisphereLight( 0xcccccc, 0xffffff, .7 );
  scene.add(lightB)

  var directionalLight = new THREE.DirectionalLight( /*Math.random() * 0xffffff*/ 0xeeeeee, .7);
  directionalLight.position.x = Math.random() - 0.5;
  directionalLight.position.y = Math.random() - 0.5;
  directionalLight.position.z = Math.random() - 0.5;
  directionalLight.position.normalize();
  scene.add(directionalLight);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.sortObjects = false;
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);


  //global group name, all grid to the grop and move it down
   group = new THREE.Group();
   group.name = "infoTag";

   group.add( line )


  //  group.rotation.x = -0.16
   group.position.y = -2

  window.addEventListener('resize', onWindowResize, false);

}//init ends



function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

}



function animate() {

  // if (spinning){
    joe.rotation.y += spinSpeed
    matt.rotation.y += spinSpeed
  // }



  requestAnimationFrame(animate);

  render();
  // stats.update();

}

var clock = new THREE.Clock();

function render() {

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

  }



THREE.AnimationHandler.update(clock.getDelta());

  renderer.render(scene, camera);

}



//load font

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
    });

    type = new THREE.Mesh(textGeo, textMaterial);
    type.position.x = 0
    type.position.y = 10.5
    type.position.z = 4
    type.geometry.translate(centerOffset, centerOffsetY, 0 );

    scene.add(type);


  });
}





//side bar content // about content

  document.getElementById("x").onclick = function() {
    document.getElementById('about-tab').style.display = "none"
  };
  document.getElementById("about").onclick = function() {
    document.getElementById('about-tab').style.display = "block"

  };


//allow spinning of models

  // document.getElementById("spin").onclick = function(){
  //   if (spinning){
  //     spinning = false
  //     return;
  //   } else {
  //     spinning = true;
  //   }
  // }


//click on buttons to load different models

  document.getElementById('matt').onclick = function(){

    scene.add(matt)
    group.add(matt)
    scene.remove(joe)
    group.remove(joe)

    document.getElementById("spin").download="models/Matt_SkeletalMesh.zip";
    document.getElementById("spin").innerHTML = 'DOWNLOAD MATT'
    document.getElementById("spin").style.width = "270px"
    document.getElementById("matt").style.backgroundColor = "red"
    document.getElementById("matt").style.color = "white"
    document.getElementById("joe").style.backgroundColor = "black"
    document.getElementById("joe").style.color = "red"
  }

  document.getElementById('joe').onclick = function(){

    scene.add(joe)
    group.add(joe)
    scene.remove(matt)
    group.remove(matt)

    document.getElementById("spin").download="models/Joe_SkeletalMesh.zip";
    document.getElementById("spin").innerHTML = 'DOWNLOAD JOE'
    document.getElementById("spin").style.width = "270px"
    document.getElementById("joe").style.backgroundColor = "red"
    document.getElementById("joe").style.color = "white"
    document.getElementById("matt").style.backgroundColor = "black"
    document.getElementById("matt").style.color = "red"

  }
