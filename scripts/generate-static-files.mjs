/**
 * Generates static public/robots.txt, public/sitemap.xml, and public/rss.xml
 * Run with: node scripts/generate-static-files.mjs
 * Called automatically via prebuild in package.json
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const postsDir = path.join(root, 'app', 'posts');
const publicDir = path.join(root, 'public');
const baseUrl = 'https://zyroxnet.netlify.app';

// Ensure public/ exists
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

// ── Read posts ────────────────────────────────────────────
function normalizeDate(value) {
    if (typeof value === 'string') return value;
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    return 'Unknown date';
}

const posts = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md') && !f.includes('['))
    .map((fileName) => {
        const raw = fs.readFileSync(path.join(postsDir, fileName), 'utf8');
        const { data } = matter(raw);
        return {
            slug: fileName.replace(/\.md$/, ''),
            title: (data.title ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
            meta_description: (data.meta_description ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
            date: normalizeDate(data.date),
        };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

// ── Author slugs ──────────────────────────────────────────
const authorSlugs = ['marcus-holt', 'sara-vance', 'daniel-osei', 'rachel-kim'];

// ── robots.txt ────────────────────────────────────────────
const robots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');
console.log('✓ public/robots.txt');

// ── sitemap.xml ───────────────────────────────────────────
const staticRoutes = ['/', '/about', '/authors', '/privacy-policy', '/terms'];
const postRoutes = posts.map((p) => `/posts/${p.slug}/`);
const authorRoutes = authorSlugs.map((s) => `/authors/${s}/`);
const allUrls = [...staticRoutes, ...postRoutes, ...authorRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url) => `  <url>\n    <loc>${baseUrl}${url}</loc>\n  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('✓ public/sitemap.xml');

// ── rss.xml ───────────────────────────────────────────────
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zyrox</title>
    <link>${baseUrl}</link>
    <description>Practical PC hardware guides, build advice, and troubleshooting articles.</description>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
${posts
        .map(
            (post) => `    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/posts/${post.slug}/</link>
      <guid>${baseUrl}/posts/${post.slug}/</guid>
      <description>${post.meta_description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
        )
        .join('\n')}
  </channel>
</rss>
`;
fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss, 'utf8');
console.log('✓ public/rss.xml');

console.log(`\nGenerated ${posts.length} posts in sitemap/rss.`);
