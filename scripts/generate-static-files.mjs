/**
 * Generates static public/sitemap.xml, public/rss.xml, and public/atom.xml
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
        const { data, content } = matter(raw);

        let img = data.image || data.featured_image || data.og_image;
        if (!img) {
            const match = content.match(/!\[.*?\]\((.*?)\)/);
            if (match && match[1]) {
                img = match[1].trim();
            }
        }
        if (!img) img = '/images/og-default.png';
        const imageUrl = img.startsWith('http') ? img : `${baseUrl}${img.startsWith('/') ? '' : '/'}${img}`;

        return {
            slug: fileName.replace(/\.md$/, ''),
            title: (data.title ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
            meta_description: (data.meta_description ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
            date: normalizeDate(data.date),
            updated: normalizeDate(data.updated ?? data.date),
            tags: data.tags || [],
            imageUrl,
        };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

// ── Author slugs ──────────────────────────────────────────
const authorSlugs = ['marcus-holt', 'sara-vance', 'daniel-osei', 'rachel-kim'];



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

function urlEntry({ loc, lastmod, changefreq, priority, image }) {
    let entry = `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;
    if (image) {
        entry += `
    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:title>${image.title}</image:title>
    </image:image>`;
    }
    entry += `\n  </url>`;
    return entry;
}

const sitemapEntries = [
    // Static pages
    ...staticRoutes.map((r) =>
        urlEntry({ loc: `${baseUrl}${r.path}`, lastmod: r.lastmod, changefreq: r.freq, priority: r.priority }),
    ),
    // Posts (trailing slash!) with Google Image Sitemap metadata
    ...posts.map((p) =>
        urlEntry({
            loc: `${baseUrl}/posts/${p.slug}/`,
            lastmod: p.updated || p.date,
            changefreq: 'monthly',
            priority: '0.9',
            image: {
                loc: p.imageUrl,
                title: p.title,
            },
        }),
    ),
    // Authors (trailing slash!)
    ...authorSlugs.map((s) =>
        urlEntry({ loc: `${baseUrl}/authors/${s}/`, lastmod: '2026-06-27', changefreq: 'monthly', priority: '0.7' }),
    ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries.join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('✓ public/sitemap.xml');

// ── rss.xml ───────────────────────────────────────────────
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Zyrox</title>
    <link>${baseUrl}</link>
    <description>Practical PC hardware guides, build advice, and troubleshooting articles.</description>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <atom:link rel="hub" href="https://pubsubhubbub.appspot.com/" />
    <atom:link rel="hub" href="https://pubsubhubbub.superfeedr.com/" />
    <language>en</language>
${posts
    .map(
        (post) => `    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/posts/${post.slug}/</link>
      <guid>${baseUrl}/posts/${post.slug}/</guid>
      <description>${post.meta_description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <media:content url="${post.imageUrl}" medium="image" />
      <enclosure url="${post.imageUrl}" type="image/jpeg" length="0" />
    </item>`,
    )
    .join('\n')}
  </channel>
</rss>
`;
fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss, 'utf8');
console.log('✓ public/rss.xml');

// ── atom.xml & feed.atom ──────────────────────────────────
const atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Zyrox</title>
  <subtitle>Practical PC hardware guides, build advice, and troubleshooting articles.</subtitle>
  <link href="${baseUrl}/atom.xml" rel="self" type="application/atom+xml" />
  <link href="${baseUrl}/" />
  <link rel="hub" href="https://pubsubhubbub.appspot.com/" />
  <link rel="hub" href="https://pubsubhubbub.superfeedr.com/" />
  <id>${baseUrl}/</id>
  <updated>${new Date(posts.length > 0 ? posts[0].date : Date.now()).toISOString()}</updated>
${posts
    .map(
        (post) => `  <entry>
    <title>${post.title}</title>
    <link href="${baseUrl}/posts/${post.slug}/" />
    <id>${baseUrl}/posts/${post.slug}/</id>
    <updated>${new Date(post.updated || post.date).toISOString()}</updated>
    <summary>${post.meta_description}</summary>
    <link rel="enclosure" type="image/jpeg" href="${post.imageUrl}" />
  </entry>`,
    )
    .join('\n')}
</feed>
`;
fs.writeFileSync(path.join(publicDir, 'atom.xml'), atom, 'utf8');
fs.writeFileSync(path.join(publicDir, 'feed.atom'), atom, 'utf8');
console.log('✓ public/atom.xml & public/feed.atom');

// ── IndexNow Key ──────────────────────────────────────────
const indexNowKey = '8A0ADD438eA44836B3D590977FA78A2B';
fs.writeFileSync(path.join(publicDir, `${indexNowKey}.txt`), `${indexNowKey}\n`, 'utf8');
console.log(`✓ public/${indexNowKey}.txt`);

console.log(`\nGenerated ${posts.length} posts in sitemap/rss/atom.`);
