// gen-noise-256.js — genera /public/textures/noise-256.png
// Sin dependencias. PNG grayscale 1-bit (color type 0, bit depth 1). 256×256.
// Compresión zlib nivel 9.
//
// Estrategia para mantener el archivo <10 KB (target 6-9 KB del spec):
//   1. bit depth = 1 → solo "negro" o "blanco" — 1 bit por píxel
//   2. tile 256×256 cubre el viewport en repeat (background-size: 256px)
//
// Justificación: con `mix-blend-mode: overlay` y opacidad global 0.022,
// la diferencia perceptual entre un noise binario y uno multinivel es
// imperceptible — la disparidad temporal/espacial entre píxeles es lo
// que rompe la planicidad. Con bit-depth 1 obtenemos textura efectiva
// + tamaño objetivo. El raw es 8 KB sin compresión y zlib aún estruja
// algo más.

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const W = 256;
const H = 256;

// PRNG determinista para reproducibilidad de la textura
function mulberry32(seed) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6D2B79F5) >>> 0;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(0x4F7E2C9D);

// 1-bit packed grayscale. 8 píxeles por byte (MSB = leftmost).
const dataBytesPerRow = Math.ceil(W / 8);
const stride = 1 + dataBytesPerRow;
const raw = Buffer.alloc(H * stride);

for (let y = 0; y < H; y++) {
  raw[y * stride] = 0; // filter = None
  for (let xByte = 0; xByte < dataBytesPerRow; xByte++) {
    let byte = 0;
    for (let bit = 0; bit < 8; bit++) {
      // 50/50 binario — máximo overlay neutral (promedio = mid-gray)
      if (rand() < 0.5) byte |= (1 << (7 - bit));
    }
    raw[y * stride + 1 + xByte] = byte;
  }
}

// CRC table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[n] = c >>> 0;
}
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

// IHDR
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 1;   // bit depth (1 bit/pixel)
ihdr[9] = 0;   // color type: grayscale
ihdr[10] = 0;  // compression
ihdr[11] = 0;  // filter
ihdr[12] = 0;  // interlace

const idatRaw = zlib.deflateSync(raw, { level: 9 });

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
  chunk("IHDR", ihdr),
  chunk("IDAT", idatRaw),
  chunk("IEND", Buffer.alloc(0)),
]);

const outDir = path.join(__dirname, "..", "public", "textures");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "noise-256.png");
fs.writeFileSync(outPath, png);

console.log(`[noise] wrote ${outPath} (${png.length} bytes)`);
