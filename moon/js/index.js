     // ページの読み込みを待つ
      window.addEventListener('load', init);

      function init() {
        // サイズを指定
        const width = 960;
        const height = 540;
        let rot = 0;

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

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(45, width / height);
        camera.position.set(400, 350, 1000);

        // 地球を作成
        const e_Geometry = new THREE.SphereGeometry(200, 64, 64);
        const e_texture = new THREE.TextureLoader().load('img/earch.jpg');
        const e_materials = new THREE.MeshStandardMaterial( { color: 0xffffff, map:e_texture } );
        const e_box = new THREE.Mesh(e_Geometry, e_materials);
        scene.add(e_box);

        // 月を作成
        const m_Geometry = new THREE.SphereGeometry(34, 64, 64);
        const m_texture = new THREE.TextureLoader().load('img/moon.jpg');
        const m_materials = new THREE.MeshStandardMaterial( { color: 0xffffff, map:m_texture } );
        const m_box = new THREE.Mesh(m_Geometry, m_materials);
        scene.add(m_box);

        // 雲を作成
        const c_texture = new THREE.TextureLoader().load('img/crowd.png');
        const c_materials = new THREE.MeshStandardMaterial( { map:c_texture, transparent: true, side: THREE.DoubleSide } );
        const c_box = new THREE.Mesh(m_Geometry, c_materials);
        scene.add(c_box);

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
            blending: THREE.AdditiveBlending,
            // 色
            color: 0xffffff
          });

          // 物体を作成
          const s_box = new THREE.Points(s_geometry, s_material);
          scene.add(s_box);

        }


        // 平行光源
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1000, 1300, 80);
        // シーンに追加
        scene.add(directionalLight);

        // 環境光源を作る
        const ambient = new THREE.AmbientLight(0x222222);
        // シーンに追加
        scene.add(ambient);

        tick();

        // 毎フレーム時に実行されるループイベントです
        function tick() {
          rot += .5;

          // レンダリング
          renderer.render(scene, camera);

          // ラジアンに変換する
          const radian = (rot * Math.PI) / 320;

          camera.position.x = 1000 * Math.sin(radian);
          camera.position.z = 1000 * Math.cos(radian);

          const radian_m = (rot * Math.PI) / 60;

          // 角度に応じてカメラの位置を設定
          m_box.position.x = 300 * Math.sin(radian_m);
          m_box.position.y = 50;
          m_box.position.z = 300 * Math.cos(radian_m);


          // 1秒で45°回転する
          e_box.rotation.x = 500 * (Math.PI / 1);
          e_box.rotation.z = 500 * (Math.PI / 1);
          c_box.rotation.x = 8000 * (Math.PI / 1);


          // 原点方向を見つめる
          camera.lookAt(new THREE.Vector3(0, 0, 0));


          requestAnimationFrame(tick);
        }
      }