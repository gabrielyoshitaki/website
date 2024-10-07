
//ライブラリー
import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { modelDirection } from 'three/webgpu';
//renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight );
camera.position.set(0,10,50);
renderer.render( scene, camera);
//angel
const loader = new GLTFLoader()
loader.load('assets/logo/angelweb.glb', function (gltf) {
    const model = gltf.scene;
    model.scale.set(5, 5, 5)
    scene.add(model)
  });
//torus
//const geometry = new THREE.PlaneGeometry()
//const material = new THREE.MeshStandardMaterial ({color: 0xFF6347});
//const torus = new THREE.Mesh( geometry, material );
//torus.position.set(0,5,0)
//scene.add(torus)
//point light
const pointLight = new THREE.PointLight(0xffffff,100)
pointLight.position.set(8,8,8)
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add (pointLight, ambientLight)
//helper tools
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
gridHelper.position.set(0,-15,0)
scene.add(lightHelper, gridHelper)
//orbit control
const control = new OrbitControls(camera, renderer.domElement);
//stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial( {color: 0xffffff })
  const star = new THREE.Mesh( geometry, material );
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
  star.position.set( x, y, z);
  scene.add(star)
}
Array(200).fill().forEach(addStar)
//background
const dustTexture = new THREE.TextureLoader().load('background.jpg');
scene.background = dustTexture;
//anitmation
function animate() {
  requestAnimationFrame( animate );

//rotate.model.x += 0.1;
//model.rotation.y += 0.1;
//model.rotation.z += 0.0;

  control.update();

  renderer.render ( scene, camera );
}

animate()