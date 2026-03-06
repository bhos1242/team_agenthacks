export function OurStory() {
    return (
        <section className="py-8 md:py-12 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed font-bold">
                        <h2 className="text-2xl md:text-4xl font-black text-foreground mb-4">Our <span className="text-primary italic">Story</span></h2>
                        <p>
                            Seva Samarpan was founded in 2025 with a singular focus: Providing a dedicated place for underprivileged students to study and excel. We started by establishing a **Free Library and Study Room** in the heart of Pune.
                        </p>
                        <p>
                            Recognizing the growing need for compassionate elderly care, we expanded our mission in **January 2026** by opening our **Old Age Home**, ensuring that our elders live their golden years with the dignity and love they deserve.
                        </p>
                    </div>
                    <div className="flex-1 w-full aspect-video rounded-3xl bg-muted overflow-hidden relative shadow-2xl">
                         <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                             <span className="text-primary font-black uppercase tracking-widest text-xs">Mission Journey 2025-26</span>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
