'use strict';

/**
* default
**/
let scene    = null,
    camera   = null,
    renderer = null,
    controls = null,
    tokyotower  = null,
    width    = 0,
    height   = 0;

/**
* init
**/
function init() {
  width = window.innerWidth,
  height = window.innerHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 160, 1500);
  renderer = new THREE.WebGLRenderer({
    alpha: true
  });
  renderer.setPixelRatio(
    window.devicePixelRatio
  );
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  
  addLights();
  drawTokyotower();

  document.getElementById('myCanvas').appendChild(renderer.domElement);
  window.addEventListener('resize',onResize,false);
}

/**
* lights
**/
function addLights() {
  const directLight1 = new THREE.DirectionalLight(0xffffff);
  directLight1.castShadow = true;
  directLight1.position.set(0, 1, 1);
  scene.add(directLight1);
  const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
  scene.add(pointLight);
}

/**
* draw
**/
function drawTokyotower() {
  tokyotower = new Tokyotower();
  scene.add(tokyotower.group);
}

/**
* resize
**/
function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

/**
* degree
**/
function degree(degrees) {
  return degrees * (Math.PI / 180);
}

/**
* animate
**/
function animate() {
  requestAnimationFrame(animate);
  render();
}

/**
* render
**/
function render() {
  tokyotower.moveBody();
  renderer.render(scene, camera);
}

/**
* Tokyotower
**/
class Tokyotower {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(0, -20, 0);
    this.group.rotation.set(degree(0), degree(0), degree(0));
    this.wingangle = 0;
    this.bodyangle = 0;
    this.drawBody();
  }
  drawBody() {
   function Root( tga, tgb, tgc, tgd, tge, px, py, pz, rx, ry, rz, group ) {
     const branch_geometry = new THREE.TorusGeometry( tga, tgb, tgc, tgd, degree(tge) )
     const branch_material = new THREE.MeshPhongMaterial( {color: 0xf41322} );
     const branch_mesh = new THREE.Mesh( branch_geometry, branch_material );
     branch_mesh.position.set(px, py, pz);
     branch_mesh.rotation.set(degree(rx), degree(ry), degree(rz));
     group.add( branch_mesh );
   }
   Root( 600, 5, 50, 50, 40, -650,  150,    0,  0,   0, -50, this.group );
   Root( 600, 5, 50, 50, 40,  650,  150,    0,  0, 180, -50, this.group );
   Root( 600, 5, 50, 50, 40,    0,  150, -650,  0, -90, -50, this.group );
   Root( 600, 5, 50, 50, 40,    0,  150,  650,  0,  90, -50, this.group );

   Root( 120, 5, 50, 50, 180, -135, -315,  135, 135,  38, 210, this.group );
   Root( 120, 5, 50, 50, 180,  135, -315, -135, 225,  38, 150, this.group );
   Root( 120, 5, 50, 50, 180,  135, -315,  135, 135, -38, 150, this.group );
   Root( 120, 5, 50, 50, 180, -135, -315, -135, 225, -38, 210, this.group );

   function Line( px, py, pz, rx, ry, rz, width, group ) {
    const geometry = new THREE.CylinderGeometry( 5, 5, width, 32 );
    const material = new THREE.MeshPhongMaterial( {color: 0xf41322} );
    const cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.set(px, py, pz);
    cylinder.rotation.set(degree(rx), degree(ry), degree(rz));
    group.add( cylinder );
  }
  Line( 35,   0,  35, 90, 0, 45, 100, this.group );
  Line( 40, -40,  40, 90, 0, 45, 110, this.group );
  Line( 48, -80,  48, 90, 0, 45, 130, this.group );
  Line( 58, -120, 58, 90, 0, 45, 160, this.group );
  Line( 68, -160, 68, 90, 0, 45, 190, this.group );
  Line( 80, -200, 80, 90, 0, 45, 220, this.group );
  Line( 175, -240, 20, 90, 0, 45, 58, this.group );
  Line( 25, -240, 175, 90, 0, 45, 58, this.group );

  Line(-35,   0, -35,  90, 0, 45, 100, this.group );
  Line(-40, -40, -40,  90, 0, 45, 110, this.group );
  Line(-48, -80, -48,  90, 0, 45, 130, this.group );
  Line(-58, -120, -58, 90, 0, 45, 160, this.group );
  Line(-68, -160, -68, 90, 0, 45, 190, this.group );
  Line(-80, -200, -80, 90, 0, 45, 220, this.group );
  Line( -175, -240, -20, 90, 0, 45, 58, this.group );
  Line( -25, -240, -175, 90, 0, 45, 58, this.group );

  Line( -35,   0,  35, 0, -45, 90, 100, this.group );
  Line( -40, -40,  40, 0, -45, 90, 110, this.group );
  Line( -48, -80,  48, 0, -45, 90, 130, this.group );
  Line( -58, -120, 58, 0, -45, 90, 160, this.group );
  Line( -68, -160, 68, 0, -45, 90, 190, this.group );
  Line( -80, -200, 80, 0, -45, 90, 220, this.group );
  Line( -175, -240, 20, 0, -45, 90, 58, this.group );
  Line( -25, -240, 175, 0, -45, 90, 58, this.group );

  Line( 35,   0,  -35, 0, -45, 90, 100, this.group );
  Line( 40, -40,  -40, 0, -45, 90, 110, this.group );
  Line( 48, -80,  -48, 0, -45, 90, 130, this.group );
  Line( 58, -120, -58, 0, -45, 90, 160, this.group );
  Line( 68, -160, -68, 0, -45, 90, 190, this.group );
  Line( 80, -200, -80, 0, -45, 90, 220, this.group );
  Line( 175, -240, -20, 0, -45, 90, 58, this.group );
  Line( 25, -240, -175, 0, -45, 90, 58, this.group );


  const box_top = new THREE.CylinderGeometry(80, 80, 50, 8);
  const box_material = new THREE.MeshPhongMaterial({color: 0xf41322});
  const box_mesh = new THREE.Mesh(box_top, box_material);
  box_mesh.position.set(0, 70, 0);
  box_mesh.rotation.set(0, degree(20), degree(0));
  this.group.add(box_mesh);

  const floor = new THREE.CylinderGeometry(350, 350, 20, 4);
  const floor_material = new THREE.MeshPhongMaterial({color: 0xf41322});
  const floor_mesh = new THREE.Mesh(floor, floor_material);
  floor_mesh.position.set(0, -320, 0);
  floor_mesh.rotation.set(0, degree(0), degree(0));
  this.group.add(floor_mesh);



  }
  moveBody() {
    const bodyamplitude = 30;
    this.bodyangle += 0.05;
    //this.group.rotation.y += 0.025;
  }  
}

init();
animate();
