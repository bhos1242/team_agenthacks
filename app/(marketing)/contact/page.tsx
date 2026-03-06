import { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us | Seva Samarpan",
  description: "Get in touch with Seva Samarpan for inquiries, donations, or visits.",
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen py-10 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8 md:mb-12 text-center lg:text-left">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 uppercase leading-tight">
            Get in <span className="text-primary italic">Touch</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base font-bold max-w-2xl">
            Have questions? We&apos;re here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-3 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm group hover:border-primary/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-1">Phone</h3>
                <p className="text-sm text-muted-foreground font-bold">+91 94222 62499</p>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm group hover:border-primary/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-1">Email</h3>
                <p className="text-sm text-muted-foreground font-bold">sevasamarpanngo@gmail.com</p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm group hover:border-primary/20 transition-all duration-300">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground font-bold">Pune, Maharashtra, India</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-950 text-white rounded-3xl shadow-xl relative overflow-hidden group border border-white/5">
               <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
               <div className="relative z-10 flex items-center gap-5">
                 <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Clock className="h-6 w-6 text-primary" />
                 </div>
                 <div>
                    <h3 className="text-lg font-black uppercase tracking-tight">Visiting Hours</h3>
                    <p className="text-zinc-400 text-sm font-bold">Everyday: 9:00 AM - 6:00 PM</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="lg:col-span-2 p-8 bg-muted/30 rounded-3xl border border-black/5 dark:border-white/5 flex flex-col items-center justify-center text-center space-y-6">
             <div className="space-y-2">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Direct Message</h2>
                <p className="text-xs md:text-sm text-muted-foreground font-bold px-4">
                  The quickest way to reach us is via WhatsApp.
                </p>
             </div>
             <div className="flex flex-col w-full gap-3">
                <Button size="lg" className="h-14 rounded-2xl font-black uppercase tracking-tight shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform" asChild>
                   <a href="https://wa.me/919422262499">WhatsApp Us</a>
                </Button>
                <Button size="lg" variant="outline" className="h-14 rounded-2xl font-black uppercase tracking-tight border-2 hover:bg-white dark:hover:bg-zinc-900 shadow-sm" asChild>
                   <a href="mailto:sevasamarpanngo@gmail.com">Email Us</a>
                </Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
