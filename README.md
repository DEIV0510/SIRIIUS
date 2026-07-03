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

## Tienda y carrito de compras

La sección **"Gafas y monturas"** es una tienda con carrito que finaliza el pedido por WhatsApp.

**Editar los productos (precios, nombres, descuentos):**
Todo está en `products.js`. Cada producto es un bloque como:
```js
{ id: 1, name: 'Aura Metal', img: 'img/frames/f1.webp',
  price: 210000, compare: 280000, colors: 2, badge: 'tendencia',
  cats: ['clasicos','metal'] }
```
- `price` = precio actual · `compare` = precio anterior tachado (si lo pones, aparece el % de descuento).
- `badge`: `'nuevo'`, `'outlet'` o `'tendencia'` (opcional).
- `colors`: nº de colores · `cats`: para los filtros (`clasicos`, `modernos`, `metal`, `acetato`).
- Para **agregar** un producto copia un bloque; para **quitarlo**, bórralo.

**Carrito:** se guarda solo en el navegador del cliente (localStorage) y al pulsar
*"Finalizar por WhatsApp"* arma el pedido con los productos, cantidades y total, y
abre WhatsApp al 315 650 1085. (No cobra en línea; confirmas por WhatsApp.)

**Color de las ofertas:** por defecto es negro (estética B&W). Si quieres el rojo típico
de descuentos, en `styles.css` cambia la variable `--sale` a `#e2121f`.

## Nota de marca
El texto de la página usa la ortografía de tu **logo**: **SIRIIUS** / **Ópticas Siriius**.
Si prefieres otra grafía (p. ej. "Siriuus"), avísame y la cambio en todo el sitio.
