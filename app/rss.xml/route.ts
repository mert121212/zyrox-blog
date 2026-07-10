import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const posts = getAllPosts();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Zyrox</title>
    <link>https://zyroxnet.netlify.app</link>
    <description>Practical PC hardware guides, build advice, and troubleshooting articles.</description>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>https://zyroxnet.netlify.app/posts/${post.slug}</link>
      <description>${post.meta_description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
