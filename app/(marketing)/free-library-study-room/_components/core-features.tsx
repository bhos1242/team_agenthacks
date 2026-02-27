import { Library, Sparkles, School } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function CoreFeatures() {
    return (
        <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 space-y-3 md:space-y-4">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter">Everything a Student Needs</h2>
                    <p className="text-sm md:text-lg text-muted-foreground leading-snug md:leading-relaxed font-medium">
                        We provide a bridge between talent and opportunity by offering resources that were previously out of reach for rural students.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {[
                        { 
                            icon: Library, 
                            title: 'Vast Collection', 
                            desc: 'Over 1,500 books covering academic syllabus, competitive exams, and general knowledge.' 
                        },
                        { 
                            icon: Sparkles, 
                            title: 'Quiet Sanctuary', 
                            desc: 'A peaceful environment away from home distractions, designed specifically for focused learning.' 
                        },
                        { 
                            icon: School, 
                            title: 'Digital Access', 
                            desc: 'Bridging the digital divide with internet-enabled learning stations and e-resources.' 
                        }
                    ].map((feature, i) => (
                        <Card key={i} className="border-none shadow-lg md:shadow-xl bg-card hover:-translate-y-1 transition-transform duration-300 rounded-2xl md:rounded-[2rem] overflow-hidden">
                            <CardHeader className="p-6 md:p-8 pb-4 md:pb-6">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                                    <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                                </div>
                                <CardTitle className="text-xl md:text-2xl font-bold">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                                <p className="text-muted-foreground text-sm md:text-base leading-snug md:leading-relaxed font-medium">
                                    {feature.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
