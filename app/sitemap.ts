import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sevasamarpan.org'

    const routes = [
        '',
        '/about',
        '/free-library-study-room',
        '/old-age-home',
        '/contact',
        '/privacy',
        '/terms',
        '/refund-policy',
        '/shipping-policy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return [...routes]
}
