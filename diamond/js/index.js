
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
  let c_texture = new THREE.TextureLoader().load('img/swirl.png');
  let material = new THREE.MeshBasicMaterial({
    map: c_texture,
    color: 0x96f4ff,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });

  let geometry = new THREE.TorusGeometry( (Math.random() + .5) * 400, 10, 2, 200);
  let mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh);

  let geometry2 = new THREE.TorusGeometry( (Math.random() + .55) * 400, 10, 2, 200);

  let mesh2 = new THREE.Mesh(geometry2, material)
  mesh2.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh2);

  let geometry3 = new THREE.TorusGeometry( (Math.random() + .6) * 400, 10, 2, 200);
  let mesh3 = new THREE.Mesh(geometry3, material)
  mesh3.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh3);

  let geometry4 = new THREE.TorusGeometry( (Math.random() + .65) * 400, 10, 2, 200);
  let mesh4 = new THREE.Mesh(geometry4, material)
  mesh4.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh4);

  let geometry5 = new THREE.TorusGeometry( (Math.random() + .7) * 400, 10, 2, 200);
  let mesh5 = new THREE.Mesh(geometry5, material)
  mesh5.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  scene.add(mesh5);

  // 光を作成
  let sp_texture = new THREE.TextureLoader().load('img/particle.png');

  const group = new THREE.Group();
  // 3D空間にグループを追加する
  scene.add(group);

  for (let i = 0; i < 200; i++) {
    let sp_material = new THREE.SpriteMaterial({
      color: 0x96f4ff,
      map: sp_texture,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    let sprite = new THREE.Sprite(sp_material);
    // ランダムな座標に配置
    sprite.position.x = 1000 * (Math.random() - 0.5);
    sprite.position.y = 1000 * (Math.random() - 0.5);
    sprite.position.z = 1000 * (Math.random() - 0.5);
    // 必要に応じてスケールを調整
    sprite.scale.set(30, 30, 30);
    group.add(sprite);
  }

  var cristal;
  function createCristal() {
    var dark_color = 0x007a8c;
    var light_color = 0x96f4ff;
    var x_left = 70;
    var x_right = -x_left;
    var x_middle = x_right - x_right;
    var y_bottom = 20;
    var y_middle = y_bottom + 150;
    var y_top = y_middle + 90;
    var z_back = 70;
    var z_front = -z_back;
    var z_middle = z_front - z_front;
  
    // 表面用のマテリアル生成
    var material_normal = new THREE.MeshPhongMaterial({
      vertexColors: THREE.VertexColors,
      specular: 0xffffff,
      shininess: 10,
      transparent: true,
      opacity: 0.85
    });
    // 裏面用のマテリアル生成
    var material_back = new THREE.MeshPhongMaterial({
      side: THREE.BackSide,
      vertexColors: THREE.VertexColors,
      specular: 0xffffff,
      shininess: 10,
      transparent: true,
      opacity: 0.85
    });
  
    // クリスタルオブジェクト生成
    cristal = new THREE.Object3D();
  
    // 1つ目のオブジェクト作成
    var front_left_top_g = new THREE.Geometry();
    front_left_top_g.vertices = [
      new THREE.Vector3(x_left, y_middle, z_middle),
      new THREE.Vector3(x_middle, y_top, z_middle),
      new THREE.Vector3(x_middle, y_middle, z_front)
    ];
    var front_left_top_c = [
      new THREE.Color(dark_color),
      new THREE.Color(light_color),
      new THREE.Color(dark_color)
    ];
    front_left_top_g.faces[0] = new THREE.Face3(0, 1, 2, null, front_left_top_c);
    front_left_top_g.computeFaceNormals();
    var front_left_top = new THREE.Mesh(front_left_top_g, material_back);
    cristal.add(front_left_top);
  
    // 2つ目のオブジェクト作成
    var back_left_top_g = new THREE.Geometry();
    back_left_top_g.vertices = [
      new THREE.Vector3(x_left, y_middle, z_middle),
      new THREE.Vector3(x_middle, y_top, z_middle),
      new THREE.Vector3(x_middle, y_middle, z_back)
    ];
    var back_left_top_c = [
      new THREE.Color(dark_color),
      new THREE.Color(light_color),
      new THREE.Color(dark_color)
    ];
    back_left_top_g.faces[0] = new THREE.Face3(0, 1, 2, null, back_left_top_c);
    back_left_top_g.computeFaceNormals();
    
    var back_left_top = new THREE.Mesh(back_left_top_g, material_normal);
    cristal.add(back_left_top);

    // 3つ目のオブジェクト作成
    var front_right_top_g = new THREE.Geometry();
    front_right_top_g.vertices = [
      new THREE.Vector3(x_right, y_middle, z_middle),
      new THREE.Vector3(x_middle, y_top, z_middle),
      new THREE.Vector3(x_middle, y_middle, z_front)
    ];
    var front_right_top_c = [
      new THREE.Color(dark_color),
      new THREE.Color(light_color),
      new THREE.Color(dark_color)
    ];
    front_right_top_g.faces[0] = new THREE.Face3(0, 1, 2, null, front_right_top_c);
    front_right_top_g.computeFaceNormals();
    var front_right_top = new THREE.Mesh(front_right_top_g, material_back);
    cristal.add(front_right_top);
  
    // 4つ目のオブジェクト作成
    var back_right_top_g = new THREE.Geometry();
    back_right_top_g.vertices = [
      new THREE.Vector3(x_right, y_middle, z_middle),
      new THREE.Vector3(x_middle, y_top, z_middle),
      new THREE.Vector3(x_middle, y_middle, z_back)
    ];
    var back_right_top_c = [
      new THREE.Color(dark_color),
      new THREE.Color(light_color),
      new THREE.Color(dark_color)
    ];
    back_right_top_g.faces[0] = new THREE.Face3(0, 1, 2, null, back_right_top_c);
    back_right_top_g.computeFaceNormals();
    
    var back_right_top = new THREE.Mesh(back_right_top_g, material_normal);
    cristal.add(back_right_top);

    // 5つ目のオブジェクト作成
    var front_left_bottom_g = new THREE.Geometry();
    front_left_bottom_g.vertices = [
      new THREE.Vector3(x_left, y_middle, z_middle),
      new THREE.Vector3(x_middle, y_bottom, z_middle),
      new THREE.Vector3(x_middle, y_middle, z_front)
    ];
    var front_left_bottom_c = [
      new THREE.Color(dark_color),
      new THREE.Color(light_color),
      new THREE.Color(dark_color)
    ];
    front_left_bottom_g.faces[0] = new THREE.Face3(0, 1, 2, null, front_left_bottom_c);
    front_left_bottom_g.computeFaceNormals();
    var front_left_bottom = new THREE.Mesh(front_left_bottom_g, material_back);
    cristal.add(front_left_bottom);
  
    // 6つ目のオブジェクト作成
    var back_left_bottom_g = new THREE.Geometry();
    back_left_bottom_g.vertices = [
      new THREE.Vector3(x_left, y_middle, z_middle),
      new THREE.Vector3(x_middle, y_bottom, z_middle),
      new THREE.Vector3(x_middle, y_middle, z_back)
    ];
    var back_left_bottom_c = [
      new THREE.Color(dark_color),
      new THREE.Color(light_color),
      new THREE.Color(dark_color)
    ];
    back_left_bottom_g.faces[0] = new THREE.Face3(0, 1, 2, null, back_left_bottom_c);
    back_left_bottom_g.computeFaceNormals();
    
    var back_left_bottom = new THREE.Mesh(back_left_bottom_g, material_normal);
    cristal.add(back_left_bottom);

    // 7つ目のオブジェクト作成
    var front_right_bottom_g = new THREE.Geometry();
    front_right_bottom_g.vertices = [
      new THREE.Vector3(x_right, y_middle, z_middle),
      new THREE.Vector3(x_middle, y_bottom, z_middle),
      new THREE.Vector3(x_middle, y_middle, z_front)
    ];
    var front_right_bottom_c = [
      new THREE.Color(dark_color),
      new THREE.Color(light_color),
      new THREE.Color(dark_color)
    ];
    front_right_bottom_g.faces[0] = new THREE.Face3(0, 1, 2, null, front_right_bottom_c);
    front_right_bottom_g.computeFaceNormals();
    var front_right_bottom = new THREE.Mesh(front_right_bottom_g, material_back);
    cristal.add(front_right_bottom);
  
    // 8つ目のオブジェクト作成
    var back_right_bottom_g = new THREE.Geometry();
    back_right_bottom_g.vertices = [
      new THREE.Vector3(x_right, y_middle, z_middle),
      new THREE.Vector3(x_middle, y_bottom, z_middle),
      new THREE.Vector3(x_middle, y_middle, z_back)
    ];
    var back_right_bottom_c = [
      new THREE.Color(dark_color),
      new THREE.Color(light_color),
      new THREE.Color(dark_color)
    ];
    back_right_bottom_g.faces[0] = new THREE.Face3(0, 1, 2, null, back_right_bottom_c);
    back_right_bottom_g.computeFaceNormals();
    
    var back_right_bottom = new THREE.Mesh(back_right_bottom_g, material_normal);
    cristal.add(back_right_bottom);

    cristal.position.set(0, -200, 0);
    scene.add(cristal);
  }

  createCristal();

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xfffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const light = new THREE.AmbientLight(0xFFFFFfF, 1.0);
  scene.add(light);

  rotatemesh();


  var cristal_step = 0;
  function rotatemesh() {
    // cristal_step += 0.02;
    // cristal.rotation.set(0, cristal_step, 0);
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