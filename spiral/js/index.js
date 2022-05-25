window.addEventListener( 'load', init );

function init() {

  let width = 960
    , height = 540
    , rot = 0;

  /**
  * render
  **/
  const renderer = new THREE.WebGLRenderer( {
    canvas: document.querySelector( '#myCanvas' ),
    alpha: true
  } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( width, height );
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();

  /**
  * camera
  **/
  const camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 10000 );
  camera.position.set( 400, 350, 5000 );

  /**
  * cloud
  **/
  const c_Geometry = new THREE.SphereGeometry( 205, 64, 64 );
  const c_texture = new THREE.TextureLoader().load('img/spiral.png');
  const c_materials = new THREE.MeshLambertMaterial( { map:c_texture, transparent: true, side: THREE.DoubleSide } );
  const c_box = new THREE.Mesh( c_Geometry, c_materials  );
  scene.add(c_box);

  /**
  * light
  **/
  const directLight1 = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
  scene.add(directLight1);

  tick();

  function tick() {
    rot += 5;
    renderer.render( scene, camera );

    /**
    * set
    **/
    const t = Date.now() / 1500
        , r = 100.0
        , lx = r * Math.cos(t)
        , lz = r * Math.sin(t)
        , ly = 0;

    /**
    * camera
    **/
    const radian = ( rot * Math.PI ) / 1000;          
    camera.position.x = 1000 * Math.sin( radian );
    camera.position.z = 1000 * Math.cos( radian );
    /**
    * cloud
    **/
    c_box.rotation.x = 500 * ( Math.PI / 1 );
    c_box.position.y = 0;
    c_box.rotation.z = 500 * ( Math.PI / 1 );

    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    requestAnimationFrame( tick );
  }
}