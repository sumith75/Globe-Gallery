

// Get country name from data attribute in the gallery section
const gallery = document.querySelector('.gallery');
const country = gallery ? gallery.getAttribute('data-country') : "";
let page = 1;
const perPage = 10;
let images = [];
let currentIndex = 0;

const imgEl = document.getElementById('culture-img');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

async function fetchImages() {
    const res = await fetch(`/api/culture-images?country=${encodeURIComponent(country)}&page=${page}&perPage=${perPage}`);
    const data = await res.json();
    if (data.images && data.images.length > 0) {
        images = images.concat(data.images);
        currentIndex = images.length - data.images.length;
        showImage(currentIndex);
    } else {
        imgEl.style.display = "none";
    }
}

function showImage(index) {
    if (!images.length) return;
    imgEl.src = images[index].url;
    imgEl.alt = images[index].alt;
    imgEl.style.display = "block";
}

nextBtn.addEventListener('click', async () => {
    currentIndex++;
    if (currentIndex < images.length) {
        showImage(currentIndex);
    } else {
        page++;
        await fetchImages();
    }
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

// Initial fetch
fetchImages();