# The Gunners Fútbol Club - Sitio web

🌐 **Sitio publicado:** <https://the-gunners-fc.pages.dev>

Página web oficial de **The Gunners F.C.**, escuela de formación deportiva en fútbol para niños y jóvenes de Soacha, Cundinamarca.

Es un sitio estático de una sola página (HTML + CSS + JavaScript, sin dependencias ni proceso de compilación), publicado en [Cloudflare Pages](https://pages.cloudflare.com) desde este repositorio de GitHub.

**Publicar cambios:** cualquier cambio que se suba a la rama `main` se publica automáticamente en 1-2 minutos.

## Estructura

```
├── index.html               Página principal (todas las secciones, incluida la galería)
├── _headers                 Encabezados HTTP de Cloudflare Pages (seguridad y caché)
├── _redirects               Redirecciones (la galería antigua lleva a #galeria)
├── assets/
│   ├── css/
│   │   └── styles.css       Estilos (organizados por secciones, con variables de color)
│   ├── js/
│   │   ├── config.js        ⭐ Datos editables: WhatsApp y catálogo de productos
│   │   ├── whatsapp.js      Genera los enlaces de WhatsApp con mensaje predefinido
│   │   ├── catalogo.js      Dibuja las tarjetas de productos
│   │   ├── navegacion.js    Menú móvil, sección activa y año del pie de página
│   │   ├── galeria.js       Carrusel de fotos
│   │   └── cuerpo-tecnico.js  Ventana con el perfil de cada entrenador
│   └── img/
│       ├── logo/            Escudo, favicon e imagen para redes sociales
│       ├── secciones/       Fondos de cada sección (versión normal y "-movil")
│       ├── equipacion/      Fotos de productos
│       ├── galeria/         Fotos del carrusel
│       ├── cuerpo-tecnico/  Fotos del cuerpo técnico (600 × 750 px)
│       └── iconos/          Íconos de contacto
```

## Tareas comunes

### Cambiar el número de WhatsApp o los mensajes
Edita `assets/js/config.js` → `whatsapp.numero` y `whatsapp.mensajes`.

### Agregar un producto
1. Guarda la foto en `assets/img/equipacion/` (formato vertical 3:4, ~700 px de ancho, idealmente `.webp`).
2. En `assets/js/config.js`, copia un bloque dentro de `productos` y cambia `nombre`, `descripcion`, `imagen` y, si quieres, `precio`.

El botón "Comprar por WhatsApp" se genera automáticamente con el nombre del producto.

### Agregar una foto a la galería
1. Guarda la foto en `assets/img/galeria/` (máx. 1600 px de ancho).
2. En `index.html`, dentro de `.carrusel__lista`, copia un `<li class="carrusel__item">` completo y cambia la imagen y los textos.

### Agregar un integrante al cuerpo técnico
1. Guarda la foto en `assets/img/cuerpo-tecnico/` (600 × 750 px).
2. En `index.html`, dentro de `.equipo-tecnico`, copia un `<li>` completo y cambia los datos.

> **Importante:** antes de subir fotos, comprímelas (por ejemplo en <https://squoosh.app>, formato WebP, calidad ~75).
> Una foto tomada con celular puede pesar 5-12 MB; comprimida queda entre 30 y 300 KB.

## Ver el sitio en tu computador

Basta con abrir `index.html` en el navegador. Para una prueba más fiel (igual al sitio publicado), usa un servidor local:

```bash
python -m http.server 5500
```

y abre <http://localhost:5500>.
