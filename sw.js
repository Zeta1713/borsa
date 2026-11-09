// Borsa Trasferta: funziona offline (pagina e librerie 3D in cache)
const C="borsa-v1";
const CORE=["./","index.html","manifest.json","icon-180.png","icon-192.png","icon-512.png",
 "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js","https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);
  if(e.request.mode==="navigate"||u.pathname.endsWith("index.html")){e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put("index.html",cp));return r}).catch(()=>caches.match("index.html")));return}
  e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request).then(r=>{if(r.ok||r.type==="opaque"){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r})))});
