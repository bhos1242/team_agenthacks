import { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us | Seva Samarpan",
  description: "Get in touch with Seva Samarpan for inquiries, donations, or visits.",
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12 md:mb-16 text-center lg:text-left">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 md:mb-6 uppercase leading-tight">
            Contact <span className="text-primary italic">Us</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl">
            Have questions? We&apos;re here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Information */}
          <div className="space-y-8 md:space-y-12">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-8 bg-white dark:bg-zinc-950 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-100 dark:shadow-none group hover:border-primary/30 transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-muted-foreground font-medium">+91 94222 62499</p>
              </div>

              <div className="p-8 bg-white dark:bg-zinc-950 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-100 dark:shadow-none group hover:border-primary/30 transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-muted-foreground font-medium">contact@samarpan.org</p>
              </div>

              <div className="p-8 bg-white dark:bg-zinc-950 rounded-[2rem] border border-border/50 shadow-xl shadow-zinc-100 dark:shadow-none group hover:border-primary/30 transition-all duration-500 sm:col-span-2">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-muted-foreground font-medium">Pune, Maharashtra, India</p>
              </div>
            </div>

            <div className="p-10 bg-secondary text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
               <div className="relative z-10 flex items-center gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Clock className="h-8 w-8 text-primary" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold mb-1">Visiting Hours</h3>
                    <p className="text-zinc-400 font-medium">Everyday: 9:00 AM - 6:00 PM</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Simple Contact Form Placeholder / Call to Action */}
          <div className="p-8 md:p-12 bg-white dark:bg-zinc-950 rounded-[3rem] border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-center space-y-8">
             <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center">
                <Mail className="h-10 w-10 text-primary animate-bounce" />
             </div>
             <div className="space-y-4">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Send us a message</h2>
                <p className="text-muted-foreground font-medium max-w-sm">
                  The quickest way to reach us is via WhatsApp or Email. Click below to start a conversation.
                </p>
             </div>
             <div className="flex flex-col w-full gap-4">
                <Button size="lg" className="h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20" asChild>
                   <a href="https://wa.me/919422262499">Message on WhatsApp</a>
                </Button>
                <Button size="lg" variant="outline" className="h-16 rounded-2xl text-lg font-bold border-2" asChild>
                   <a href="mailto:contact@samarpan.org">Send an Email</a>
                </Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
