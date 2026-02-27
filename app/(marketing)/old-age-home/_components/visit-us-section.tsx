import { MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from 'lucide-react'

export function VisitUsSection() {
    return (
        <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="bg-zinc-950 text-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
                    <div className="grid md:grid-cols-2">
                        <div className="p-8 md:p-12 lg:p-16 space-y-6 md:space-y-8 flex flex-col justify-center">
                            <div className="space-y-3 md:space-y-4">
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter">Visit the Home</h2>
                                <p className="text-zinc-400 text-base md:text-lg leading-snug">We welcome visitors and donors who wish to spend time with our elders or see our facilities.</p>
                            </div>
                            
                            <div className="space-y-5 md:space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary flex items-center justify-center shrink-0">
                                        <MapPin className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">Our Address</p>
                                        <p className="text-lg md:text-xl font-bold leading-tight">
                                            Plot No. 32, Near Om Sai Varad Vishwa, Behind Joshi Vadewale, Maan-Hinjewadi Road, Pune - 411057
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-zinc-800 flex items-center justify-center shrink-0">
                                        <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-1">Visiting Hours</p>
                                        <p className="font-bold text-sm md:text-base">10:00 AM - 6:00 PM Daily</p>
                                    </div>
                                </div>
                            </div>

                            <Button size="lg" className="rounded-xl h-12 md:h-14 w-fit px-6 md:px-8 font-bold gap-2 text-sm md:text-base mt-2" asChild>
                                <Link href="https://share.google/OGT6tS2kNRrCbFksW" target="_blank">
                                    <Navigation className="h-4 w-4 md:h-5 md:w-5" /> Get Directions
                                </Link>
                            </Button>
                        </div>
                        <div className="relative h-64 md:h-auto min-h-[300px] md:min-h-[400px]">
                            <Image
                                src="/old-age/news-3.png"
                                alt="Facility View"
                                fill
                                className="object-cover opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-zinc-950 via-zinc-950/40 md:via-zinc-950/20 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
