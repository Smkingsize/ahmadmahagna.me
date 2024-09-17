// Create the scene
const scene = new THREE.Scene();

// Create the camera (PerspectiveCamera)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5); // Set initial position on the Z-axis

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Adjust for high-DPI displays
renderer.setClearColor(0x000000); // Black background
document.body.appendChild(renderer.domElement);

// Create a cube geometry and a basic material
const cubeGeometry = new THREE.BoxGeometry(); // Creates a box shape
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial); // Create a mesh with geometry and material

// Add the cube to the scene
scene.add(cube);

// Create a ring geometry
const ringGeometry = new THREE.RingGeometry(1, 1.5, 32); // Creates a ring with inner and outer radii
const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }); // Red color, double-sided
const ring = new THREE.Mesh(ringGeometry, ringMaterial);

// Position the ring somewhere else in the scene
ring.position.set(2, 1, -3);
scene.add(ring);

// Scroll interaction: adjust camera's Y position based on scroll
window.addEventListener('scroll', () => {
    // Get the current scroll position
    const scrollY = window.scrollY;

    // Update the camera's Y position based on scroll
    // Adjust scaling factor if you want faster/slower movement
    camera.position.y = -scrollY * 0.01;
    camera.position.z = -scrollY * 0.1;
});

// Basic render loop with rotation
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Rotate the ring
    ring.rotation.x += 0.01;
    ring.rotation.z += 0.05;

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    // Update renderer size and camera aspect ratio
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Adjust for high-DPI displays
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
