window.addEventListener('load', init);

function degree(degrees) {
  return degrees * (Math.PI / 180);
}

function init() {
  // シーン
  var scene = new THREE.Scene();

  // レンダラー
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // カメラ
  var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight);
  camera.position.set(0, 0, 50);
  scene.add(camera);

  // ライト
  light = new THREE.DirectionalLight(0xffffff,1);
  scene.add(light);

  light.position = new THREE.Vector3(0, 0, 0);
  ambient = new THREE.AmbientLight(0xffffff);
  scene.add(ambient);

  // キューブ
  var geometry = new THREE.BoxGeometry(5,5,5);
  var material = new THREE.MeshStandardMaterial({color: '#a42c2c'});
  var box = new THREE.Mesh( geometry, material);
  box.position.set(0,0,0);
  box.rotation.set(degree(0),degree(0),degree(0));
  scene.add(box);

  // GUIパラメータ
  var guiCtrl = function(){
    this.position_x = 0;
    this.position_y = 0;
    this.position_z = 50;
    this.rotation_x = 0;
    this.rotation_y = 0;
    this.rotation_z = 0;
  };

  gui = new dat.GUI();
  guiObj = new guiCtrl();
  var folder = gui.addFolder('Folder');

  folder.add( guiObj, 'position_x', 0, 100 ).onChange(setCameraPosition);
  folder.add( guiObj, 'position_y', 0, 100 ).onChange(setCameraPosition);
  folder.add( guiObj, 'position_z', 0, 100 ).onChange(setCameraPosition);

  folder.add( guiObj, 'rotation_x', 0, 180 ).onChange(setCameraRotation);
  folder.add( guiObj, 'rotation_y', 0, 180 ).onChange(setCameraRotation);
  folder.add( guiObj, 'rotation_z', 0, 180 ).onChange(setCameraRotation);
  folder.open();

  function setCameraRotation(){
    box.rotation.set(
      degree(guiObj.rotation_x),
      degree(guiObj.rotation_y),
      degree(guiObj.rotation_z)
    );
  }

  function setCameraPosition(){
    box.position.set(
      guiObj.position_x,
      guiObj.position_y,
      guiObj.position_z
    );
  }

  // レンダリング
  var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
  }
  render();
}