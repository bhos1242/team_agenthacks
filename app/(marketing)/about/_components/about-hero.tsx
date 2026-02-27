import { MapPin } from 'lucide-react'

export function AboutHero() {
    return (
        <section className="relative overflow-hidden bg-background py-10 md:py-16">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-72 h-72 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-2 md:mb-4">
                        <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                        Pune, Maharashtra
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
                        About{' '}
                        <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Seva Samarpan
                        </span>
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-snug md:leading-relaxed font-medium">
                        Dedicated to transforming lives through quality education for underprivileged students
                        and compassionate care for elders since 2014.
                    </p>
                </div>
            </div>
        </section>
    )
}
