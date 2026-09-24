/**
 * ============================================================================
 * CATÁLOGO DE EQUIPACIÓN
 * ----------------------------------------------------------------------------
 * Dibuja una tarjeta por cada producto definido en CONFIG.productos (config.js)
 * usando la plantilla <template id="plantilla-producto"> del HTML.
 * Cada tarjeta incluye un botón que abre WhatsApp con el nombre del producto.
 * ============================================================================
 */
(function iniciarCatalogo() {
    'use strict';

    const contenedor = document.getElementById('catalogo');
    const plantilla = document.getElementById('plantilla-producto');

    if (!contenedor || !plantilla) return;

    /**
     * Crea la tarjeta HTML de un producto a partir de la plantilla.
     *
     * @param {{nombre: string, descripcion: string, imagen: string, precio?: string}} producto
     * @returns {HTMLLIElement}
     */
    function crearTarjeta({ nombre, descripcion, imagen, precio }) {
        const tarjeta = plantilla.content.firstElementChild.cloneNode(true);

        // Imagen
        const foto = tarjeta.querySelector('.producto__imagen');
        foto.src = imagen;
        foto.alt = nombre;

        // Textos (textContent evita que se interprete HTML)
        tarjeta.querySelector('.producto__nombre').textContent = nombre;
        tarjeta.querySelector('.producto__descripcion').textContent = descripcion;

        // Precio (solo si está definido)
        if (precio) {
            const etiquetaPrecio = tarjeta.querySelector('.producto__precio');
            etiquetaPrecio.textContent = precio;
            etiquetaPrecio.hidden = false;
        }

        // Botón de WhatsApp con el mensaje personalizado para este producto
        const mensaje = CONFIG.whatsapp.mensajes.producto.replace('{producto}', nombre);
        const boton = tarjeta.querySelector('.producto__boton');
        boton.href = crearEnlaceWhatsApp(mensaje);
        boton.setAttribute('aria-label', `Comprar ${nombre} por WhatsApp`);

        return tarjeta;
    }

    // Se agregan todas las tarjetas de una sola vez para evitar redibujados innecesarios
    const fragmento = document.createDocumentFragment();
    CONFIG.productos.forEach((producto) => fragmento.append(crearTarjeta(producto)));
    contenedor.append(fragmento);
})();
