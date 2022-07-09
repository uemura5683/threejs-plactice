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
  * dumpling
  **/
  const geometry = new THREE.SphereBufferGeometry(40, 40, 40);
  const dumpling = new THREE.MeshPhongMaterial({color: 0xE6E1CA});

  for (let li = 0; li <= 13; li++){
    const dumpling_box = new THREE.Mesh(geometry, dumpling);
    switch (true) {
      case li === 0:
        dumpling_box.position.set(0, 240, 0);
        break;
      case li === 1:
        dumpling_box.position.set(-40, 180, -40);
        break;
      case li === 2:
        dumpling_box.position.set(40, 180, -40);
        break;
      case li === 3:
        dumpling_box.position.set(-40, 180, 40);
        break;
      case li === 4:
        dumpling_box.position.set(40, 180, 40);
        break;
      case li === 5:
        dumpling_box.position.set(-80, 120, 80);
        break;
      case li === 6:
        dumpling_box.position.set(0, 120, 80);
        break;
      case li === 7:
        dumpling_box.position.set(80, 120, 80);
        break;
      case li === 8:
        dumpling_box.position.set(-80, 120, 0);
        break;
      case li === 9:
        dumpling_box.position.set(80, 120, 0);
        break;
      case li === 10:
        dumpling_box.position.set(80, 120, -80);
        break;
      case li === 11:
        dumpling_box.position.set(0, 120, -80);
        break;
      case li === 12:
        dumpling_box.position.set(-80, 120, -80);
        break;
      default:       
        dumpling_box.position.set(0, 120, 0);
        break;
    }
    scene.add(dumpling_box);
  }

  /**
  * box
  **/
  const box_top = new THREE.CylinderGeometry(200, 200, 50, 8);
  const box_material = new THREE.MeshPhongMaterial({color: 0xd0b893});
  const box_mesh = new THREE.Mesh(box_top, box_material);
  box_mesh.position.set(0, 60, 0);
  scene.add(box_mesh);

  /**
  * box_ring
  **/
  const box_ring = new THREE.TorusGeometry( 190, 10, 5, 8 );
  const box_ring_material = new THREE.MeshPhongMaterial({color: 0xd0b893});
  const box_ring_mesh = new THREE.Mesh( box_ring, box_ring_material );
  box_ring_mesh.position.set(0, 90, 0);
  box_ring_mesh.rotation.set(Math.PI/2, 0, 0);
  scene.add( box_ring_mesh );

  /**
  * box_bottom
  **/
  const box_bottom = new THREE.CylinderGeometry(120, 120, 200, 8);
  const box_bottom_material = new THREE.MeshPhongMaterial({color: 0xd0b893});
  const box_bottom_mesh = new THREE.Mesh(box_bottom, box_bottom_material);
  box_bottom_mesh.position.set(0, -40, 0);
  scene.add( box_bottom_mesh );

  /**
  * moon
  **/
  const moon = new THREE.SphereBufferGeometry( 50, 50, 50 );
  const moon_texture = new THREE.TextureLoader().load('img/moon.jpg');
  const moon_materials = new THREE.MeshStandardMaterial( { color: 0xffffff, map:moon_texture } );
  const moon_box_mesh = new THREE.Mesh( moon, moon_materials );
  moon_box_mesh.position.set(100, 400, 1000);
  scene.add(moon_box_mesh);

  /**
  * fragment
  **/
  createStarField();
  function createStarField() {
    const geometry = new THREE.SphereBufferGeometry(3, 3, 3),
          size = 1;
    for (let i = 0; i < 1000; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(1 * Math.random() - 0.5, 1 * Math.random() - 0.5 , 1 * Math.random() - 0.5 ).normalize()
      mesh.position.multiplyScalar(Math.random() * 1500)
      mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2)
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 1
      scene.add(mesh)
    }
  }

  /**
  * plane
  **/
  const plane = new THREE.PlaneGeometry(3000, 3000, 64, 64);
  const map1 = THREE.ImageUtils.loadTexture('img/floor.jpg');
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