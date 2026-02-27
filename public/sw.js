/* console-ninja:disable */
// Service Worker v2.0.0 - Fixed async message handling
const SW_VERSION = "2.0.0";

self.addEventListener("install", function () {
  console.log(`[SW ${SW_VERSION}] Installing...`);
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log(`[SW ${SW_VERSION}] Activating...`);
  e.waitUntil(
    self.clients.claim().then(function () {
      console.log(`[SW ${SW_VERSION}] Now controlling all clients`);
    })
  );
});

self.addEventListener("push", function (e) {
  console.log(`[SW ${SW_VERSION}] Push event received`);

  if (!e.data) {
    console.warn("[SW] Push event has no data");
    return;
  }

  try {
    var data = e.data.json();
    console.log("[SW] Push notification data:", data);

    var notificationOptions = {
      body: data.body || "New notification",
      icon: data.icon || "/icon.svg",
      badge: data.badge || "/icon.svg",
      data: data.data || { url: data.url || "/" },
      vibrate: [200, 100, 200],
      tag: data.tag || "notification-" + Date.now(), // Unique tag to always show
      requireInteraction: true, // Force user to interact - notification won't auto-dismiss
      renotify: true, // Play sound/vibration even if replacing
      silent: false, // Play sound
    };

    e.waitUntil(
      self.registration
        .showNotification(data.title || "Notification", notificationOptions)
        .then(function () {
          console.log("[SW] Notification shown successfully");
        })
        .catch(function (error) {
          console.error("[SW] Error showing notification:", error);
        })
    );
  } catch (error) {
    console.error("[SW] Error parsing push data:", error);
  }
});

self.addEventListener("notificationclick", function (e) {
  console.log("[SW] Notification clicked");
  e.notification.close();

  var url = "/";
  if (e.notification.data && e.notification.data.url) {
    url = e.notification.data.url;
  }

  console.log("[SW] Opening URL:", url);

  e.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        // Check if there's already a window open
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url.indexOf(url) !== -1 && "focus" in client) {
            return client.focus();
          }
        }
        // No window open, open a new one
        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }
      })
      .catch(function (error) {
        console.error("[SW] Error handling notification click:", error);
      })
  );
});

self.addEventListener("notificationclose", function () {
  console.log("[SW] Notification closed");
});

// Prevent the async message channel error
self.addEventListener("message", function (event) {
  console.log("[SW] Message received:", event.data);

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  // Always send a response to prevent the error
  if (event.ports && event.ports[0]) {
    event.ports[0].postMessage({ success: true });
  }
});
