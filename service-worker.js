const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

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

// Cache resources
// add an event listener for the install event to the actual worker
self.addEventListener('install', function (e) {
  // tell the browser to wait until the work is complete before terminating the service worker to ensure the service worker doesn't move on from the installing phase until it's finished executing all of its code.
  e.waitUntil(
    // find the specific cache by name
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache: ' + CACHE_NAME);
      // then add every file in the FILES_TO_CACHE array to the cache
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});
