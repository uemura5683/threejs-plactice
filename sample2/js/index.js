    // ページの読み込みを待つ
    window.addEventListener('load', init);

    function init() {

      // サイズを指定
      const width = 960;
      const height = 540;

      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
        antialias: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      // シーンを作成
      const scene = new THREE.Scene();

      // カメラを作成
      const camera = new THREE.PerspectiveCamera(45, width / height);
      camera.position.set(0, 0, +1000);

      // ドーナッツを作成
      const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
      // マテリアルを作成
      // const material = new THREE.MeshBasicMaterial({color: 0x6699FF});
      const material = new THREE.MeshStandardMaterial({color: 0x6699FF, roughness:0.5});

      // メッシュを作成
      const mesh = new THREE.Mesh(geometry, material);

      // 3D空間にメッシュを追加
      scene.add(mesh);

      // 平行光源
      const directionalLight = new THREE.DirectionalLight(0xffff00);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // ポイント光源
      const pointLight = new THREE.PointLight(0xffff00, 1, 10000);
      scene.add(pointLight);

      tick();

      // 毎フレーム時に実行されるループイベントです
      function tick() {
        // メッシュを回転させる
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        // レンダリング
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
      }
    }