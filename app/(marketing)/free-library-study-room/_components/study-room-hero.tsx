import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export function StudyRoomHero() {
    return (
        <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
            <Image
                src="/programs/samarpan.png"
                alt="Seva Samarpan Abhyasika"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-background" />
            
            <div className="container mx-auto px-4 relative z-10 text-white text-center space-y-4 md:space-y-6 animate-in fade-in zoom-in-95 duration-1000">
                <Badge className="bg-primary hover:bg-primary/90 text-white border-none px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm mb-4 md:mb-6 rounded-full shadow-xl shadow-primary/20">
                    Knowledge is Power
                </Badge>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-2 md:mb-4">
                    Seva Samarpan <span className="text-primary italic">Abhyasika</span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto font-medium leading-snug md:leading-relaxed">
                    Empowering tribal and underprivileged students through access to a world-class library and quiet study sanctuary.
                </p>
            </div>
        </section>
    )
}
