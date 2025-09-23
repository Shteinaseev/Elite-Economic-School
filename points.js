document.addEventListener('DOMContentLoaded', function () {
    // Get all glass form elements
    const glassElements = document.querySelectorAll('.glass-form');
    const switchToRegister = document.querySelector('.switch-to-register');
    const switchToLogin = document.querySelector('.switch-to-login');
    const loginForm = document.querySelector('.form-container.login');
    const registerForm = document.querySelector('.form-container.register');

    // Add mousemove effect for each glass element
    glassElements.forEach(element => {
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Form switch event listeners
    if (switchToRegister && switchToLogin && loginForm && registerForm) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.opacity = '0';
            loginForm.style.transform = 'translateX(-20px)';

            setTimeout(() => {
                loginForm.classList.remove('active');
                registerForm.classList.add('active');

                setTimeout(() => {
                    registerForm.style.opacity = '1';
                    registerForm.style.transform = 'translateX(0)';
                }, 50);
            }, 300);
        });

        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.style.opacity = '0';
            registerForm.style.transform = 'translateX(-20px)';

            setTimeout(() => {
                registerForm.classList.remove('active');
                loginForm.classList.add('active');

                setTimeout(() => {
                    loginForm.style.opacity = '1';
                    loginForm.style.transform = 'translateX(0)';
                }, 50);
            }, 300);
        });
    }

    // Handle mouse movement over glass elements
    function handleMouseMove(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Add highlight effect
        const specular = this.querySelector('.glass-specular');
        if (specular) {
            specular.style.background = `radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,0.15) 0%,
        rgba(255,255,255,0.05) 30%,
        rgba(255,255,255,0) 60%
      )`;
        }
    }

    // Reset effects when mouse leaves
    function handleMouseLeave() {
        const filter = document.querySelector('#glass-distortion feDisplacementMap');
        if (filter) {
            filter.setAttribute('scale', '77');
        }

        const specular = this.querySelector('.glass-specular');
        if (specular) {
            specular.style.background = 'none';
        }
    }

    // Form validation and submission handling
    const forms = document.querySelectorAll('.glass-form form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input');

        // Add input validation styles
        inputs.forEach(input => {
            input.addEventListener('invalid', function () {
                this.classList.add('error');
            });

            input.addEventListener('input', function () {
                if (this.validity.valid) {
                    this.classList.remove('error');
                }
            });
        });

        // Handle form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Simple validation for password match in register form
            if (form.closest('.register')) {
                const password = data.password;
                const confirmPassword = data['confirm-password'];

                if (password !== confirmPassword) {
                    alert('Passwords do not match!');
                    return;
                }
            }

            // Here you would typically send the data to your server
            console.log('Form submitted:', data);

            // Show success state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Success!';
            submitBtn.classList.add('success');

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('success');
                form.reset();
            }, 2000);
        });
    });

    // Initialize code blocks for the snippet preview
    initializeCodeBlocks();
});

// Function to initialize code blocks
function initializeCodeBlocks() {
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const jsCode = document.getElementById('js-code');

    // Add copy functionality to code blocks
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const codeBlock = document.getElementById(targetId);
            if (codeBlock) {
                navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                    button.innerHTML = ' Copied!';
                    setTimeout(() => {
                        button.innerHTML = ' Copy';
                    }, 2000);
                });
            }
        });
    });
}

var SEPARATION = 50, AMOUNTX = 60, AMOUNTY = 30;
var container;
var camera, scene, renderer;
var particles, count = 0;

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

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
