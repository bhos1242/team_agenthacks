"use client";

import { useWebPush } from "@/hooks/useWebPush";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell, Loader2 } from "lucide-react";

export function NotificationPromptDialog() {
  const { isSubscribed, subscribe, subscriptions } = useWebPush();
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Use useQuery to handle auto-prompt logic
  useQuery({
    queryKey: ["notification-prompt-check"],
    queryFn: async () => {
      const promptedKey = "notification-prompted";
      const alreadyPrompted = sessionStorage.getItem(promptedKey);

      // Don't prompt if already subscribed or already prompted
      if (isSubscribed || alreadyPrompted) {
        return null;
      }

      // Wait 2 seconds after page load
      await new Promise((resolve) => setTimeout(resolve, 2000));

      sessionStorage.setItem(promptedKey, "true");
      setOpen(true);

      return true;
    },
    enabled: !isSubscribed && typeof window !== "undefined",
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const handleEnable = async () => {
    try {
      await subscribe.mutateAsync();
      setShowSuccess(true);

      // Auto-close success dialog after 2 seconds
      setTimeout(() => {
        setOpen(false);
        setShowSuccess(false);
      }, 2000);
    } catch {
      // Error handled by mutation
    }
  };

  const otherDeviceCount = subscriptions.length;
  const hasOtherDevices = otherDeviceCount > 0;

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <span className="text-2xl">✅</span>
            </div>
            <DialogTitle className="text-center">
              You&apos;re All Set!
            </DialogTitle>
            <DialogDescription className="text-center">
              Notifications are now enabled on this device. You&apos;ll receive
              updates instantly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setOpen(false)}>Got It</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Bell className="h-6 w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-center">
            {hasOtherDevices ? "Enable on This Device?" : "Stay Connected!"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {hasOtherDevices ? (
              <>
                You already have notifications enabled on{" "}
                <span className="font-semibold">{otherDeviceCount}</span> other
                device
                {otherDeviceCount > 1 ? "s" : ""}. Enable here too to stay
                updated on this device.
              </>
            ) : (
              <>
                Enable push notifications to receive real-time updates, alerts,
                and messages even when you&apos;re not using the app.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            {hasOtherDevices ? "Not Now" : "Maybe Later"}
          </Button>
          <Button onClick={handleEnable} disabled={subscribe.isPending}>
            {subscribe.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enabling...
              </>
            ) : (
              <>Enable Notifications</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
