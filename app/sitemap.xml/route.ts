import { getAllPosts } from '@/lib/posts';
import { getAllAuthors } from '@/lib/authors';

export async function GET() {
    const posts = getAllPosts();
    const authors = getAllAuthors();
    const baseUrl = 'https://zyroxnet.netlify.app';

    const staticRoutes = ['/', '/about', '/authors', '/privacy-policy', '/terms'];
    const postRoutes = posts.map((post) => `/posts/${post.slug}`);
    const authorRoutes = authors.map((a) => `/authors/${a.slug}`);

    const urls = [...staticRoutes, ...postRoutes, ...authorRoutes];

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
            .map(
                (url) => `
  <url>
    <loc>${baseUrl}${url}</loc>
  </url>`,
            )
            .join('')}
</urlset>`;

    return new Response(body, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}
