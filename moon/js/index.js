     // ページの読み込みを待つ
      window.addEventListener('load', init);

      function init() {
        // サイズを指定
        const width = 960;
        const height = 540;
        let rot = 0; // 角度

        // レンダラーを作成
        const renderer = new THREE.WebGLRenderer({
          canvas: document.querySelector('#myCanvas')
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.setClearColor(0x0E2255);
        renderer.shadowMap.enabled = true;

        // シーンを作成
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffaa, 50, 2000);

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(45, width / height);
        camera.position.set(0, 0, 2000);

        // 月を作成
        const m_Geometry = new THREE.SphereGeometry(400, 40, 40);
        const m_texture = new THREE.TextureLoader().load('img/moon.jpg');
        const m_materials = new THREE.MeshStandardMaterial( { map:m_texture } );
        const m_box = new THREE.Mesh(m_Geometry, m_materials);
        scene.add(m_box);

        // 星屑を作成します
        createStarField();

        function createStarField() {
          // 形状データを作成
          const s_geometry = new THREE.SphereGeometry( 5, 32, 32 );
          // 配置する範囲
          const SIZE = 3000;
          // 配置する個数
          const LENGTH = 1500;
          for (let i = 0; i < LENGTH; i++) {
            s_geometry.vertices.push(
              new THREE.Vector3(
                SIZE * (Math.random() - 0.5),
                SIZE * (Math.random() - 0.5),
                SIZE * (Math.random() - 0.5)
              )
            );
          }
          // マテリアルを作成
          const s_material = new THREE.PointsMaterial({
            // 一つ一つのサイズ
            size: 10,
            transparent: true,
            // 色
            color: 0xffffff
          });

          // 物体を作成
          const s_box = new THREE.Points(s_geometry, s_material);
          scene.add(s_box);

        }


        // 平行光源
        const directionalLight = new THREE.AmbientLight(0xffffff, 1.0);
        directionalLight.position.set(2000, 2000, 2000);
        // シーンに追加
        scene.add(directionalLight);

        tick();

        // 毎フレーム時に実行されるループイベントです
        function tick() {
          rot += 1;

          // レンダリング
          renderer.render(scene, camera);

          // ラジアンに変換する
          const radian = (rot * Math.PI) / 400;
          // 角度に応じてカメラの位置を設定
          camera.position.x = 1500 * Math.sin(radian);
          camera.position.z = 1500 * Math.cos(radian);

          // 1秒で45°回転する
          m_box.rotation.x = 500 * (Math.PI / 1);
          m_box.rotation.z = 500 * (Math.PI / 1);


          // 原点方向を見つめる
          camera.lookAt(new THREE.Vector3(0, 0, 0));


          requestAnimationFrame(tick);
        }
      }