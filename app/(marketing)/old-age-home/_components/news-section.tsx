import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export function NewsSection() {
    return (
        <section className="py-12 md:py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
                    <Badge variant="outline" className="mb-3 md:mb-4 border-primary/20 text-primary scale-90 md:scale-100">Media Coverage</Badge>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter">In the News</h2>
                    <p className="text-muted-foreground mt-3 md:mt-4 text-sm md:text-base">Our efforts towards providing a dignified life for elders have been recognized by leading local publications.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    <div className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl border-2 md:border-4 border-card group">
                        <Image
                            src="/old-age/news-1.png"
                            alt="News report 1"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl border-2 md:border-4 border-card group">
                        <Image
                            src="/old-age/news-2.png"
                            alt="News report 2"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                    </div>
                </div>
            </div>
        </section>
    )
}
