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
  const camera = new THREE.PerspectiveCamera( 45, width / height );
  camera.position.set( 0, 0, 1000 );

  /**
  * earch
  **/
  const geometry = new THREE.ConeGeometry( 50, 260, 320 );
  const material = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
  const cone = new THREE.Mesh( geometry, material );
  scene.add( cone );

  /**
  * light
  **/
  const light = new THREE.SpotLight(0x494067, 5, 0, 60, 2, 10);
  light.castShadow = false;
  scene.add(light);

  tick();

  function tick() {
    rot += .5;
    renderer.render( scene, camera );

    /**
    * set
    **/
    const t = 11500
        , r = 3000.0
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
    * light
    **/
    light.position.set(lx, ly, lz);
    light.lookAt(new THREE.Vector3(0, 0, 0));

    /**
    * earch
    **/
    cone.rotation.x = 500 * ( Math.PI / 1 );
    cone.position.y = 0;
    cone.rotation.z = 500 * ( Math.PI / 1 );

    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    requestAnimationFrame( tick );
  }
}