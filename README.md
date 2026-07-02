# Ópticas Siriius — Landing page

Landing premium minimalista en **blanco y negro** para óptica.
HTML + CSS + JavaScript puro (sin frameworks). 100% responsive.

## Cómo verla
- **Opción rápida:** doble clic en `index.html`.
- **Con servidor local:** `node serve.js` → abre http://localhost:5232

## Estructura de archivos
```
siriius-web/
├─ index.html      ← contenido y secciones
├─ styles.css      ← todo el diseño (colores, tipografías, animaciones)
├─ script.js       ← preloader, menú, animaciones, formulario→WhatsApp
├─ serve.js        ← servidor local opcional
├─ process-logo.js ← regenera el logo desde el archivo original
└─ img/
   ├─ logo.png        ← wordmark NEGRO (fondos claros)
   ├─ logo-white.png  ← wordmark BLANCO (fondos oscuros)
   └─ favicon.png     ← ícono de la pestaña
```

## Cómo editar cosas comunes

**Cambiar el número de WhatsApp**
Busca `573156501085` (es 315 650 1085 con el +57 de Colombia) en `index.html`
y en `script.js`, y reemplázalo por el nuevo.

**Cambiar textos**
Están en `index.html`. Cada sección tiene un comentario que la identifica
(ej. `3 · HERO`, `5 · SERVICIOS`).

**Poner fotos reales**
Cada tarjeta que hoy muestra una ilustración de gafas tiene un comentario
`REEMPLAZAR IMAGEN` indicando exactamente qué reemplazar por tu `<img>`.
Sugerencia: guarda las fotos en `/img` y llámalas desde ahí.

**Cambiar el logo**
Reemplaza `img/logo.png` (negro) y `img/logo-white.png` (blanco).
Si tienes un logo nuevo, edita la ruta en `process-logo.js` y ejecuta
`node process-logo.js` para regenerar ambas versiones automáticamente.

**Cambiar colores / tipografías**
En `styles.css`, arriba, en el bloque `:root` (variables `--ink`, `--paper`,
`--font-serif`, `--font-sans`, etc.).

## Nota de marca
El texto de la página usa la ortografía de tu **logo**: **SIRIIUS** / **Ópticas Siriius**.
Si prefieres otra grafía (p. ej. "Siriuus"), avísame y la cambio en todo el sitio.
