// Create the scene
const scene = new THREE.Scene();

// Create the camera (PerspectiveCamera)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000); // Black background
document.body.appendChild(renderer.domElement);

// Create a cube geometry and a basic material
const geometry = new THREE.BoxGeometry(); // Creates a box shape
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color
const cube = new THREE.Mesh(geometry, material); // Create a mesh with geometry and material

// Add the cube to the scene
scene.add(cube);

// Basic render loop with rotation
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
