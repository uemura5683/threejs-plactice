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

  const t_Geometry = new THREE.Geometry();

  //頂点座標データを追加   
  t_Geometry.vertices.push(new THREE.Vector3(0, 0, 100));
  t_Geometry.vertices.push(new THREE.Vector3(100, 0, 0));
  t_Geometry.vertices.push(new THREE.Vector3(0, 200, 0));
  t_Geometry.vertices.push(new THREE.Vector3(-100, 0, 0));
  t_Geometry.vertices.push(new THREE.Vector3(0, -200, 0));
  t_Geometry.vertices.push(new THREE.Vector3(0, 0, -100));

  //面指定用頂点インデックスを追加   
  t_Geometry.faces.push( new THREE.Face3( 0, 2, 1 ) );
  t_Geometry.faces.push( new THREE.Face3( 0, 3, 2 ) );
  t_Geometry.faces.push( new THREE.Face3( 0, 4, 3 ) );
  t_Geometry.faces.push( new THREE.Face3( 0, 1, 4 ) );
  t_Geometry.faces.push( new THREE.Face3( 5, 1, 2 ) );
  t_Geometry.faces.push( new THREE.Face3( 5, 2, 3 ) );
  t_Geometry.faces.push( new THREE.Face3( 5, 3, 4 ) );
  t_Geometry.faces.push( new THREE.Face3( 5, 4, 1 ) );

  // 法線ベクトルの自動計算
  t_Geometry.computeFaceNormals();
  t_Geometry.computeVertexNormals();

  //マテリアル（材質）の宣言と生成
  var material =  new THREE.MeshBasicMaterial({ color: 0xffffff });
  var Triangle =  new THREE.Mesh(t_Geometry,material);

  //シーンオブジェクトに追加 
  scene.add(Triangle);  

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.set( 1000, 1300, 80 );
  scene.add( directionalLight );

  const ambient = new THREE.AmbientLight( 0xffffff );
  scene.add( ambient );

  var material = new THREE.MeshNormalMaterial();
  var mesh = new THREE.Mesh(t_Geometry, material);
  scene.add(mesh);
   
  //ワイヤーフレームのメッシュ作成
  var wire = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
  var wireMesh = new THREE.Mesh(t_Geometry, wire);
  scene.add(wireMesh);

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

  tick();

  function tick() {
    rot += .5;

    renderer.render( scene, camera );

    const radian = ( rot * Math.PI ) / 1000;          
    camera.position.x = 1000 * Math.sin( radian );
    camera.position.z = 1000 * Math.cos( radian );

    Triangle.rotation.x = 500 * ( Math.PI / 1 );
    Triangle.rotation.z = 500 * ( Math.PI / 1 );

    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    requestAnimationFrame( tick );
  }
}