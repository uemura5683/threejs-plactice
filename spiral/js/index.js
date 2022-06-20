window.addEventListener( 'load', init );
window.addEventListener( 'resize', init );

let width = 940, height = 500; data = 0;

function init() {

  /**
  * width height
  **/
  let width = window.innerWidth,
      height = window.innerHeight,
      rot = 0;

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
  const camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 );
  camera.position.set(0, 0, 300);

  /**
  * spiral
  **/
  const c_Geometry = new THREE.SphereGeometry( 64, 64, 64 );
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

    /**
    * spiral
    **/
    data += 0.01;
    scene.rotation.y += 0.02 - (Math.cos(data) * 0.01);

    renderer.render( scene, camera );

    requestAnimationFrame( tick );
  }
}