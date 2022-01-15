'use strict';

/**
* default
**/
let scene    = null,
    camera   = null,
    renderer = null,
    controls = null,
    bat      = null,
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
  // drawCoffin();
  drawBat();

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
function drawBat() {
  bat = new Bat();
  scene.add(bat.group);
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
  bat.moveBody();
  bat.moveWings();
  renderer.render(scene, camera);
}

/**
* Bat
**/
class Bat {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(0, 0, 0);
    this.group.rotation.set(0, 0, 0);
    this.wingangle = 0;
    this.bodyangle = 0;
    this.drawBody();
    this.drawWings();
    this.drawWings_left();
  }

  drawBody() {
    /**
    * body
    **/
    const kirby_body = new THREE.SphereBufferGeometry(200, 200, 200);
    const kirby_body_material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    const kirby_box = new THREE.Mesh(kirby_body, kirby_body_material);
    this.group.add(kirby_box);

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
    const eye =  new THREE.ParametricGeometry( function( u, v, target ) {
                            u = u * Math.PI;
                            v = v * 4 * Math.PI;
                            var x = 30 * Math.sin(u) * Math.cos(v);
                            var y = 60 * Math.sin(u) * Math.sin(v); 
                            var z = 1 * Math.cos(u);
                            target.set( x, y, z );
                        }, 80, 80, true
                   );

    const eyes_material = new THREE.MeshBasicMaterial({color: 0xEE1A2B});

    const eyes_box = new THREE.Mesh(eye, eyes_material);
    eyes_box.rotation.set(0, 0, degree(90));
    eyes_box.position.set(0, 10, 200);
    this.group.add(eyes_box);

    /**
    * eye black
    **/
    const eye_black = new THREE.ParametricGeometry( function( u, v, target ) {
                            u = u * Math.PI;
                            v = v * 2 * Math.PI;
                            var x = 20 * Math.sin(u) * Math.cos(v);
                            var y = 20 * Math.sin(u) * Math.sin(v); 
                            var z = 1 * Math.cos(u);
                            target.set( x, y, z );
                        }, 100, 100, true
                   );

    const eyes_black_material = new THREE.MeshBasicMaterial({color: 0x000000});
    const eyes_black_box = new THREE.Mesh(eye_black, eyes_black_material);
    eyes_black_box.position.set(0, 10, 204);
    this.group.add(eyes_black_box);

    /**
    * eye white
    **/
    const eye_white = new THREE.ParametricGeometry( function( u, v, target ) {
                            u = u * Math.PI;
                            v = v * 2 * Math.PI;
                            var x = 10 * Math.sin(u) * Math.cos(v);
                            var y = 10 * Math.sin(u) * Math.sin(v); 
                            var z = 1 * Math.cos(u);
                            target.set( x, y, z );
                        }, 100, 100, true
                   );

    const eyes_white_material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    const eyes_white_box = new THREE.Mesh(eye_white, eyes_white_material);
    eyes_white_box.position.set(10, 10, 207);
    this.group.add(eyes_white_box);

    /**
    * foot
    **/
    const tail_geometry = new THREE.ConeGeometry( 50, 100, 50 );
    const tail_material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
    const tail = new THREE.Mesh( tail_geometry, tail_material );
    tail.position.set(0,-220, 0);
    tail.rotation.set(0, 0, degree(180));
    this.group.add( tail );

  }
  drawWings() {
    const splash_material = new THREE.MeshPhongMaterial({color: 0xffffff})
        , shape = new THREE.Shape();
          shape.moveTo(0, 30);
          shape.lineTo(52, -40);
          shape.lineTo(28, -60);
          shape.lineTo(0, -60);
          shape.lineTo(-28, -40);
          shape.lineTo(0, 30);
    const splash_geometry = new THREE.ShapeGeometry(shape),
          splash_box = new THREE.Mesh(splash_geometry, splash_material);
    /**
    * rightwing
    **/
    this.rightWing = splash_box;
    this.rightWing.position.set(200, 0, 0);
    this.rightWing.rotation.set(degree(180), 0, degree(-90));
    this.group.add(this.rightWing);

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

    /**
    * rightwing
    **/
    this.wing_box = wing_box;
    this.wing_box.position.set(280, 80, 0);
    this.wing_box.rotation.set(degree(180), 0, degree(-45));
    this.group.add(this.wing_box);

    this.wing_box_second = this.wing_box.clone();
    this.wing_box_second.position.set(310, 20, 0);
    this.wing_box_second.rotation.set(degree(180), 0, degree(-90));
    this.group.add(this.wing_box_second);

    this.wing_box_third = this.wing_box.clone();
    this.wing_box_third.position.set(290, -40, 0);
    this.wing_box_third.rotation.set(degree(180), 0, degree(-135));
    this.group.add(this.wing_box_third);


    const wing_red_material = new THREE.MeshPhongMaterial({color: 0x97042C})
        , shape_wing_red = new THREE.Shape();
          shape_wing_red.moveTo(   7,  30  );
          shape_wing_red.lineTo(  15, -45  );
          shape_wing_red.lineTo(   7, -115 );
          shape_wing_red.lineTo(  -7, -115 );
          shape_wing_red.lineTo( -15, -45  );
          shape_wing_red.lineTo(  -7,  30  );
    const wing_red_geometry = new THREE.ShapeGeometry(shape_wing_red),
          wing_red = new THREE.Mesh(wing_red_geometry, wing_red_material);

    this.wing_red = wing_red;
    this.wing_red.position.set(370, 210, 0);
    this.wing_red.rotation.set(degree(180), 0, degree(-22.5));
    this.group.add(this.wing_red);

    this.wing_red_two = wing_red.clone();
    this.wing_red_two.position.set(410, 180, 0);
    this.wing_red_two.rotation.set(degree(180), 0, degree(-53));
    this.group.add(this.wing_red_two);

    this.wing_red_three = wing_red.clone();
    this.wing_red_three.position.set(470, 50, 0);
    this.wing_red_three.rotation.set(degree(180), 0, degree(-70));
    this.group.add(this.wing_red_three);

    this.wing_red_four = wing_red.clone();
    this.wing_red_four.position.set(470, -10, 0);
    this.wing_red_four.rotation.set(degree(180), 0, degree(-110));
    this.group.add(this.wing_red_four);

    this.wing_red_five = wing_red.clone();
    this.wing_red_five.position.set(420, -140, 0);
    this.wing_red_five.rotation.set(degree(180), 0, degree(-120));
    this.group.add(this.wing_red_five);

    this.wing_red_six = wing_red.clone();
    this.wing_red_six.position.set(380, -170, 0);
    this.wing_red_six.rotation.set(degree(180), 0, degree(-160));
    this.group.add(this.wing_red_six);
  }
  drawWings_left() {
    const splash_material = new THREE.MeshPhongMaterial({color: 0xffffff})
        , shape = new THREE.Shape();
          shape.moveTo(0, 30);
          shape.lineTo(52, -40);
          shape.lineTo(28, -60);
          shape.lineTo(0, -60);
          shape.lineTo(-28, -40);
          shape.lineTo(0, 30);
    const splash_geometry = new THREE.ShapeGeometry(shape),
          splash_box = new THREE.Mesh(splash_geometry, splash_material);
    /**
    * rightwing
    **/
    this.leftWing = splash_box;
    this.leftWing.position.set(-200, 20, 0);
    this.leftWing.rotation.set(degree(180), 0, degree(80));
    this.group.add(this.leftWing);

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

    /**
    * rightwing
    **/
    this.wing_left_box = wing_box;
    this.wing_left_box.position.set(-280, 80, 0);
    this.wing_left_box.rotation.set(degree(180), 0, degree(45));
    this.group.add(this.wing_left_box);

    this.wing_left_box_second = this.wing_box.clone();
    this.wing_left_box_second.position.set(-310, 20, 0);
    this.wing_left_box_second.rotation.set(degree(180), 0, degree(90));
    this.group.add(this.wing_left_box_second);

    this.wing_left_box_third = this.wing_box.clone();
    this.wing_left_box_third.position.set(-290, -40, 0);
    this.wing_left_box_third.rotation.set(degree(180), 0, degree(135));
    this.group.add(this.wing_left_box_third);


    const wing_red_material = new THREE.MeshPhongMaterial({color: 0x97042C})
        , shape_wing_red = new THREE.Shape();
          shape_wing_red.moveTo(   7,  30  );
          shape_wing_red.lineTo(  15, -45  );
          shape_wing_red.lineTo(   7, -115 );
          shape_wing_red.lineTo(  -7, -115 );
          shape_wing_red.lineTo( -15, -45  );
          shape_wing_red.lineTo(  -7,  30  );
    const wing_red_geometry = new THREE.ShapeGeometry(shape_wing_red),
          wing_red = new THREE.Mesh(wing_red_geometry, wing_red_material);

    this.wing_left_red = wing_red;
    this.wing_left_red.position.set(-370, 210, 0);
    this.wing_left_red.rotation.set(degree(180), 0, degree(22.5));
    this.group.add(this.wing_left_red);

    this.wing_left_red_two = wing_red.clone();
    this.wing_left_red_two.position.set(-410, 180, 0);
    this.wing_left_red_two.rotation.set(degree(180), 0, degree(53));
    this.group.add(this.wing_left_red_two);

    this.wing_left_red_three = wing_red.clone();
    this.wing_left_red_three.position.set(-470, 50, 0);
    this.wing_left_red_three.rotation.set(degree(180), 0, degree(70));
    this.group.add(this.wing_left_red_three);

    this.wing_left_red_four = wing_red.clone();
    this.wing_left_red_four.position.set(-470, -10, 0);
    this.wing_left_red_four.rotation.set(degree(180), 0, degree(110));
    this.group.add(this.wing_left_red_four);

    this.wing_left_red_five = wing_red.clone();
    this.wing_left_red_five.position.set(-420, -140, 0);
    this.wing_left_red_five.rotation.set(degree(180), 0, degree(120));
    this.group.add(this.wing_left_red_five);

    this.wing_left_red_six = wing_red.clone();
    this.wing_left_red_six.position.set(-380, -170, 0);
    this.wing_left_red_six.rotation.set(degree(180), 0, degree(160));
    this.group.add(this.wing_left_red_six);
  }
  moveBody() {
    const bodyamplitude = 30;
    this.bodyangle += 0.05;
    this.group.position.y = 0 - (Math.cos(this.bodyangle) * bodyamplitude);
  }  
  moveWings() {
    this.wingangle += .05;
    const wingamplitude            = degree(20);
    // this.rightWing.rotation.y      = degree(180) - (Math.cos(this.wingangle) * wingamplitude);
    this.rightWing.rotation.y
  = this.wing_box.rotation.y
  = this.wing_box_second.rotation.y
  = this.wing_box_third.rotation.y
  = this.wing_red.rotation.y
  = this.wing_red_two.rotation.y
  = this.wing_red_three.rotation.y
  = this.wing_red_four.rotation.y
  = this.wing_red_five.rotation.y
  = this.wing_red_six.rotation.y
  = this.leftWing.rotation.y
  = this.wing_left_box.rotation.y
  = this.wing_left_box_second.rotation.y
  = this.wing_left_box_third.rotation.y
  = this.wing_left_red.rotation.y
  = this.wing_left_red_two.rotation.y
  = this.wing_left_red_three.rotation.y
  = this.wing_left_red_four.rotation.y
  = this.wing_left_red_five.rotation.y
  = this.wing_left_red_six.rotation.y
  = degree(180);
  }
}

init();
animate();
