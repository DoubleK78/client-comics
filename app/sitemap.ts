import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_BASE_URL!;

    return [
        // Home Page
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/en`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        // Search
        {
            url: `${baseUrl}/tim-kiem`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/en/search`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        // Comics (Equals to Search)
        {
            url: `${baseUrl}/truyen-tranh`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/en/comics`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        // Login
        {
            url: `${baseUrl}/dang-nhap`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/en/login`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        // Top
        {
            url: `${baseUrl}/xep-hang`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/en/top-page`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        // Following
        {
            url: `${baseUrl}/theo-doi`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/en/following`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
    ]
}