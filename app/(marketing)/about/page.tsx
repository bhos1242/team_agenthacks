import { Metadata } from 'next'
import { AboutHero } from './_components/about-hero'
import { OurStory } from './_components/our-story'
import { MissionVision } from './_components/mission-vision'
import { Timeline } from './_components/timeline'
import { AboutCTA } from './_components/about-cta'

export const metadata: Metadata = {
    title: 'About Seva Samarpan | Best NGO in Pune for Social Impact',
    description: 'Learn how Seva Samarpan, a top NGO in Pune, is helping old people and students through dedicated care and education programs in Pune.',
    keywords: ["best NGO in Pune", "NGO helping old people", "NGO helping students Pune", "Seva Samarpan mission", "Pune NGO"],
    openGraph: {
        title: 'About Seva Samarpan | Empowering Lives in Pune',
        description: 'Learn about our mission to provide quality education and dignified care in Pune.',
        url: '/about',
    }
}

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <AboutHero />
            <OurStory />
            <MissionVision />
            <Timeline />
            <AboutCTA />
        </div>
    )
}
