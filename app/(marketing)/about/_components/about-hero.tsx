import { MapPin } from 'lucide-react'

export function AboutHero() {
    return (
        <section className="relative overflow-hidden bg-background py-10 md:py-16">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-72 h-72 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-black mb-2 uppercase tracking-tight">
                        <MapPin className="h-3.5 w-3.5" />
                        Pune, Maharashtra
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                        About{' '}
                        <span className="text-primary italic">
                            Seva Samarpan
                        </span>
                    </h1>
                    <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-tight font-bold">
                        Empowering students through education and caring for elders with dignity.
                    </p>
                </div>
            </div>
        </section>
    )
}
