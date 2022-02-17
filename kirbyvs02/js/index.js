'use strict';

/**
* default
**/
let scene    = null,
    camera   = null,
    renderer = null,
    controls = null,
    zerotwo  = null,
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
  
  addLights();
  drawZerotwo();

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
    const body_geometry = new THREE.SphereBufferGeometry(200, 200, 200);
    const body_material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    const body          = new THREE.Mesh(body_geometry, body_material);
    this.group.add(body);

    /**
    * ring
    **/
    const ring_geometry = new THREE.TorusGeometry( 125, 5, 5, 125 );
    const ring_material = new THREE.MeshBasicMaterial( { color: 0xF7CA35 } );
    const ring = new THREE.Mesh( ring_geometry, ring_material );
    ring.position.set(0, 230, 0);
    ring.rotation.set(degree(90), 0, 0);
    this.group.add( ring );

    /**
    * eye
    **/
    function eye_content (gx, gy, gz, gcolor, rx, ry, rz, px, py, pz, group) {

      const eye_geometry =  new THREE.ParametricGeometry( function( u, v, target ) {
                                u = u * Math.PI;
                                v = v * 4 * Math.PI;
                                var x = gx * Math.sin(u) * Math.cos(v);
                                var y = gy * Math.sin(u) * Math.sin(v); 
                                var z = gz * Math.cos(u);
                                target.set( x, y, z );
                              }, 100, 100, true
                            );
      const eyes_material = new THREE.MeshBasicMaterial({color: gcolor});

      const eye = new THREE.Mesh(eye_geometry, eyes_material);
      eye.rotation.set(degree(rx), degree(ry), degree(rz));
      eye.position.set(px, py, pz);
      group.add(eye);
    }
    eye_content(30, 60, 1, 0xEE1A2B, 0, 0, 90, 0, 10, 200, this.group);
    eye_content(20, 20, 1, 0x000000, 0, 0, 0,  0, 10, 204, this.group);
    eye_content(10, 10, 1, 0xFFFFFF, 0, 0, 0, 10, 10, 207, this.group);

    /**
    * foot
    **/
    const tail_geometry = new THREE.ConeGeometry( 50, 100, 50 );
    const tail_material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
    const tail = new THREE.Mesh( tail_geometry, tail_material );
    tail.position.set(0, -220, 0);
    tail.rotation.set(0, 0, degree(180));
    this.group.add( tail );

    /**
    *twing
    **/
    function wing_bottom(px,py,pz,rx,ry,rz,group) {
      const splash_material = new THREE.MeshPhongMaterial({color: 0xffffff})
          , shape = new THREE.Shape();
            shape.moveTo(5, 30);
            shape.lineTo(52, -40);
            shape.lineTo(32, -60);
            shape.lineTo(6, -60);
            shape.lineTo(-14, -40);
            shape.lineTo(5, 30);
      const splash_geometry = new THREE.ShapeGeometry(shape),
            splash_box = new THREE.Mesh(splash_geometry, splash_material);

      splash_box.position.set(px, py, pz);
      splash_box.rotation.set(degree(rx), degree(ry), degree(rz));
      group.add(splash_box);
    }
    wing_bottom(200,0,0,0,0,90,this.group);
    wing_bottom(-200,40,0,0,0,-90,this.group);


    function wing_middle(px,py,pz,rx,ry,rz,group) {
      const wing_material = new THREE.MeshPhongMaterial({color: 0xffffff})
          , shape_wing = new THREE.Shape();
            shape_wing.moveTo(15, 30);
            shape_wing.lineTo(30, -45);
            shape_wing.lineTo(15, -115);
            shape_wing.lineTo(-15, -115);
            shape_wing.lineTo(-30, -45);
            shape_wing.lineTo(-15, 30);
      const wing_geometry = new THREE.ShapeGeometry(shape_wing),
            wing_box = new THREE.Mesh(wing_geometry, wing_material);

      wing_box.position.set(px, py, pz);
      wing_box.rotation.set(degree(rx), degree(ry), degree(rz));
      group.add(wing_box);
    }
    wing_middle( 340,  140, 0, 0, 0,  -45, this.group);
    wing_middle(-340,  140, 0, 0, 0,   45, this.group);
    wing_middle( 390,   20, 0, 0, 0,  -90, this.group);
    wing_middle(-390,   20, 0, 0, 0,   90, this.group);
    wing_middle( 340, -100, 0, 0, 0, -135, this.group);
    wing_middle(-340, -100, 0, 0, 0,  135, this.group);

    function wing_top(px,py,pz,rx,ry,rz,group) {
      const wing_red_material = new THREE.MeshPhongMaterial({color: 0x97042C})
          , shape_wing_red = new THREE.Shape();
            shape_wing_red.moveTo(7,30);
            shape_wing_red.lineTo(15,-45);
            shape_wing_red.lineTo(7,-115);
            shape_wing_red.lineTo(-7,-115);
            shape_wing_red.lineTo(-15,-45);
            shape_wing_red.lineTo(-7,30);
      const wing_red_geometry = new THREE.ShapeGeometry(shape_wing_red),
            wing_red = new THREE.Mesh(wing_red_geometry, wing_red_material);
      wing_red.position.set(px, py, pz);
      wing_red.rotation.set(degree(rx), degree(ry), degree(rz));
      group.add(wing_red);
    }
    wing_top( 400, 290,  0, 0, 0, -22.5, this.group);
    wing_top(-400, 290,  0, 0, 0,  22.5, this.group);
    wing_top( 470, 230,  0, 0, 0,   -53, this.group);
    wing_top(-470, 230,  0, 0, 0,    53, this.group);
    wing_top( 540,  80,  0, 0, 0,   -70, this.group);
    wing_top(-540,  80,  0, 0, 0,    70, this.group);
    wing_top( 540, -30,  0, 0, 0,  -110, this.group);
    wing_top(-540, -30,  0, 0, 0,   110, this.group);
    wing_top( 480, -180, 0, 0, 0,  -120, this.group);
    wing_top(-480, -180, 0, 0, 0,   120, this.group);
    wing_top( 400, -250, 0, 0, 0,  -160, this.group);
    wing_top(-400, -250, 0, 0, 0,   160, this.group);

  }
  moveBody() {
    const bodyamplitude = 30;
    this.bodyangle += 0.05;
    this.group.position.y = 0 - (Math.cos(this.bodyangle) * bodyamplitude);
  }  
}

init();
animate();
