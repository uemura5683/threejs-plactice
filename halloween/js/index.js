'use strict';

let scene,
    camera,
    renderer,
    controls;

let pumpkin,
    branch,
    moon,
    floor,
    fly;

let width,
    height;

function init() {
  width = window.innerWidth,
  height = window.innerHeight;
  
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 160, 1000);

  renderer = new THREE.WebGLRenderer({
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  
  addLights();
  drawPumpkin();
  drawFloor();
  drawMoon();
  drawFly();
  
  document
    .getElementById('myCanvas')
    .appendChild(renderer.domElement);

  window.addEventListener('resize', onResize, false);
}

function addLights() {
  const directLight1 = new THREE.DirectionalLight(0xE8CE88);
  directLight1.castShadow = true;
  directLight1.position.set(0, 1, 1);
  scene.add(directLight1);

  const pointLight = new THREE.PointLight(0xE8CE88, 2, 1000);
  scene.add(pointLight);
}

function drawPumpkin() {
  pumpkin = new Pumpkin();
  scene.add(pumpkin.group);
}

function drawFloor() {
  floor = new Floor();
  scene.add(floor.group);
}

function drawMoon() {
  moon = new Moon();
  scene.add(moon.group);
}

function drawFly() {
  fly = new Fly();
  scene.add(fly.group);
}

function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function rad(degrees) {
  return degrees * (Math.PI / 180);
}

function drawCylinder(materialColor, rTop, rBottom, height, radialSeg) {
  const geometry = new THREE.CylinderGeometry(rTop, rBottom, height, radialSeg);
  const material = new THREE.MeshStandardMaterial({
    color: materialColor,
    roughness: 1,
    shading: THREE.FlatShading,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  pumpkin.moveBody();
  fly.moveWings();
  renderer.render(scene, camera);
}

class Floor {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(0, -150, 0);
    this.group.rotation.set(-Math.PI/2, 0, 0);
    this.wingAngle = 0;
    this.drawBody();
  }
  drawBody() {
    const plane = new THREE.PlaneGeometry(3000, 3000, 64, 64);
    const map1 = THREE.ImageUtils.loadTexture('floor.jpg');
    const plane_box =  new THREE.Mesh( plane, new THREE.MeshLambertMaterial( { map: map1 } ) );
    this.group.add(plane_box);
  }
}

class Moon {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(100, 400, -1000);
    this.wingAngle = 0;
    this.drawBody();
  }
  drawBody() {
    const moon = new THREE.SphereBufferGeometry( 50, 50, 50 );
    const moon_texture = new THREE.TextureLoader().load('https://threejs-plactice.vercel.app/earth/img/moon.jpg');
    const moon_materials = new THREE.MeshStandardMaterial( { color: 0xffffff, map:moon_texture } );
    const moon_box_mesh = new THREE.Mesh( moon, moon_materials );
    this.group.add(moon_box_mesh);
  }
}

class Pumpkin {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(0, 0, 0);
    this.group.rotation.set(0, 0, 0);
    this.drawHead();
    this.drawBody(0,0,0, 0,0,0);
    this.drawBody(0,0,0, 0,rad(90),0);
    this.drawBody(0,0,0, 0,rad(45),0);
    this.drawBody(0,0,0, 0,rad(-45),0);
    this.draweye(60,80,  20,-30,-20, -30,-20, 20,  70, 70, 190,  -.5, .3, 0);
    this.draweye(80,60,  -20,30,-20, -30,20,-20,  -70, 70, 190,  -.5, -.3, 1.5);
    this.drawmouth(0, 100,  0, -50,  -50, -50, 0, 40,  90, -10, 210,  0, .3, -.75);
    this.drawmouth_mdl(30, -10, 225,  0, 0, -.5);
    this.drawmouth_mdl(-23, -10, 225,  0, 0, .5);
    this.drawmouth(100, 0,  -50, 0,  -50, -50, 40, 0,  -80, -10, 210,  0, -.3, 2.25);
  }
  drawHead() {
    // draw eyes
    const head_geometry = new THREE.CylinderGeometry(10,10,40,50)
        , head_material = new THREE.MeshPhongMaterial({color: 648035});
    const head_box = new THREE.Mesh( head_geometry, head_material );
    head_box.position.set(0, 180, 0);
    head_box.rotation.set(0, 0, 0);
    this.group.add(head_box);
  }
  drawBody( a,b,c,d,e,f ) {
    const pumpkin_geometry =  new THREE.ParametricGeometry( function( u, v, target ) {
                            u = u * Math.PI;
                            v = v * 2 * Math.PI;
                            var x = 140 * Math.sin(u) * Math.cos(v);
                            var y = 170 * Math.sin(u) * Math.sin(v); 
                            var z = 220 * Math.cos(u);
                            target.set( x, y, z );
                        }, 500, 500, true
                   );
    const pumpkin_material = new THREE.MeshPhongMaterial({color: 0xF68636});

    const pumpkin_box = new THREE.Mesh(pumpkin_geometry, pumpkin_material);
    pumpkin_box.position.set(a, b, c);
    pumpkin_box.rotation.set(d, e, f);
    this.group.add(pumpkin_box);
  }
  draweye ( a,b, c,d,e, f,g,h, i,j,k, l,m,n ) {
    const eye_material = new THREE.MeshBasicMaterial( { color: 0xd80202 } )
        , eye = new THREE.Shape();
    eye.moveTo(a,b);
    eye.bezierCurveTo(c,d,e,f,g,h);
    const eye_geometry = new THREE.ShapeGeometry( eye )
        , eye_box = new THREE.Mesh( eye_geometry, eye_material )
    eye_box.position.set(i, j, k);
    eye_box.rotation.set(l, m, n);
    this.group.add( eye_box );    
  }
  drawmouth( a,b,c,d,e,f,g,h,i,j,k,l,m,n ) {
    const mouth_material = new THREE.MeshBasicMaterial( { color: 0xd80202 } )
        , shape = new THREE.Shape();
    shape.moveTo( a, b );
    shape.lineTo( c, d );
    shape.lineTo( e, f );
    shape.lineTo( g, h );
    const mouth_geometry = new THREE.ShapeGeometry( shape )
        , mouth_box = new THREE.Mesh( mouth_geometry, mouth_material )
    mouth_box.position.set(i, j, k);
    mouth_box.rotation.set(l, m, n);
    this.group.add( mouth_box );
  }
  drawmouth_mdl( a,b,c,d,e,f ) {
    const mouth_geometry = new THREE.BoxGeometry(80, 40, 1)
        , mouth_material = new THREE.MeshBasicMaterial({ color: 0xd80202})
        , mouth_box = new THREE.Mesh(mouth_geometry, mouth_material);
    mouth_box.position.set(a, b, c);
    mouth_box.rotation.set(d, e, f);
    this.group.add(mouth_box);
  }
  moveBody() {

  }  
}

class Fly {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(300, 300, 100);
    this.group.rotation.set(0, -Math.PI/2, 0);
    this.wingAngle = 0;
    this.drawWings();
  }
  drawBody() {
    const flyGeometry = new THREE.BoxGeometry(10, 10, 10);
    const flyMaterial = new THREE.MeshStandardMaterial({
      color: 0x3F3F3F,
      roughness: 1,
      shading: THREE.FlatShading,
    });
    const fly = new THREE.Mesh(flyGeometry, flyMaterial);
    this.group.add(fly);
  }
  drawWings() {
    this.rightWing = drawCylinder(0x000000, 0.42, 8, 126, 400);
    this.rightWing.position.set(25, 25, 25);
    this.rightWing.rotation.set(0, 0, 0);
    this.rightWing.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.21, 0.04));
    this.group.add(this.rightWing);

    this.leftWing = this.rightWing.clone();
    this.leftWing.position.z = -this.rightWing.position.z;
    this.group.add(this.leftWing);
  }
  moveWings() {
    this.wingAngle += 0.5;
    const wingAmplitude = Math.PI / 8;
    this.rightWing.rotation.x = (Math.PI / 4) - (Math.cos(this.wingAngle) * wingAmplitude);
    this.leftWing.rotation.x = (-Math.PI / 4) + (Math.cos(this.wingAngle) * wingAmplitude);
  }
}

init();
animate();