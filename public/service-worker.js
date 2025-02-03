// public/service-worker.js

const CACHE_NAME = "easygp-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icon-192x192.png",
  "/icon-512x512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        await cache.addAll(urlsToCache);
        console.log("✅ All core files cached successfully!");
      } catch (error) {
        console.error("❌ Cache addAll failed:", error);
      }
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Clean up old caches if you increment CACHE_NAME
      const cacheKeys = await caches.keys();
      await Promise.all(
        cacheKeys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
      // Optionally, take control immediately without waiting
      self.skipWaiting();
      console.log("✅ Service Worker activated");
    })()
  );
});

// Intercept fetch requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      // Try to return a cached response
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }
      // If not in cache, fetch from network
      try {
        return await fetch(event.request);
      } catch (error) {
        console.error("❌ Fetch failed; returning offline page instead.", error);
        // You could return an offline page here if you'd like
      }
    })()
  );
});
