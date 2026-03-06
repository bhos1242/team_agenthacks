import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AboutCTA() {
    return (
        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center space-y-6 md:space-y-8">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">Want to be part of our story?</h2>
                <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto font-medium">
                    Your support can transform lives. Every contribution makes a lasting impact on someone&apos;s future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" className="rounded-xl h-12 px-8 font-bold shadow-xl shadow-black/10 hover:scale-105 transition-all" asChild>
                        <Link href="/donate">Donate Now</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-xl h-12 px-8 border-2 border-white text-white hover:bg-white hover:text-primary font-bold transition-all" asChild>
                        <Link href="/contact">Volunteer</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
