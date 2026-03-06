import { Metadata } from 'next'
import { OldAgeHomeHero } from './_components/old-age-home-hero'
import { NewsSection } from './_components/news-section'
import { VisitUsSection } from './_components/visit-us-section'
import { MissionSection } from './_components/mission-section'
import { Gallery } from './_components/gallery'
import { ContactCTA } from './_components/contact-cta'

export const metadata: Metadata = {
    title: 'Old Age Home in Pune | Seva Samarpan | Dignified Care',
    description: 'Looking for an old age home near me? Seva Samarpan provides a dignified old age home in Pune with holistic care and support for elders.',
    keywords: ["old age home in Pune", "old age home near me", "NGO helping elder", "NGO helping old people", "senior citizen home Pune"],
    openGraph: {
        title: 'Best Old Age Home in Pune | Seva Samarpan',
        description: 'Dignified living and comprehensive care for elders at our old age home in Pune.',
        url: '/old-age-home',
        images: [{ url: '/old-age/image.png', width: 1200, height: 630, alt: 'Old Age Home' }],
    }
}

export default function OldAgeHomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <OldAgeHomeHero />
            <NewsSection />
            <VisitUsSection />
            <MissionSection />
            <Gallery />
            <ContactCTA />
        </div>
    )
}
