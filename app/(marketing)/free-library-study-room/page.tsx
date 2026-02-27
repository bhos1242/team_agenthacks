import { Metadata } from 'next'
import { StudyRoomHero } from './_components/study-room-hero'
import { ImpactStats } from './_components/impact-stats'
import { CoreFeatures } from './_components/core-features'
import { VisualGallery } from './_components/visual-gallery'
import { VisitSupportSection } from './_components/visit-support-section'

export const metadata: Metadata = {
    title: 'Free Library & Study Room in Pune | NGO Educational Support | Seva Samarpan',
    description: 'Seva Samarpan provides a free library and study room in Pune (Pune) for underprivileged students. Access 1,500+ books and a quiet learning environment.',
    keywords: ["free library in Pune", "free study room in Pune", "NGO educational support", "library for underprivileged", "Seva Samarpan Abhyasika"],
    openGraph: {
        title: 'Seva Samarpan | Free Library & Study Room for Underprivileged Students',
        description: 'Empowering students with a vast free library and serene study space in Pune.',
        url: '/free-library-study-room',
        images: [{ url: "/programs/samarpan.png", width: 1200, height: 630, alt: 'Free Library & Study Room' }],
    }
}

export default function StudyRoomPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <StudyRoomHero />
            <ImpactStats />
            <CoreFeatures />
            <VisualGallery />
            <VisitSupportSection />
        </div>
    )
}
