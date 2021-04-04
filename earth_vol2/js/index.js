window.addEventListener( 'load', init );

function init() {

  let width = 960;
  let height = 540;
  let rot = 0;

  const renderer = new THREE.WebGLRenderer( {
    canvas: document.querySelector( '#myCanvas' ),
    alpha: true
  } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( width, height );
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 10000 );
  camera.position.set( 400, 350, 5000 );

  const e_Geometry = new THREE.SphereGeometry( 200, 64, 64 );
  const e_texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/earch.jpg');
  const e_materials = new THREE.MeshStandardMaterial( { color: 0xffffff, map:e_texture } );
  const e_box = new THREE.Mesh(e_Geometry, e_materials );
  scene.add(e_box);

  const m_Geometry = new THREE.SphereGeometry( 34, 64, 64 );
  const m_texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/moon.jpg');
  const m_materials = new THREE.MeshStandardMaterial( { color: 0xffffff, map:m_texture } );
  const m_box = new THREE.Mesh( m_Geometry, m_materials );
  scene.add(m_box);

  const c_Geometry = new THREE.SphereGeometry( 205, 64, 64 );
  const c_texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/crowd.png');
  const c_materials = new THREE.MeshStandardMaterial( { map:c_texture, transparent: true, side: THREE.DoubleSide } );
  const c_box = new THREE.Mesh( c_Geometry, c_materials  );
  scene.add(c_box);

  const s_Geometry = new THREE.SphereGeometry( 205, 64, 64 );
  const s_texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/sun.jpg');
  const s_materials = new THREE.MeshStandardMaterial( { color: 0xffffff, map:s_texture } );
  const s_box = new THREE.Mesh( s_Geometry, s_materials );
  scene.add(s_box);

  createStarField();

  function createStarField() {
    const geometry = new THREE.SphereBufferGeometry(4, 3, 4),
          size = 1;
    for (let i = 0; i < 1000; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(size * Math.random() - 0.5, size * Math.random() - 0.5, size * Math.random() - 0.5).normalize()
      mesh.position.multiplyScalar(Math.random() * 800)
      mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2)
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 2
      scene.add(mesh)
    }
  }


  // new THREE.SpotLight(色, 光の強さ, 距離, 角度, ボケ具合, 減衰率)
  const light = new THREE.SpotLight(0x494067, 5, 0, 60, 2, 10);
  light.castShadow = false;
  scene.add(light);

  // new THREE.SpotLight(色, 光の強さ, 距離, 角度, ボケ具合, 減衰率)
  const lightd = new THREE.SpotLight(0x494067, 1, 0, 120, 2, 10);
  lightd.castShadow = false;
  scene.add(lightd);



  tick();

  function tick() {
    rot += .5;

    renderer.render( scene, camera );

    const t = Date.now() / 1000;
    const r = 3000.0;
    const lx = r * Math.cos(t);
    const lz = r * Math.sin(t);
    const ly = 6.0 + 5.0 * Math.sin(t / 3.0);
    light.position.set(lx, ly, lz);
    light.lookAt(new THREE.Vector3(0, 0, 0));

    lightd.position.set(-lx, -ly, -lz);
    lightd.lookAt(new THREE.Vector3(0, 0, 0));


    const radian = ( rot * Math.PI ) / 1000;          
    camera.position.x = 1000 * Math.sin( radian );
    camera.position.z = 1000 * Math.cos( radian );

    const m_radian = ( rot * Math.PI ) / 100;
    m_box.position.x = 300 * Math.sin( m_radian );
    m_box.position.y = 50;
    m_box.position.z = 300 * Math.cos( m_radian );

    const s_radian = - (( rot * Math.PI ) / 1000);
    s_box.position.x = 5000 * Math.sin( s_radian );
    s_box.position.y = 50;
    s_box.position.z = 5000 * Math.cos( s_radian );

    e_box.rotation.x = 500 * ( Math.PI / 1 );
    e_box.rotation.z = 500 * ( Math.PI / 1 );
    c_box.rotation.x = 8000 * ( Math.PI / 1 );

    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    requestAnimationFrame( tick );
  }
}