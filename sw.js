const CACHE = "zombie-war-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/zombie/img/grass.png",
  "/zombie/img/player1.png",
  "/zombie/img/player2.png",
  "/zombie/img/zombie.png",
  "/zombie/sound/shot.mp3",
  "/zombie/sound/hit.mp3",
  "/zombie/sound/music.mp3",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
  );
});
