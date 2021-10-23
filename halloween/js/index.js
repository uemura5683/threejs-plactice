'use strict';

let scene    = null,
    camera   = null,
    renderer = null,
    controls = null,
    pumpkin  = null,
    moon     = null, 
    floor    = null,
    cross    = null,
    branch   = null,
    coffin   = null,
    bat      = null,
    font     = null,
    width    = 0,
    height   = 0;

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
  drawPumpkin();
  drawCross();
  drawBranch();
  drawCoffin();
  drawFloor();
  drawMoon();
  drawBat();
  drawFont();

  document
    .getElementById('myCanvas')
    .appendChild(renderer.domElement);

  window.addEventListener('resize', onResize, false);
}

function addLights() {
  const directLight1 = new THREE.DirectionalLight(0xffffff);
  directLight1.castShadow = true;
  directLight1.position.set(0, 1, 1);
  scene.add(directLight1);

  const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
  scene.add(pointLight);
}

function drawPumpkin() {
  pumpkin = new Pumpkin();
  scene.add(pumpkin.group);
}

function drawCross() {
  cross = new Cross();
  scene.add(cross.group);
}

function drawBranch() {
  branch = new Branch();
  scene.add(branch.group);
}

function drawCoffin() {
  coffin = new Coffin();
  scene.add(coffin.group);
}

function drawFloor() {
  floor = new Floor();
  scene.add(floor.group);
}

function drawMoon() {
  moon = new Moon();
  scene.add(moon.group);
}

function drawBat() {
  bat = new Bat();
  scene.add(bat.group);
}

function drawFont() {
  font = new Font();
  scene.add(font.group);
}

function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function degree(degrees) {
  return degrees * (Math.PI / 180);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  scene.rotation.y += 0.01;
  pumpkin.moveBody();
  bat.moveBody();
  bat.moveWings();
  renderer.render(scene, camera);
}

/**
* Pumpkin
**/
class Pumpkin {
  constructor() {
    this.group = new THREE.Group();
    this.bodyangle = 0;
    this.group.position.set(0, 0, 0);
    this.group.rotation.set(0, 0, 0);
    this.drawHead();
    this.drawBody(0,0,0, 0,0,0);
    this.drawBody(0,0,0, 0,degree(90),0);
    this.drawBody(0,0,0, 0,degree(45),0);
    this.drawBody(0,0,0, 0,degree(-45),0);
    this.draweye(60,80, 20,-30,-20, -30,-20, 20, 70, 70, 190, degree(-30), degree(30), 0);
    this.draweye(80,60, -20,30,-20, -30,20,-20, -70, 70, 190, degree(-30), degree(-30), degree(90));
    this.drawmouth(0, 100, 0, -50, -50, -50, 0, 40,  90, -10, 210, 0, degree(20), degree(-30));
    this.drawmouth_mdl(30, -10, 225, 0, 0, -.5);
    this.drawmouth_mdl(-23, -10, 225, 0, 0, .5);
    this.drawmouth(100, 0, -50, 0, -50, -50, 40, 0, -80, -10, 210, 0, degree(-20), degree(120));
  }
  drawHead() {
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
    this.bodyangle += 0.05;
    const bodyamplitude = 30;
    this.group.position.y = 30 - (Math.cos(this.bodyangle) * bodyamplitude);
  }  
}

/**
* Cross
**/
class Cross {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(-500, 50, 300);
    this.wingangle = 0;
    this.beside();
    this.vertical();
    this.crossfloor();
    this.crossfloor2();
  }
  beside() {
    const corss_beside_geometry = new THREE.BoxGeometry( 50, 350, 50 );
    const corss_beside_material = new THREE.MeshPhongMaterial( {color: 0x797979} );
    const corss_beside = new THREE.Mesh( corss_beside_geometry, corss_beside_material );
    corss_beside.position.set(0, 50, 0);
    this.group.add(corss_beside);
  }
  vertical() {
    const corss_beside_geometry = new THREE.BoxGeometry( 200, 50, 50 );
    const corss_beside_material = new THREE.MeshPhongMaterial( {color: 0x797979} );
    const corss_beside = new THREE.Mesh( corss_beside_geometry, corss_beside_material );
    corss_beside.position.set(0, 100, 0);
    this.group.add(corss_beside);
  }
  crossfloor() {
    const corss_beside_geometry = new THREE.BoxGeometry( 200, 100, 200 );
    const corss_beside_material = new THREE.MeshPhongMaterial( {color: 0x363636} );
    const corss_beside = new THREE.Mesh( corss_beside_geometry, corss_beside_material );
    corss_beside.position.set(0, -150, 0);
    this.group.add(corss_beside);
  }
  crossfloor2() {
    const corss_beside_geometry = new THREE.BoxGeometry( 300, 50, 300 );
    const corss_beside_material = new THREE.MeshPhongMaterial( {color: 0x363636} );
    const corss_beside = new THREE.Mesh( corss_beside_geometry, corss_beside_material );
    corss_beside.position.set(0, -175, 0);
    this.group.add(corss_beside);
  }
}

/**
* Branch
**/
class Branch {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(-500, 100, -200);
    this.wingangle = 0;
    this.vertical();
    this.branch();
    this.branch2();
    this.branch3();
    this.branch4();
  }
  vertical() {
    const corss_beside_geometry = new THREE.CylinderGeometry( 1, 20, 600, 100 );
    const corss_beside_material = new THREE.MeshPhongMaterial( {color: 0x443020} );
    const corss_beside = new THREE.Mesh( corss_beside_geometry, corss_beside_material );
    corss_beside.position.set(0, 0, 0);
    this.group.add(corss_beside);
  }
  branch() {
   const branch_geometry = new THREE.TorusGeometry( 300, 5, 100, 100, degree(30) )
   const branch_material = new THREE.MeshPhongMaterial( {color: 0x443020} );
   const branch_mesh = new THREE.Mesh( branch_geometry, branch_material );
   branch_mesh.position.set(0, 300, 0);
   branch_mesh.rotation.set(0, 0, degree(-90));
   this.group.add( branch_mesh );
  }
  branch2() {
   const branch_geometry = new THREE.TorusGeometry( 300, 3, 100, 100, degree(30) )
   const branch_material = new THREE.MeshPhongMaterial( {color: 0x443020} );
   const branch_mesh = new THREE.Mesh( branch_geometry, branch_material );
   branch_mesh.position.set(0, 500, 0);
   branch_mesh.rotation.set(0, 0, degree(-120));
   this.group.add( branch_mesh );
  }
  branch3() {
   const branch_geometry = new THREE.TorusGeometry( 400, 5, 100, 100, degree(30) )
   const branch_material = new THREE.MeshPhongMaterial( {color: 0x443020} );
   const branch_mesh = new THREE.Mesh( branch_geometry, branch_material );
   branch_mesh.position.set(0, 450, 0);
   branch_mesh.rotation.set(0, degree(-45), degree(-120));
   this.group.add( branch_mesh );
  }
  branch4() {
   const branch_geometry = new THREE.TorusGeometry( 300, 4, 100, 100, degree(30) )
   const branch_material = new THREE.MeshPhongMaterial( {color: 0x443020} );
   const branch_mesh = new THREE.Mesh( branch_geometry, branch_material );
   branch_mesh.position.set(0, 450, 0);
   branch_mesh.rotation.set(0, degree(150), degree(-120));
   this.group.add( branch_mesh );
  }
}

/**
* Coffin
**/
class Coffin {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(-100, -50, 350);
    this.drawBody();
    this.drawBody2();
    this.drawBody3();
    this.drawBody4();
    this.drawBody5();
    this.drawBody6();
  }
  drawBody() {
    const ciffin_material = new THREE.MeshPhongMaterial( { color: 0x000000 } )
        , ciffines = new THREE.Shape();
          ciffines.moveTo( 0, 500 )
        , ciffines.lineTo( 200, 700)
        , ciffines.lineTo( 400, 500)
        , ciffines.lineTo( 300, -200)
        , ciffines.lineTo( 100, -200)
        , ciffines.lineTo( 0, 500)
    const ciffin_geometry = new THREE.ShapeGeometry( ciffines )
        , ciffines_box = new THREE.Mesh( ciffin_geometry, ciffin_material );
    ciffines_box.position.set(400, 0, 0);
    ciffines_box.rotation.set(degree(-90), 0, 0);
    this.group.add(ciffines_box);
  }
  drawBody2() {
    const ciffin_material = new THREE.MeshPhongMaterial( { color: 0x000000 } )
        , ciffines = new THREE.Shape();
          ciffines.moveTo( 0, -100 )
        , ciffines.lineTo( 200, -100)
        , ciffines.lineTo( 200, 0)
        , ciffines.lineTo( 0, 0)
    const ciffin_geometry = new THREE.ShapeGeometry( ciffines )
        , ciffines_box = new THREE.Mesh( ciffin_geometry, ciffin_material );
    ciffines_box.position.set(500, 0, 200);
    ciffines_box.rotation.set(0, 0, 0);
    this.group.add(ciffines_box);
  }
  drawBody3() {
    const ciffin_material = new THREE.MeshPhongMaterial( { color: 0x000000 } )
        , ciffines = new THREE.Shape();
          ciffines.moveTo( 0, -100 )
        , ciffines.lineTo( -705, -100)
        , ciffines.lineTo( -705, 0)
        , ciffines.lineTo( 0, 0)
    const ciffin_geometry = new THREE.ShapeGeometry( ciffines )
        , ciffines_box = new THREE.Mesh( ciffin_geometry, ciffin_material );
    ciffines_box.position.set(500, 0, 200);
    ciffines_box.rotation.set(0, degree(-82), 0);
    this.group.add(ciffines_box);
  }
  drawBody4() {
    const ciffin_material = new THREE.MeshPhongMaterial( { color: 0x000000 } )
        , ciffines = new THREE.Shape();
          ciffines.moveTo( 0, -100 )
        , ciffines.lineTo( 705, -100)
        , ciffines.lineTo( 705, 0)
        , ciffines.lineTo( 0, 0)
    const ciffin_geometry = new THREE.ShapeGeometry( ciffines )
        , ciffines_box = new THREE.Mesh( ciffin_geometry, ciffin_material );
    ciffines_box.position.set(700, 0, 200);
    ciffines_box.rotation.set(0, degree(82), 0);
    this.group.add(ciffines_box);
  }
  drawBody5() {
    const ciffin_material = new THREE.MeshPhongMaterial( { color: 0x000000 } )
        , ciffines = new THREE.Shape();
          ciffines.moveTo( 0, -100 )
        , ciffines.lineTo( 285, -100)
        , ciffines.lineTo( 285, 0)
        , ciffines.lineTo( 0, 0)
    const ciffin_geometry = new THREE.ShapeGeometry( ciffines )
        , ciffines_box = new THREE.Mesh( ciffin_geometry, ciffin_material );
    ciffines_box.position.set(600, 0, -700);
    ciffines_box.rotation.set(0, degree(-135), 0);
    this.group.add(ciffines_box);
  }
  drawBody6() {
    const ciffin_material = new THREE.MeshPhongMaterial( { color: 0x000000 } )
        , ciffines = new THREE.Shape();
          ciffines.moveTo( 0, -100 )
        , ciffines.lineTo( -285, -100)
        , ciffines.lineTo( -285, 0)
        , ciffines.lineTo( 0, 0)
    const ciffin_geometry = new THREE.ShapeGeometry( ciffines )
        , ciffines_box = new THREE.Mesh( ciffin_geometry, ciffin_material );
    ciffines_box.position.set(600, 0, -700);
    ciffines_box.rotation.set(0, degree(135), 0);
    this.group.add(ciffines_box);
  }
}

/**
* Floor
**/
class Floor {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(0, -150, 0);
    this.group.rotation.set(degree(-90), 0, 0);
    this.wingangle = 0;
    this.drawBody();
  }
  drawBody() {
    const plane = new THREE.PlaneGeometry(3000, 3000, 64, 64);
    const map1 = THREE.ImageUtils.loadTexture('floor.jpg');
    const plane_box =  new THREE.Mesh( plane, new THREE.MeshLambertMaterial( { map: map1 } ) );
    this.group.add(plane_box);
  }
}

/**
* Moon
**/
class Moon {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(100, 400, 900);
    this.wingangle = 0;
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

/**
* Bat
**/
class Bat {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(300, 300, 100);
    this.group.rotation.set(0, degree(-90), 0);
    this.wingangle = 0;
    this.bodyangle = 0;
    this.drawBody();
    this.drawWings();
    this.drawWings_back();
  }
  drawBody() {
    /**
    * bat_body
    **/
    const batGeometry =  new THREE.ParametricGeometry( function( u, v, target ) {
                            u = u * Math.PI;
                            v = v * 2 * Math.PI;
                            var x = 60 * Math.sin(u) * Math.cos(v);
                            var y = 25 * Math.sin(u) * Math.sin(v); 
                            var z = 25 * Math.cos(u);
                            target.set( x, y, z );
                        }, 80, 80, true
                   );

    const batmaterial = new THREE.MeshPhongMaterial({color: 0x000000});
    const bat = new THREE.Mesh(batGeometry, batmaterial);

    bat.position.set( -30, 0, 0 );
    this.group.add(bat);

    /**
    * ear_right
    **/
    let ear_material = new THREE.MeshLambertMaterial( { color: 0x000000, wireframe:false } );
    let ear = new THREE.Mesh( new THREE.TetrahedronGeometry( 20 ), ear_material );
    ear.position.set( 10, 5, -20 );
    ear.rotation.set( 0, degree(115), 0 );
    this.group.add( ear );

    /**
    * ear_left
    **/
    let ear_left = new THREE.Mesh( new THREE.TetrahedronGeometry( 20 ), ear_material );
    ear_left.position.set( 10, 5, 20 );
    ear_left.rotation.set( 0, degree(-15), degree(0) );
    this.group.add( ear_left );

  }
  drawWings() {
    const splash_material = new THREE.MeshPhongMaterial( { color: 0x000000 } )
        , shape = new THREE.Shape();
          shape.moveTo( 0, 0 );
          shape.lineTo( 20, -70 );
          shape.lineTo( 0, -150 );
          shape.lineTo( -80, -100 );
          shape.lineTo( -40, -40 );
          shape.lineTo( -40, 0 );

    const splash_geometry = new THREE.ShapeGeometry( shape ),
          splash_box = new THREE.Mesh( splash_geometry, splash_material );

    /**
    * rightwing
    **/
    this.rightWing = splash_box;
    this.rightWing.position.set(0, 0, 20);
    this.rightWing.rotation.set(0, 0, 0);
    this.group.add(this.rightWing);

    /**
    * leftwing
    **/
    this.leftWing = this.rightWing.clone();
    this.leftWing.position.z = -this.rightWing.position.z;
    this.group.add(this.leftWing);
  }
  drawWings_back() {
    const splash_material = new THREE.MeshPhongMaterial( { color: 0x000000 } )
    const shape_back = new THREE.Shape();
          shape_back.moveTo( 40, 0 );
          shape_back.lineTo( 40, -40 );
          shape_back.lineTo( 80, -100 );
          shape_back.lineTo( 0, -150 );
          shape_back.lineTo( -20, -70 );
          shape_back.lineTo( 0, 0 );
    const splash_geometry_back = new THREE.ShapeGeometry( shape_back ),
          splash_box_back = new THREE.Mesh( splash_geometry_back, splash_material );

    /**
    * rightwing
    **/
    this.rightWing_back = splash_box_back;
    this.rightWing_back.position.set(0, 0, 20);
    this.rightWing_back.rotation.set(0, degree(-180), 0);
    this.group.add(this.rightWing_back);

    /**
    * leftwing
    **/
    this.leftWing_back = this.rightWing_back.clone();
    this.leftWing_back.position.z = -this.rightWing_back.position.z;
    this.group.add(this.leftWing_back);
  }
  moveBody() {
    const bodyamplitude = 30;
    this.bodyangle += 0.05;
    this.group.position.y = 300 - (Math.cos(this.bodyangle) * bodyamplitude);
  }  
  moveWings() {
    this.wingangle += .5;
    const wingamplitude            = degree(20);
    this.rightWing.rotation.x      = degree(-90) - (Math.cos(this.wingangle) * wingamplitude);
    this.leftWing.rotation.x       = degree(90)  + (Math.cos(this.wingangle) * wingamplitude);
    this.rightWing_back.rotation.x = degree(-90) - (Math.cos(this.wingangle) * wingamplitude);
    this.leftWing_back.rotation.x  = degree(-90) + (Math.cos(this.wingangle) * wingamplitude);
  }
}

/**
* Font
**/
class Font {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(0, 0, 0);
    this.wingangle = 0;
    this.fonts();
  }
  fonts() {
    let loader = new THREE.FontLoader();
    loader.load( 'https://threejs-plactice.vercel.app/mainvisual/fonts/helvetiker_regular.typeface.json', function ( font ) {
          let matDark = new THREE.LineBasicMaterial( {
            color: 0x800080,
            opacity: 1,
            side: THREE.DoubleSide
          } );
          let matLite = new THREE.MeshBasicMaterial( {
            color: 0x800080,
            transparent: true,
            opacity: 1,
            side: THREE.DoubleSide
          } );

        let message = 'Happy Hello Ween !!',
            shapes = font.generateShapes( message, 50 ),
            text_geometry = new THREE.ShapeGeometry( shapes ),
            size = 1000;

        text_geometry.computeBoundingBox();

        const xmid = - 0.5 * ( text_geometry.boundingBox.max.x - text_geometry.boundingBox.min.x );

        text_geometry.translate( xmid, 400, -700, );

        const text = new THREE.Mesh( text_geometry, matLite );
            text.position.z = 20;
            scene.add( text );
            const holeShapes = [];
            for ( let i = 0; i < shapes.length; i ++ ) {
              let shape = shapes[ i ];
              if ( shape.holes && shape.holes.length > 0 ) {
                for ( let j = 0; j < shape.holes.length; j ++ ) {
                  let hole = shape.holes[ j ];
                  holeShapes.push( hole );
                }
              }
            }
            shapes.push.apply( shapes, holeShapes );
            let lineText = new THREE.Object3D();
            for ( let i = 0; i < shapes.length; i ++ ) {
              let shape = shapes[ i ],
                  points = shape.getPoints(),
                  text_geometry = new THREE.BufferGeometry().setFromPoints( points );
              text_geometry.translate( xmid, 400, -700, );
              let lineMesh = new THREE.Line( text_geometry, matDark );
              lineText.add( lineMesh );
            }
            scene.add( lineText );
        }
     );
  }
}

init();
animate();