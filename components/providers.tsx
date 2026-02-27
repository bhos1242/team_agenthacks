"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        })
        .then((registration) => {
          console.log("✅ Service Worker registered:", registration.scope);

          // Force immediate update check
          registration.update().then(() => {
            console.log("🔄 Checked for service worker updates");
          });

          // If there's a waiting worker, activate it immediately
          if (registration.waiting) {
            console.log("⚡ New service worker waiting, activating...");
            registration.waiting.postMessage({ type: "SKIP_WAITING" });
          }

          // Listen for new service workers
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  console.log("🆕 New service worker available");
                  // Auto-activate new service worker
                  newWorker.postMessage({ type: "SKIP_WAITING" });
                }
              });
            }
          });

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
        })
        .catch((error) => {
          console.error("❌ Service Worker registration failed:", error);
        });

      // Reload page when new service worker takes control
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          console.log("🔄 New service worker activated, reloading...");
          window.location.reload();
        }
      });
    }
  }, []);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          {children}
          <Toaster position="top-right" />
        </NuqsAdapter>
      </QueryClientProvider>
    </SessionProvider>
  );
}
