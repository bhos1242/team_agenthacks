"use client";

import {
  DashboardSidebar,
  MobileSidebar,
} from "@/components/dashboard-sidebar";
import { NotificationPromptDialog } from "@/components/notification-prompt-dialog";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NotificationPromptDialog />
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <DashboardSidebar className="hidden md:flex border-r" />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <header className="flex h-14 items-center gap-2 border-b bg-muted/40 px-6 md:hidden">
            <MobileSidebar />
            <span className="font-semibold">Dashboard</span>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </>
  );
}
