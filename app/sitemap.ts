import { MetadataRoute } from 'next';
import { getAllPosts, getTags } from '@/lib/posts';
import { getAllAuthors } from '@/lib/authors';

const baseUrl = 'https://zyroxlab.com';

// Fixed date for pages that rarely change — prevents false "modified" signals to crawlers
const SITE_LAUNCH = '2026-06-27T00:00:00.000Z';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();
    const tags = getTags();
    const authors = getAllAuthors();

    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: posts.length > 0 ? new Date(posts[0].date) : new Date(SITE_LAUNCH),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about/`,
            lastModified: new Date(SITE_LAUNCH),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/authors/`,
            lastModified: new Date(SITE_LAUNCH),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact/`,
            lastModified: new Date(SITE_LAUNCH),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy-policy/`,
            lastModified: new Date(SITE_LAUNCH),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms/`,
            lastModified: new Date(SITE_LAUNCH),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/disclaimer/`,
            lastModified: new Date(SITE_LAUNCH),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/posts/${post.slug}/`,
        lastModified: new Date(post.updated || post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    const tagUrls: MetadataRoute.Sitemap = tags.map((tag) => ({
        url: `${baseUrl}/tag/${encodeURIComponent(tag)}/`,
        lastModified: new Date(SITE_LAUNCH),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    const authorUrls: MetadataRoute.Sitemap = authors.map((author) => ({
        url: `${baseUrl}/authors/${author.slug}/`,
        lastModified: new Date(SITE_LAUNCH),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [
        ...staticUrls,
        ...postUrls,
        ...tagUrls,
        ...authorUrls,
    ];
}
