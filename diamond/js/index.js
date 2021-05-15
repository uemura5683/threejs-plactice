
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
  let material = new THREE.MeshStandardMaterial({ color: 0x6699ff});
  // メッシュを作成
  let mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);

  // 3D空間にメッシュを追加
  scene.add(mesh);

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
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  tick();
  rotateCristal();

  cristal_step = 0;
  function rotateCristal() {
    mesh.rotation.x = 1;
    mesh.rotation.y += 0.01;

    s_box.rotation.x += 0.01;
    s_box.rotation.y += 0.01;
    // rotateCristal()関数をループで呼び出す
    requestAnimationFrame(rotateCristal);
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