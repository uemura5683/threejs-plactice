  window.addEventListener('load', Resize);
  window.addEventListener('resize', Resize);
  
  let width = 940, height = 500;

  function Resize() {

    /**
    * width height
    **/
    let width = window.innerWidth,
        height = window.innerHeight;

    /**
    * renderer
    **/
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#myCanvas')
    });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    /**
    * scene
    **/
    const scene = new THREE.Scene();

    /**
    * camera
    **/
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1000);

    /**
    * controls
    **/
    const controls = new THREE.OrbitControls(camera, document.body);

    /**
    * body
    **/
    const kirby_body = new THREE.SphereBufferGeometry(250, 250, 250);
    const kirby_body_material = new THREE.MeshBasicMaterial({color: 0xFF9DB4});
    const kirby_box = new THREE.Mesh(kirby_body, kirby_body_material);
    scene.add(kirby_box);

    /**
    * eye
    **/
    const eye =  new THREE.ParametricGeometry( function( u, v, target ) {
                            u = u * Math.PI;
                            v = v * 2 * Math.PI;
                            var x = 25 * Math.sin(u) * Math.cos(v);
                            var y = 60 * Math.sin(u) * Math.sin(v); 
                            var z = 1 * Math.cos(u);
                            target.set( x, y, z );
                        }, 80, 80, true
                   );

    const eyes_material = new THREE.MeshBasicMaterial({color: 0x000000});

    const eyes_box_left = new THREE.Mesh(eye, eyes_material);
    eyes_box_left.position.set(-65, 10, 247);
    scene.add(eyes_box_left);

    const eyes_boxr_right = new THREE.Mesh(eye, eyes_material);
    eyes_boxr_right.position.set(65, 10, 247);
    scene.add(eyes_boxr_right);

    /**
    * eye white
    **/
    const eye_white = new THREE.ParametricGeometry( function( u, v, target ) {
                            u = u * Math.PI;
                            v = v * 2 * Math.PI;
                            var x = 15 * Math.sin(u) * Math.cos(v);
                            var y = 35 * Math.sin(u) * Math.sin(v); 
                            var z = 1 * Math.cos(u);
                            target.set( x, y, z );
                        }, 100, 100, true
                   );

    const eyes_white_material = new THREE.MeshBasicMaterial({color: 0xffffff});
    const eyes_white_box_left = new THREE.Mesh(eye_white, eyes_white_material);
    eyes_white_box_left.position.set(-65, 30, 250);
    scene.add(eyes_white_box_left);

    const eyes_white_box_right = new THREE.Mesh(eye_white, eyes_white_material);
    eyes_white_box_right.position.set(65, 30, 250);
    scene.add(eyes_white_box_right);

    /**
    * mouth
    **/
    var mouth_material = new THREE.MeshBasicMaterial( { color: 0xd80202 } );
    var mouth = new THREE.Shape();
    mouth.moveTo(20,20);
    mouth.bezierCurveTo(20,-30,-20,-30,-20, 20);

    const mouth_geometry = new THREE.ShapeGeometry( mouth );
    const mouth_box = new THREE.Mesh( mouth_geometry, mouth_material )
    mouth_box.position.set(0.25, -100, 240);

    scene.add( mouth_box );

    /**
    * cheek
    */
    const cheek = new THREE.ParametricGeometry( function( u, v, target ) {
                            u = u * Math.PI;
                            v = v * 2 * Math.PI;
                            var x = 20 * Math.sin(u) * Math.cos(v);
                            var y = 35 * Math.sin(u) * Math.sin(v); 
                            var z = 1 * Math.cos(u);
                            target.set( x, y, z );
                        }, 100, 100, true
                   );

    const cheek_material = new THREE.MeshBasicMaterial({color: 0xf0608b});
    const cheek_box_left = new THREE.Mesh(cheek, cheek_material);
    cheek_box_left.position.set(-120, -50, 240);
    cheek_box_left.rotation.set(0.25, 0, 1.5);
    scene.add(cheek_box_left);

    const cheek_box_right = new THREE.Mesh(cheek, cheek_material);
    cheek_box_right.position.set(120, -50, 240);
    cheek_box_right.rotation.set(0.25, 0, -1.5);
    scene.add(cheek_box_right);


    /**
    * hand
    **/
    const hand =  new THREE.ParametricGeometry( function( u, v, target ) {
                            u = u * Math.PI;
                            v = v * 2 * Math.PI;
                            var x = 80 * Math.sin(u) * Math.cos(v);
                            var y = 60 * Math.sin(u) * Math.sin(v); 
                            var z = 60 * Math.cos(u);
                            target.set( x, y, z );
                        }, 80, 80, true
                   );
    const hand_material = new THREE.MeshBasicMaterial({color: 0xFC9DB4});

    const hand_box_left = new THREE.Mesh(hand, hand_material);
    hand_box_left.position.set(-225, 10, 125);
    hand_box_left.rotation.set(5, 0, 0);
    scene.add(hand_box_left);

    const hand_box_right = new THREE.Mesh(hand, hand_material);
    hand_box_right.position.set(215, 100, 125);
    hand_box_right.rotation.set(0, 5, 0);
    scene.add(hand_box_right);

    /**
    * foot
    **/
    const footer =  new THREE.ParametricGeometry( function( u, v, target ) {
                            u = u * Math.PI;
                            v = v * 2 * Math.PI;
                            var x = 110 * Math.sin(u) * Math.cos(v);
                            var y = 60 * Math.sin(u) * Math.sin(v); 
                            var z = 90 * Math.cos(u);
                            target.set( x, y, z );
                        }, 80, 80, true
                   );
    const footer_material = new THREE.MeshBasicMaterial({color: 0xaf2d13});

    const footer_box_left = new THREE.Mesh(footer, footer_material);
    footer_box_left.position.set(-150, -150, 220);
    footer_box_left.rotation.set(Math.PI / 1.5, Math.PI/2, 0);
    scene.add(footer_box_left);

    const footer_box_right = new THREE.Mesh(footer, footer_material);
    footer_box_right.position.set(180, -220, 50);
    footer_box_right.rotation.set(0, 0, 0);
    scene.add(footer_box_right);

    tick();

    function tick() {
      scene.rotation.y += 0.005;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
  }
