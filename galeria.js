document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('carouselTrack');
    const images = track.querySelectorAll('img');
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    const imageWidth = images[0].clientWidth;
    let currentIndex = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    }

    btnLeft.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    btnRight.addEventListener('click', () => {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    //Opcional: auto-slide
     setInterval(() => {
         btnRight.click();
     }, 4000);
});