let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slide = document.querySelector('.slide');

function updateRatio() {
  const currentItem = slide.querySelector('.item:nth-child(2)'); // активный элемент
  const bg = currentItem.style.backgroundImage;

  // Извлекаем путь к изображению из background-image
  const urlMatch = bg.match(/url\(["']?(.*?)["']?\)/);
  if (!urlMatch) return;

  const img = new Image();
  img.src = urlMatch[1];

  img.onload = () => {
    const ratio = img.naturalWidth / img.naturalHeight;
    if (ratio > 1){
        document.documentElement.style.setProperty('--img-max-width', 'min(100vw, 1200px)');
        document.documentElement.style.setProperty('--img-ratio', '1.7');

    } else{
        document.documentElement.style.setProperty('--img-max-width', 'clamp(450px, 35vw, 800px');
        document.documentElement.style.setProperty('--img-ratio', '0.7');

    }
  };
}

// Переключение вперёд
next.addEventListener('click', function () {
  let items = document.querySelectorAll('.item');
  slide.appendChild(items[0]);
  updateRatio();
});

// Переключение назад
prev.addEventListener('click', function () {
  let items = document.querySelectorAll('.item');
  slide.prepend(items[items.length - 1]);
  updateRatio();
});

// Инициализация при загрузке
window.addEventListener('load', updateRatio);