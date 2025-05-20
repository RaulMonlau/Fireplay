// public/sw.js
const CACHE_NAME = 'fireplay-cache-v1';
const urlsToCache = [
  '/',
  '/offline',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devolver cache si existe
        if (response) {
          return response;
        }
        
        // Solicitar a la red
        return fetch(event.request)
          .then((response) => {
            // No almacenar en caché si no es una respuesta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar la respuesta para almacenar en caché
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(() => {
            // Si la solicitud es para una página html y falla, mostrar página offline
            if (event.request.destination === 'document') {
              return caches.match('/offline');
            }
          });
      })
  );
});