# AGENTS.md

Sitio estático de una sola página para el evento (textos de la interfaz en español). Sin build, sin dependencias, sin tests, ni CI — edita los archivos y abre `index.html` en el navegador, o sirve la carpeta con cualquier servidor de archivos estáticos.

## Estructura

- `index.html` — todo el contenido/textos (secciones, tarjetas de juegos, suministros, ubicación)
- `js/app.js` — toda la lógica: puerta de acceso, cuenta regresiva, cronómetro de exposiciones, modal de tutoriales de juegos, confeti
- `css/style.css` — todos los estilos; la paleta y las fuentes se definen como propiedades personalizadas CSS en `:root`

## Puntos clave

- Los códigos de acceso están en el mapa `ACCESS_CODES` al inicio de `js/app.js` (código → nombre del agente). La puerta es un recurso temático, no seguridad — los códigos se validan en el cliente y el nombre se guarda en `sessionStorage`.
- `js/app.js` contiene un 9.º código (`P8-AAAA-BBB` → "Daniel A.") que no aparece en `README.md`. Es intencional; no lo "limpies".
- La fecha de la cuenta regresiva está fija en `js/app.js`: `new Date("2026-10-10T17:00:00-05:00")` (hora de Bogotá, UTC-5). El sitio dice sábado 10 de octubre de 2026; `README.md` dice 11 de octubre — el sitio es correcto, el README está desactualizado.
- Las secciones de comida / bebidas / playlist son marcadores de posición deliberados ("PENDIENTE / CLASIFICADO"). Actualiza el texto en `index.html` cuando se confirmen los detalles; no los trates como errores.
- Las fuentes (Space Grotesk, DM Mono) se cargan desde la CDN de Google Fonts. Sin conexión, el sitio usa fuentes del sistema — el diseño sigue funcionando.
- Mantén todos los textos de la interfaz en español, siguiendo el tono de terminal/HUD del texto existente.
