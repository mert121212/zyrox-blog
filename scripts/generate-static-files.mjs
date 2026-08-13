/**
 * Generates static public/sitemap.xml and public/rss.xml
 * Run with: node scripts/generate-static-files.mjs
 * Called automatically via prebuild in package.json
 *
 * NOTE: robots.txt is handled by app/robots.ts (Next.js route) — no longer
 *       generated here to avoid conflicting with the route-based version.
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const postsDir = path.join(root, 'app', 'posts');
const publicDir = path.join(root, 'public');
const baseUrl = 'https://zyroxlab.com';

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
            updated: normalizeDate(data.updated ?? data.date),
            tags: data.tags || [],
        };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

// ── Author slugs ──────────────────────────────────────────
const authorSlugs = ['marcus-holt', 'sara-vance', 'daniel-osei', 'rachel-kim'];

// ── Collect unique tags ───────────────────────────────────
const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

// ── sitemap.xml ───────────────────────────────────────────
const staticRoutes = [
    { path: '/', lastmod: posts.length > 0 ? posts[0].date : '2026-06-27', priority: '1.0', freq: 'daily' },
    { path: '/about/', lastmod: '2026-06-27', priority: '0.8', freq: 'monthly' },
    { path: '/authors/', lastmod: '2026-06-27', priority: '0.8', freq: 'weekly' },
    { path: '/privacy-policy/', lastmod: '2026-06-27', priority: '0.3', freq: 'yearly' },
    { path: '/terms/', lastmod: '2026-06-27', priority: '0.3', freq: 'yearly' },
    { path: '/contact/', lastmod: '2026-06-27', priority: '0.5', freq: 'yearly' },
    { path: '/disclaimer/', lastmod: '2026-06-27', priority: '0.3', freq: 'yearly' },
];

function urlEntry({ loc, lastmod, changefreq, priority }) {
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const sitemapEntries = [
    // Static pages
    ...staticRoutes.map((r) =>
        urlEntry({ loc: `${baseUrl}${r.path}`, lastmod: r.lastmod, changefreq: r.freq, priority: r.priority }),
    ),
    // Posts (trailing slash!)
    ...posts.map((p) =>
        urlEntry({ loc: `${baseUrl}/posts/${p.slug}/`, lastmod: p.updated || p.date, changefreq: 'monthly', priority: '0.9' }),
    ),
    // Tags (trailing slash!)
    ...allTags.map((tag) =>
        urlEntry({ loc: `${baseUrl}/tag/${encodeURIComponent(tag)}/`, lastmod: '2026-06-27', changefreq: 'weekly', priority: '0.6' }),
    ),
    // Authors (trailing slash!)
    ...authorSlugs.map((s) =>
        urlEntry({ loc: `${baseUrl}/authors/${s}/`, lastmod: '2026-06-27', changefreq: 'monthly', priority: '0.7' }),
    ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
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

console.log(`\nGenerated ${posts.length} posts, ${allTags.length} tags in sitemap/rss.`);
