self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('your-journey-cache-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './style.css',
        './main.js',
        './assets/icon-192.png',
        './assets/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
