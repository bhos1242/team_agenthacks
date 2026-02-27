"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  GraduationCap,
  Heart,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Inputs",
    href: "/dashboard/inputs",
    icon: FileText,
  },
  {
    title: "Students",
    href: "/dashboard/students",
    icon: GraduationCap,
  },
  {
    title: "Donations",
    href: "/dashboard/donations",
    icon: Heart,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationBellButton } from "@/components/notification-bell-button";
import { Button } from "@/components/ui/button";

export function DashboardSidebar({
  className,
  onLinkClick,
}: {
  className?: string;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div
      className={cn(
        "flex h-full w-64 flex-col bg-background border-r", // Added border-r back primarily for desktop, handled in parent for clean layout but safe here too
        className
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">Dashboard</span>
        </Link>
        <NotificationBellButton />
      </div>
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start px-2 h-auto py-2"
            >
              <div className="flex items-center gap-3 text-left">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                    key={session?.user?.image}
                  />
                  <AvatarFallback>
                    {session?.user?.name?.slice(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-medium truncate">
                    {session?.user?.name || "User"}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {session?.user?.email || "viewer@example.com"}
                  </span>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email || "viewer@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-background w-64 border-r">
        {/* Accessibility: Title is required for DialogContent */}
        <SheetTitle className="sr-only">Dashboard Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Navigation menu for the dashboard
        </SheetDescription>
        <DashboardSidebar
          onLinkClick={() => setOpen(false)}
          className="w-full border-none"
        />
      </SheetContent>
    </Sheet>
  );
}
