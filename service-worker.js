// global constants
const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;
// array of files
const FILES_TO_CACHE = [
  './index.html',
  './events.html',
  './tickets.html',
  './schedule.html',
  './assets/css/style.css',
  './assets/css/bootstrap.css',
  './assets/css/tickets.css',
  './dist/app.bundle.js',
  './dist/events.bundle.js',
  './dist/tickets.bundle.js',
  './dist/schedule.bundle.js'
];

// retrieve information from the cache
self.addEventListener('fetch', function (e) {
  // log the URL of the requested resource
  console.log('fetch request : ' + e.request.url);
  // will intercept the HTTP response in order to send resources from the service worker
  e.respondWith(
    // match the request with the same resources thats in the cache if it exists
    caches.match(e.request).then(function (request) {
      // return request || fetch(e.request)
      if (request) {
        console.log('responding with cache : ' + e.request.url);
        // if cache is available, respond with the cached resource
        return request;
      } else {
        console.log('file is not cached, fetching : ' + e.request.url);
        // if there are no cache, try fetching request
        // if the resource is not in caches, allow the resource to be retrieved from the online network as usual
        return fetch(e.request);
      }
    })
  );
});

// Cache resources
// listen for install phase (event) on to the actual worker
self.addEventListener('install', function (e) {
  // tell the browser to wait until the work is complete before terminating the service worker to ensure the service worker doesn't move on from the installing phase until it's finished executing all of its code.
  e.waitUntil(
    // find the specific cache by name
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache: ' + CACHE_NAME);
      // then add every file in the FILES_TO_CACHE array to the precache so the application can use it
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Delete outdated chaches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    // .key() returns an array of all cache names
    caches.keys().then(function (keylist) {
      // any key with an index value that matches the app prefix will be inserted into the keep list
      let cacheKeeplist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      // add the current cache to the keeplist
      cacheKeeplist.push(CACHE_NAME);

      // returns a Promise that resolves once all old versions of the cache have been deleted.
      return Promise.all(
        keyList.map(function (key, i) {
          // will only return a value of -1 if this item is not found in keeplist
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log('deleting cache : ' + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});
