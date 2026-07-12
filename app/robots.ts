import { MetadataRoute } from 'next';

const baseUrl = 'https://zyroxnet.netlify.app';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/', '/_next/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
