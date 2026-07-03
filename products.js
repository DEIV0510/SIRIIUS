/* ================================================================
   CATÁLOGO DE PRODUCTOS · Ópticas Siriius
   ----------------------------------------------------------------
   Edita libremente esta lista. Cada producto:
     id      → número único
     name    → nombre visible del producto
     img     → ruta de la foto (en img/frames/)
     price   → precio ACTUAL en pesos (sin puntos ni símbolos)
     compare → precio ANTERIOR (opcional). Si existe, se muestra
               tachado y aparece el % de descuento.
     colors  → nº de colores disponibles (opcional)
     badge   → etiqueta especial: 'nuevo' | 'outlet' | 'tendencia' (opcional)
     cats    → categorías para los filtros: 'clasicos' | 'modernos' | 'metal' | 'acetato'
   Para AGREGAR un producto: copia un bloque { ... } y cámbialo.
   Para QUITARLO: bórralo. Para cambiar la foto: cambia "img".
================================================================ */
window.SIRIIUS_PRODUCTS = [
  { id: 1,  name: 'Aura Metal',        img: 'img/frames/f1.webp',  price: 210000, compare: 280000, colors: 2, badge: 'tendencia', cats: ['clasicos','metal'] },
  { id: 2,  name: 'Lumen Cat-Eye',     img: 'img/frames/f2.webp',  price: 235000,                   colors: 3, badge: 'nuevo',     cats: ['modernos','metal'] },
  { id: 3,  name: 'Línea Fina',        img: 'img/frames/f3.webp',  price: 190000, compare: 240000, colors: 2,                     cats: ['clasicos','metal'] },
  { id: 4,  name: 'Solene Gold',       img: 'img/frames/f4.webp',  price: 245000,                   colors: 2, badge: 'nuevo',     cats: ['modernos','metal'] },
  { id: 5,  name: 'Nova Blanco',       img: 'img/frames/f5.webp',  price: 260000,                   colors: 4, badge: 'tendencia', cats: ['modernos','acetato'] },
  { id: 6,  name: 'Orbe Carey',        img: 'img/frames/f6.webp',  price: 215000, compare: 275000, colors: 3,                     cats: ['clasicos','acetato'] },
  { id: 7,  name: 'Óvalo Carey',       img: 'img/frames/f7.webp',  price: 205000,                   colors: 2,                     cats: ['clasicos','acetato'] },
  { id: 8,  name: 'Vértice',           img: 'img/frames/f8.webp',  price: 180000, compare: 230000, colors: 3,                     cats: ['modernos','acetato'] },
  { id: 9,  name: 'Bosque',            img: 'img/frames/f9.webp',  price: 225000,                   colors: 2,                     cats: ['modernos','acetato'] },
  { id: 10, name: 'Cuadro Esmeralda',  img: 'img/frames/f10.webp', price: 250000,                   colors: 4, badge: 'tendencia', cats: ['modernos','acetato'] },
  { id: 11, name: 'Lila',              img: 'img/frames/f11.webp', price: 195000, compare: 245000, colors: 3,                     cats: ['modernos','acetato'] },
  { id: 12, name: 'Índigo',            img: 'img/frames/f12.webp', price: 210000,                   colors: 3,                     cats: ['modernos','acetato'] },
  { id: 13, name: 'Prisma',            img: 'img/frames/f13.webp', price: 265000,                   colors: 5, badge: 'nuevo',     cats: ['modernos','acetato'] },
  { id: 14, name: 'Mosaico',           img: 'img/frames/f14.webp', price: 240000, compare: 300000, colors: 4,                     cats: ['modernos','acetato'] },
  { id: 15, name: 'Acuarela',          img: 'img/frames/f15.webp', price: 275000,                   colors: 5, badge: 'tendencia', cats: ['modernos','acetato'] },
  { id: 16, name: 'Etéreo',            img: 'img/frames/f16.webp', price: 170000, compare: 220000, colors: 2, badge: 'outlet',    cats: ['clasicos','metal'] },
  { id: 17, name: 'Aire',              img: 'img/frames/f17.webp', price: 175000, compare: 225000, colors: 2, badge: 'outlet',    cats: ['clasicos','metal'] },
  { id: 18, name: 'Eclipse',           img: 'img/frames/f18.webp', price: 200000,                   colors: 3,                     cats: ['clasicos','metal'] },
  { id: 19, name: 'Browline Noir',     img: 'img/frames/f19.webp', price: 230000, compare: 290000, colors: 3,                     cats: ['clasicos','metal'] }
];
