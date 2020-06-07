// This is the service worker with the Cache-first network
/// <reference path="./../../../node_modules/typescript/lib/lib.es2017.d.ts" />
/// <reference path="./../../../node_modules/typescript/lib/lib.webworker.d.ts" />

const CACHE = "pwabuilder-precache";
const precacheFiles: string[] = [
    /* Add an array of files to precache for your app */
];

self.addEventListener("install", function(event: ExtendableEvent) {
    (self as ServiceWorkerGlobalScope).skipWaiting();

    event.waitUntil(
        caches.open(CACHE).then(function(cache: Cache) {
            return cache.addAll(precacheFiles);
        })
    );
});

// Allow sw to control of current page
self.addEventListener("activate", function(event: ExtendableEvent) {
    event.waitUntil((self as ServiceWorkerGlobalScope).clients.claim());
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function(event: FetchEvent) {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        fromCache(event.request).then(
            function(response: Response) {
                // The response was found in the cache so we responde with it and update the entry

                // This is where we call the server to get the newest version of the
                // file to use the next time we show view
                event.waitUntil(
                    fetch(event.request).then(function(response: Response) {
                        return updateCache(event.request, response);
                    })
                );

                return response;
            },
            function() {
                // The response was not found in the cache so we look for it on the server
                return fetch(event.request)
                    .then(function(response: Response) {
                        // If request was success, add or update it in the cache
                        event.waitUntil(updateCache(event.request, response.clone()));

                        return response;
                    });
            }
        )
    );
});

function fromCache(request: Request): Promise<Response> {
    // Check to see if you have it in the cache
    // Return response
    // If not in the cache, then return
    return caches.open(CACHE).then(function(cache: Cache) {
        return cache.match(request).then(function(matching: any) {
            if (!matching || matching.status === 404) {
                return Promise.reject("no-match");
            }

            return matching;
        });
    });
}

function updateCache(request: Request, response: Response) {
    return caches.open(CACHE).then(function(cache: Cache) {
        return cache.put(request, response);
    });
}
