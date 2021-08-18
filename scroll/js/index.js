window.addEventListener('load', threescroll);

function threescroll() {
      const scene = new THREE.Scene();
      const canvas = document.getElementById('myCanvas');
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);

      const sphereGeom = new THREE.CircleGeometry(1, 100);

      const e_texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/earch.jpg');
      const s_texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/sun.jpg');
      const m_texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/moon.jpg');
      
      const earch = new THREE.Mesh(sphereGeom, new THREE.MeshBasicMaterial( { color: 0xffffff, map:e_texture } ) );
      const moon = new THREE.Mesh(sphereGeom, new THREE.MeshBasicMaterial( { color: 0xffffff, map:s_texture } ) );
      const sun = new THREE.Mesh(sphereGeom, new THREE.MeshBasicMaterial( { color: 0xffffff, map:m_texture } ) );

      scene.add(earch);
      scene.add(moon);
      scene.add(sun);

      const interval = 5.0;
            earch.position.y = -0.5 * interval;
            moon.position.y  = -1.5 * interval;
            sun.position.y   = -2.5 * interval;

      const viewVerticalRange = 3.0 * interval;

      const animate = () => {
        requestAnimationFrame(animate);
        const cameraVerticalRange = viewVerticalRange * window.innerHeight / document.body.clientHeight;
              camera.position.z = cameraVerticalRange / Math.tan(0.5 * camera.fov * Math.PI / 180.0) * 0.5;
        const scrollRate = window.pageYOffset / (document.body.clientHeight - window.innerHeight);
              camera.position.y = -0.5 * cameraVerticalRange - scrollRate * (viewVerticalRange - cameraVerticalRange);
        renderer.render(scene, camera);
      };
      animate();
      const resize = () => {
        let width = window.innerWidth;
        let height = window.innerHeight;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
      window.addEventListener('resize', resize);
}

