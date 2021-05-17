
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
    color: 0xffffff,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });

  let geometry = new THREE.TorusGeometry( (Math.random() + .5) * 400, 10, 2, 200);
  let mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh);

  let geometry2 = new THREE.TorusGeometry( (Math.random() + .55) * 400, 10, 2, 200);

  let mesh2 = new THREE.Mesh(geometry2, material)
  mesh2.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh2);

  let geometry3 = new THREE.TorusGeometry( (Math.random() + .6) * 400, 10, 2, 200);
  let mesh3 = new THREE.Mesh(geometry3, material)
  mesh3.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh3);

  let geometry4 = new THREE.TorusGeometry( (Math.random() + .65) * 400, 10, 2, 200);
  let mesh4 = new THREE.Mesh(geometry4, material)
  mesh4.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh4);

  let geometry5 = new THREE.TorusGeometry( (Math.random() + .7) * 400, 10, 2, 200);
  let mesh5 = new THREE.Mesh(geometry5, material)
  mesh5.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh5);

  /**
  * sun
  **/
  const s_Geometry = new THREE.SphereGeometry( 64, 64, 64 );
  const s_texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/sun.jpg');
  const s_materials = new THREE.MeshStandardMaterial( { color: 0xfffffff, map:s_texture } );
  const s_box = new THREE.Mesh( s_Geometry, s_materials );
  scene.add(s_box);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xfffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const light = new THREE.AmbientLight(0xFFFFFfF, 1.0);
  scene.add(light);

  // // ポイント光源
  const pointLight = new THREE.PointLight(0xfffffff, 1, 0, 1);
  scene.add(pointLight);

  // 光を作成
  let sp_texture = new THREE.TextureLoader().load('img/particle.png');

  const group = new THREE.Group();
  // 3D空間にグループを追加する
  scene.add(group);

  for (let i = 0; i < 200; i++) {
    let sp_material = new THREE.SpriteMaterial({
      color: 0xffffff,
      map: sp_texture,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    let sprite = new THREE.Sprite(sp_material);
    // ランダムな座標に配置
    sprite.position.x = 1000 * (Math.random() - 0.5);
    sprite.position.y = 1000 * (Math.random() - 0.5);
    sprite.position.z = 1000 * (Math.random() - 0.5);
    // 必要に応じてスケールを調整
    sprite.scale.set(30, 30, 30);
    group.add(sprite);
  }

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

    // 徐々に上へ
    // 徐々に薄く
    group.rotation.x -= 0.01;
    group.rotation.y -= 0.01;
    group.rotation.z -= 0.01;
    sp_texture.opacity 

    // レンダリング
    renderer.render(scene, camera);
    
    requestAnimationFrame(rotatemesh);
    
  }
}