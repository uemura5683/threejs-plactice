
// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {
  // サイズを指定
  const width = 960;
  const height = 540;

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


    // マテリアルを作成

  let geometry = new THREE.TorusGeometry( (Math.random() + .5) * 400, 5, 24, 200);
  let material = new THREE.MeshBasicMaterial({
    color: 0xEEF7FC,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide
  });
  let mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh);

  let geometry2 = new THREE.TorusGeometry( (Math.random() + .5) * 400, 5, 24, 200);
  let material2 = new THREE.MeshBasicMaterial({
    color: 0xEEF7FC,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide
  });
  let mesh2 = new THREE.Mesh(geometry2, material2)
  mesh2.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh2);

  let geometry3 = new THREE.TorusGeometry( (Math.random() + .5) * 400, 5, 24, 200);
  let material3 = new THREE.MeshBasicMaterial({
    color: 0xEEF7FC,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide
  });
  let mesh3 = new THREE.Mesh(geometry3, material3)
  mesh3.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh3);

  let geometry4 = new THREE.TorusGeometry( (Math.random() + .5) * 400, 5, 24, 200);
  let material4 = new THREE.MeshBasicMaterial({
    color: 0xEEF7FC,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide
  });
  let mesh4 = new THREE.Mesh(geometry4, material4)
  mesh4.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh4);

  let geometry5 = new THREE.TorusGeometry( (Math.random() + .5) * 400, 5, 24, 200);
  let material5 = new THREE.MeshBasicMaterial({
    color: 0xEEF7FC,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide
  });
  let mesh5 = new THREE.Mesh(geometry5, material5)
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

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // // ポイント光源
  const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
  scene.add(pointLight);
  // const pointLightHelper = new THREE.PointLightHelper(pointLight, 0);
  // scene.add(pointLightHelper);

  tick();
  rotatemesh();
  rotatesun();

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

    requestAnimationFrame(rotatemesh);
  }

  function rotatesun() {
    s_box.rotation.x += 0.01;
    s_box.rotation.y += 0.01;
    requestAnimationFrame(rotatesun);
  }

  // 毎フレーム時に実行されるループイベントです
  function tick() {

    pointLight.position.set(
      500 * Math.sin(Date.now() / 500),
      500 * Math.sin(Date.now() / 500),
      500 * Math.cos(Date.now() / 500)
    );

    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}