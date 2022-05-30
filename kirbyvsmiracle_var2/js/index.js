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
  const smokeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, opacity: 0.1, map: smokeTexture, transparent: true});
  const smokeGeo      = new THREE.PlaneGeometry(300,300);

  for (var p = 0; p < 150; p++) {
      var particle = new THREE.Mesh(smokeGeo,smokeMaterial);
      particle.position.set(Math.random()*1000-250,Math.random()*1000-250,Math.random()*2000-250);
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
  const directLight1 = new THREE.HemisphereLight(0xffffff, 0xefefef, 1);
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
    this.group.position.set(0, 150, 0);
    this.group.rotation.set(0, 0, 0);
    this.wingangle = 0;
    this.bodyangle = 0;
    this.drawBody();
  }
  drawBody() {
    const body_geometry = new THREE.BoxGeometry(150, 150, 200 );
    const body_material = new THREE.MeshLambertMaterial({color: 0x7f2116});
    const body          = new THREE.Mesh(body_geometry, body_material);
    body.position.set(0, 0, 0);
    this.group.add(body);

    function stone_cylinder(px,py,pz,rx,ry,rz,group) {
      const bosy_geometry = new THREE.CylinderGeometry(75, 125, 40, 4);
      const body_material = new THREE.MeshLambertMaterial({color: 0x7f2116});
      const body          = new THREE.Mesh(bosy_geometry, body_material);
      body.position.set(px, py, pz);
      body.rotation.set(degree(rx), degree(ry), degree(rz));
      group.add(body);
    }
    stone_cylinder( 0, 105, 0, 0, 45, 0, this.group);
    stone_cylinder( 0, -105, 0, 0, 45, 180, this.group);
    stone_cylinder( -105, 0, 0, 45, 0, 90, this.group);
    stone_cylinder( 105, 0, 0, -45, 0, -90, this.group);
    stone_cylinder( 0, 0, 105, 90, 45, 0, this.group);
    stone_cylinder( 0, 0, -105, -90, -45, 0, this.group);
  }
  moveBody() {
    const bodyamplitude = 300;
    this.bodyangle -= 0.02;
    this.group.rotation.z += 0.05;    
    this.group.position.x = 0 - (Math.cos(this.bodyangle) * bodyamplitude);
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

    
    //   function Tween(timeArray, valueArray)
    //   {
    //     this.times  = timeArray || [];
    //     this.values = valueArray || [];
    //   }

    //   Tween.prototype.lerp = function(t)
    //   {
    //     var i = 0;
    //     var n = this.times.length;
    //     while (i < n && t > this.times[i])  
    //       i++;
    //     if (i == 0) return this.values[0];
    //     if (i == n) return this.values[n-1];
    //     var p = (t - this.times[i-1]) / (this.times[i] - this.times[i-1]);
    //     if (this.values[0] instanceof THREE.Vector3)
    //       return this.values[i-1].clone().lerp( this.values[i], p );
    //     else // its a float
    //       return this.values[i-1] + p * (this.values[i] - this.values[i-1]);
    //   }


    // const body_material = new THREE.ShaderMaterial( 
    //   {
    //     uniforms: 
    //     {
    //       texture:   { type: "t", value: THREE.ImageUtils.loadTexture( '../fire.png' ) },
    //     },
    //     attributes:     
    //     {
    //       customVisible:  { type: 'f',  value: 0 },
    //       customAngle:  { type: 'f',  value: 0 },
    //       customSize:   { type: 'f',  value: new Tween( [0, 0.1], [1, 150] ) },
    //       customColor:  { type: 'c',  value: new THREE.Vector3(0.02, 1, 0.4) },
    //       customOpacity:  { type: 'f',  value: new Tween( [0.7, 1], [1, 0] ) }
    //     },
    //     vertexShader:   [
    //       "attribute vec3  customColor;",
    //       "attribute float customOpacity;",
    //       "attribute float customSize;",
    //       "attribute float customAngle;",
    //       "attribute float customVisible;",  // float used as boolean (0 = false, 1 = true)
    //       "varying vec4  vColor;",
    //       "varying float vAngle;",
    //       "void main()",
    //       "{",
    //         "if ( customVisible > 0.5 )",         // true
    //           "vColor = vec4( customColor, customOpacity );", //     set color associated to vertex; use later in fragment shader.
    //         "else",             // false
    //           "vColor = vec4(0.0, 0.0, 0.0, 0.0);",     //     make particle invisible.
              
    //         "vAngle = customAngle;",

    //         "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
    //         "gl_PointSize = customSize * ( 300.0 / length( mvPosition.xyz ) );",     // scale particles as objects in 3D space
    //         "gl_Position = projectionMatrix * mvPosition;",
    //       "}"
    //       ].join("\n"),
    //           fragmentShader: [
    //       "uniform sampler2D texture;",
    //       "varying vec4 vColor;",   
    //       "varying float vAngle;",   
    //       "void main()", 
    //       "{",
    //         "gl_FragColor = vColor;",
            
    //         "float c = cos(vAngle);",
    //         "float s = sin(vAngle);",
    //         "vec2 rotatedUV = vec2(c * (gl_PointCoord.x - 0.5) + s * (gl_PointCoord.y - 0.5) + 0.5,", 
    //                               "c * (gl_PointCoord.y - 0.5) - s * (gl_PointCoord.x - 0.5) + 0.5);",  // rotate UV coordinates to rotate texture
    //             "vec4 rotatedTexture = texture2D( texture,  rotatedUV );",
    //         "gl_FragColor = gl_FragColor * rotatedTexture;",    // sets an otherwise white particle texture to desired color
    //       "}"
    //       ].join("\n"),
    //     transparent: true, // alphaTest: 0.5,  // if having transparency issues, try including: alphaTest: 0.5, 
    //     blending: THREE.NormalBlending, depthTest: true,
        
    //   });

    const body_geometry = new THREE.SphereGeometry( 140, 64, 64 );
    const body_texture = new THREE.TextureLoader().load('./fire.png');
    const body_material = new THREE.MeshStandardMaterial( { color: 0xea0c0e, map:body_texture } );
    const body          = new THREE.Mesh(body_geometry, body_material);

    body.position.set(0, 0, 0);
    body.dynamic = true;
    body.sortParticles = true;
    this.group.add(body);

    /**
    * eye
    **/
    function eye_content (px,py,pz,bpz,rx,ry,rz,group) {

      const eye_geometry =  new THREE.CylinderGeometry( 40, 40, 1, 32 );
      const eyes_material = new THREE.MeshLambertMaterial({color: 0xea0c0e});
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
    eye_content(0, 0, 162, 163, 100, 0, 0, this.group);
  }
  moveBody() {
    const bodyamplitude = 50;
    this.bodyangle += 0.05;

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
    function cutter_top(px,py,pz,rx,ry,rz,group) {
      const wing_material = new THREE.MeshPhongMaterial({color: 0x03d600})
          , shape_cutter = new THREE.Shape();
            shape_cutter.moveTo(-40,  130);
            shape_cutter.lineTo(20,  110);
            shape_cutter.lineTo(40,  80);
            shape_cutter.lineTo(60,  30);
            shape_cutter.lineTo(60,  -30);
            shape_cutter.lineTo(40,  -80);
            shape_cutter.lineTo(20,  -110);
            shape_cutter.lineTo(-40,  -130);
            shape_cutter.lineTo(-120, -130);
            shape_cutter.lineTo(-90,  -100);
            shape_cutter.lineTo(-70,  -80);
            shape_cutter.lineTo(-50, -30);            
            shape_cutter.lineTo(-50, 30);
            shape_cutter.lineTo(-70,  80);
            shape_cutter.lineTo(-90,  100);
            shape_cutter.lineTo(-120,  130);
      const wing_geometry = new THREE.ShapeGeometry(shape_cutter),
            wing_box = new THREE.Mesh(wing_geometry, wing_material);
      wing_box.position.set(px, py, pz);
      wing_box.rotation.set(degree(rx), degree(ry), degree(rz));
      group.add(wing_box);
    }
    cutter_top( 0, 105, 0, 0, 0, 90, this.group);

    function cutter_middle(px,py,pz,rx,ry,rz,group) {
      const wing_material = new THREE.MeshPhongMaterial({color: 0x03d600})
          , shape_cutter = new THREE.Shape();
            shape_cutter.moveTo(-50,  110);
            shape_cutter.lineTo(-10,  90);
            shape_cutter.lineTo(20,  60);
            shape_cutter.lineTo(30,  25);
            shape_cutter.lineTo(30,  -25);
            shape_cutter.lineTo(20,  -60);
            shape_cutter.lineTo(-10,  -90);
            shape_cutter.lineTo(-50,  -110);
            shape_cutter.lineTo(-115, -110);
            shape_cutter.lineTo(-100,  -90);
            shape_cutter.lineTo(-75,  -60);
            shape_cutter.lineTo(-65, -25);            
            shape_cutter.lineTo(-65, 25);
            shape_cutter.lineTo(-75,  60);
            shape_cutter.lineTo(-100,  90);
            shape_cutter.lineTo(-115,  110);
      const wing_geometry = new THREE.ShapeGeometry(shape_cutter),
            wing_box = new THREE.Mesh(wing_geometry, wing_material);
      wing_box.position.set(px, py, pz);
      wing_box.rotation.set(degree(rx), degree(ry), degree(rz));
      group.add(wing_box);
    }
    cutter_middle( 0, 0, 0, 0, 0, 90, this.group);

    function cutter_bottom(px,py,pz,rx,ry,rz,group) {
      const wing_material = new THREE.MeshPhongMaterial({color: 0x1a731e})
          , shape_cutter = new THREE.Shape();
            shape_cutter.moveTo(-30,   80);
            shape_cutter.lineTo(0,     70);
            shape_cutter.lineTo(20,    50);
            shape_cutter.lineTo(30,    25);
            shape_cutter.lineTo(30,   -25);
            shape_cutter.lineTo(20,   -50);
            shape_cutter.lineTo(0,    -70);
            shape_cutter.lineTo(-30,  -80);
            shape_cutter.lineTo(-65,  -80);
            shape_cutter.lineTo(-60,  -70);
            shape_cutter.lineTo(-45,  -50);
            shape_cutter.lineTo(-40,  -25);            
            shape_cutter.lineTo(-40,   25);
            shape_cutter.lineTo(-45,   50);
            shape_cutter.lineTo(-60,   70);
            shape_cutter.lineTo(-65,   80);
      const wing_geometry = new THREE.ShapeGeometry(shape_cutter),
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
    const body_geometry = new THREE.SphereGeometry( 110, 64, 64 );
    const body_material = new THREE.MeshPhongMaterial({transparent: true,opacity: 1,color: 0xffff91}); 
    const body          = new THREE.Mesh(body_geometry, body_material);
    body.position.set(0, 0, 0);
    this.group.add(body);


    function spark_cylinder(size, px,py,pz,rx,ry,rz,scolor,group) {
        const sparkgeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array( [
           size, -size, 0,
           size,  size, 0,
          -size,  size, 0,
        ] );
        const spark_material = new THREE.MeshBasicMaterial({transparent: true,opacity: .7,color: scolor}); 
        sparkgeometry.addAttribute(
          'position',
          new THREE.BufferAttribute(
            vertices, 3
          )
        );
        const sparkboby = new THREE.Mesh(sparkgeometry, spark_material);
        sparkboby.position.set( px, py, pz );
        sparkboby.rotation.set( degree(rx), degree(ry), degree(rz) );
        group.add(sparkboby);
    }
    spark_cylinder( 40, 30, 110, 0, 0, 0, -210, 0xffff91, this.group);
    spark_cylinder( 30, 100, 70, 10, 0, 0, 110, 0x4fbba4, this.group);
    spark_cylinder( 50, 120, -10, 80, 0, 0, 90, 0xffff91, this.group);

    spark_cylinder( 30, 97, -80, 80, 0, 0, -220, 0xffff91, this.group);
    spark_cylinder( 30, 30, -120, 30, 0, 0, -240, 0x4fbba4, this.group);

    spark_cylinder( 25, -110, -40, 80, 0, 0, -80, 0xffff91, this.group);

    spark_cylinder( 40, -82, 110, 0, 0, 0, -150, 0x4fbba4, this.group);
    spark_cylinder( 40, -120, 40, 0, 0, 0, -120, 0x4fbba4, this.group);
    spark_cylinder( 40, -90, -80, 0, 0, 0, -70, 0x4fbba4, this.group);

    const sparklight = new THREE.PointLight( 0xffff91, 2, 1000, 1.0 );
    sparklight.position.set( -300, 300, 300 );
    this.group.add(sparklight);
  }
  moveBody() {
    const bodyamplitude = 10;
    this.bodyangle += 0.05;
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
    const body_geometry = new THREE.BoxGeometry(200, 200, 200 );
    const body_material = new THREE.MeshPhongMaterial({transparent: true,opacity: .7,color: 0x00ffed});      
    const body          = new THREE.Mesh(body_geometry, body_material);
    body.position.set(0, 0, 0);
    this.group.add(body);

    function stone_cylinder(px,py,pz,rx,ry,rz,group) {
      const bosy_geometry = new THREE.CylinderGeometry(125, 150, 20, 4);
      const body_material = new THREE.MeshPhongMaterial({transparent: true,opacity: .7,color: 0x00ffed});      
      const body          = new THREE.Mesh(bosy_geometry, body_material);
      body.position.set(px, py, pz);
      body.rotation.set(degree(rx), degree(ry), degree(rz));
      group.add(body);
    }
    stone_cylinder( 0, 117, 0, 0, 45, 0, this.group);
    stone_cylinder( 0, -117, 0, 0, 45, 180, this.group);
    stone_cylinder( -117, 0, 0, 45, 0, 90, this.group);
    stone_cylinder( 117, 0, 0, -45, 0, -90, this.group);
    stone_cylinder( 0, 0, 117, 90, 45, 0, this.group);
    stone_cylinder( 0, 0, -117, -90, -45, 0, this.group);

  }
  moveBody() {
    const bodyamplitude = 50;
    this.bodyangle += 0.05;
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
    const body_geometry = new THREE.SphereGeometry( 110, 64, 64 );
    const body_material = new THREE.MeshLambertMaterial({color: 0xffaa00});
    const body          = new THREE.Mesh(body_geometry, body_material);
    function nirdle_cylinder(px,py,pz,rx,ry,rz,group) {
      const bosy_geometry = new THREE.CylinderGeometry(1, 25, 100, 100);
      const body_material = new THREE.MeshLambertMaterial({color: 0xffaa00});      
      const body          = new THREE.Mesh(bosy_geometry, body_material);
      body.position.set(px, py, pz);
      body.rotation.set(degree(rx), degree(ry), degree(rz));
      group.add(body);
    }
    nirdle_cylinder( 0, 150, 0, 0, 45, 0, this.group);
    nirdle_cylinder( 0, -150, 0, 0, 45, 180, this.group);
    nirdle_cylinder( -150, 0, 0, 45, 0, 90, this.group);
    nirdle_cylinder( 150, 0, 0, -45, 0, -90,  this.group);
    nirdle_cylinder( 110, 110, 0, 0, 0, -45, this.group);
    nirdle_cylinder( -110, 110,0, 0, 0, 45, this.group);
    nirdle_cylinder( 110, -110, 0, 0, 0, -135, this.group);
    nirdle_cylinder( -110, -110, 0, 0, 0, 135, this.group);
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
    this.group.position.set(0, 200, 0);
    this.group.rotation.set(0, 0, 0);
    this.wingangle = 0;
    this.bodyangle = 0;
    this.drawBody();
  }
  drawBody() {
    function bom_cylinder(sx,sy,sz,bx,by,bz,px,py,pz,group) {

        const body_geometry = new THREE.SphereGeometry( sx, sy, sz );
        const body_material = new THREE.MeshPhongMaterial({transparent: true,opacity: .7,color: 0x4000000});
        const body          = new THREE.Mesh(body_geometry, body_material);
        body.position.set(px, py, pz);
        group.add(body);

        const body_geometry_big = new THREE.SphereGeometry( bx, by, bz );
        const body_material_big = new THREE.MeshPhongMaterial({transparent: true,opacity: .2,color: 0x4610875});
        const body_big          = new THREE.Mesh(body_geometry_big, body_material_big);
        body_big.position.set(px, py, pz);
        group.add(body_big);

        const bomlight = new THREE.PointLight( 0xffffff, 1, 10000 );
        bomlight.position.set( -400, 400, 400 );
        group.add(bomlight);

    }
    bom_cylinder( 120, 64, 64, 140, 64, 64, 0, 0, 0, this.group);
    bom_cylinder( 25, 64, 64, 35, 64, 64, 0, 160, 60, this.group);
    bom_cylinder( 25, 64, 64, 35, 64, 64, 0, -160, 60, this.group);
    bom_cylinder( 25, 64, 64, 35, 64, 64, -160, 0, 60, this.group);
    bom_cylinder( 25, 64, 64, 35, 64, 64, 160, 0, 60, this.group);
  }
  moveBody() {
    this.group.rotation.z += 0.01;    
  }  
}


init();
animate();
