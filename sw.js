const CACHE = "blog-v1";

self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const json = await (await fetch("/feed.json")).json();
      const cache = await caches.open(CACHE);
      await cache.addAll(["/", ...json.items.map((item) => item.url)]);
    })()
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    (async () => {
      try {
        const response = await fetch(e.request);
        const cache = await caches.open(CACHE);
        cache.put(e.request, response.clone());
        return response;
      } catch {
        return caches.match(e.request);
      }
    })()
  );
});
