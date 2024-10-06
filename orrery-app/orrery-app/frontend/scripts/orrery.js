
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('orrery-container').appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1.5, 1000);
light.position.set(0, 0, 0);
scene.add(light);


const ambientLight = new THREE.AmbientLight(0x404040); 
scene.add(ambientLight);

const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

let celestialBodies = [];

function createPlanet(name, radius, distance, color, orbitSpeed) {
    const planetGeometry = new THREE.SphereGeometry(radius, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: color });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.name = name; 
    planet.originalColor = color;
    planet.orbitDistance = distance;
    planet.orbitSpeed = orbitSpeed;
    planet.angle = Math.random() * Math.PI * 2; 
    scene.add(planet);
    return planet;
}


const mercury = createPlanet('mercury', 0.2, 4, 0xaaaaaa, 0.004);
const venus = createPlanet('venus', 0.4, 5, 0xffcc00, 0.003); 
const earth = createPlanet('earth', 0.5, 6, 0x0000ff, 0.0025); 
const mars = createPlanet('mars', 0.3, 8, 0xff4500, 0.002);  
const jupiter = createPlanet('jupiter', 1.1, 12, 0xffa500, 0.001); 
const saturn = createPlanet('saturn', 0.9, 15, 0xd2b48c, 0.0009); 
const uranus = createPlanet('uranus', 0.7, 18, 0x00ffff, 0.0006); 
const neptune = createPlanet('neptune', 0.6, 21, 0x0000ff, 0.0005);

celestialBodies.push(mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);


camera.position.set(0, 1, 20); 


let selectedBody = null;


function rotatePlanet(body) {
    body.angle += body.orbitSpeed; 

    
    body.position.x = Math.cos(body.angle) * body.orbitDistance;
    body.position.z = Math.sin(body.angle) * body.orbitDistance;
}

function displayPlanetInfo(body) {
    document.getElementById('info-text').innerHTML = `
        <strong>Planet: ${body.name}</strong><br>
        Radius: ${body.geometry.parameters.radius} units<br>
        Distance from Sun: ${body.orbitDistance} units<br>
        Orbit Speed: ${body.orbitSpeed.toFixed(4)} units/s
    `;
}


function highlightPlanet(planet) {
    celestialBodies.forEach((body) => {
        body.material.color.set(body.originalColor); 
    });
    planet.material.color.set(planet.originalColor); 
}

// // Create orbit paths for planets
// function createOrbitPath(distance) {
//     const curve = new THREE.EllipseCurve(0, 0, distance, distance, 0, 2 * Math.PI, false);
//     const points = curve.getPoints(50);
//     const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
//     const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
//     const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
//     scene.add(orbit);
// }

// // Create orbits for each planet
// celestialBodies.forEach((planet) => {
//     createOrbitPath(planet.orbitDistance);
// });

function createOrbitTorus(distance, thickness = 0.001) {
    const torusGeometry = new THREE.TorusGeometry(distance, thickness, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.rotation.x = Math.PI / 2;
    scene.add(torus);
}

celestialBodies.forEach((planet) => {
    createOrbitTorus(planet.orbitDistance);
});



celestialBodies.forEach((planet) => {
    document.getElementById(`nav-${planet.name}`).addEventListener('click', () => {
        selectedBody = planet;
        highlightPlanet(planet);
        displayPlanetInfo(planet);
    });
});

document.getElementById('speed-slider').addEventListener('input', (event) => {
    const speedMultiplier = event.target.value;
    celestialBodies.forEach((body) => {
        body.orbitSpeed *= speedMultiplier;
    });
});

document.getElementById('nav-sun').addEventListener('click', () => {
    selectedBody = sun;
    camera.position.set(0, 2, 28); 
});

document.getElementById('nav-mercury').addEventListener('click', () => {
    selectedBody = mercury;
    camera.position.set(0, 2, 14);
});

document.getElementById('nav-venus').addEventListener('click', () => {
    selectedBody = venus;
    camera.position.set(0, 2, 12);
});

document.getElementById('nav-earth').addEventListener('click', () => {
    selectedBody = earth;
    camera.position.set(0, 2, 8);
});

document.getElementById('nav-mars').addEventListener('click', () => {
    selectedBody = mars;
    camera.position.set(0, 2, 12);
});

document.getElementById('nav-jupiter').addEventListener('click', () => {
    selectedBody = jupiter;
    camera.position.set(0, 2, 16);
});

document.getElementById('nav-saturn').addEventListener('click', () => {
    selectedBody = saturn;
    camera.position.set(0, 2, 20);
});

document.getElementById('nav-uranus').addEventListener('click', () => {
    selectedBody = uranus;
    camera.position.set(0, 2, 25);
});

document.getElementById('nav-neptune').addEventListener('click', () => {
    selectedBody = neptune;
    camera.position.set(0, 2, 28);
});

function followPlanet(planet) {
    const distance = 3; // Distance behind the planet
    camera.position.x = planet.position.x - Math.cos(planet.angle) * distance;
    camera.position.z = planet.position.z - Math.sin(planet.angle) * distance;
    camera.lookAt(planet.position); // Keep the camera focused on the planet
}



function animate() {
    requestAnimationFrame(animate);

    if (selectedBody) {
        celestialBodies.forEach((body) => {
            if (body === selectedBody || selectedBody === sun) {
                rotatePlanet(body);
            }
        });
    } else {
        
        celestialBodies.forEach((body) => {
            rotatePlanet(body);
        });
    }

    renderer.render(scene, camera);
}

animate();
