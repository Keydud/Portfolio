//import necessary stuff
import * as THREE from "../modules/three.module.js";
import { GLTFLoader } from "../modules/GLTFLoader.js";
import { MeshTransmissionMaterial } from "../modules/MeshTransmissionMaterial.js";

//setup renderer and camera
const canvas = document.getElementById('container3D');
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(600, 600);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xffffff, 0);
canvas.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    1,
    0.1,
    1000
);

camera.position.set(0, 0, 35);
camera.lookAt(scene.position);

//set up lights
const light = new THREE.PointLight(0xff0000, 5000, 100);
light.position.set(20, 20, 20);
light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, .5);
scene.add(ambientLight);

//create grid
const grid = new THREE.GridHelper(20);
grid.rotation.x = Math.PI / 2;
grid.position.z = -2;
scene.add(grid);

const planeGeo = new THREE.PlaneGeometry(20, 20);
const planeMat = new THREE.MeshBasicMaterial({color: 0xffffff});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.position.z = -2.01;
scene.add(plane);


//Load objects
const gltfLoader = new GLTFLoader();
gltfLoader.load(
    '../resources/objects/hi.gltf',
    function(gltf) {
        scene.add(gltf.scene);
    }
);

//create cube with glass shaders
const wordGeo = new THREE.BoxGeometry(10,10,10);
const word = new THREE.Mesh(wordGeo);
word.castShadow = true;

word.material = Object.assign(new MeshTransmissionMaterial(10), {
    clearcoat: 1,
    clearcoatRoughness: 10,
    transmission: 1.1,
    chromaticAberration: 0.5,
    anisotrophicBlur: .2,
    // Set to > 0 for diffuse roughness
    roughness: .25,
    thickness: 3,
    ior: 1.5,
    // Set to > 0 for animation
    distortion: 0.3,
    distortionScale: 0.2,
    temporalDistortion: 0.2
})
scene.add(word);

const animate = () => {
    requestAnimationFrame(animate);
    word.rotation.y += 0.004;
    renderer.render(scene, camera);
}

animate();