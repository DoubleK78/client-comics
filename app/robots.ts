import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_BASE_URL!;

    return {
        rules: {
            userAgent: '*',
            allow: [
                '/'
            ],
            disallow: [
                '/vi',
                '/vi/*',
                '/truyen-tranh/*?previousCollectionId=*',
                '/en/comics/*?previousCollectionId=*'
            ],
        },
        sitemap: [
            `${baseUrl}/sitemap/0.xml`,
            `${baseUrl}/sitemap/1.xml`,
        ]
    }
}