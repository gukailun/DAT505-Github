var renderer, scene, camera;
var cubes = [];
var rot_spd = [];
var rot_spd1 = [];
var rot_spd2 = [];
var rot = 0;

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
  H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(0, 55, 85);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -35; x < 40; x += 5) { // Start from -35 and sequentially add one every 5 pixels
    for (var y = -35; y < 40; y += 5) {
      var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;

      mesh.position.x = x;
      mesh.position.z = y;
    //  mesh.rotation.x = Math.random() * 2 * Math.PI;;
    //  mesh.rotation.y = Math.random() * 2 * Math.PI;;
    //  mesh.rotation.z = Math.random() * 2 * Math.PI;;
      scene.add(mesh);
      rot_spd.push(Math.random() * 0.1-0.05);
      rot_spd1.push(Math.random() * 0.1-0.02);
      rot_spd2.push(Math.random() * 0.1-0.08);
    //  var rot = 0;
      cubes.push(mesh);
    }
  }

  document.body.appendChild(renderer.domElement);
}

function drawFrame(){
  requestAnimationFrame(drawFrame);

  rot += 0.01;

  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes.forEach(function(c, i) {
    c.rotation.x += rot_spd[i];
    c.rotation.y += rot_spd1[i];
    c.rotation.z += rot_spd2[i]; //Rotate the object that is referenced in c
  });

  renderer.render(scene, camera);
}


init();
drawFrame();
