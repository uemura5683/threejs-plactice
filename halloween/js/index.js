  window.addEventListener('load', Resize);
  window.addEventListener('resize', Resize);
  
  let width = 100, height = 100;

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
    moon_box_mesh.position.set(100, 400, 1000);
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
    * light
    **/
    const directionalLight = new THREE.DirectionalLight(0xE8CE88);
    directionalLight.position.set(0, 1, -1);
    scene.add(directionalLight);

    /**
    * pointLight
    **/
    const pointLight = new THREE.PointLight(0xE8CE88, 2, 1000);
    scene.add(pointLight);

    tick();

    function tick() {
      scene.rotation.y -= 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
  }