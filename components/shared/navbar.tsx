"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Menu, 
  Heart, 
  Home, 
  Info, 
  GraduationCap,
  BookOpen, 
  Building2, 
  LogIn, 
  LayoutDashboard,
  Settings,
  Phone,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { useSession, signIn, signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/sponsor-students", label: "Sponsor Students", icon: GraduationCap },
  { href: "/free-library-study-room", label: "Free Library", icon: BookOpen },
  { href: "/old-age-home", label: "Old Age Home", icon: Building2 },
  { href: "/contact", label: "Contact", icon: Phone },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()
  const isLoading = status === "loading"
  const isAuthenticated = !!session

  // In the real app, roles would come from the session
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "NGO_ADMIN"].includes(session?.user?.role || "")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-zinc-950/80 backdrop-blur-xl  dark:supports-backdrop-filter:bg-zinc-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
        <Link href="/" className="flex items-center align-middle gap-2 group">
          <Image
            src="/logo/logo_high.png"
            alt="Seva Samarpan Logo"
            width={150}
            height={50}
            className="w-auto object-cover"
            priority
          />
        </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-bold transition-all relative py-2 px-4 rounded-xl",
                      isActive 
                        ? "text-primary bg-primary/5" 
                        : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Desktop Auth & CTA */}
            <div className="hidden md:flex md:items-center md:gap-4">
              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {session.user?.name?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-64" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-2 p-1">
                            <p className="text-sm font-bold leading-none">{session.user?.name}</p>
                            <p className="text-xs leading-none text-muted-foreground truncate">
                              {session.user?.email}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        
                        {isAdmin ? (
                          <>
                            <DropdownMenuItem asChild className="cursor-pointer py-3">
                              <Link href="/admin" className="flex items-center">
                                <LayoutDashboard className="mr-3 h-4 w-4 text-primary" />
                                <span className="font-semibold">Admin Dashboard</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer py-3">
                              <Link href="/admin/settings" className="flex items-center">
                                <Settings className="mr-3 h-4 w-4 text-primary" />
                                <span className="font-semibold">Settings</span>
                              </Link>
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem asChild className="cursor-pointer py-3">
                            <Link href="/profile" className="flex items-center">
                              <Heart className="mr-3 h-4 w-4 text-primary" />
                              <span className="font-semibold">My Donations</span>
                            </Link>
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="cursor-pointer py-3 text-destructive focus:text-destructive focus:bg-destructive/5" 
                          onSelect={() => signOut()}
                        >
                          <LogIn className="mr-3 h-4 w-4 rotate-180" />
                          <span className="font-semibold">Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" onClick={() => signIn()} className="text-muted-foreground hover:text-primary font-bold">
                        Login
                      </Button>
                    </div>
                  )}
                </>
              )}
              <Link href="/sponsor-students">
                <Button className="bg-primary text-white font-bold rounded-xl px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                  Donate
                </Button>
              </Link>
            </div>

            {/* Mobile Menu (Sheet) */}
            <div className="md:hidden flex items-center gap-2">
               {!isLoading && isAuthenticated && (
                  <Avatar className="h-8 w-8 ring-2 ring-primary/10">
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback className="text-[10px] font-bold">
                      {session.user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
               )}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-0 flex flex-col border-none shadow-2xl">
                  <div className="p-5 bg-linear-to-br from-primary/10 via-background to-background border-b border-border/50">
                    <SheetHeader className="text-left">
                      <SheetTitle>
                        <Link href="/" className="flex items-center gap-3 group">
                          <div className="relative h-16 w-56 transition-all duration-500 group-hover:scale-105">
                            <Image
                              src="/logo/logo_high.png"
                              alt="Seva Samarpan Logo"
                              fill
                              className="object-contain"
                              priority
                            />
                          </div>
                        </Link>
                      </SheetTitle>
                    </SheetHeader>
                  </div>

                  <div className="flex-1 overflow-y-auto py-4 px-4">
                    <div className="grid gap-1">
                      {navLinks.map((link) => {
                        const Icon = link.icon
                        const isActive = pathname === link.href
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2.5 text-base font-bold transition-all group rounded-xl",
                              isActive
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            <div className={cn(
                              "p-2 rounded-lg transition-all duration-300",
                              isActive ? "bg-primary text-white scale-110" : "bg-muted group-hover:bg-primary/10 group-hover:scale-110"
                            )}>
                              <Icon className={cn("h-5 w-5", isActive ? "text-white" : "group-hover:text-primary")} />
                            </div>
                            {link.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>

                  <div className="p-5 border-t border-border/50 bg-muted/20 mt-auto">
                    <div className="space-y-4">
                      {!isLoading && !isAuthenticated && (
                        <div className="grid grid-cols-1">
                          <Button variant="outline" onClick={() => {signIn(); setIsOpen(false)}} className="w-full h-11 rounded-xl font-bold border-border/50">
                            <LogIn className="mr-2 h-4 w-4" />
                            Login
                          </Button>
                        </div>
                      )}

                      {isAuthenticated && session.user && (
                        <div className="space-y-3 bg-background p-4 rounded-xl border border-border/50 shadow-sm">
                          <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                              <AvatarImage src={session.user.image || ""} />
                              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                {session.user.name?.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold truncate text-base">{session.user.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                            </div>
                          </div>

                          <div className="grid gap-1">
                            {isAdmin ? (
                               <>
                                <Link 
                                  href="/admin" 
                                  className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <LayoutDashboard className="h-4 w-4" />
                                  Admin Panel
                                </Link>
                                <Link 
                                  href="/admin/settings" 
                                  className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <Settings className="h-4 w-4" />
                                  Settings
                                </Link>
                               </>
                            ) : (
                                <Link 
                                  href="/profile" 
                                  className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <Heart className="h-4 w-4" />
                                  My Impact
                                </Link>
                            )}
                            
                            <button
                              onClick={() => { signOut(); setIsOpen(false); }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-bold text-destructive hover:bg-destructive/5 rounded-lg transition-all text-left"
                            >
                              <LogIn className="h-4 w-4 rotate-180" />
                              Sign Out
                            </button>
                          </div>
                        </div>
                      )}

                      <Link href="/sponsor-students" onClick={() => setIsOpen(false)} className="block">
                        <Button className="w-full h-12 text-base font-black uppercase tracking-tight shadow-lg shadow-primary/30 rounded-xl">
                          Donate
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>
    </header>
  )
}
