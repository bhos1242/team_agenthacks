import Image from 'next/image'

export function VisualGallery() {
    return (
        <section className="py-12 md:py-16 bg-muted/30">
            <div className="container mx-auto px-4 text-center space-y-8 md:space-y-12">
                 <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter">Inside the Abhyasika</h2>
                 <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    <div className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl border-2 md:border-4 border-card">
                        <Image src="/programs/samarpan/image.png" alt="Library shelf" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl border-2 md:border-4 border-card">
                        <Image src="/programs/samarpan/image copy.png" alt="Students studying" fill className="object-cover" />
                    </div>
                 </div>
            </div>
        </section>
    )
}
