export function ImpactStats() {
    return (
        <section className="py-8 md:py-12 border-b bg-muted/20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {[
                        { label: 'Books', value: '1,500+' },
                        { label: 'Students/Mo', value: '100+' },
                        { label: 'Study Hrs/Day', value: '12' },
                        { label: 'Successes', value: '50+' }
                    ].map((stat, i) => (
                         <div key={i} className="text-center group">
                            <p className="text-2xl md:text-4xl lg:text-5xl font-black text-primary transition-transform group-hover:scale-105">{stat.value}</p>
                            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mt-1 md:mt-2">{stat.label}</p>
                         </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
