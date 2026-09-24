/**
 * ============================================================================
 * WHATSAPP
 * ----------------------------------------------------------------------------
 * Construye los enlaces de WhatsApp con un mensaje ya escrito.
 * El número y los mensajes se configuran en config.js.
 *
 * Uso en el HTML:
 *   <a data-whatsapp="general">...</a>
 *   El valor ("general") es la clave del mensaje en CONFIG.whatsapp.mensajes.
 * ============================================================================
 */

/**
 * Genera un enlace de WhatsApp (wa.me) que abre el chat con el texto indicado.
 * Funciona en celular (app de WhatsApp) y en computador (WhatsApp Web).
 *
 * @param {string} mensaje - Texto que aparecerá escrito en el chat.
 * @returns {string} URL lista para usar en un enlace.
 */
function crearEnlaceWhatsApp(mensaje) {
    return `https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
}

// Asigna el enlace a todos los elementos marcados con data-whatsapp
(function iniciarEnlacesWhatsApp() {
    'use strict';

    const { mensajes } = CONFIG.whatsapp;

    document.querySelectorAll('[data-whatsapp]').forEach((enlace) => {
        const clave = enlace.dataset.whatsapp;
        const mensaje = mensajes[clave] ?? mensajes.general;
        enlace.href = crearEnlaceWhatsApp(mensaje);
    });
})();
