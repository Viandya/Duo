// Duo service worker: the app opens instantly from the phone and keeps working offline.
// Pages and files of the app: shown from the phone at once, refreshed in the background (the next start gets the new version).
// Fonts and libraries from CDNs: kept on the phone. Data (Supabase, Telegram) is never cached here.
const VER = 'duo-v1';
const CDN = /^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net|unpkg\.com)\//;
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(VER).then(c => c.addAll(['./', 'index.html', 'common.css?v=20', 'common.js?v=20', 'icons/icon-192.png']).catch(() => {}))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VER).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin === location.origin) {
    e.respondWith(caches.open(VER).then(async c => {
      const hit = await c.match(r, { ignoreSearch: r.mode === 'navigate' });
      const net = fetch(r).then(res => { if (res.ok) c.put(r, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
  } else if (CDN.test(r.url)) {
    e.respondWith(caches.open(VER).then(async c => (await c.match(r)) || fetch(r).then(res => { if (res.ok || res.type === 'opaque') c.put(r, res.clone()); return res; })));
  }
});
