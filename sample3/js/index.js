// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {
  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(20, 20, 20);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 床を作成
  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.0 })
  );
  scene.add(meshFloor);

  // オブジェクトを作成
  const meshKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(3, 1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaaffff, roughness: 0.0 })
  );
  meshKnot.position.set(0, 5, 0);
  scene.add(meshKnot);

  // 平行光源を作成
  // new THREE.DirectionalLight(色, 光の強さ)
  const light = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(light);

  // 照明を可視化するヘルパー
  const lightHelper = new THREE.DirectionalLightHelper(light);
  scene.add(lightHelper);

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // レンダリング
    renderer.render(scene, camera);

    // 照明の位置を更新
    const t = Date.now() / 500;
    const r = 10.0;
    const lx = r * Math.cos(t);
    const lz = r * Math.sin(t);
    const ly = 6.0 + 5.0 * Math.sin(t / 3.0);
    light.position.set(lx, ly, lz);
    lightHelper.update();

    requestAnimationFrame(tick);
  }
}