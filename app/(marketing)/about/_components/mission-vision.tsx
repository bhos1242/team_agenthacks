import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, BookOpen } from 'lucide-react'

export function MissionVision() {
    return (
        <section className="py-10 md:py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
                    <div className="flex gap-4 p-6 rounded-3xl bg-white dark:bg-zinc-950 border border-black/5 dark:border-white/5 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Target className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-black uppercase tracking-tight">Mission</h3>
                            <p className="text-sm md:text-base text-muted-foreground font-bold leading-snug">
                                Empowering underprivileged children through education and providing compassionate care for elders in Pune.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 p-6 rounded-3xl bg-white dark:bg-zinc-950 border border-black/5 dark:border-white/5 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                            <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-black uppercase tracking-tight">Vision</h3>
                            <p className="text-sm md:text-base text-muted-foreground font-bold leading-snug">
                                A community where every child excels and every elder lives with dignity and love.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
