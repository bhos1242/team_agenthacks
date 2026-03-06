import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MapPin, Clock } from 'lucide-react'

export function VisitSupportSection() {
    return (
        <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4">
                <Card className="max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-zinc-950 text-white border-none shadow-2xl relative">
                    <div className="absolute top-0 right-0 -z-10 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
                    <div className="grid md:grid-cols-2">
                         <div className="p-8 md:p-12 lg:p-20 space-y-6 md:space-y-8">
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter">Support the Library</h2>
                            <p className="text-zinc-400 text-sm md:text-base lg:text-lg leading-snug md:leading-relaxed">
                                Your donation helps us buy new books, maintain the facility, and provide better resources for the dedicated students who use this space.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                <Button size="lg" className="rounded-xl md:rounded-2xl h-12 md:h-14 px-6 md:px-8 font-bold text-sm md:text-base" asChild>
                                    <Link href="/donate">Donate Now</Link>
                                </Button>
                            </div>
                         </div>
                         <div className="p-8 md:p-12 lg:p-20 bg-zinc-900 flex flex-col justify-center space-y-6 md:space-y-8">
                             <h3 className="text-xl md:text-2xl font-bold">Visit Us</h3>
                             <div className="space-y-4 md:space-y-6">
                                <div className="flex gap-3 md:gap-4 items-center">
                                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary shrink-0" />
                                    <p className="text-zinc-300 text-sm md:text-base">Pune, Maharashtra, India</p>
                                </div>
                                <div className="flex gap-3 md:gap-4 items-center">
                                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary shrink-0" />
                                    <p className="text-zinc-300 text-sm md:text-base">Open Daily: 8:00 AM - 8:00 PM</p>
                                </div>
                             </div>
                             <div className="pt-6 md:pt-8 border-t border-zinc-800">
                                 <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-1 md:mb-2">Contact for Admission</p>
                                 <p className="text-xl md:text-2xl font-black">+91 94222 62499</p>
                             </div>
                         </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
