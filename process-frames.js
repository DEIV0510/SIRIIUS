/* Procesa las fotos de monturas (carpeta lentessirius) a WebP uniformes.
   Salida: /img/frames/f1.webp ... fN.webp  (900x675, recorte centrado)
   Se mantienen a COLOR; la web las muestra en blanco y negro por CSS
   y revela el color al pasar el cursor (hover).
   Ejecutar:  node process-frames.js
*/
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = 'C:/Users/Lenovo/Desktop/lentessirius';
const OUT = path.join(__dirname, 'img', 'frames');
fs.mkdirSync(OUT, { recursive: true });

const files = fs.readdirSync(SRC).filter(f => /\.png$/i.test(f))
  .sort((a, b) => parseInt(a) - parseInt(b));

(async () => {
  let i = 0;
  for (const f of files) {
    i++;
    await sharp(path.join(SRC, f))
      .resize(900, 675, { fit: 'cover', position: 'centre' })
      .modulate({ brightness: 1.03 })            // leve realce
      .webp({ quality: 84 })
      .toFile(path.join(OUT, 'f' + i + '.webp'));
  }
  console.log('Frames procesados:', i, '→', OUT);
})().catch(e => { console.error(e); process.exit(1); });
