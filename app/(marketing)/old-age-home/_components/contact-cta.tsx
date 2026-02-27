import { Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function ContactCTA() {
    return (
        <section className="py-12 md:py-20 bg-muted/20">
            <div className="container mx-auto px-4 text-center max-w-3xl space-y-6 md:space-y-8">
                 <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-primary mx-auto flex items-center justify-center shadow-lg md:shadow-xl shadow-primary/30">
                    <Phone className="h-8 w-8 md:h-10 md:w-10 text-white" />
                 </div>
                 <div className="space-y-3 md:space-y-4">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter">Get in Touch</h2>
                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-snug md:leading-relaxed font-medium">
                        For admissions, donations, or visits, please feel free to reach out to us. Your support keeps this haven alive.
                    </p>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center pt-4 md:pt-0">
                    <Link href="tel:+919422262499" className="w-full sm:w-auto">
                         <Button size="lg" className="w-full h-14 md:h-16 px-8 md:px-10 rounded-xl md:rounded-2xl text-base md:text-xl font-bold shadow-lg md:shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                            <Phone className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6" /> +91 94222 62499
                         </Button>
                    </Link>
                    <Link href="/sponsor-students" className="w-full sm:w-auto">
                        <Button size="lg" variant="outline" className="w-full h-14 md:h-16 px-8 md:px-10 rounded-xl md:rounded-2xl text-base md:text-xl font-bold border-2 hover:bg-primary hover:text-white transition-all">
                            Donate <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6" />
                        </Button>
                    </Link>
                 </div>
            </div>
        </section>
    )
}
