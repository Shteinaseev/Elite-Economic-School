
const form = document.querySelector(".form")
var SEPARATION = 50, AMOUNTX = 60, AMOUNTY = 30;
var container;
var camera, scene, renderer;
var particles, count = 0;

init();
animate();

function init() {
    container = document.createElement('div');
    container.className = 'canvas'
    form.appendChild(container);

    camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.y = 180;
    camera.position.z = 20;
    camera.rotation.x = 0.35;

    scene = new THREE.Scene();

    // Создаем круглую текстуру для точек
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgb(255, 255, 255)');
    gradient.addColorStop(0, 'rgb(255, 255, 255)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(16, 16, 16, 0, Math.PI * 2);
    context.fill();

    const texture = new THREE.CanvasTexture(canvas);

    // Создаем точки
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const sizes = [];

    for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
            positions.push(
                ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2),
                0,
                iy * SEPARATION - ((AMOUNTY * SEPARATION) - 10)
            );
            sizes.push(5); // Начальный размер
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 10,
        sizeAttenuation: true,
        map: texture,
        transparent: false,
        alphaTest: 0.01,
        opacity: 1
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    const positions = particles.geometry.attributes.position.array;
    const sizes = particles.geometry.attributes.size.array;

    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
            const i3 = i * 3;
            positions[i3 + 1] = (Math.sin((ix + count) * 0.5) * 15 + (Math.sin((iy + count) * 0.5) * 15));
            sizes[i] = (Math.sin((ix + count) * 0.5) + 2 * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4);
            i++;
        }
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.size.needsUpdate = true;

    renderer.render(scene, camera);
    count += 0.05;
}
