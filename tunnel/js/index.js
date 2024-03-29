//===================================================== Create a WebGL renderer
var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas"),
  powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);

//===================================================== Create an empty scene
var scene = new THREE.Scene();

//===================================================== Create a perpsective camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 1000);
camera.position.z = 400;


//===================================================== resize
window.addEventListener("resize", function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


//===================================================== Array of points
var points = [
  [68.5,185.5],
  [1,262.5],
  [270.9,281.9],
  [345.5,212.8],
  [178,155.7],
  [240.3,72.3],
  [153.4,0.6],
  [52.6,53.3],
  [68.5,185.5]
];

//===================================================== Convert the array of points into vertices
for (var i = 0; i < points.length; i++) {
  var x = points[i][0];
  var y = 0;
  var z = points[i][1];
  points[i] = new THREE.Vector3(x, y, z);
}
//===================================================== Create a path from the points
var path = new THREE.CatmullRomCurve3(points);

//===================================================== Create the tube geometry from the path
var sides = 3;
var geometry = new THREE.TubeGeometry( path, 3000, 4, sides, true );

//===================================================== Basic material
var material = new THREE.MeshBasicMaterial({
  side : THREE.BackSide,
  map: new THREE.TextureLoader().load('https://raw.githubusercontent.com/baronwatts/images/master/map5.png')
});
 material.map.wrapS = THREE.RepeatWrapping;
material.map.wrapT= THREE.RepeatWrapping;
material.map.repeat.set(10, 1)
//===================================================== Create a mesh
var tube = new THREE.Mesh( geometry, material );
tube.matrixAutoUpdate = false;//wont be moving so no need to update
scene.add( tube );

//===================================================== Create a point light in our scene
var light = new THREE.PointLight(new THREE.Color("white"),1, 100);
scene.add(light);


//===================================================== Animate
var percentage = 0;

function animate() {
  percentage += 0.0001;
  var p1 = path.getPointAt(percentage%1);
  var p2 = path.getPointAt((percentage + 0.03)%1);
  camera.position.set(p1.x,p1.y,p1.z);
  camera.lookAt(p2);
  light.position.set(p2.x, p2.y, p2.z);
  
  //Render the scene
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();