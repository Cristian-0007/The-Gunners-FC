/**
 * ============================================================================
 * CONFIGURACIÓN DEL SITIO
 * ----------------------------------------------------------------------------
 * Este es el único archivo que normalmente hay que editar para:
 *   - Cambiar el número de WhatsApp o los mensajes predeterminados.
 *   - Agregar, quitar o modificar productos del catálogo de equipación.
 * ============================================================================
 */
const CONFIG = Object.freeze({

    whatsapp: {
        // Número en formato internacional, sin "+", espacios ni guiones (57 = Colombia).
        numero: '573001558620',

        // Mensajes que aparecen ya escritos en el chat del usuario.
        mensajes: {
            // Botones generales ("Escríbenos", botón flotante).
            general: 'Hola, quiero más información sobre la escuela de fútbol The Gunners FC.',

            // Botón de cada producto. {producto} se reemplaza por el nombre del producto.
            producto: 'Hola, estoy interesado en adquirir un producto: {producto}. ¿Me pueden dar más información?',
        },
    },

    /**
     * Catálogo de equipación.
     * Para agregar un producto, copia un bloque { ... } y cambia sus datos:
     *   nombre       -> Nombre visible y el que se envía en el mensaje de WhatsApp.
     *   descripcion  -> Texto corto debajo del nombre.
     *   imagen       -> Ruta de la foto (idealmente .webp de ~700 px de ancho, formato vertical 3:4).
     *   precio       -> Opcional. Déjalo vacío ('') para no mostrarlo. Ej: '$85.000'.
     */
    productos: [
        {
            nombre: 'Sudadera',
            descripcion: 'Sudadera oficial del club para todas las categorías.',
            imagen: 'assets/img/equipacion/sudadera.webp',
            precio: '',
        },
    ],
});
