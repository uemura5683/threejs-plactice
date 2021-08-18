window.addEventListener('load', threescroll);

function threescroll() {
      const scene = new THREE.Scene();
      const canvas = document.getElementById('myCanvas');
      const renderer = new THREE.WebGLRenderer({ canvas });

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(new THREE.Color(0x5863aa), 1.0);

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);

      const sphereGeom = new THREE.SphereGeometry();

      const brown = new THREE.Mesh(sphereGeom, new THREE.MeshBasicMaterial({ color: new THREE.Color(0x453f23) }));
      scene.add(brown);
      const blue = new THREE.Mesh(sphereGeom, new THREE.MeshBasicMaterial({ color: new THREE.Color(0x064fff) }));
      scene.add(blue);
      const pink = new THREE.Mesh(sphereGeom, new THREE.MeshBasicMaterial({ color: new THREE.Color(0xd33aff) }));
      scene.add(pink);

      const interval = 5.0;
            brown.position.y = -0.5 * interval;
            blue.position.y = -1.5 * interval;
            pink.position.y = -2.5 * interval;

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

