  window.addEventListener('load', Resize);
  window.addEventListener('resize', Resize);
  
  let width = 100, height = 100;


function draw_pumpkin(scene) {

    /**
    * head
    **/
    const head_geometry = new THREE.CylinderGeometry(10,10,40,50)
        , head_material = new THREE.MeshPhongMaterial({color: 648035});
    const head_box = new THREE.Mesh( head_geometry, head_material );
    head_box.position.set(0, 180, 0);
    head_box.rotation.set(0, 0, 0);
    scene.add(head_box); 

    /**
    * body
    **/
    body_field(0,0,0, 0,0,0, scene);
    body_field(0,0,0, 0,-Math.PI/2,0, scene);
    body_field(0,0,0, 0,-.75,0, scene);
    body_field(0,0,0, 0,.75,0, scene);

    /**
    * eye
    **/
    eyeField(60,80,  20,-30,-20,-30,-20, 20,  70, 70, 190,  -.5, .3, 0, scene);
    eyeField(80,60,  -20,30,-20,-30,20,-20,  -70, 70, 190,  -.5, -.3, 1.5, scene);

    /**
    * mouth
    **/
    mouthField(0, 100,  0, -50,  -50, -50, 0, 40,  90, -10, 210,  0, .3, -.75, scene);
    mouthField_mdl(30, -10, 225,  0, 0, -.5, scene);
    mouthField_mdl(-23, -10, 225,  0, 0, .5, scene);
    mouthField(100, 0,  -50, 0,  -50, -50, 40, 0,  -80, -10, 210,  0, -.3, 2.25, scene);
}

function body_field(a,b,c,d,e,f,sc) {
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
    sc.add(pumpkin_box);
}


function eyeField (a,b, c,d,e, f,g,h, i,j,k, l,m,n, sc) {
    const eye_material = new THREE.MeshBasicMaterial( { color: 0xd80202 } )
        , eye = new THREE.Shape();
    eye.moveTo(a,b);
    eye.bezierCurveTo(c,d,e,f,g,h);
    const eye_geometry = new THREE.ShapeGeometry( eye )
        , eye_box = new THREE.Mesh( eye_geometry, eye_material )
    eye_box.position.set(i, j, k);
    eye_box.rotation.set(l, m, n);
    sc.add( eye_box );
}

function mouthField(a,b,c,d,e,f,g,h,i,j,k,l,m,n,sc) {
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
    sc.add( mouth_box );
}

function mouthField_mdl(a,b,c,d,e,f,sc) {
    const mouth_geometry = new THREE.BoxGeometry(80, 40, 1)
        , mouth_material = new THREE.MeshBasicMaterial({ color: 0xd80202})
        , mouth_box = new THREE.Mesh(mouth_geometry, mouth_material);
    mouth_box.position.set(a, b, c);
    mouth_box.rotation.set(d, e, f);
    sc.add(mouth_box);
}

function Resize() {

    let width = window.innerWidth,
        height = window.innerHeight,
        rot = 0;

    /**
    * renderer
    **/
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#myCanvas'),
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;

    /**
    * scene
    **/
    const scene = new THREE.Scene();

    /**
    * camera
    **/
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 160, +1000);

    /**
    * controls
    **/
    const controls = new THREE.OrbitControls(camera, document.body);

    /**
    * moon
    **/
    const moon = new THREE.SphereBufferGeometry( 50, 50, 50 );
    const moon_texture = new THREE.TextureLoader().load('https://threejs-plactice.vercel.app/earth/img/moon.jpg');
    const moon_materials = new THREE.MeshStandardMaterial( { color: 0xffffff, map:moon_texture } );
    const moon_box_mesh = new THREE.Mesh( moon, moon_materials );
    moon_box_mesh.position.set(100, 400, -1000);
    scene.add(moon_box_mesh);


    /**
    * plane
    **/
    const plane = new THREE.PlaneGeometry(3000, 3000, 64, 64);
    const map1 = THREE.ImageUtils.loadTexture('floor.jpg');
    const plane_box =  new THREE.Mesh( plane, new THREE.MeshLambertMaterial( { map: map1 } ) );
    plane_box.position.set(0, -150, 0);
    plane_box.rotation.set(-Math.PI/2, 0, 0);
    scene.add(plane_box);   

    /**
    * draw_pumpkin
    **/
    draw_pumpkin(scene);

    /**
    * text
    **/
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

        text_geometry.translate( xmid, -100, 500, );

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
              text_geometry.translate( xmid, -100, 500, );
              let lineMesh = new THREE.Line( text_geometry, matDark );
              lineText.add( lineMesh );
            }
            scene.add( lineText );
        }
     );


    /**
    * light
    **/
    const directionalLight = new THREE.DirectionalLight(0xE8CE88);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    /**
    * pointLight
    **/
    const pointLight = new THREE.PointLight(0xE8CE88, 2, 1000);
    scene.add(pointLight);

    tick();

    function tick() {
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
}
