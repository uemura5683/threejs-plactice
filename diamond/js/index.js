
// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {
  // サイズを指定
  const width = 900;
  const height = 450;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas'),
    alpha: true,
  });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( width, height );
  renderer.shadowMap.enabled = true;

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, 1000);


  // 光の輪を作成
  let material = new THREE.MeshBasicMaterial({
    color: 0x88FFFF
  });

  let geometry = new THREE.TorusGeometry( (Math.random() + .5) * 400, 10, 2, 200);
  let mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh);

  let geometry2 = new THREE.TorusGeometry( (Math.random() + .55) * 400, 12, 2, 200);
  let mesh2 = new THREE.Mesh(geometry2, material)
  mesh2.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh2);

  let geometry3 = new THREE.TorusGeometry( (Math.random() + .6) * 400, 14, 2, 200);
  let mesh3 = new THREE.Mesh(geometry3, material)
  mesh3.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh3);

  let geometry4 = new THREE.TorusGeometry( (Math.random() + .65) * 400, 16, 2, 200);
  let mesh4 = new THREE.Mesh(geometry4, material)
  mesh4.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh4);

  let geometry5 = new THREE.TorusGeometry( (Math.random() + .7) * 400, 18, 2, 200);
  let mesh5 = new THREE.Mesh(geometry5, material)
  mesh5.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh5);

  const group = new THREE.Group();
  // 3D空間にグループを追加する
  scene.add(group);

  for (let i = 0; i < 300; i++) {
    let geometry = new THREE.SphereBufferGeometry(4, 3, 4),
        size = 1;
    let m_material = new THREE.MeshPhongMaterial({
      color: 0xCBF5FD,
      flatShading: true
    })
    const mesh = new THREE.Mesh(geometry, m_material)
    mesh.position.set(size * Math.random() - 0.5, size * Math.random() - 0.5, size * Math.random() - 0.5).normalize()
    mesh.position.multiplyScalar(Math.random() * 800)
    mesh.rotation.set(Math.random() * 4, Math.random() * 2, Math.random() * 2)
    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 2
    group.add(mesh)
  }

  let c_geometry = new THREE.Geometry();
  c_geometry.vertices.push(new THREE.Vector3(0, 0, 100));
  c_geometry.vertices.push(new THREE.Vector3(100, 0, 0));
  c_geometry.vertices.push(new THREE.Vector3(0, -200, 0));
  c_geometry.vertices.push(new THREE.Vector3(-100, 0, 0));
  c_geometry.vertices.push(new THREE.Vector3(0, 100, 0));
  c_geometry.vertices.push(new THREE.Vector3(0, 0, -100));
  c_geometry.faces.push(new THREE.Face3( 0, 2, 1));
  c_geometry.faces.push(new THREE.Face3( 0, 3, 2));
  c_geometry.faces.push(new THREE.Face3( 0, 4, 3));
  c_geometry.faces.push(new THREE.Face3( 0, 1, 4));
  c_geometry.faces.push(new THREE.Face3( 5, 1, 2));
  c_geometry.faces.push(new THREE.Face3( 5, 2, 3));
  c_geometry.faces.push(new THREE.Face3( 5, 3, 4));
  c_geometry.faces.push(new THREE.Face3( 5, 4, 1));
  c_geometry.computeFaceNormals();
  c_geometry.computeVertexNormals();
  let c_material = new THREE.MeshPhongMaterial({color: 0x88FFFF});
  let c_mesh = new THREE.Mesh(c_geometry, c_material);
  scene.add(c_mesh);

  let wire = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
  let wireMesh = new THREE.Mesh(c_geometry,wire);//同じ形状からワイヤーも作成
  scene.add(wireMesh);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xfffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const light = new THREE.AmbientLight(0xFFFFFfF, 1.0);
  scene.add(light);

  rotatemesh();


  var cristal_step = 0;
  function rotatemesh() {
    cristal_step += 0.02;
    c_mesh.rotation.set(0, cristal_step, 0);
    wireMesh.rotation.set(0, cristal_step, 0);
    mesh.rotation.x = 1;
    mesh.rotation.y += 0.01;
    mesh2.rotation.x += 0.01;
    mesh2.rotation.y -= 0.01;
    mesh3.rotation.x += 0.01;
    mesh3.rotation.y += 0.01;
    mesh4.rotation.x -= 0.01;
    mesh4.rotation.y += 0.01;
    mesh5.rotation.x -= 0.01;
    mesh5.rotation.y -= 0.01;
    group.rotation.x -= 0.01;
    group.rotation.y -= 0.01;
    group.rotation.z -= 0.01;
    draw();
    requestAnimationFrame(rotatemesh);
  }

  // レンダリング
  function draw() {
    renderer.render(scene, camera);
  }

}