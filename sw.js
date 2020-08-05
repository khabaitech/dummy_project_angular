/*importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
console.log('jghfhgchgkh');
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  /\.js$/,
  new workbox.strategies.NetworkFirst()
);*/

const cacheName = 'news-v1';
const staticAssets = [
  './',
  './index.html',
  './styles.css',
  './index.js',
  './newsApi.js',
  './news-article.js'
];

/*self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});*/

/*self.addEventListener('activate', e => {
  self.clients.claim();
});*/

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  /*if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }*/
});

self.addEventListener('push',e =>{
	const data=e.data.json();
	//console.log('pUsh received');
	self.registration.showNotification(data.title,{
		body:data.bodyData,
		icon:'/assets/image/192.png',
		/*actions: [
		    {
		      action: 'coffee-action',
		      title: 'Coffee',
		      icon: '/images/demos/action-1-128x128.png'
		    },
		    {
		      action: 'doughnut-action',
		      title: 'Doughnut',
		      icon: '/images/demos/action-2-128x128.png'
		    },
		    {
		      action: 'gramophone-action',
		      title: 'gramophone',
		      icon: '/images/demos/action-3-128x128.png'
		    },
		    {
		      action: 'atom-action',
		      title: 'Atom',
		      icon: '/images/demos/action-4-128x128.png'
		    }
	  	],*/
	  	data:data.link
	});
});

/*self.addEventListener('notificationclick', function(event) {
	console.log('Notification Click.');
  if (!event.action) {
    // Was a normal notification click
    console.log('Notification Click.');
    return;
  }

  switch (event.action) {
    case 'coffee-action':
      console.log('User ❤️️\'s coffee.');
      break;
    case 'doughnut-action':
      console.log('User ❤️️\'s doughnuts.');
      break;
    case 'gramophone-action':
      console.log('User ❤️️\'s music.');
      break;
    case 'atom-action':
      console.log('User ❤️️\'s science.');
      break;
    default:
      console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
});*/

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
})

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}

/*self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is activated.
  try {
    const options = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
      )
    };
    const subscription = await self.registration.pushManager.subscribe(options)
    console.log(JSON.stringify(subscription))
  } catch (err) {
    console.log('Error', err)
  }
})*/