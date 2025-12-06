// Name of the cache
const CACHE_NAME = "my-pwa-cache-v1";

// Files to cache
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/app.js",
  "/manifest.webmanifest",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// Install event
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activate event (cleanup old caches)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Fetch event (serve from cache, fallback to network)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Cache hit - return the response
      if (response) {
        return response;
      }
      // Else fetch from network
      return fetch(event.request);
    })
  );
});
