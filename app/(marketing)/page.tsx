import { HeroCarousel } from "./_components/hero-carousel";
import { ImpactStats } from "./_components/impact-stats";
import { ProgramsSection } from "./_components/programs-section";
import { FeaturedStudents } from "./_components/featured-students";
import { LifeAtSamarpan } from "./_components/life-at-samarpan";
import { QuoteSection } from "./_components/quote-section";
import { FAQSection } from "./_components/faq-section";
import { FinalCta } from "./_components/final-cta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seva Samarpan | Best NGO in Pune | Empowering Lives",
  description: "Seva Samarpan is the best NGO in Pune helping students with education and providing a safe old age home. Find an NGO near me dedicated to social impact.",
  keywords: ["best NGO in Pune", "NGO near me", "NGO helping student", "Seva Samarpan", "NGO in Pune"],
  openGraph: {
    title: "Seva Samarpan | Top-Rated NGO in Pune",
    description: "Empowering tribal students with free study rooms and caring for elders. Support the best NGO near me today.",
    url: "/",
    images: [{ 
      url: `/api/og?title=${encodeURIComponent("Seva Samarpan | Top-Rated NGO")}&description=${encodeURIComponent("Empowering tribal students and caring for elders in Pune.")}`, 
      width: 1200, 
      height: 630, 
      alt: "Seva Samarpan NGO" 
    }],
  }
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': 'https://sevasamarpan.org/#organization',
    name: 'Seva Samarpan',
    url: 'https://sevasamarpan.org',
    description: 'Empowering lives through education and care in Pune.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN'
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "name": "Social Programs",
      "itemListElement": [
        {
          "@type": "Service",
          "name": "Free Library & Study Room",
          "description": "A dedicated library space for tribal students with 1,500+ books.",
          "provider": { "@id": "https://sevasamarpan.org/#organization" }
        },
        {
          "@type": "Service",
          "name": "Seva Samarpan Old Age Home",
          "description": "A dignified sanctuary for elders provide holistic care and community.",
          "provider": { "@id": "https://sevasamarpan.org/#organization" }
        },
        {
          "@type": "Service",
          "name": "Student Sponsorship Program",
          "description": "Financial and academic support for underprivileged tribal students.",
          "provider": { "@id": "https://sevasamarpan.org/#organization" }
        }
      ]
    },
    sameAs: [
      'https://www.facebook.com/sevasamarpan',
      'https://www.instagram.com/sevasamarpan',
      'https://twitter.com/sevasamarpan'
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />
        {/* Decorative Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
        </div>
        <HeroCarousel />
      </section>

      {/* Extracted Sections */}
      <ImpactStats />
      <ProgramsSection />
      <FeaturedStudents />
      <LifeAtSamarpan />
      <QuoteSection />
      <FAQSection />
      <FinalCta />
    </div>
  );
}

