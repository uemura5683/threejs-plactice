
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
  let c_geometry_one = new THREE.TorusGeometry( (Math.random() + .5) * 400, 10, 2, 200)
    , c_ring_one = new THREE.MeshBasicMaterial({color: 0X3CA3D2})
    , c_ring_mesh = new THREE.Mesh(c_geometry_one, c_ring_one);
    c_ring_mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(c_ring_mesh);

  let c_geometry_two = new THREE.TorusGeometry( (Math.random() + .55) * 400, 12, 2, 200)
    , c_ring_two = new THREE.MeshBasicMaterial({color: 0X05296F})
    , c_ring_mesh_two = new THREE.Mesh(c_geometry_two, c_ring_two);
    c_ring_mesh_two.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(c_ring_mesh_two);

  let c_geometry_three = new THREE.TorusGeometry( (Math.random() + .6) * 400, 14, 2, 200)
    , c_ring_three = new THREE.MeshBasicMaterial({color: 0X5EE1F1})
    , c_ring_mesh_three = new THREE.Mesh(c_geometry_three, c_ring_three)
    c_ring_mesh_three.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(c_ring_mesh_three);


  //　クリスタルの粒を作成する
  const c_group = new THREE.Group();
  scene.add(c_group);
  for (let i = 0; i < 500; i++) {
    let geometry = new THREE.SphereBufferGeometry(4, 3, 4),
        size = 1,
        christal = [0xFFA5FF, 0X3CA3D2, 0X05296F, 0X5EE1F1, 0X015D8F, 0X033161, 0X0ADBF8]
        christalNo = Math.floor( Math.random() * christal.length);

    let m_material = new THREE.MeshPhongMaterial({
      color: christal[christalNo],
      flatShading: true
    })
    const mesh = new THREE.Mesh(geometry, m_material)
    mesh.position.set(size * Math.random() - 0.5, size * Math.random() - 0.5, size * Math.random() - 0.5).normalize()
    mesh.position.multiplyScalar(Math.random() * 800)
    mesh.rotation.set(Math.random() * 4, Math.random() * 2, Math.random() * 2)
    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 2
    c_group.add(mesh)
  }

  // クリスタルを作成
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
      c_material = new THREE.MeshPhongMaterial({color: 0x022492});
      c_mesh = new THREE.Mesh(c_geometry, c_material);
  scene.add(c_mesh);

  let wire = new THREE.MeshBasicMaterial({color: 0x0376c4, wireframe: true});
  let wireMesh = new THREE.Mesh(c_geometry,wire);//同じ形状からワイヤーも作成
  scene.add(wireMesh);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0x7AFDFF);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const light = new THREE.AmbientLight(0x7AFDFF, 1.0);
  scene.add(light);

  rotatemesh();

  var cristal_step = 0;
  function rotatemesh() {
    cristal_step += 0.02;
    c_mesh.rotation.set(0, cristal_step, 0);
    wireMesh.rotation.set(0, cristal_step, 0);
    c_ring_mesh.rotation.x = 1;
    c_ring_mesh.rotation.y += 0.01;
    c_ring_mesh_two.rotation.x += 0.01;
    c_ring_mesh_two.rotation.y -= 0.01;
    c_ring_mesh_three.rotation.x += 0.01;
    c_ring_mesh_three.rotation.y += 0.01;
    c_group.rotation.x -= 0.01;
    c_group.rotation.y -= 0.01;
    c_group.rotation.z -= 0.01;
    draw();
    requestAnimationFrame(rotatemesh);
  }

  // レンダリング
  function draw() {
    renderer.render(scene, camera);
  }

}