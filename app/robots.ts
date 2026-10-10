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
            {
                userAgent: [
                    'GPTBot',
                    'OAI-SearchBot',
                    'ChatGPT-User',
                    'PerplexityBot',
                    'ClaudeBot',
                    'Claude-Web',
                    'anthropic-ai',
                    'Google-Extended',
                    'Applebot-Extended',
                    'cohere-ai',
                ],
                allow: '/',
                disallow: ['/api/', '/admin/', '/reading-list/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
