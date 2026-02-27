import { Metadata } from 'next'
import { DonateForm } from './_components/donate-form'
import { DonationAnimation } from './_components/donation-animation'
import { Badge } from '@/components/ui/badge'
import { Heart } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Donate | Seva Samarpan NGO',
    description: 'Support Seva Samarpan NGO with a secure donation. Your contribution helps empower underprivileged students and provide dignified care to elders in Pune.',
    openGraph: {
        title: 'Donate | Seva Samarpan',
        description: 'Your contribution empowers underprivileged students and provides dignified care to elders.',
        url: '/sponsor-students',
    }
}

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-background pb-12 pt-12 md:pt-16 relative overflow-hidden">
            {/* Background design */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />
            <div className="absolute top-0 right-0 w-full h-[50vh] bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                {/* Header Section */}
                <div className="space-y-3 md:space-y-4 text-center mb-6 md:mb-8 lg:mb-10">
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm rounded-full inline-flex mx-auto">
                         Make An Impact
                    </Badge>
                    
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase relative z-20">
                        Support Our <span className="text-primary flex items-center justify-center gap-2 mt-1 md:mt-2">Mission <Heart className="h-6 w-6 md:h-8 md:w-8 fill-current" /></span>
                    </h1>
                    
                    <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-snug md:leading-relaxed font-medium max-w-2xl mx-auto">
                        Your generous contribution directly aids in providing education for tribal children and a secure home for elders. 100% of your donation goes to our causes.
                    </p>
                </div>

                {/* Content Section (Animation + Form) */}
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 items-center justify-center">
                    {/* Animation Side */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <div className="w-full max-w-[260px] sm:max-w-[280px] lg:max-w-sm xl:max-w-md">
                            <DonationAnimation />
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="w-full lg:w-1/2 max-w-xl">
                        <DonateForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
