  window.addEventListener('load', Resize);
  window.addEventListener('resize', Resize);
  
  let width = 100, height = 100;

  function Resize() {

    let width = window.innerWidth,
        height = window.innerHeight;

    /**
    * renderer
    **/
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#myCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    /**
    * scene
    **/
    const scene = new THREE.Scene();

    /**
    * camera
    **/
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1000);

    /**
    * controls
    **/
    const controls = new THREE.OrbitControls(camera, document.body);

    /**
    * box
    **/
    const geometry = new THREE.SphereBufferGeometry(200, 200, 200);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    tick();

    function tick() {
      box.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
  }