window.addEventListener( 'load', init );

function init() {

  let width = 960;
  let height = 540;
  let rot = 0;

  const renderer = new THREE.WebGLRenderer( {
    canvas: document.querySelector( '#myCanvas' )
  } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( width, height );
  renderer.setClearColor( 0x000000 );
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera( 45, width / height );
  camera.position.set( 400, 350, 1000 );

  const e_Geometry = new THREE.SphereGeometry( 200, 64, 64 );
  const e_texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/earch.jpg');
  const e_materials = new THREE.MeshStandardMaterial( { color: 0xffffff, map:e_texture } );
  const e_box = new THREE.Mesh(e_Geometry, e_materials);
  scene.add(e_box);

  const m_Geometry = new THREE.SphereGeometry( 34, 64, 64 );
  const m_texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/moon.jpg');
  const m_materials = new THREE.MeshStandardMaterial( { color: 0xffffff, map:m_texture } );
  const m_box = new THREE.Mesh( m_Geometry, m_materials );
  scene.add(m_box);

  const c_Geometry = new THREE.SphereGeometry( 205, 64, 64 );
  const c_texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/uemura5683/threejs_plactice/master/earth_vol2/img/crowd.png');
  const c_materials = new THREE.MeshStandardMaterial( { map:c_texture, transparent: true, side: THREE.DoubleSide } );
  const c_box = new THREE.Mesh( c_Geometry, c_materials );
  scene.add(c_box);

  createStarField();

  function createStarField() {
    const s_geometry = new THREE.SphereGeometry( 5, 32, 32 );
    const size = 3000;
    const length = 1500;
    for ( let i = 0; i < length; i++ ) {
      s_geometry.vertices.push(
        new THREE.Vector3(
          size * ( Math.random() - 0.5 ),
          size * ( Math.random() - 0.5 ),
          size * ( Math.random() - 0.5 )
        )
      );
    }
    const s_material = new THREE.PointsMaterial( {
      size: 10,
      blending: THREE.AdditiveBlending,
      color: 0xffffff
    } );
    const s_box = new THREE.Points( s_geometry, s_material );
    scene.add( s_box );
  }

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.set( 1000, 1300, 80 );
  scene.add( directionalLight );

  const ambient = new THREE.AmbientLight( 0x222222 );
  scene.add( ambient );

  tick();

  function tick() {
    rot += .5;

    renderer.render( scene, camera );

    const radian = ( rot * Math.PI ) / 1000;          
    camera.position.x = 1000 * Math.sin( radian );
    camera.position.z = 1000 * Math.cos( radian );

    const m_radian = ( rot * Math.PI ) / 100;
    m_box.position.x = 300 * Math.sin( m_radian );
    m_box.position.y = 50;
    m_box.position.z = 300 * Math.cos( m_radian );

    e_box.rotation.x = 500 * ( Math.PI / 1 );
    e_box.rotation.z = 500 * ( Math.PI / 1 );
    c_box.rotation.x = 8000 * ( Math.PI / 1 );

    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    requestAnimationFrame( tick );
  }
}