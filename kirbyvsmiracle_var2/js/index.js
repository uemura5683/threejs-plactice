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
    smokeParticles = [],
    objdata = 'normal';

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

  var modes = [
    'normal',
    'stone',
    'fire',
    'bom',
    'cutter',
    'nirdle',
    'ice',
    'spark',
  ];

  /**
  * smoke
  **/
  const smokeTexture  = new THREE.TextureLoader().load('https://threejs-plactice.vercel.app/kirbyvsmiracle/smoke.png');
  const smokeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, opacity: 0.4, map: smokeTexture, transparent: true});
  const smokeGeo      = new THREE.PlaneGeometry(300,300);

  for (var p = 0; p < 200; p++) {
      var particle = new THREE.Mesh(smokeGeo,smokeMaterial);
      particle.position.set(Math.random()*1000-250,Math.random()*1000-250,Math.random()*2000-100);
      particle.rotation.z = Math.random() * 500;
      scene.add(particle);
      smokeParticles.push(particle);
  }

  // GUI
  var guiCtrl = function(){
    this.mode = 'normal';
  };

  gui = new dat.GUI();
  guiObj = new guiCtrl();
  var folder = gui.addFolder('Folder');

  var modeController = gui.add(guiObj, 'mode', modes);
  modeController.onChange(function(value) {
    setCameraPosition(value);
  });

  folder.open();

  function setCameraPosition(objdata){
    drawMiracle(objdata);
  }

  /**
  * miracle
  **/
  drawMiracle(objdata);
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
function drawMiracle(data) {
  if(miracle !== null) {
    scene.remove(miracle.group);
  }
  switch(true) {
    case data == 'stone':
      miracle = new StoneMiracle();
      break;
    case data == 'fire':
      miracle = new FireMiracle();          
      break;
    case data == 'cutter':
      miracle = new CutterMiracle();
      break;    
    case data == 'spark':
      miracle = new SparkrMiracle();
      break;
    case data == 'ice':
      miracle = new IceMiracle();
      break;
    case data == 'nirdle':
      miracle = new NirdleMiracle();
      break;
    case data == 'bom':
      miracle = new BomMiracle();
      break;
    default:
      miracle = new Miracle();
      break;
  }
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

/**
* StoneMiracle
**/
class StoneMiracle {
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
    const body_geometry = new THREE.BoxGeometry(200, 200, 200 );
    const body_material = new THREE.MeshLambertMaterial({color: 0x7f2116});
    const body          = new THREE.Mesh(body_geometry, body_material);
    body.position.set(0, 0, 0);
    this.group.add(body);

  }
  moveBody() {
    const bodyamplitude = 50;
    this.bodyangle += 0.05;
    this.group.rotation.y += 0.05;
    this.group.position.y = 200 - (Math.cos(this.bodyangle) * bodyamplitude);
  }  
}

/**
* FireMiracle
**/
class FireMiracle {
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
    const body_geometry = new THREE.SphereGeometry( 160, 64, 64 );
    const body_material = new THREE.MeshLambertMaterial({color: 0xd64e00});
    const body          = new THREE.Mesh(body_geometry, body_material);
    body.position.set(0, 0, 0);
    body.rotation.set(degree(0), degree(15), degree(30));
    this.group.add(body);

  }
  moveBody() {
    const bodyamplitude = 50;
    this.bodyangle += 0.05;
    this.group.rotation.y += 0.05;
    this.group.position.y = 200 - (Math.cos(this.bodyangle) * bodyamplitude);
  }  
}

class CutterMiracle {
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
    function cutter_top(px,py,pz,rx,ry,rz,group) {
      const wing_material = new THREE.MeshPhongMaterial({color: 0x03d600})
          , shape_wing = new THREE.Shape();
            shape_wing.moveTo(-40,  140);
            shape_wing.lineTo(20,  110);
            shape_wing.lineTo(40,  80);
            shape_wing.lineTo(60,  50);
            shape_wing.lineTo(60,  -50);
            shape_wing.lineTo(40,  -80);
            shape_wing.lineTo(20,  -110);
            shape_wing.lineTo(-40,  -140);
            shape_wing.lineTo(-100, -140);
            shape_wing.lineTo(-80,  -110);
            shape_wing.lineTo(-70,  -100);
            shape_wing.lineTo(-50, -50);            
            shape_wing.lineTo(-50, 50);
            shape_wing.lineTo(-70,  100);
            shape_wing.lineTo(-80,  110);
            shape_wing.lineTo(-100,  140);
      const wing_geometry = new THREE.ShapeGeometry(shape_wing),
            wing_box = new THREE.Mesh(wing_geometry, wing_material);
      wing_box.position.set(px, py, pz);
      wing_box.rotation.set(degree(rx), degree(ry), degree(rz));
      group.add(wing_box);
    }
    cutter_top( 0, 105, 0, 0, 0, 90, this.group);

    function cutter_middle(px,py,pz,rx,ry,rz,group) {
      const wing_material = new THREE.MeshPhongMaterial({color: 0x03d600})
          , shape_wing = new THREE.Shape();
            shape_wing.moveTo(-50,  110);
            shape_wing.lineTo(-10,  90);
            shape_wing.lineTo(20,  60);
            shape_wing.lineTo(30,  25);
            shape_wing.lineTo(30,  -25);
            shape_wing.lineTo(20,  -60);
            shape_wing.lineTo(-10,  -90);
            shape_wing.lineTo(-50,  -110);
            shape_wing.lineTo(-115, -110);
            shape_wing.lineTo(-100,  -90);
            shape_wing.lineTo(-75,  -60);
            shape_wing.lineTo(-65, -25);            
            shape_wing.lineTo(-65, 25);
            shape_wing.lineTo(-75,  60);
            shape_wing.lineTo(-100,  90);
            shape_wing.lineTo(-115,  110);
      const wing_geometry = new THREE.ShapeGeometry(shape_wing),
            wing_box = new THREE.Mesh(wing_geometry, wing_material);
      wing_box.position.set(px, py, pz);
      wing_box.rotation.set(degree(rx), degree(ry), degree(rz));
      group.add(wing_box);
    }
    cutter_middle( 0, 0, 0, 0, 0, 90, this.group);

    function cutter_bottom(px,py,pz,rx,ry,rz,group) {
      const wing_material = new THREE.MeshPhongMaterial({color: 0x1a731e})
          , shape_wing = new THREE.Shape();
            shape_wing.moveTo(-30,   80);
            shape_wing.lineTo(0,     70);
            shape_wing.lineTo(20,    50);
            shape_wing.lineTo(30,    25);
            shape_wing.lineTo(30,   -25);
            shape_wing.lineTo(20,   -50);
            shape_wing.lineTo(0,    -70);
            shape_wing.lineTo(-30,  -80);
            shape_wing.lineTo(-65,  -80);
            shape_wing.lineTo(-60,  -70);
            shape_wing.lineTo(-45,  -50);
            shape_wing.lineTo(-40,  -25);            
            shape_wing.lineTo(-40,   25);
            shape_wing.lineTo(-45,   50);
            shape_wing.lineTo(-60,   70);
            shape_wing.lineTo(-65,   80);
      const wing_geometry = new THREE.ShapeGeometry(shape_wing),
            wing_box = new THREE.Mesh(wing_geometry, wing_material);
      wing_box.position.set(px, py, pz);
      wing_box.rotation.set(degree(rx), degree(ry), degree(rz));
      group.add(wing_box);
    }
    cutter_bottom( 0, -115, 0, 0, 0, 90, this.group);


  }
  moveBody() {
    const bodyamplitude = 50;
    this.bodyangle += 0.05;
    this.group.position.y = 200 - (Math.cos(this.bodyangle) * bodyamplitude);
  }  
}
class SparkrMiracle {
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
    const body_geometry = new THREE.SphereGeometry( 160, 64, 64 );
    const body_material = new THREE.MeshLambertMaterial({color: 0xffff91});
    const body          = new THREE.Mesh(body_geometry, body_material);
    body.position.set(0, 0, 0);
    this.group.add(body);
  }
  moveBody() {
    const bodyamplitude = 50;
    this.bodyangle += 0.05;
    this.group.rotation.y += 0.05;
    this.group.position.y = 200 - (Math.cos(this.bodyangle) * bodyamplitude);
  }  
}
class IceMiracle {
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
    const body_geometry = new THREE.BoxGeometry(200, 200, 200 );
    const body_material = new THREE.MeshLambertMaterial({color: 0x00ffed});
    const body          = new THREE.Mesh(body_geometry, body_material);
    body.position.set(0, 0, 0);
    this.group.add(body);

  }
  moveBody() {
    const bodyamplitude = 50;
    this.bodyangle += 0.05;
    this.group.rotation.y += 0.05;
    this.group.position.y = 200 - (Math.cos(this.bodyangle) * bodyamplitude);
  }  
}
class NirdleMiracle {
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
    const body_geometry = new THREE.SphereGeometry( 160, 64, 64 );
    const body_material = new THREE.MeshLambertMaterial({color: 0xffaa00});
    const body          = new THREE.Mesh(body_geometry, body_material);
    body.position.set(0, 0, 0);
    body.rotation.set(degree(0), degree(15), degree(30));
    this.group.add(body);

  }
  moveBody() {
    const bodyamplitude = 50;
    this.bodyangle += 0.05;
    this.group.rotation.y += 0.05;
    this.group.position.y = 200 - (Math.cos(this.bodyangle) * bodyamplitude);
  }  
}
class BomMiracle {
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
    const body_geometry = new THREE.SphereGeometry( 160, 64, 64 );
    const body_material = new THREE.MeshPhongMaterial({transparent: true,opacity: 0.5,color: 0x000000});
    const body          = new THREE.Mesh(body_geometry, body_material);
    body.position.set(0, 0, 0);
    this.group.add(body);

  }
  moveBody() {
    const bodyamplitude = 50;
    this.bodyangle += 0.05;
    this.group.rotation.y += 0.05;
    this.group.position.y = 200 - (Math.cos(this.bodyangle) * bodyamplitude);
  }  
}


init();
animate();
