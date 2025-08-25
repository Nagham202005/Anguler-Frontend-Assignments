const galleryItems = document.querySelectorAll('.thumbnails .item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    const imgSrc = galleryItems[currentIndex].querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    galleryItems[currentIndex].focus();
}

function showNextImage() {
    currentIndex++;
    if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }
    lightboxImg.src = galleryItems[currentIndex].querySelector('img').src;
}

function showPrevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    }
    lightboxImg.src = galleryItems[currentIndex].querySelector('img').src;
}

galleryItems.forEach((item, index) => {
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            openLightbox(index);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            showNextImage();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            showPrevImage();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});