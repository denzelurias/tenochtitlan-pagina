import { writeFileSync, mkdirSync } from "node:fs";
import { deflateSync } from "node:zlib";

const outDir = new URL("../assets/", import.meta.url);
mkdirSync(outDir, { recursive: true });

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c >>> 0;
}

function crc32(bytes) {
  let c = 0xffffffff;
  for (const b of bytes) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data = Buffer.alloc(0)) {
  const typeBytes = Buffer.from(type);
  const len = Buffer.alloc(4);
  const crc = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])));
  return Buffer.concat([len, typeBytes, data, crc]);
}

function savePng(path, width, height, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 4 + 1);
    raw[row] = 0;
    rgba.copy(raw, row + 1, y * width * 4, (y + 1) * width * 4);
  }

  writeFileSync(
    path,
    Buffer.concat([
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      chunk("IHDR", ihdr),
      chunk("IDAT", deflateSync(raw, { level: 9 })),
      chunk("IEND"),
    ]),
  );
}

function makeImage(width, height, bg) {
  const data = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i += 1) {
    data[i * 4] = bg[0];
    data[i * 4 + 1] = bg[1];
    data[i * 4 + 2] = bg[2];
    data[i * 4 + 3] = bg[3] ?? 255;
  }
  return { width, height, data };
}

function blendPixel(img, x, y, color, alpha = (color[3] ?? 255) / 255) {
  if (x < 0 || y < 0 || x >= img.width || y >= img.height) return;
  const i = (Math.floor(y) * img.width + Math.floor(x)) * 4;
  const inv = 1 - alpha;
  img.data[i] = img.data[i] * inv + color[0] * alpha;
  img.data[i + 1] = img.data[i + 1] * inv + color[1] * alpha;
  img.data[i + 2] = img.data[i + 2] * inv + color[2] * alpha;
  img.data[i + 3] = 255;
}

function fillRect(img, x, y, w, h, color, alpha) {
  for (let yy = Math.max(0, y); yy < Math.min(img.height, y + h); yy += 1) {
    for (let xx = Math.max(0, x); xx < Math.min(img.width, x + w); xx += 1) {
      blendPixel(img, xx, yy, color, alpha);
    }
  }
}

function fillCircle(img, cx, cy, r, color, alpha) {
  const r2 = r * r;
  for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y += 1) {
    for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x += 1) {
      const d = (x - cx) ** 2 + (y - cy) ** 2;
      if (d <= r2) blendPixel(img, x, y, color, alpha * (1 - Math.sqrt(d) / r * 0.28));
    }
  }
}

function fillPolygon(img, points, color, alpha = 1) {
  const minY = Math.max(0, Math.floor(Math.min(...points.map((p) => p[1]))));
  const maxY = Math.min(img.height - 1, Math.ceil(Math.max(...points.map((p) => p[1]))));
  for (let y = minY; y <= maxY; y += 1) {
    const nodes = [];
    let j = points.length - 1;
    for (let i = 0; i < points.length; i += 1) {
      const [xi, yi] = points[i];
      const [xj, yj] = points[j];
      if ((yi < y && yj >= y) || (yj < y && yi >= y)) {
        nodes.push(xi + ((y - yi) / (yj - yi)) * (xj - xi));
      }
      j = i;
    }
    nodes.sort((a, b) => a - b);
    for (let k = 0; k < nodes.length; k += 2) {
      for (let x = Math.floor(nodes[k]); x < Math.ceil(nodes[k + 1]); x += 1) {
        blendPixel(img, x, y, color, alpha);
      }
    }
  }
}

function drawLine(img, x0, y0, x1, y1, color, alpha = 1, width = 1) {
  x0 = Math.round(x0);
  y0 = Math.round(y0);
  x1 = Math.round(x1);
  y1 = Math.round(y1);
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  let x = x0;
  let y = y0;
  while (true) {
    fillCircle(img, x, y, width, color, alpha);
    if (x === x1 && y === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
}

function seeded(seed) {
  let x = seed;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) % 10000) / 10000;
  };
}

function paperTexture() {
  const img = makeImage(1200, 1200, [189, 145, 92, 255]);
  const rand = seeded(91);
  for (let y = 0; y < img.height; y += 1) {
    for (let x = 0; x < img.width; x += 1) {
      const i = (y * img.width + x) * 4;
      const grain = (rand() - 0.5) * 38;
      const wave = Math.sin((x + y * 0.65) / 38) * 7 + Math.cos((x * 0.4 - y) / 57) * 5;
      img.data[i] = Math.max(0, Math.min(255, img.data[i] + grain + wave));
      img.data[i + 1] = Math.max(0, Math.min(255, img.data[i + 1] + grain * 0.8 + wave));
      img.data[i + 2] = Math.max(0, Math.min(255, img.data[i + 2] + grain * 0.5 + wave * 0.55));
    }
  }
  for (let i = 0; i < 36; i += 1) {
    const x = rand() * img.width;
    const y = rand() * img.height;
    const length = 180 + rand() * 480;
    const angle = rand() * Math.PI;
    const color = rand() > 0.5 ? [245, 216, 162] : [95, 58, 32];
    drawLine(img, x, y, Math.round(x + Math.cos(angle) * length), Math.round(y + Math.sin(angle) * length), color, 0.08 + rand() * 0.08, 2 + rand() * 2);
  }
  savePng(new URL("paper-texture.png", outDir), img.width, img.height, img.data);
}

function tenochtitlanHero() {
  const img = makeImage(1600, 1000, [162, 126, 84, 255]);
  const rand = seeded(517);

  for (let y = 0; y < img.height; y += 1) {
    for (let x = 0; x < img.width; x += 1) {
      const i = (y * img.width + x) * 4;
      const vignette = ((x - 800) ** 2 / 900000 + (y - 490) ** 2 / 480000) * 66;
      const grain = (rand() - 0.5) * 20;
      img.data[i] = Math.max(0, Math.min(255, img.data[i] + grain - vignette * 0.55));
      img.data[i + 1] = Math.max(0, Math.min(255, img.data[i + 1] + grain * 0.7 - vignette * 0.48));
      img.data[i + 2] = Math.max(0, Math.min(255, img.data[i + 2] + grain * 0.4 - vignette * 0.32));
    }
  }

  fillCircle(img, 1260, 210, 112, [214, 162, 70], 0.62);
  fillPolygon(img, [[0, 470], [240, 320], [530, 460], [780, 300], [1080, 455], [1360, 335], [1600, 445], [1600, 1000], [0, 1000]], [76, 69, 60], 0.28);
  fillRect(img, 0, 560, 1600, 440, [53, 102, 102], 0.36);

  for (let y = 580; y < 980; y += 22) {
    drawLine(img, 0, y, 1600, y - 45 + Math.round(Math.sin(y / 39) * 28), [229, 192, 126], 0.08, 1);
  }

  fillPolygon(img, [[210, 720], [1385, 650], [1470, 750], [335, 845]], [95, 65, 43], 0.54);
  fillPolygon(img, [[300, 680], [1140, 618], [1265, 680], [430, 760]], [201, 157, 93], 0.68);
  fillPolygon(img, [[430, 610], [980, 570], [1105, 630], [520, 690]], [113, 74, 48], 0.56);

  const pyramid = [
    [[560, 660], [1020, 628], [1065, 672], [520, 710]],
    [[610, 595], [960, 568], [1010, 620], [565, 650]],
    [[665, 530], [910, 510], [960, 565], [620, 590]],
    [[722, 470], [870, 458], [918, 506], [675, 526]],
  ];
  pyramid.forEach((poly, idx) => fillPolygon(img, poly, idx % 2 ? [188, 135, 74] : [217, 171, 101], 0.86));
  fillRect(img, 740, 405, 90, 60, [83, 50, 34], 0.8);
  fillRect(img, 852, 397, 86, 62, [103, 52, 38], 0.8);
  fillPolygon(img, [[740, 405], [785, 372], [830, 405]], [155, 88, 49], 0.9);
  fillPolygon(img, [[852, 397], [895, 365], [938, 397]], [150, 75, 53], 0.9);

  for (let i = 0; i < 32; i += 1) {
    const x = 350 + rand() * 800;
    const y = 675 + rand() * 115;
    fillRect(img, Math.round(x), Math.round(y), 38 + rand() * 32, 22 + rand() * 20, [173, 126, 71], 0.54);
    fillPolygon(img, [[x - 4, y], [x + 20, y - 16], [x + 55, y]], [88, 55, 36], 0.54);
  }

  for (let i = 0; i < 18; i += 1) {
    const x = Math.round(rand() * 1600);
    drawLine(img, x, 610 + Math.round(rand() * 120), x + Math.round(80 + rand() * 220), 590 + Math.round(rand() * 170), [232, 203, 147], 0.13, 1);
  }

  for (let i = 0; i < 1200; i += 1) {
    const x = Math.floor(rand() * 1600);
    const y = Math.floor(rand() * 1000);
    blendPixel(img, x, y, rand() > 0.5 ? [255, 232, 184] : [55, 35, 25], 0.05);
  }

  savePng(new URL("tenochtitlan-hero.png", outDir), img.width, img.height, img.data);
}

paperTexture();
tenochtitlanHero();
