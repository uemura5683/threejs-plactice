'use strict';

/**
* default
**/
let scene    = null,
    camera   = null,
    renderer = null,
    controls = null,
    zerotwo  = null,
    smoke    = null,
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
  camera.position.set(0, 160, 1100);
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

  addLights(0,1,1);
  drawZerotwo();

  // const smokeTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/crowd.png');
  // const smokeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: smokeTexture, transparent: true});
  // const smokeGeo = new THREE.PlaneGeometry(300,300);
  // const smokeParticles = [];

  // for (var p = 0; p < 100; p++) {
  //     var particle = new THREE.Mesh(smokeGeo,smokeMaterial);
  //     particle.position.set(Math.random()*500-250,Math.random()*500-250,Math.random()*1000-100);
  //     particle.rotation.z = Math.random() * 500;
  //     scene.add(particle);
  //     smokeParticles.push(particle);
  // }

  document.getElementById('myCanvas').appendChild(renderer.domElement);
  window.addEventListener('resize',onResize,false);
}

/**
* lights
**/
function addLights(x,y,z) {
  const directLight1 = new THREE.HemisphereLight(0xffffff, 0xcdcdcd, 1);
  scene.add(directLight1);

}

/**
* draw
**/
function drawZerotwo() {
  zerotwo = new Zerotwo();
  scene.add(zerotwo.group);
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
  //scene.rotation.y += 0.01;
  zerotwo.moveBody();
  renderer.render(scene, camera);
}

class Smoke {

}

/**
* Zerotwo
**/
class Zerotwo {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(0, 0, 0);
    this.group.rotation.set(0, 0, 0);
    this.wingangle = 0;
    this.bodyangle = 0;
    this.drawBody();
  }

  drawBody() {
    /**
    * body
    **/
    const body_geometry = new THREE.IcosahedronGeometry(160, 0 );
    const body_material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    const body          = new THREE.Mesh(body_geometry, body_material);
    body.position.set(0, 0, 0);
    body.rotation.set(degree(0), degree(15), degree(30));
    this.group.add(body);


    /**
    * eye
    **/
    const eye_geometry =  new THREE.CylinderGeometry( 40, 40, 1, 32 );
    const eyes_material = new THREE.MeshLambertMaterial({color: 0xEE1A2B});
    const eye = new THREE.Mesh(eye_geometry, eyes_material);
    eye.position.set(-9, -22, 128);
    eye.rotation.set(degree(100), degree(0), degree(0));
    this.group.add(eye);

    const eye_black_geometry = new THREE.CylinderGeometry( 20, 20, 1, 32 );
    const eye_black_material = new THREE.MeshLambertMaterial({color: 0x000000});
    const eye_black = new THREE.Mesh(eye_black_geometry, eye_black_material);
    eye_black.position.set(-9, -22, 129);
    eye_black.rotation.set(degree(100), degree(0), degree(0));
    this.group.add(eye_black);


    this.eye_back = eye.clone();
    this.eye_back.position.set(9, 22, -128);
    this.eye_back.rotation.set(degree(100), degree(0), degree(0));
    this.group.add(this.eye_back);

    this.eye_black_back = eye_black.clone();
    this.eye_black_back.position.set(9, 22, -129);
    this.eye_black_back.rotation.set(degree(100), degree(0), degree(0));
    this.group.add(this.eye_black_back);

    /**
    * eye2
    **/
    this.eye_2 = eye.clone();
    this.eye_2.position.set(72, 22, 106);
    this.eye_2.rotation.set(degree(80), degree(0), degree(-30));
    this.group.add(this.eye_2);

    this.eye_black_2 = eye_black.clone();
    this.eye_black_2.position.set(72, 22, 107);
    this.eye_black_2.rotation.set(degree(80), degree(0), degree(-30));
    this.group.add(this.eye_black_2);

    this.eye_2_back = eye.clone();
    this.eye_2_back.position.set(-72, -22, -106);
    this.eye_2_back.rotation.set(degree(80), degree(0), degree(-30));
    this.group.add(this.eye_2_back);

    this.eye_black_2_back = eye_black.clone();
    this.eye_black_2_back.position.set(-72, -22, -107);
    this.eye_black_2_back.rotation.set(degree(80), degree(0), degree(-30));
    this.group.add(this.eye_black_2_back);

    /**
    * eye3
    **/
    this.eye_3 = eye.clone();
    this.eye_3.position.set(117, -24, 45);
    this.eye_3.rotation.set(degree(120), degree(0), degree(-66));
    this.group.add(this.eye_3);

    this.eye_black_3 = eye_black.clone();
    this.eye_black_3.position.set(117, -24, 46);
    this.eye_black_3.rotation.set(degree(120), degree(0), degree(-66));
    this.group.add(this.eye_black_3);

    this.eye_3_back = eye.clone();
    this.eye_3_back.position.set(-117, 24, -45);
    this.eye_3_back.rotation.set(degree(120), degree(0), degree(-66));
    this.group.add(this.eye_3_back);

    this.eye_black_3_back = eye_black.clone();
    this.eye_black_3_back.position.set(-117, 24, -46);
    this.eye_black_3_back.rotation.set(degree(120), degree(0), degree(-66));
    this.group.add(this.eye_black_3_back);

    /**
    * eye4
    **/
    this.eye_4 = eye.clone();
    this.eye_4.position.set(123, 20, -35);
    this.eye_4.rotation.set(degree(120), degree(0), degree(-105));
    this.group.add(this.eye_4);

    this.eye_black_4 = eye_black.clone();
    this.eye_black_4.position.set(123, 20, -36);
    this.eye_black_4.rotation.set(degree(120), degree(0), degree(-105));
    this.group.add(this.eye_black_4);

    this.eye_4_back = eye.clone();
    this.eye_4_back.position.set(-123, -20, 35);
    this.eye_4_back.rotation.set(degree(120), degree(0), degree(-105));
    this.group.add(this.eye_4_back);

    this.eye_black_4_back = eye_black.clone();
    this.eye_black_4_back.position.set(-123, -20, 36);
    this.eye_black_4_back.rotation.set(degree(120), degree(0), degree(-105));
    this.group.add(this.eye_black_4_back);

    /**
    * eye5
    **/
    this.eye_5 = eye.clone();
    this.eye_5.position.set(-82, 22, 97);
    this.eye_5.rotation.set(degree(75), degree(0), degree(40));
    this.group.add(this.eye_5);

    this.eye_black_5 = eye_black.clone();
    this.eye_black_5.position.set(-82, 22, 98);
    this.eye_black_5.rotation.set(degree(76), degree(0), degree(40));
    this.group.add(this.eye_black_5);

    this.eye_5 = eye.clone();
    this.eye_5.position.set(82, -22, -97);
    this.eye_5.rotation.set(degree(75), degree(0), degree(40));
    this.group.add(this.eye_5);

    this.eye_black_5 = eye_black.clone();
    this.eye_black_5.position.set(82, -22, -98);
    this.eye_black_5.rotation.set(degree(76), degree(0), degree(40));
    this.group.add(this.eye_black_5);


    /**
    * eye6
    **/
    this.eye_6 = eye.clone();
    this.eye_6.position.set(-50, 105, 54);
    this.eye_6.rotation.set(degree(75), degree(-60), degree(50));
    this.group.add(this.eye_6);

    this.eye_black_6 = eye_black.clone();
    this.eye_black_6.position.set(-50, 105, 55);
    this.eye_black_6.rotation.set(degree(75), degree(-60), degree(50));
    this.group.add(this.eye_black_6);

    this.eye_6_back = eye.clone();
    this.eye_6_back.position.set(50, -105, -54);
    this.eye_6_back.rotation.set(degree(75), degree(-60), degree(50));
    this.group.add(this.eye_6_back);

    this.eye_black_6_back = eye_black.clone();
    this.eye_black_6_back.position.set(50, -105, -55);
    this.eye_black_6_back.rotation.set(degree(75), degree(-60), degree(50));
    this.group.add(this.eye_black_6_back);

    /**
    * eye7
    **/
    this.eye_7 = eye.clone();
    this.eye_7.position.set(40, 105, 62);
    this.eye_7.rotation.set(degree(33), degree(0), degree(-21));
    this.group.add(this.eye_7);

    this.eye_black_7 = eye_black.clone();
    this.eye_black_7.position.set(40, 105, 63);
    this.eye_black_7.rotation.set(degree(33), degree(0), degree(-21));
    this.group.add(this.eye_black_7);

    this.eye_7_back = eye.clone();
    this.eye_7_back.position.set(-40, -105, -62);
    this.eye_7_back.rotation.set(degree(33), degree(0), degree(-21));
    this.group.add(this.eye_7_back);

    this.eye_black_7_back = eye_black.clone();
    this.eye_black_7_back.position.set(-40, -105, -62);
    this.eye_black_7_back.rotation.set(degree(33), degree(0), degree(-21));
    this.group.add(this.eye_black_7_back);

    /**
    * eye8
    **/
    this.eye_8 = eye.clone();
    this.eye_8.position.set(75, 105, -20);
    this.eye_8.rotation.set(degree(100), degree(50), degree(-110));
    this.group.add(this.eye_8);

    this.eye_black_8 = eye_black.clone();
    this.eye_black_8.position.set(75, 105, -21);
    this.eye_black_8.rotation.set(degree(100), degree(50), degree(-110));
    this.group.add(this.eye_black_8);

    this.eye_8_back = eye.clone();
    this.eye_8_back.position.set(-75, -105, 20);
    this.eye_8_back.rotation.set(degree(100), degree(50), degree(-110));
    this.group.add(this.eye_8_back);

    this.eye_black_8_back = eye_black.clone();
    this.eye_black_8_back.position.set(-75, -105, 21);
    this.eye_black_8_back.rotation.set(degree(100), degree(50), degree(-110));
    this.group.add(this.eye_black_8_back);

    /**
    * eye9
    **/
    this.eye_9 = eye.clone();
    this.eye_9.position.set(9, 105, -75);
    this.eye_9.rotation.set(degree(90), degree(85), degree(-125));
    this.group.add(this.eye_9);

    this.eye_black_9 = eye_black.clone();
    this.eye_black_9.position.set(9, 105, -76);
    this.eye_black_9.rotation.set(degree(90), degree(85), degree(-125));
    this.group.add(this.eye_black_9);

    this.eye_9_back = eye.clone();
    this.eye_9_back.position.set(-9, -105, 75);
    this.eye_9_back.rotation.set(degree(90), degree(85), degree(-125));
    this.group.add(this.eye_9_back);

    this.eye_black_9_back = eye_black.clone();
    this.eye_black_9_back.position.set(-9, -105, 76);
    this.eye_black_9_back.rotation.set(degree(90), degree(85), degree(-125));
    this.group.add(this.eye_black_9_back);

    /**
    * eye10
    **/
    this.eye_10 = eye.clone();
    this.eye_10.position.set(-67, 105, -35);
    this.eye_10.rotation.set(degree(165), degree(0), degree(-32));
    this.group.add(this.eye_10);

    this.eye_black_10 = eye_black.clone();
    this.eye_black_10.position.set(-67, 105, -36);
    this.eye_black_10.rotation.set(degree(165), degree(0), degree(-32));
    this.group.add(this.eye_black_10);

    this.eye_10 = eye.clone();
    this.eye_10.position.set(67, -105, 35);
    this.eye_10.rotation.set(degree(165), degree(0), degree(-32));
    this.group.add(this.eye_10);

    this.eye_black_10 = eye_black.clone();
    this.eye_black_10.position.set(67, -105, 36);
    this.eye_black_10.rotation.set(degree(165), degree(0), degree(-32));
    this.group.add(this.eye_black_10);


  }
  moveBody() {
    const bodyamplitude = 30;
    this.bodyangle += 0.05;
    this.group.rotation.y += 0.05;
    this.group.rotation.z += 0.05;
    // this.group.position.y = 0 - (Math.cos(this.bodyangle) * bodyamplitude);
  }  
}

init();
animate();
