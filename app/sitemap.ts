import { MetadataRoute } from 'next';
import { getAllPosts, getTags } from '@/lib/posts';
import { getAllAuthors } from '@/lib/authors';

const baseUrl = 'https://zyroxnet.netlify.app';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();
    const tags = getTags();
    const authors = getAllAuthors();

    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/authors`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    const tagUrls: MetadataRoute.Sitemap = tags.map((tag) => ({
        url: `${baseUrl}/tag/${encodeURIComponent(tag)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    const authorUrls: MetadataRoute.Sitemap = authors.map((author) => ({
        url: `${baseUrl}/authors/${author.slug}`,
        lastModified: new Date(),
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
