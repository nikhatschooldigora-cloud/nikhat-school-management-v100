const CACHE='nikhat-school-pwa-v174-mobile-safe-final';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const req=event.request;
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put('./index.html',c)).catch(()=>{});return r;}).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(fetch(req).then(r=>{if(r&&r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c)).catch(()=>{});}return r;}).catch(()=>caches.match(req).then(c=>c||Response.error())));
});
