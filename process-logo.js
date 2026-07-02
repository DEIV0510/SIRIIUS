/* Procesa el logo real (logosirius.png) en versiones limpias con fondo transparente.
   Salidas en /img:
     - logo.png        → wordmark NEGRO sobre transparente (para fondos claros)
     - logo-white.png  → wordmark BLANCO sobre transparente (para fondos oscuros)
     - favicon.png     → ícono cuadrado
   Ejecutar:  node process-logo.js
*/
const sharp = require('sharp');
const path = require('path');

const SRC = 'C:/Users/Lenovo/Desktop/logosirius.png';
const OUT = path.join(__dirname, 'img');

(async () => {
  // 1) Recortar el marco blanco alrededor del wordmark
  const trimmed = await sharp(SRC).trim().toBuffer();
  const meta = await sharp(trimmed).metadata();
  const w = meta.width, h = meta.height;

  // 2) Construir canal alfa a partir de la luminosidad:
  //    texto oscuro -> opaco ; fondo blanco -> transparente
  const alpha = await sharp(trimmed)
    .grayscale()
    .negate()            // blanco(255)->0 (transparente) ; negro(0)->255 (opaco)
    .linear(1.1, 0)      // un poco más de contraste en los bordes
    .toBuffer();

  // 3) Wordmark NEGRO transparente
  await sharp({ create: { width: w, height: h, channels: 3, background: '#0a0a0a' } })
    .joinChannel(alpha)
    .png()
    .toFile(path.join(OUT, 'logo.png'));

  // 4) Wordmark BLANCO transparente
  await sharp({ create: { width: w, height: h, channels: 3, background: '#ffffff' } })
    .joinChannel(alpha)
    .png()
    .toFile(path.join(OUT, 'logo-white.png'));

  // 5) Favicon cuadrado (solo la "S"/marca centrada sobre el wordmark completo, versión negra)
  await sharp(path.join(OUT, 'logo.png'))
    .resize({ width: 400, height: 400, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUT, 'favicon.png'));

  console.log('Logo procesado OK →', w + 'x' + h);
})().catch(e => { console.error(e); process.exit(1); });
