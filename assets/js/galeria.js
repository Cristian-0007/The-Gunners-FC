/**
 * ============================================================================
 * GALERÍA - CARRUSEL
 * ----------------------------------------------------------------------------
 * Cómo funciona:
 *   - La foto activa es siempre el 2.º elemento de la lista; el 1.º queda
 *     detrás para que la transición se vea fluida. Del 3.º en adelante
 *     se muestran como miniaturas.
 *   - Para avanzar/retroceder se mueve un elemento al final/inicio de la
 *     lista y CSS anima el cambio (ver sección 8 de styles.css).
 *
 * Controles: flechas, clic en una miniatura, teclado (← →) y deslizar
 * el dedo en celulares. Avanza solo cada INTERVALO_AUTOMATICO ms, pero
 * únicamente mientras el carrusel está visible en pantalla.
 * ============================================================================
 */
(function iniciarCarrusel() {
    'use strict';

    const carrusel = document.querySelector('[data-carrusel]');
    if (!carrusel) return;

    const lista = carrusel.querySelector('.carrusel__lista');
    const barraProgreso = carrusel.querySelector('.carrusel__progreso');

    /** Tiempo (ms) que permanece cada foto antes de avanzar sola. */
    const INTERVALO_AUTOMATICO = 7000;

    /** Distancia mínima (px) del deslizamiento para cambiar de foto. */
    const UMBRAL_DESLIZAR = 50;

    // Si el usuario desactivó las animaciones en su sistema, no hay avance automático
    const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let temporizador = null;
    let enPantalla = false;

    // Sincroniza la duración de la barra de progreso con el intervalo
    barraProgreso.style.setProperty('--duracion', `${INTERVALO_AUTOMATICO}ms`);

    // Al iniciar, el último pasa al principio: así la primera foto del HTML es la activa
    lista.prepend(lista.lastElementChild);

    /* ---------------------------------------------------------------------
       Navegación entre fotos
       --------------------------------------------------------------------- */

    /** Muestra la siguiente foto. */
    function siguiente() {
        lista.append(lista.firstElementChild);
        reiniciarAvanceAutomatico();
    }

    /** Muestra la foto anterior. */
    function anterior() {
        lista.prepend(lista.lastElementChild);
        reiniciarAvanceAutomatico();
    }

    /**
     * Salta directamente a una miniatura.
     * @param {number} posicion - Índice del elemento en la lista (2 = primera miniatura).
     */
    function irA(posicion) {
        for (let i = 1; i < posicion; i++) {
            lista.append(lista.firstElementChild);
        }
        reiniciarAvanceAutomatico();
    }

    /* ---------------------------------------------------------------------
       Avance automático y barra de progreso
       --------------------------------------------------------------------- */

    const puedeAvanzarSolo = () => !movimientoReducido && enPantalla && !document.hidden;

    /** Reinicia el contador de avance automático y la barra de progreso. */
    function reiniciarAvanceAutomatico() {
        clearTimeout(temporizador);

        // Reinicia la animación CSS de la barra (el reflow fuerza a empezar de cero)
        barraProgreso.classList.remove('carrusel__progreso--activo');
        void barraProgreso.offsetWidth;

        if (!puedeAvanzarSolo()) return;

        barraProgreso.classList.add('carrusel__progreso--activo');
        temporizador = setTimeout(siguiente, INTERVALO_AUTOMATICO);
    }

    // Solo avanza cuando el carrusel está visible (ahorra recursos y evita cambios "a escondidas")
    const observador = new IntersectionObserver(([entrada]) => {
        enPantalla = entrada.isIntersecting;
        reiniciarAvanceAutomatico();
    }, { threshold: 0.35 });

    observador.observe(carrusel);

    // Pausa si el usuario cambia de pestaña
    document.addEventListener('visibilitychange', reiniciarAvanceAutomatico);

    /* ---------------------------------------------------------------------
       Eventos de usuario
       --------------------------------------------------------------------- */

    // Flechas anterior / siguiente
    carrusel.querySelector('[data-accion="anterior"]').addEventListener('click', anterior);
    carrusel.querySelector('[data-accion="siguiente"]').addEventListener('click', siguiente);

    // Clic en una miniatura
    lista.addEventListener('click', (evento) => {
        const item = evento.target.closest('.carrusel__item');
        if (!item) return;

        const posicion = Array.prototype.indexOf.call(lista.children, item);
        if (posicion >= 2) irA(posicion);
    });

    // Teclado: flechas izquierda/derecha cuando el foco está dentro del carrusel
    carrusel.addEventListener('keydown', (evento) => {
        if (evento.key === 'ArrowRight') siguiente();
        if (evento.key === 'ArrowLeft') anterior();
    });

    // Deslizar con el dedo en pantallas táctiles
    let inicioToqueX = null;

    carrusel.addEventListener('touchstart', (evento) => {
        inicioToqueX = evento.changedTouches[0].clientX;
    }, { passive: true });

    carrusel.addEventListener('touchend', (evento) => {
        if (inicioToqueX === null) return;

        const distancia = evento.changedTouches[0].clientX - inicioToqueX;
        inicioToqueX = null;

        if (Math.abs(distancia) < UMBRAL_DESLIZAR) return;
        distancia < 0 ? siguiente() : anterior();
    }, { passive: true });
})();
