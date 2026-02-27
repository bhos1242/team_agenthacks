import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, BookOpen } from 'lucide-react'

export function MissionVision() {
    return (
        <section className="py-12 md:py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <Card className="border-none shadow-lg bg-card hover:shadow-xl transition-all duration-300">
                        <CardHeader className="p-6 md:p-8 pb-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                <Target className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-xl md:text-2xl font-bold">Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8 pt-0">
                            <p className="text-muted-foreground leading-snug md:leading-relaxed text-sm md:text-base font-medium">
                                To empower underprivileged and tribal students in Pune through quality education,
                                resources, and mentorship, while providing dignified care and community for elders.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg bg-card hover:shadow-xl transition-all duration-300">
                        <CardHeader className="p-6 md:p-8 pb-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-xl md:text-2xl font-bold">Our Vision</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8 pt-0">
                            <p className="text-muted-foreground leading-snug md:leading-relaxed text-sm md:text-base font-medium">
                                To create a community where every child has access to quality education regardless
                                of their background, and every elder lives with dignity, respect, and care.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
