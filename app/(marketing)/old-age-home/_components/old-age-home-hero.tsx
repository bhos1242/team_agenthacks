import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export function OldAgeHomeHero() {
    return (
        <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
            <Image
                src="/old-age/image.png"
                alt="Seva Samarpan Old Age Home"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background" />
            
            <div className="container mx-auto px-4 relative z-10 text-white text-center space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <Badge className="bg-primary hover:bg-primary/90 text-white border-none px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm mb-4 md:mb-6 rounded-full shadow-xl shadow-primary/20">
                    Our Main Project
                </Badge>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-3 md:mb-4">
                    Seva Samarpan <span className="text-primary">Old Age</span> Home
                </h1>
                <blockquote className="text-lg md:text-2xl lg:text-3xl font-medium italic opacity-90 max-w-3xl mx-auto leading-snug md:leading-relaxed">
                    &quot;Even if there is no blood relation, there is definitely a bond of love!&quot;
                </blockquote>
            </div>
        </section>
    )
}
