"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Free Library", href: "/free-library-study-room" },
    { label: "Old Age Home", href: "/old-age-home" },
    { label: "Contact Us", href: "/contact" },
  ]

  const programs = [
    "Library & Study Space",
    "Elderly Care Services",
    "Community Outreach",
    "Skill Development"
  ]

  return (
    <footer className="w-full py-10 px-0 md:px-8 border-t bg-background/50">
      <div className="mx-auto max-w-7xl bg-secondary md:rounded-[3rem] overflow-hidden shadow-2xl relative isolation-isolate">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl opacity-20 translate-y-1/3 -translate-x-1/3"></div>

        <div className="container mx-auto px-6 sm:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-[2rem] p-4 md:px-6 md:py-4 w-fit inline-block shadow-lg">
                <Link href="/" className="flex items-center group">
                  <Image
                    src="/logo/logo_high.png"
                    alt="Seva Samarpan Logo"
                    width={240}
                    height={64}
                    className="h-12 md:h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </Link>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                Dedicated to transforming lives through quality education for underprivileged students
                and compassionate care for elders in rural Pune.
              </p>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-white font-bold text-xl tracking-tight">Quick Links</h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-zinc-400 hover:text-primary transition-all duration-300 flex items-center group font-medium"
                    >
                      <ArrowUpRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-white font-bold text-xl tracking-tight">Focus Areas</h3>
              <ul className="space-y-4">
                {programs.map((program) => (
                  <li 
                    key={program} 
                    className="text-zinc-400 font-medium hover:text-white transition-colors cursor-default flex items-center gap-3"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" />
                    {program}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3 space-y-8">
              <h3 className="text-white font-bold text-xl tracking-tight">Connect with Us</h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-primary/30 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-zinc-400 font-medium pt-1 group-hover:text-zinc-300 transition-colors">
                    Pune,<br />Maharashtra, India
                  </span>
                </li>
                <li className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-primary/30 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors">+91 94222 62499</span>
                </li>
                <li className="flex items-center space-x-4 group">
                   <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-primary/30 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <a href="mailto:contact@samarpan.org" className="text-zinc-400 font-medium hover:text-white transition-colors">
                    contact@samarpan.org
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-20 pt-10 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-zinc-500 font-medium text-sm">
              © {currentYear} Seva Samarpan NGO Foundation. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold justify-center">
                <Link href="/privacy" className="text-zinc-500 hover:text-primary transition-colors">Privacy</Link>
                <Link href="/terms" className="text-zinc-500 hover:text-primary transition-colors">Terms</Link>
                <Link href="/refund-policy" className="text-zinc-500 hover:text-primary transition-colors">Refund Policy</Link>
                <Link href="/shipping-policy" className="text-zinc-500 hover:text-primary transition-colors">Shipping</Link>
              </div>
              <div className="hidden lg:block h-1.5 w-1.5 bg-zinc-800 rounded-full"></div>
              <div className="text-zinc-500 text-sm font-medium">
                Artfully crafted at 
                <a 
                  href="http://www.navibyte.in" 
                  className="text-primary hover:text-primary-400 ml-1 border-b border-primary/20 hover:border-primary transition-all"
                >
                  Navibyte
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
