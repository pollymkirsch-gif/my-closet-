const CACHE='closet-v7-pink-crop-gallery';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./index.html','./manifest.webmanifest','./icon.svg'])))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('closet-')&&k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;if(e.request.mode==='navigate'||u.pathname.endsWith('/index.html')){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./index.html')));return;}e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});
