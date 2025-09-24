const sphere = document.getElementById("sphere")

const rows = []
for (i = 0; i < 180; i += 9) {
  rows.push(`<div class="line" style="transform: rotateY(${i}deg);"></div>`)
}

sphere.innerHTML = rows.join("");

const headerEl = document.querySelector(".header")

window.addEventListener("scroll", function () {
  const scrollPos = window.scrollY

  if (scrollPos > 100) {
    headerEl.classList.add("header__scroll")
  } else {
    headerEl.classList.remove("header__scroll")
  }
})

const menuIcon = document.querySelector('#menu-icon')
const navbar = document.querySelector('.navbar')
const navbg = document.querySelector('.nav-bg')

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x')
  navbar.classList.toggle('active')
  navbg.classList.toggle('active')
})

document.addEventListener('DOMContentLoaded', function () {
  // Get all glass elements
  const glassElements = document.querySelectorAll('.glass-card');

  // Add mousemove effect for each glass element
  glassElements.forEach(element => {
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
  });

  // Handle mouse movement over glass elements
  function handleMouseMove(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update filter turbulence based on mouse position
    const filter = this.querySelector('filter feDisplacementMap');
    if (filter) {
      const scaleX = (x / rect.width) * 100;
      const scaleY = (y / rect.height) * 100;
      filter.setAttribute('scale', Math.min(scaleX, scaleY));
    }

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
    const filter = this.querySelector('filter feDisplacementMap');
    if (filter) {
      filter.setAttribute('scale', '77');
    }

    const specular = this.querySelector('.glass-specular');
    if (specular) {
      specular.style.background = 'none';
    }
  }
});

