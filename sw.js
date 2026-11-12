// Service worker de UbiCato: deja la app abierta sin internet después de la primera visita.
// Primero intenta la red (para traer la agenda fresca) y, si no hay conexión, responde desde la caché.
// Al cambiar archivos de la app, sube el número de VERSION para que los celulares renueven la caché.
const VERSION = 'ubicato-v1';
const PROPIOS = ['./', 'index.html', 'eventos.json', 'eventos_extra.json', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
// Bibliotecas externas (versión fija): la maqueta 3D y el generador de QR
const EXTERNOS = [
  'https://cdn.jsdelivr.net/npm/three@0.147.0/build/three.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.147.0/examples/js/controls/OrbitControls.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION)
    .then(c => Promise.all(PROPIOS.concat(EXTERNOS).map(u => c.add(u).catch(() => { }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const propio = new URL(r.url).origin === location.origin;
  if (!propio && EXTERNOS.indexOf(r.url) < 0) return;
  if (!propio) {   // las bibliotecas no cambian: caché primero
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(x => { const c = x.clone(); caches.open(VERSION).then(h => h.put(r, c)); return x; })));
    return;
  }
  e.respondWith(fetch(r)
    .then(x => { if (x.ok) { const c = x.clone(); caches.open(VERSION).then(h => h.put(r, c)); } return x; })
    .catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match('index.html'))));
});
