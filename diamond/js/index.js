
// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {
  // サイズを指定
  const width = 900;
  const height = 450;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas'),
    alpha: true,
  });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( width, height );
  renderer.shadowMap.enabled = true;

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, +1000);


  // 光の輪を作成

  let c_texture = new THREE.TextureLoader().load('img/swirl.png');
  let material = new THREE.MeshBasicMaterial({
    map: c_texture,
    color: 0x007eff,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });

  let geometry = new THREE.TorusGeometry( (Math.random() + .5) * 400, 20, 2, 200);
  let mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh);

  let geometry2 = new THREE.TorusGeometry( (Math.random() + .5) * 400, 20, 2, 200);

  let mesh2 = new THREE.Mesh(geometry2, material)
  mesh2.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh2);

  let geometry3 = new THREE.TorusGeometry( (Math.random() + .5) * 400, 20, 2, 200);
  let mesh3 = new THREE.Mesh(geometry3, material)
  mesh3.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh3);

  let geometry4 = new THREE.TorusGeometry( (Math.random() + .5) * 400, 20, 2, 200);
  let mesh4 = new THREE.Mesh(geometry4, material)
  mesh4.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh4);

  let geometry5 = new THREE.TorusGeometry( (Math.random() + .5) * 400, 20, 2, 200);
  let mesh5 = new THREE.Mesh(geometry5, material)
  mesh5.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh5);

  /**
  * sun
  **/
  const s_Geometry = new THREE.SphereGeometry( 64, 64, 64 );
  const s_texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/sun.jpg');
  const s_materials = new THREE.MeshStandardMaterial( { color: 0xffffff, map:s_texture } );
  const s_box = new THREE.Mesh( s_Geometry, s_materials );
  scene.add(s_box);

  /**
  * 光を作成
  **/
  const sp_texture = new THREE.TextureLoader().load('img/particle.png');
  const sp_material = new THREE.SpriteMaterial({
    color: 0x007eff,
    map: sp_texture,
    transparent: true,
    blending: THREE.AdditiveBlending
  });
  const sprite = new THREE.Sprite(sp_material);
  scene.add(sprite);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
  scene.add(light);

  // // ポイント光源
  const pointLight = new THREE.PointLight(0xffffff, 1, 0, 1);
  scene.add(pointLight);

  tick();
  rotatemesh();

  cristal_step = 0;
  function rotatemesh() {
    mesh.rotation.x = 1;
    mesh.rotation.y += 0.01;

    mesh2.rotation.x += 0.01;
    mesh2.rotation.y -= 0.01;

    mesh3.rotation.x += 0.01;
    mesh3.rotation.y += 0.01;

    mesh4.rotation.x -= 0.01;
    mesh4.rotation.y += 0.01;

    mesh5.rotation.x -= 0.01;
    mesh5.rotation.y -= 0.01;

    sprite.position.y += 0.1;
    //sp_material.opacity -= 0.01;

    requestAnimationFrame(rotatemesh);
    
  }

  // 毎フレーム時に実行されるループイベントです
  function tick() {

    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}