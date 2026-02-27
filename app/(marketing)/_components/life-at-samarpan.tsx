import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function LifeAtSamarpan() {
  return (
    <section className="py-6 md:py-10 bg-background overflow-hidden" id="life-at-samarpan">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between gap-4 md:gap-6 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-3 md:mb-4 leading-tight">
              Life at <span className="text-primary italic">Seva Samarpan</span>
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground">
              Glimpses of the daily life, happiness, and community at our Old Age Home in Pune.
            </p>
          </div>
          <Link href="/about" className="text-primary font-bold flex items-center gap-2 hover:underline underline-offset-4 text-sm md:text-base">
            View Our Story <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <div className="md:col-span-2 md:row-span-2 relative aspect-4/5 md:aspect-auto rounded-[2rem] overflow-hidden group shadow-2xl">
             <Image 
              src="/old-age/image.png" 
              alt="Seva Samarpan Old Age Home" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-8 left-8 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
               <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Our Sanctuary</p>
               <h3 className="text-2xl font-bold">Seva Samarpan Old Age Home</h3>
            </div>
          </div>
          
          <div className="relative aspect-square rounded-[2rem] overflow-hidden group shadow-xl">
            <Image 
              src="/old-age/news-1.png" 
              alt="Community Life" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
               <h4 className="font-bold">Community Living</h4>
            </div>
          </div>

          <div className="relative aspect-square rounded-[2rem] overflow-hidden group shadow-xl">
            <Image 
              src="/old-age/news-2.png" 
              alt="Daily Activities" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
               <h4 className="font-bold">Holistic Care</h4>
            </div>
          </div>

          <div className="md:col-span-2 relative aspect-video md:aspect-auto h-64 rounded-[2rem] overflow-hidden group shadow-xl">
            <Image 
              src="/old-age/news-3.png" 
              alt="Health & Well-being" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
               <h4 className="font-bold">Safe & Dignified Environment</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
