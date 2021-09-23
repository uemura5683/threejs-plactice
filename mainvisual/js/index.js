  window.addEventListener('load', Resize);
  window.addEventListener('resize', Resize);
  
  let width = 100, height = 100;

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }


  function Resize() {

    let width = window.innerWidth,
        height = window.innerHeight;

    /**
    * renderer
    **/
    let renderer = new THREE.WebGLRenderer({
                      canvas: document.querySelector('#myCanvas'),
                      alpha: true
                   });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    /**
    * scene
    **/
    let scene = new THREE.Scene();

    /**
    * camera
    **/
    let camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, 1500);

    /**
    * controls
    **/
    let controls = new THREE.OrbitControls(
                       camera,
                       document.querySelector('#myCanvas')
                   );

    /**
    * circle
    **/
    let circle_size = 950;
    let circle = new THREE.SphereGeometry(
                          circle_size,
                          circle_size,
                          circle_size
                        );
    let circle_mat = new THREE.MeshPhongMaterial( {
                          transparent: true,
                          opacity: 0.1,
                          color: 0x000000
                        } );

    circle_box = new THREE.Mesh(circle, circle_mat);
    circle_box.position.x = 0;
    scene.add(circle_box);

    /**
    * texts
    **/
    let loader = new THREE.FontLoader();
    loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
      let matDark = new THREE.LineBasicMaterial( {
        color: 0x000000,
        opacity: .7,
        side: THREE.DoubleSide
      } );
      let matLite = new THREE.MeshBasicMaterial( {
        color: 0x000000,
        transparent: true,
        opacity: .7,
        side: THREE.DoubleSide
      } );

      for (let i = 0; i < 120; i++) {
        let message = ['html','css','Javascript','php','jQuery','vue.js','React.js','node.js','gulp.js','SCSS','Wordpress','Movable type','micro cms','typescript', 'go', 'nuxt.js', 'next.js'],
            christalNo = Math.floor( Math.random() * message.length),
            shapes = font.generateShapes( message[christalNo], 30 ),
            text_geometry = new THREE.ShapeGeometry( shapes ),
            size = 1000;
        
        text_geometry.computeBoundingBox();

        switch (true) {
          case ( i % 8 == 0 ):
            xcode = getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            ycode = getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            zcode = getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
          break;
          case ( i % 8 == 1 ):
            xcode = -getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            ycode = getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            zcode = getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
          break;
          case ( i % 8 == 2 ):
            xcode = getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            ycode = -getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            zcode = getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
          break;
          case ( i % 8 == 3 ):
            xcode = getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            ycode = getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            zcode = -getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
          break;
          case ( i % 8 == 4 ):
            xcode = -getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            ycode = getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            zcode = -getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
          break;
          case ( i % 8 == 5 ):
            xcode = getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            ycode = -getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            zcode = -getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
          break;
          case ( i % 8 == 6 ):
            xcode = -getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            ycode = -getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            zcode = getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
          break;
          default:
            xcode = -getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            ycode = -getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );
            zcode = -getRandomArbitrary( circle_size / 1.5, -circle_size / 1.5 );              
          break;
        }

        text_geometry.translate(
          xcode,
          ycode,
          zcode,
        );

        let text = new THREE.Mesh( text_geometry, matLite );
            text.position.z = -5;
            scene.add( text );

            let holeShapes = [];

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

              text_geometry.translate(
                xcode,
                ycode,
                zcode
              );
              let lineMesh = new THREE.Line( text_geometry, matDark );
              lineText.add( lineMesh );
            }
            scene.add( lineText );
        }
    } );

    tick();

    function tick() {
      scene.rotation.x += 0.005;
      scene.rotation.y += 0.005;
      scene.rotation.z += 0.005;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
  }