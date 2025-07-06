const CACHE = "blog-v1";
const OFFLINE_URLS = ["/"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    fetch("/")
      .then((r) => r.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const posts = [...doc.querySelectorAll('a[href^="/posts/"]')]
          .map((a) => a.href.replace(self.location.origin, ""))
          .slice(0, 10);
        return caches
          .open(CACHE)
          .then((cache) => cache.addAll([...OFFLINE_URLS, ...posts]));
      }),
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE).then((cache) => cache.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request)),
  );
});
