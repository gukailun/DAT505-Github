# DAT505-GitHub

* In this seaaion,

```javacsript
//Global variables
var scene, camera, renderer;
var geometry, material, mesh, threejs, color;

var WIDTH = window.innerWidth,
HEIGHT = window.innerHeight;

//GUI - Declare variable
var gui = null;

//Rotation converter
var de2ra = function(degree) {
  return degree*(Math.PI/180);
};

init();
render();

function init(){
  threejs = document.getElementById('threejs');

  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a renderer  ------------
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0x333F47, 1);
  renderer.shadowMap.Enabled = true;
  renderer.shadowMapSoft = true;

  threejs.appendChild(renderer.domElement);

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1 , 1000);
  camera.position.set(0, 6, 6);
  camera.lookAt(scene.position);
  scene.add(camera);

  // Create a Cube Mesh with material ---------
  geometry = new THREE.IcosahedronBufferGeometry(1, 2, 2);
  color = Math.random() * 0xffffff;

  var texture = new THREE.TextureLoader().load('textures/111.jpg');
  var material3 = new THREE.MeshBasicMaterial({map :texture });
  var material = new THREE.MeshLambertMaterial({
    //ambient: color,
    color: color,
    transparent: true
  });

  mesh = new THREE.Mesh(geometry, material3);
  mesh.position.set(0, 0, 0);
  mesh.rotation.set(0, 0, 0);
  mesh.rotation.y = de2ra(-90);
  mesh.scale.set(1.5, 1.5, 1.5);
  mesh.doubleSided = true;
  mesh.castShadow = true;

  var geometry = new THREE.TorusKnotBufferGeometry( 1,0.1, 100, 16 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  var torusKnot = new THREE.Mesh( geometry, material );
  var texture = new THREE.TextureLoader().load('textures/333.jpg');
  var material1 = new THREE.MeshBasicMaterial({map :texture });

  mesh1 = new THREE.Mesh(geometry, material1);
  mesh1.position.set(0, 0, 0);
  mesh1.rotation.set(1, 1, 1);
  mesh1.rotation.y = de2ra(-90);
  mesh1.scale.set(3, 3, 3);
  mesh1.doubleSided = true;
  mesh1.castShadow = true;

  var geometry = new THREE.ConeBufferGeometry( 50, 20, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  var cone = new THREE.Mesh( geometry, material );
  var texture = new THREE.TextureLoader().load('textures/222.jpg');
  var material2 = new THREE.MeshBasicMaterial({map :texture });

  mesh3 = new THREE.Mesh(geometry, material2);
  mesh3.position.set(0, 0, 0);
  mesh3.rotation.set(0, 0, 0);
  mesh3.rotation.y = de2ra(-90);
  mesh3.scale.set(0.01, 0.001, 8);
  mesh3.doubleSided = true;
  mesh3.castShadow = true;

  var geometry = new THREE.TorusBufferGeometry( 5, 3, 16, 100 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  var torus = new THREE.Mesh( geometry, material );
  var texture = new THREE.TextureLoader().load('textures/222.jpg');
  var material2 = new THREE.MeshBasicMaterial({map :texture });

  mesh4 = new THREE.Mesh(geometry, material2);
  mesh4.position.set(0, 0, 0);
  mesh4.rotation.set(5, 5, 5);
  mesh4.rotation.y = de2ra(-90);
  mesh4.scale.set(0.1, 0.1, 0.8);
  mesh4.doubleSided = true;
  mesh4.castShadow = true;

  var group = new THREE.Group();
  group.add( mesh );
  group.add( mesh1 );
  group.add( mesh3 );
  group.add( mesh4 );

  scene.add( group );

  scene.add(mesh);
  scene.add(mesh1);
  scene.add(mesh3);
  scene.add(mesh4);


  lightingSystem();

  //GUI - Setup the GUI controller
  var controller = new function() {
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;
    this.positionX = 0;
    this.positionY = 0;
    this.positionZ = 0;
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
    this.boxColor = color;
    //this.castShadow = true;
    this.boxOpacity = 1;
  }();

  var gui = new dat.GUI();
  var f1 = gui.addFolder('Scale');
  f1.add(controller, 'scaleX', 0.1, 5).onChange( function() {
    mesh.scale.x = (controller.scaleX);
  });
  f1.add(controller, 'scaleY', 0.1, 5).onChange( function() {
    mesh.scale.y = (controller.scaleY);
  });
  f1.add(controller, 'scaleZ', 0.1, 5).onChange( function() {
    mesh.scale.z = (controller.scaleZ);
  });

  var f2 = gui.addFolder('Position');
  f2.add(controller, 'positionX', -5, 5).onChange( function() {
    mesh.position.x = (controller.positionX);
  });
  f2.add(controller, 'positionY', -5, 5).onChange( function() {
    mesh.position.y = (controller.positionY);
  });
  f2.add(controller, 'positionZ', -5, 5).onChange( function() {
    mesh.position.z = (controller.positionZ);
  });

  var f3 = gui.addFolder('Rotation');
  f3.add(controller, 'rotationX', -180, 180).onChange( function() {
    mesh.rotation.x = de2ra(controller.rotationX);
  });
  f3.add(controller, 'rotationY', -180, 180).onChange( function() {
    mesh.rotation.y = de2ra(controller.rotationY);
  });
  f3.add(controller, 'rotationZ', -180, 180).onChange( function() {
    mesh.rotation.z = de2ra(controller.rotationZ);
  });
  gui.addColor( controller, 'boxColor', color ).onChange( function() {
    mesh.material.color.setHex( dec2hex(controller.boxColor) );
  });


  var gui = new dat.GUI();
  var f1 = gui.addFolder('Scale');
  f1.add(controller, 'scaleX', 0.1, 5).onChange( function() {
    mesh1.scale.x = (controller.scaleX);
  });
  f1.add(controller, 'scaleY', 0.1, 5).onChange( function() {
    mesh1.scale.y = (controller.scaleY);
  });
  f1.add(controller, 'scaleZ', 0.1, 5).onChange( function() {
    mesh1.scale.z = (controller.scaleZ);
  });

  var f2 = gui.addFolder('Position');
  f2.add(controller, 'positionX', -5, 5).onChange( function() {
    mesh1.position.x = (controller.positionX);
  });
  f2.add(controller, 'positionY', -5, 5).onChange( function() {
    mesh1.position.y = (controller.positionY);
  });
  f2.add(controller, 'positionZ', -5, 5).onChange( function() {
    mesh1.position.z = (controller.positionZ);
  });

  var f3 = gui.addFolder('Rotation');
  f3.add(controller, 'rotationX', -180, 180).onChange( function() {
    mesh1.rotation.x = de2ra(controller.rotationX);
  });
  f3.add(controller, 'rotationY', -180, 180).onChange( function() {
    mesh1.rotation.y = de2ra(controller.rotationY);
  });
  f3.add(controller, 'rotationZ', -180, 180).onChange( function() {
    mesh1.rotation.z = de2ra(controller.rotationZ);
  });
  gui.addColor( controller, 'boxColor', color ).onChange( function() {
    mesh1.material.color.setHex( dec2hex(controller.boxColor) );
  });



  var gui = new dat.GUI();
  var f1 = gui.addFolder('Scale');
  f1.add(controller, 'scaleX', 0.1, 5).onChange( function() {
    mesh3.scale.x = (controller.scaleX);
  });
  f1.add(controller, 'scaleY', 0.1, 5).onChange( function() {
    mesh3.scale.y = (controller.scaleY);
  });
  f1.add(controller, 'scaleZ', 0.1, 5).onChange( function() {
    mesh3.scale.z = (controller.scaleZ);
  });

  var f2 = gui.addFolder('Position');
  f2.add(controller, 'positionX', -5, 5).onChange( function() {
    mesh3.position.x = (controller.positionX);
  });
  f2.add(controller, 'positionY', -5, 5).onChange( function() {
    mesh3.position.y = (controller.positionY);
  });
  f2.add(controller, 'positionZ', -5, 5).onChange( function() {
    mesh3.position.z = (controller.positionZ);
  });

  var f3 = gui.addFolder('Rotation');
  f3.add(controller, 'rotationX', -180, 180).onChange( function() {
    mesh3.rotation.x = de2ra(controller.rotationX);
  });
  f3.add(controller, 'rotationY', -180, 180).onChange( function() {
    mesh3.rotation.y = de2ra(controller.rotationY);
  });
  f3.add(controller, 'rotationZ', -180, 180).onChange( function() {
    mesh.rotation.z = de2ra(controller.rotationZ);
  });
  gui.addColor( controller, 'boxColor', color ).onChange( function() {
    mesh3.material.color.setHex( dec2hex(controller.boxColor) );
  });

  var gui = new dat.GUI();
  var f1 = gui.addFolder('Scale');
  f1.add(controller, 'scaleX', 0.1, 5).onChange( function() {
    mesh4.scale.x = (controller.scaleX);
  });
  f1.add(controller, 'scaleY', 0.1, 5).onChange( function() {
    mesh4.scale.y = (controller.scaleY);
  });
  f1.add(controller, 'scaleZ', 0.1, 5).onChange( function() {
    mesh4.scale.z = (controller.scaleZ);
  });

  var f2 = gui.addFolder('Position');
  f2.add(controller, 'positionX', -5, 5).onChange( function() {
    mesh4.position.x = (controller.positionX);
  });
  f2.add(controller, 'positionY', -5, 5).onChange( function() {
    mesh4.position.y = (controller.positionY);
  });
  f2.add(controller, 'positionZ', -5, 5).onChange( function() {
    mesh4.position.z = (controller.positionZ);
  });

  var f3 = gui.addFolder('Rotation');
  f3.add(controller, 'rotationX', -180, 180).onChange( function() {
    mesh4.rotation.x = de2ra(controller.rotationX);
  });
  f3.add(controller, 'rotationY', -180, 180).onChange( function() {
    mesh4.rotation.y = de2ra(controller.rotationY);
  });
  f3.add(controller, 'rotationZ', -180, 180).onChange( function() {
    mesh4.rotation.z = de2ra(controller.rotationZ);
  });
  gui.addColor( controller, 'boxColor', color ).onChange( function() {
    mesh4.material.color.setHex( dec2hex(controller.boxColor) );
  });


  //gui.add( controller, 'castShadow', false ).onChange( function() {
    //mesh.castShadow = controller.castShadow;
  //});
  gui.add( controller, 'boxOpacity', 0.1, 1 ).onChange( function() {
    material.opacity = (controller.boxOpacity);
  });
}

//Color converter
function dec2hex(i) {
  var result = "0x000000";
  if (i >= 0 && i <= 15) { result = "0x00000" + i.toString(16); }
  else if (i >= 16 && i <= 255) { result = "0x0000" + i.toString(16); }
  else if (i >= 256 && i <= 4095) { result = "0x000" + i.toString(16); }
  else if (i >= 4096 && i <= 65535) { result = "0x00" + i.toString(16); }
  else if (i >= 65535 && i <= 1048575) { result = "0x0" + i.toString(16); }
  else if (i >= 1048575 ) { result = '0x' + i.toString(16); }
  if (result.length == 8){return result;}
}

// Render Loop
function render () {
  requestAnimationFrame(render);
  mesh.rotation.x += 0.01; //Continuously rotate the mesh
  mesh.rotation.y += 0.01;
  mesh1.rotation.x += 0.01; //Continuously rotate the mesh
  mesh1.rotation.y += 0.01;
  mesh3.rotation.x += 0.01; //Continuously rotate the mesh
  mesh3.rotation.y += 0.01;
  mesh4.rotation.x += 0.01; //Continuously rotate the mesh
  mesh4.rotation.y += 0.01;
  //renderer.setClearColor("#000000");
  // Render the scene
  renderer.render(scene, camera);

  rot += 0.01;

  mesh.rotation.x = rot+1; //Continuously rotate the mesh
  mesh.rotation.y = rot+1;

};

function lightingSystem(){
  var object3d  = new THREE.DirectionalLight('white', 0.15);
  object3d.position.set(6,3,9);
  object3d.name = 'Back light';
  scene.add(object3d);

  object3d = new THREE.DirectionalLight('white', 0.35);
  object3d.position.set(-6, -3, 0);
  object3d.name   = 'Key light';
  scene.add(object3d);

  object3d = new THREE.DirectionalLight('white', 0.55);
  object3d.position.set(9, 9, 6);
  object3d.name = 'Fill light';
  scene.add(object3d);

  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( 3, 30, 3 );
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 45;
  scene.add( spotLight );
}

```

* this code is designed to create a star explosion effect and to decorate the mesh with three different materials.this code also adds a console to control objects
