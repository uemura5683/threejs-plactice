  window.addEventListener('load', Resize);
  window.addEventListener('resize', Resize);
  
  let width = 100, height = 100;

  function Resize() {

    let width = window.innerWidth,
        height = window.innerHeight;

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
    camera.position.set(0, 0, +1000);

    // 箱を作成
    // const geometry = new THREE.BoxGeometry(400, 400, 400);
    // const material = new THREE.MeshNormalMaterial();
    // const box = new THREE.Mesh(geometry, material);
    // scene.add(box);

    tick();

    function tick() {
      // box.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
  }