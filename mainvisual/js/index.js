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
      camera.lookAt(new THREE.Vector3(0,0,20));

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
      * sun
      **/
      const s_Geometry = new THREE.SphereGeometry( 200, 200, 200 );
      const s_texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/sun.jpg');
      const s_materials = new THREE.MeshStandardMaterial( { color: 0xffffff, map:s_texture } );
      const s_box = new THREE.Mesh(s_Geometry, s_materials );
      scene.add(s_box);
      
      /**
       * mountains
       */
      const mountains_material = new THREE.MeshBasicMaterial( { color:0xffffff, wireframe:true, transparent:false } );
      const mountains_shape = new THREE.Shape();
      mountains_shape.moveTo(  -800, 0 );
      mountains_shape.lineTo(  -650, 100 );
      mountains_shape.lineTo(  -650, 0 );
      mountains_shape.lineTo(  -650, 100 );
      mountains_shape.lineTo( -500, 25 );
      mountains_shape.lineTo( -400, 100 );
      mountains_shape.lineTo( -400, 0 );
      mountains_shape.lineTo( -400, 100 );
      mountains_shape.lineTo( -250, 25 );
      mountains_shape.lineTo( -75, 150 );
      mountains_shape.lineTo( -75, 0 );
      mountains_shape.lineTo( -75, 150 );
      mountains_shape.lineTo( 100, 50 );
      mountains_shape.lineTo( 100, 0 );
      mountains_shape.lineTo( 100, 50 );
      mountains_shape.lineTo( 350, 150 );
      mountains_shape.lineTo( 350, 0 );
      mountains_shape.lineTo( 350, 150 );
      mountains_shape.lineTo( 700, 50 );
      mountains_shape.lineTo( 700, 0 );
      mountains_shape.lineTo( 700, 50 );
      mountains_shape.lineTo( 800, 150 );
      mountains_shape.lineTo( 900, 0 );
  
      const mountains_geometry = new THREE.ShapeGeometry( mountains_shape );
      const mountains = new THREE.Mesh( mountains_geometry, mountains_material );
      mountains.rotation.x = degree(90);
      mountains.position.y = 450;
      scene.add( mountains );

      /**
       * stars
       */
      const vertexShader =`
        precision mediump float;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        attribute vec3 position;
        attribute vec3 customColor;
        attribute float size;
        varying vec3 vColor;
        void main(){
          vec4 mvPosition = modelViewMatrix * vec4(position,1.0);
          gl_PointSize = size * (1.0 / length(mvPosition.xyz));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          vColor = customColor;
        }
      `;
      const fragmentShader =`
        precision mediump float;
        uniform sampler2D texture;
        varying vec3 vColor;    
        void main(){
          vec4 texcel = texture2D(texture,gl_PointCoord);    
          gl_FragColor = vec4(vColor,1.0) * texcel;
        }
      `;
    
      let points;
      const r = 50;
      const starsNum = 1000;
      const stargeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starsNum * 3);
      const colors = new Float32Array(starsNum * 3);
      const sizes = new Float32Array(starsNum);
    
        for(let i = 0; i < starsNum; i++){
          const theta = Math.PI * Math.random();
          const phi = Math.PI * Math.random() * 2;
      
          positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
          positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
          positions[i * 3 + 2] = r * Math.cos(theta);
      
          colors[i * 3] = 1.0;
          colors[i * 3 + 1] = 1.0;
          colors[i * 3 + 2] = 1.0;
      
          sizes[i] = 200;
        }
      
        stargeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
        stargeometry.setAttribute('customColor',new THREE.BufferAttribute(colors,3));
        stargeometry.setAttribute('size',new THREE.BufferAttribute(sizes,1));
        const uniforms = {
          texture:{type:'t',value:new THREE.TextureLoader().load('https://uemu-engineer.com/images/three/var4/star.png')}
        };
        const starmaterial = new THREE.RawShaderMaterial({
          uniforms:uniforms,
          vertexShader:vertexShader,
          fragmentShader:fragmentShader,
          transparent:false,
          depthTest:false
        });
        points = new THREE.Points(stargeometry,starmaterial);
        points.position.y = -500;
        scene.add(points);

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

        /**
        * light
        **/
        scene.add( new THREE.HemisphereLight( 0xffffff, 0xffffff, 3 ) );
        const directLight1 = new THREE.DirectionalLight(0xffffff);
        directLight1.castShadow = true;
        directLight1.position.set(0, 0, 1);
        scene.add(directLight1);

        animate();

        function animate() {

          rot += .05;

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
          const e_radian = ( rot * Math.PI ) / 50;
          e_box.position.x = 0;
          e_box.position.y = 1500 * Math.cos( e_radian );
          e_box.position.z = 1000 * Math.sin( e_radian );

          /**
          * sun
          **/
          const s_radian = ( rot * Math.PI ) / 50;
          s_box.position.x = 0;
          s_box.position.y = -1500 * Math.cos( s_radian );
          s_box.position.z = -1000 * Math.sin( s_radian );

          moveCamera( Date.now() - time );

          renderer.render( scene, camera );
          time = Date.now();
          window.requestAnimationFrame(animate);

          /**
           * star
          **/
          points.rotation.x += 0.005;

        }

    }

    function degree(degrees) {
      return degrees * (Math.PI / 180);
    }

    function moveCamera(delta) {
        delta *= 0.1;
        velocity += ( - velocity ) * 0.04 * delta;
        var multi = speed / 20;
        if ( moveLeft ) velocity -= multi * delta;
        if ( moveRight ) velocity += multi * delta;
        camera.translateX( velocity );
    }