/**
 * ============================================================================
 * CUERPO TÉCNICO - VENTANA DE PERFIL
 * ----------------------------------------------------------------------------
 * Al hacer clic (o tocar) la foto de un integrante, se abre una ventana
 * (<dialog>) con su foto, nombre completo, cargo y perfil profesional.
 * El perfil se toma del bloque oculto .tecnico__perfil de cada tarjeta.
 *
 * Funciona igual en computador y en celular (antes solo con el mouse).
 * ============================================================================
 */
(function iniciarPerfilesCuerpoTecnico() {
    'use strict';

    const modal = document.getElementById('modal-perfil');

    // <dialog> es compatible con todos los navegadores modernos
    if (!modal || typeof modal.showModal !== 'function') return;

    const foto = modal.querySelector('.modal__foto');
    const nombre = modal.querySelector('.modal__nombre');
    const cargo = modal.querySelector('.modal__cargo');
    const perfil = modal.querySelector('.modal__perfil');
    const botonCerrar = modal.querySelector('.modal__cerrar');

    /**
     * Llena la ventana con los datos de la tarjeta y la abre.
     * @param {HTMLElement} tarjeta - Elemento .tecnico
     */
    function abrirPerfil(tarjeta) {
        const imagen = tarjeta.querySelector('img');

        foto.src = imagen.currentSrc || imagen.src;
        foto.alt = imagen.alt;
        nombre.textContent = tarjeta.dataset.nombreCompleto;
        cargo.textContent = tarjeta.querySelector('.tecnico__cargo').textContent;

        // Copia el contenido del perfil oculto dentro de la ventana
        const contenido = tarjeta.querySelector('.tecnico__perfil').cloneNode(true);
        perfil.replaceChildren(...contenido.childNodes);

        modal.showModal();
    }

    document.querySelectorAll('.tecnico').forEach((tarjeta) => {
        tarjeta.querySelector('.tecnico__foto').addEventListener('click', () => abrirPerfil(tarjeta));
    });

    // Cerrar con el botón "×"
    botonCerrar.addEventListener('click', () => modal.close());

    // Cerrar al hacer clic en el fondo oscuro (fuera del contenido)
    modal.addEventListener('click', (evento) => {
        if (evento.target === modal) modal.close();
    });

    // La tecla Escape la cierra automáticamente (comportamiento nativo de <dialog>)
})();
