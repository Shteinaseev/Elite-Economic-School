document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.parallax-card');
  const maxRotation = 12; // Maximum rotation in degrees

  cards.forEach(card => {
    const content = card.querySelector('.parallax-card-content');

    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateY = (mouseX / (rect.width / 2)) * maxRotation;
      const rotateX = -((mouseY / (rect.height / 2)) * maxRotation);

      content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function () {
      content.style.transform = 'rotateX(0) rotateY(0)';
    });

    card.addEventListener('mouseenter', function () {
      setTimeout(() => {
        content.style.transition = 'transform 0.1s ease';
      }, 100);
    });
  });
});