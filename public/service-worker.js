const CACHE_NAME = "easygp-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/src/main.jsx", // Ensure these paths exist
  "/src/App.jsx",
  "/icon-192x192.png",
  "/icon-512x512.png"
];

// Install Service Worker and cache necessary files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((error) => console.error("Cache addAll failed:", error))
  );
});

// Fetch assets from cache first, then network as fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// Activate event: Clear old caches if needed
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
