"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  Info, 
  BookOpen, 
  Building2, 
  Heart,
  LayoutDashboard
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/free-library-study-room", label: "Library", icon: BookOpen },
  { href: "/old-age-home", label: "Care", icon: Building2 },
  { href: "/donate", label: "Donate", icon: Heart, isPrimary: true },
]

export function BottomNavbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "NGO_ADMIN"].includes(session?.user?.role || "")

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pointer-events-none">
      <nav className="mx-auto max-w-sm h-16 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2rem] flex items-center justify-between px-2 pointer-events-auto">
        {navLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-all relative group",
                isActive 
                  ? "text-primary scale-105" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <div className={cn(
                "p-2 rounded-2xl transition-all duration-300",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "group-hover:bg-primary/10",
                link.isPrimary && !isActive && "text-primary bg-primary/5"
              )}>
                <Icon className={cn("h-5 w-5", isActive ? "stroke-[3px]" : "stroke-[2px]")} />
              </div>
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-tighter mt-1 transition-colors",
                isActive ? "text-primary font-black scale-110" : "text-muted-foreground"
              )}>
                {link.label}
              </span>
            </Link>
          )
        })}
        
        {isAdmin && (
           <Link
            href="/admin"
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full transition-all relative group",
              pathname.startsWith("/admin") ? "text-primary scale-105" : "text-muted-foreground hover:text-primary"
            )}
          >
            <div className={cn(
              "p-2 rounded-2xl transition-all duration-300",
              pathname.startsWith("/admin") 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "group-hover:bg-primary/10"
            )}>
              <LayoutDashboard className={cn("h-5 w-5", pathname.startsWith("/admin") ? "stroke-[3px]" : "stroke-[2px]")} />
            </div>
            <span className={cn(
              "text-[9px] font-bold uppercase tracking-tighter mt-1 transition-colors",
              pathname.startsWith("/admin") ? "text-primary font-black scale-110" : "text-muted-foreground"
            )}>
              Admin
            </span>
          </Link>
        )}
      </nav>
    </div>
  )
}
