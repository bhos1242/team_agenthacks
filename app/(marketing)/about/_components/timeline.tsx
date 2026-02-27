import { Card } from '@/components/ui/card'

const milestones = [
    { year: '2014', event: 'Seva Samarpan NGO founded in Pune' },
    { year: '2015', event: 'Study room and library established with 500 books' },
    { year: '2017', event: 'Reached 100 students supported milestone' },
    { year: '2019', event: 'Seva Samarpan Old Age Home opened' },
    { year: '2022', event: 'Library expanded to 1,500+ books' },
    { year: '2024', event: '250+ students supported, 95% success rate achieved' },
]

export function Timeline() {
    return (
        <section className="py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-10 md:mb-12 text-center space-y-2">
                        <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
                        <p className="text-muted-foreground text-sm md:text-base">Milestones that shaped our path</p>
                    </div>

                    <div className="relative space-y-6 md:space-y-8">
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-muted -translate-x-1/2 hidden md:block" />
                        
                        {milestones.map((milestone, index) => (
                            <div key={index} className={`flex flex-col md:flex-row gap-4 md:gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="flex-1 w-full">
                                    <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-card p-5 md:p-6 w-full relative z-10 border-border/50">
                                        <div className="text-primary font-bold text-lg md:text-xl mb-1.5">{milestone.year}</div>
                                        <p className="text-muted-foreground font-medium text-sm md:text-base leading-snug">{milestone.event}</p>
                                    </Card>
                                </div>
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary border-4 border-background z-20 hidden md:block shrink-0" />
                                <div className="flex-1 hidden md:block" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
