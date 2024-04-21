//import stuff
import * as THREE from "../modules/three.module.js";

const canvas = document.getElementById('star-container');
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
canvas.appendChild(renderer.domElement);

//Scene setup :3
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

//Camera :o
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 2);
camera.lookAt(scene.position);

//Texture Loader
const loader = new THREE.TextureLoader();
const cross = loader.load('../resources/star.png');

//Starfield
const particlesGeo = new THREE.BufferGeometry;
const particlesCnt = 100000;
const posArray = new Float32Array(particlesCnt * 3);
for(let i = 0; i < particlesCnt; i++){
    posArray[i] = (Math.random() - 0.5) * 5;
}
particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

//Material
const material = new THREE.PointsMaterial({
    size: 0.03,
    map: cross,
    transparent: false,
    alphaTest: 0.3,
    color: 0xe1e1e1
});

//Mesh
const particlesMesh = new THREE.Points(particlesGeo, material);
scene.add(particlesMesh);

//Resize function
window.addEventListener("resize", onWindowResize);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

//Mouse movement
document.addEventListener('mousemove', aniParticles);

let mouseX = 0;
let mouseY = 0;

function aniParticles(event){
    mouseX = event.clientX;
    mouseY = event.clientY;
}

const clock = new THREE.Clock();

const tick = () => {
    const deltaTime = clock.getElapsedTime();

    //Renderer
    renderer.render(scene, camera);

    //Animate star mesh
    particlesMesh.rotation.y = 0.05 * deltaTime;
    particlesMesh.rotation.x = -0.05 * deltaTime;

    //Call tick again on next frame
    window.requestAnimationFrame(tick);
}
 
tick();
