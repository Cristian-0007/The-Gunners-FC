//Modal para la equipación
document.addEventListener('DOMContentLoaded', function () {
    const imgs = document.querySelectorAll('.contenido-equipación img');
    const infoHover = document.getElementById('info-hover');

    imgs.forEach(img => {
        img.addEventListener('mouseenter', (e) => {
            infoHover.innerHTML = img.getAttribute('data-equipacion');
            infoHover.style.display = 'block';
        });
        img.addEventListener('mousemove', (e) => {
            infoHover.style.left = (e.clientX + 20) + 'px';
            infoHover.style.top = (e.clientY - 10) + 'px';
        });
        img.addEventListener('mouseleave', () => {
            infoHover.style.display = 'none';
            infoHover.innerHTML = '';
        });
    });
});

//Modal para el cuerpo técnico
document.addEventListener('DOMContentLoaded', function () {
    const imgs = document.querySelectorAll('.imagenes-cuerpo-tecnico img');
    const infoHover = document.getElementById('info-hover');

    imgs.forEach(img => {
        img.addEventListener('mouseenter', (e) => {
            infoHover.innerHTML = img.getAttribute('data-categoria');
            infoHover.style.display = 'block';
        });
        img.addEventListener('mousemove', (e) => {
            infoHover.style.left = (e.clientX + 20) + 'px';
            infoHover.style.top = (e.clientY - 10) + 'px';
        });
        img.addEventListener('mouseleave', () => {
            infoHover.style.display = 'none';
            infoHover.innerHTML = '';
        });
    });
});