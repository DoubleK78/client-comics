import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_BASE_URL!;

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/profile'
            ],
        },
        sitemap: [
            `${baseUrl}/sitemap/0.xml`,
            `${baseUrl}/sitemap/1.xml`,
        ]
    }
}