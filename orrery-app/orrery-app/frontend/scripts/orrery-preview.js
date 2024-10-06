
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('orrery-container').appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera, renderer.domElement);


let sunGeometry = new THREE.SphereGeometry(4, 32, 32);
let sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
let sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

let planets = [
    { name: 'Mercury', radius: 0.5, distance: 10, color: 0xaaaaaa, speed: 0.04 },
    { name: 'Venus', radius: 1.2, distance: 15, color: 0xffcc99, speed: 0.02 },
    { name: 'Earth', radius: 1, distance: 20, color: 0x0000ff, speed: 0.015 },
    { name: 'Mars', radius: 0.8, distance: 25, color: 0xff6600, speed: 0.012 },
    { name: 'Jupiter', radius: 2.5, distance: 35, color: 0xffcc33, speed: 0.008 },
    { name: 'Saturn', radius: 2, distance: 45, color: 0xffff99, speed: 0.006 },
    { name: 'Uranus', radius: 1.7, distance: 55, color: 0x66ccff, speed: 0.004 },
    { name: 'Neptune', radius: 1.6, distance: 65, color: 0x3333ff, speed: 0.003 },
];


let planetMeshes = [];

planets.forEach((planet) => {

    let planetGeometry = new THREE.SphereGeometry(planet.radius, 32, 32);
    let planetMaterial = new THREE.MeshLambertMaterial({ color: planet.color });
    let planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);

 
    planetMesh.position.x = planet.distance;
    planetMesh.orbitDistance = planet.distance; // Store distance for orbit calculations
    planetMesh.orbitSpeed = planet.speed;       // Store speed for orbit calculations
    planetMesh.orbitAngle = Math.random() * Math.PI * 2; // Random initial orbit angle


    let orbitGeometry = new THREE.RingGeometry(planet.distance - 0.05, planet.distance + 0.05, 64);
    let orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide });
    let orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbitMesh.rotation.x = Math.PI / 2;
    scene.add(orbitMesh);

    
    scene.add(planetMesh);
    planetMeshes.push(planetMesh);
});

let pointLight = new THREE.PointLight(0xffffff, 1.5, 200);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

camera.position.z = 100;
controls.update();


function animate() {
    requestAnimationFrame(animate);

    
    planetMeshes.forEach((planetMesh) => {
        planetMesh.orbitAngle += planetMesh.orbitSpeed;
        planetMesh.position.x = planetMesh.orbitDistance * Math.cos(planetMesh.orbitAngle);
        planetMesh.position.z = planetMesh.orbitDistance * Math.sin(planetMesh.orbitAngle);
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();


window.addEventListener('resize', () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
