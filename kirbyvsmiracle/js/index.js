/**
* default
**/
let scene    = null,
    camera   = null,
    renderer = null,
    controls = null,
    miracle  = null,
    clock    = null,
    width    = 0,
    height   = 0,
    smokeParticles = [];

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
  clock = new THREE.Clock();

  addLights(0,1,1);

  /**
  * smoke
  **/
  const smokeTexture  = new THREE.TextureLoader().load('img/smoke.png');
  const smokeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, opacity: 0.4, map: smokeTexture, transparent: true});
  const smokeGeo      = new THREE.PlaneGeometry(300,300);

  for (var p = 0; p < 300; p++) {
      var particle = new THREE.Mesh(smokeGeo,smokeMaterial);
      particle.position.set(Math.random()*1000-250,Math.random()*1000-250,Math.random()*2000-100);
      particle.rotation.z = Math.random() * 500;
      scene.add(particle);
      smokeParticles.push(particle);
  }
  /**
  * miracle
  **/
  drawMiracle();
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
function drawMiracle() {
  miracle = new Miracle();
  scene.add(miracle.group);
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
  let delta = clock.getDelta();
  requestAnimationFrame(animate);
  [].forEach.call(smokeParticles, sp => {
    sp.rotation.z += delta * 0.2;
  });
  render();
}

/**
* evolveSmoke
**/
function evolveSmoke() {
  var sp = smokeParticles.length;
  while(sp--) {
    smokeParticles[sp].rotation.z += (delta * 0.2);
  }
}
/**
* render
**/
function render() {
  miracle.moveBody();
  renderer.render(scene, camera);
}
/**
* Miracle
**/
class Miracle {
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
    function eye_content (px,py,pz,bpz,rx,ry,rz,group) {

      const eye_geometry =  new THREE.CylinderGeometry( 40, 40, 1, 32 );
      const eyes_material = new THREE.MeshLambertMaterial({color: 0xEE1A2B});
      const eye = new THREE.Mesh(eye_geometry, eyes_material);
      eye.position.set(px, py, pz);
      eye.rotation.set(degree(rx), degree(ry), degree(rz));
      group.add(eye);

      const eye_black_geometry = new THREE.CylinderGeometry( 20, 20, 1, 32 );
      const eye_black_material = new THREE.MeshLambertMaterial({color: 0x000000});
      const eye_black = new THREE.Mesh(eye_black_geometry, eye_black_material);
      eye_black.position.set(px, py, bpz);
      eye_black.rotation.set(degree(rx), degree(ry), degree(rz));
      group.add(eye_black);

    }
    eye_content(-9, -22, 128, 129, 100, 0, 0, this.group);
    eye_content(9, 22, -128, -129, 100, 0, 0, this.group);
    eye_content(72, 22, 106, 107, 80, 0, -30, this.group);
    eye_content(-72, -22, -106, -107, 80, 0, -30, this.group);
    eye_content(117, -24, 45, 46, 120, 0, -66, this.group);
    eye_content(-117, 24, -45, -46, 120, 0, -66, this.group);
    eye_content(123, 20, -35, -36, 120, 0, -105, this.group);
    eye_content(-123, -20, 35, 36, 120, 0, -105, this.group);
    eye_content(-82, 22, 97, 98, 75, 0, 41, this.group);
    eye_content(82, -22, -97, -98, 75, 0, 41, this.group);
    eye_content(-50, 105, 54, 55, 75, -60, 50, this.group);
    eye_content(50, -105, -54, -55, 75, -60, 50, this.group);
    eye_content(40, 105, 62, 63, 33, 0, -21, this.group);
    eye_content(-40, -105, -62, -63, 33, 0, -21, this.group);
    eye_content(75, 105, -20, -21, 100, 50, -110, this.group);
    eye_content(-75, -105, 20, 21, 100, 50, -110, this.group);
    eye_content(9, 105, -75, -76, 90, 85, -125, this.group);
    eye_content(-9, -105, 75, 76, 90, 85, -125, this.group);
    eye_content(-67, 105, -35, -36, 165, 0, -32, this.group);
    eye_content(67, -105, 35, 36, 165, 0, -32, this.group);

  }
  moveBody() {
    const bodyamplitude = 50;
    this.bodyangle += 0.05;
    this.group.rotation.y += 0.05;
    this.group.rotation.z += 0.05;
    this.group.position.y = 200 - (Math.cos(this.bodyangle) * bodyamplitude);
  }  
}

init();
animate();
