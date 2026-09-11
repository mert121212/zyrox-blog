import { MetadataRoute } from 'next';

const baseUrl = 'https://zyroxlab.com';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/', '/reading-list/'],
            },
        ],
        sitemap: [
            `${baseUrl}/sitemap.xml`,
            `${baseUrl}/news-sitemap.xml`,
        ],
        host: baseUrl,
    };
}
