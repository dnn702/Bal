
const CACHE_NAME = "idle-balls-pwa-v1";

const GAME_URL = new URL(
  "./tpa.html",
  self.registration.scope
).href;

const MANIFEST_URL = new URL(
  "./manifest.json",
  self.registration.scope
).href;

const ICON_URLS = [
  new URL("./icon-192.png", self.registration.scope).href,
  new URL("./icon-512.png", self.registration.scope).href
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // ゲーム本体は必須
    const response = await fetch(GAME_URL);
    if (!response.ok) {
      throw new Error("ゲーム本体を取得できません");
    }
    await cache.put(GAME_URL, response);

    // マニフェストとアイコンは取得できたものだけ保存
    for (const url of [MANIFEST_URL, ...ICON_URLS]) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          await cache.put(url, res);
        }
      } catch (error) {
        // 取得できない場合もインストールを続ける
      }
    }

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter((key) =>
          key.startsWith("idle-balls-pwa-") &&
          key !== CACHE_NAME
        )
        .map((key) => caches.delete(key))
    );

    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // 外部サイトの通信には介入しない
  if (url.origin !== self.location.origin) return;

  // ページ移動はネット優先、失敗したらキャッシュ
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);

        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }

        return response;
      } catch (error) {
        const cached = await caches.match(request);

        if (cached) return cached;

        const game = await caches.match(GAME_URL);
        if (game) return game;

        return new Response(
          "オフラインです。インターネットに接続してから再試行してください。",
          {
            status: 503,
            headers: {
              "Content-Type": "text/plain; charset=utf-8"
            }
          }
        );
      }
    })());

    return;
  }

  // 同じサイト内の画像・スクリプトなどをキャッシュ
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);

      if (response.ok && response.type === "basic") {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }

      return response;
    } catch (error) {
      return new Response("", { status: 503 });
    }
  })());
});
