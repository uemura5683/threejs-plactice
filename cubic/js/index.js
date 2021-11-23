      // ページの読み込みを待つ
      window.addEventListener('load', init);
      window.addEventListener('resize', init);

      function init() {
        // サイズを指定
        const width = 960;
        const height = 540;

        // レンダラーを作成
        const renderer = new THREE.WebGLRenderer({
          canvas: document.querySelector('#myCanvas'),
          alpha: true,          
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // シーンを作成
        const scene = new THREE.Scene();

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(45, width / height);
        camera.position.set(10, 10, 10);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        const cubeTextureLoader = new THREE.CubeTextureLoader()
        let textureCube = cubeTextureLoader.load( [
          './img/px.png', './img/nx.png',
          './img/py.png', './img/ny.png',
          './img/pz.png', './img/nz.png'          
        ] );
        const material = new THREE.MeshStandardMaterial( {
            color: 0xffffff,
            roughness: 0,
            metalness: 1,
            envMap: textureCube
        } );
        const sphere = new THREE.Mesh(
                        new THREE.SphereGeometry( 4, 160, 160 ),
                        material
                     );
        scene.add( sphere );

        scene.add( new THREE.HemisphereLight( 0x443333, 0x222233, 4 ) );

        tick();

        // 毎フレーム時に実行されるループイベントです
        function tick() {
          // レンダリング
          renderer.render(scene, camera);

          requestAnimationFrame(tick);
        }
      }