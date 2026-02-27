import { Heart, Users, Home as HomeIcon } from 'lucide-react'
import Image from 'next/image'

export function MissionSection() {
    return (
        <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
                    <div className="space-y-6 md:space-y-8 order-2 md:order-1">
                        <div className="space-y-3 md:space-y-4">
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter">A Sanctuary for Dignity</h2>
                            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-snug md:leading-relaxed font-medium">
                                Seva Samarpan Old Age Home is a dedicated haven and recreation center for underprivileged and helpless elders. We believe that aging should be a journey of respect, comfort, and community.
                            </p>
                        </div>

                        <div className="grid gap-4 md:gap-6">
                            {[
                                { icon: Heart, title: 'Holistic Care', desc: 'Comprehensive medical support and physical well-being.' },
                                { icon: Users, title: 'Vibrant Community', desc: 'A place to make friends, share stories, and live joyfully.' },
                                { icon: HomeIcon, title: 'Home-like Environment', desc: 'Safe, secure, and dignified living spaces.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-3 md:p-4 rounded-2xl md:rounded-3xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <item.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base md:text-lg mb-1">{item.title}</h3>
                                        <p className="text-sm md:text-base text-muted-foreground leading-snug">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative aspect-square order-1 md:order-2 w-full max-w-sm md:max-w-none mx-auto">
                        <div className="absolute inset-0 bg-primary/10 rounded-[2rem] md:rounded-[3rem] rotate-6 scale-95 md:scale-100" />
                        <div className="relative h-full w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl md:shadow-2xl border-4 border-card">
                            <Image
                                src="/old-age/news-2.png"
                                alt="Elders sharing joy"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
