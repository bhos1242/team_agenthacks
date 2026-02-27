import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sevasamarpan.org'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/dashboard/', '/admin/', '/_next/'],
            },
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'Bingbot', 'Googlebot'],
                allow: '/',
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
