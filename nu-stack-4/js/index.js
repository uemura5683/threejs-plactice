window.addEventListener( 'load', init );

    var polys, planes;
    var paused = false;
    var speed = 10;
    var horizon = 3000;
    var time = Date.now();
    var moveLeft = false;
    var moveRight = false;
    var velocity = 0;
    var rot = 0;


    init();

    function init(){

        renderer = new THREE.WebGLRenderer({
          canvas: document.querySelector('#myCanvas'),
          alpha: true,
        });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMap.enabled = true;        

        document.body.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, horizon);

        camera.position.y = -500;
        camera.position.z = 20;

        camera.lookAt(new THREE.Vector3(0,0,0));

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( renderer.getClearColor(), 0.0005 );

        /**
        * earch
        **/
        const e_Geometry = new THREE.SphereGeometry( 200, 200, 200 );
        const e_texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/earch.jpg');
        const e_materials = new THREE.MeshStandardMaterial( { color: 0xffffff, map:e_texture } );
        const e_box = new THREE.Mesh(e_Geometry, e_materials );
        scene.add(e_box);

        /**
        * light
        **/
        const directLight1 = new THREE.DirectionalLight(0xffffff);
        directLight1.castShadow = true;
        directLight1.position.set(0, 0, 1);
        scene.add(directLight1);

        /**
         * plane
         */
        const plane_back = new THREE.PlaneGeometry(3000, 3000, 64, 64);
        const material = new THREE.MeshStandardMaterial( {color: 0x000000, side: THREE.DoubleSide} );
        const plane_back_box =  new THREE.Mesh( plane_back, material);
        plane_back_box.position.z = -22;
        scene.add(plane_back_box);

        /**
         * plane2
         */
        planes = [];
        var planeSegments = 60;
        var plane = new THREE.Mesh(
          new THREE.PlaneGeometry(horizon, horizon, planeSegments, planeSegments),
          new THREE.MeshBasicMaterial({ color:0xffffff, wireframe:true, transparent:true })
        );
        plane.position.z = -20;
        planes[0] = plane;
        planes[1] = plane.clone();
        planes[1].position.y = plane.position.y + horizon;
        planes[2] = plane.clone();
        planes[2].position.y = plane.position.y + horizon * 2;
        scene.add(planes[0]);
        scene.add(planes[1]);
        scene.add(planes[2]);

        animate();

        function animate() {

          rot += .1;

          if (!paused) {
              if(planes[0].position.y < - horizon ){
                planes[0].position.y = planes[2].position.y + horizon;
              }
  
              if(planes[1].position.y < - horizon ){
                planes[1].position.y = planes[0].position.y + horizon;
              }
  
              if(planes[2].position.y < - horizon ){
                planes[2].position.y = planes[1].position.y + horizon;
              }
  
              planes[0].position.y +=- speed ;
              planes[1].position.y +=- speed ;
              planes[2].position.y +=- speed ;
          }

          /**
          * moon
          **/
          const e_radian = ( rot * Math.PI ) / 100;
          e_box.position.x = 0;
          e_box.position.y = 1500 * Math.cos( e_radian );
          e_box.position.z = 1000 * Math.sin( e_radian );

          moveCamera( Date.now() - time );
  
          renderer.render( scene, camera );
          time = Date.now();
          window.requestAnimationFrame(animate);
  
      }

    }

    function moveCamera(delta) {
        delta *= 0.1;
        velocity += ( - velocity ) * 0.04 * delta;
        var multi = speed / 20;
        if ( moveLeft ) velocity -= multi * delta;
        if ( moveRight ) velocity += multi * delta;
        camera.translateX( velocity );
    }





