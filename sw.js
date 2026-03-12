const CACHE_NAME = 'lunoo-wrapper-v1';

// Installation du Service Worker et mise en cache de la coquille
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './manifest.json',
                './icon.png'
            ]);
        })
    );
});

// Intercepte les requêtes pour fonctionner même avec de courtes coupures internet
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});