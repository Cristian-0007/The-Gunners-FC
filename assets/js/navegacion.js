/**
 * ============================================================================
 * NAVEGACIÓN
 * ----------------------------------------------------------------------------
 * - Abre y cierra el menú hamburguesa en pantallas pequeñas.
 * - Resalta en el menú la sección que se está viendo.
 * - Muestra el año actual en el pie de página.
 *
 * Nota: el desplazamiento suave lo hace CSS (scroll-behavior: smooth),
 * por eso no se necesita JavaScript para eso.
 * ============================================================================
 */
(function iniciarNavegacion() {
    'use strict';

    const botonMenu = document.querySelector('.menu-boton');
    const menu = document.getElementById('menu-principal');
    const enlaces = document.querySelectorAll('.navegacion__enlace');

    /* ---------------------------------------------------------------------
       1. Menú hamburguesa
       --------------------------------------------------------------------- */

    /**
     * Abre o cierra el menú y actualiza los atributos de accesibilidad.
     * @param {boolean} abrir
     */
    function alternarMenu(abrir) {
        menu.classList.toggle('navegacion--abierta', abrir);
        botonMenu.setAttribute('aria-expanded', String(abrir));
        botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    }

    const menuAbierto = () => botonMenu.getAttribute('aria-expanded') === 'true';

    botonMenu.addEventListener('click', () => alternarMenu(!menuAbierto()));

    // Cierra el menú al elegir una opción
    enlaces.forEach((enlace) => enlace.addEventListener('click', () => alternarMenu(false)));

    // Cierra el menú con la tecla Escape
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && menuAbierto()) {
            alternarMenu(false);
            botonMenu.focus();
        }
    });

    // Cierra el menú al tocar fuera de él
    document.addEventListener('click', (evento) => {
        if (menuAbierto() && !menu.contains(evento.target) && !botonMenu.contains(evento.target)) {
            alternarMenu(false);
        }
    });

    /* ---------------------------------------------------------------------
       2. Resaltar la sección visible en el menú
       --------------------------------------------------------------------- */
    const secciones = document.querySelectorAll('main section[id]');

    // Una sección se considera "activa" cuando cruza la mitad de la pantalla
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;

            enlaces.forEach((enlace) => {
                const esActivo = enlace.getAttribute('href') === `#${entrada.target.id}`;
                enlace.classList.toggle('navegacion__enlace--activo', esActivo);
            });
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    secciones.forEach((seccion) => observador.observe(seccion));

    /* ---------------------------------------------------------------------
       3. Año actual en el pie de página
       --------------------------------------------------------------------- */
    const anio = document.getElementById('anio-actual');
    if (anio) anio.textContent = new Date().getFullYear();
})();
