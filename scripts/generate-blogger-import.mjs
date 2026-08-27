/**
 * Generates:
 * 1. feed.atom & blogger-import.xml (Google Takeout / Blogger Atom format)
 * 2. wordpress-import.xml (Standard WordPress WXR format)
 *
 * Run with: node scripts/generate-blogger-import.mjs
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const postsDir = path.join(root, 'app', 'posts');
const baseUrl = 'https://zyroxlab.com';

function normalizeDate(value) {
    if (typeof value === 'string') {
        const d = new Date(value);
        return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
    }
    if (value instanceof Date) return value.toISOString();
    return new Date().toISOString();
}

function escapeHtmlEntities(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

const postFiles = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md') && !f.includes('['));

console.log(`Processing ${postFiles.length} posts...`);

// ─────────────────────────────────────────────────────────────
// 1. BLOGGER ATOM FORMAT (feed.atom & blogger-import.xml)
// ─────────────────────────────────────────────────────────────
function generateBloggerAtom(files) {
    const entries = files.map((fileName, index) => {
        const slug = fileName.replace(/\.md$/, '');
        const raw = fs.readFileSync(path.join(postsDir, fileName), 'utf8');
        const { data, content } = matter(raw);

        const title = data.title || slug;
        const author = data.author || 'Marcus Holt';
        const category = data.category || 'PC Hardware';
        const tags = Array.isArray(data.tags) ? data.tags : [];
        const datePublished = normalizeDate(data.date);
        const dateUpdated = normalizeDate(data.updated || data.date);
        const postUrl = `${baseUrl}/posts/${slug}/`;

        let html = marked.parse(content);
        html = html
            .replace(/src="\/(?!\/)/g, `src="${baseUrl}/`)
            .replace(/href="\/(?!\/)/g, `href="${baseUrl}/`);

        const banner = `<div style="background-color:#f3f4f6;border-left:4px solid #3b82f6;padding:12px 16px;margin-bottom:20px;font-family:sans-serif;font-size:14px;color:#1f2937;"><strong>Source:</strong> Originally published on <a href="${postUrl}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;font-weight:600;">ZyroxLab: ${escapeHtmlEntities(title)}</a></div>`;
        const footer = `<hr style="margin-top:30px;border:0;border-top:1px solid #e5e7eb;"/><p style="font-size:13px;color:#6b7280;font-family:sans-serif;">Read the full interactive guide and benchmarks on <a href="${postUrl}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;">ZyroxLab</a>.</p>`;

        const fullHtml = `${banner}${html}${footer}`;
        const escapedContent = escapeHtmlEntities(fullHtml);

        const tagCategories = [category, ...tags]
            .map((t) => `    <category scheme="http://www.blogger.com/atom/ns#" term="${escapeHtmlEntities(t)}"/>`)
            .join('\n');

        const postId = 1000000000000000000n + BigInt(index + 1);

        return `  <entry>
    <id>tag:blogger.com,1999:blog-123456789.post-${postId}</id>
    <published>${datePublished}</published>
    <updated>${dateUpdated}</updated>
    <category scheme="http://schemas.google.com/g/2005#kind" term="http://schemas.google.com/blogger/2008/kind#post"/>
${tagCategories}
    <title type="text">${escapeHtmlEntities(title)}</title>
    <content type="html">${escapedContent}</content>
    <link rel="alternate" type="text/html" href="${postUrl}" title="${escapeHtmlEntities(title)}"/>
    <author>
      <name>${escapeHtmlEntities(author)}</name>
      <email>noreply@blogger.com</email>
    </author>
  </entry>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom"
      xmlns:openSearch="http://a9.com/-/spec/opensearchrss/1.0/"
      xmlns:blogger="http://schemas.google.com/blogger/2008"
      xmlns:georss="http://www.georss.org/georss"
      xmlns:gd="http://schemas.google.com/g/2005"
      xmlns:thr="http://purl.org/syndication/thread/1.0">
  <id>tag:blogger.com,1999:blog-123456789</id>
  <updated>${new Date().toISOString()}</updated>
  <title type="text">Zyrox Blog</title>
  <subtitle type="text">PC Hardware Guides and Troubleshooting</subtitle>
  <generator version="7.00" uri="http://www.blogger.com">Blogger</generator>
${entries.join('\n')}
</feed>`;
}

// ─────────────────────────────────────────────────────────────
// 2. WORDPRESS WXR FORMAT (wordpress-import.xml)
// ─────────────────────────────────────────────────────────────
function generateWordPressWxr(files) {
    const items = files.map((fileName, index) => {
        const slug = fileName.replace(/\.md$/, '');
        const raw = fs.readFileSync(path.join(postsDir, fileName), 'utf8');
        const { data, content } = matter(raw);

        const title = data.title || slug;
        const author = data.author || 'Marcus Holt';
        const category = data.category || 'PC Hardware';
        const tags = Array.isArray(data.tags) ? data.tags : [];
        const datePublished = normalizeDate(data.date).replace('T', ' ').slice(0, 19);
        const postUrl = `${baseUrl}/posts/${slug}/`;

        let html = marked.parse(content);
        html = html
            .replace(/src="\/(?!\/)/g, `src="${baseUrl}/`)
            .replace(/href="\/(?!\/)/g, `href="${baseUrl}/`);

        const banner = `<div style="background-color:#f3f4f6;border-left:4px solid #3b82f6;padding:12px 16px;margin-bottom:20px;font-family:sans-serif;font-size:14px;color:#1f2937;"><strong>Source:</strong> Originally published on <a href="${postUrl}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;font-weight:600;">ZyroxLab: ${escapeHtmlEntities(title)}</a></div>`;
        const footer = `<hr style="margin-top:30px;border:0;border-top:1px solid #e5e7eb;"/><p style="font-size:13px;color:#6b7280;font-family:sans-serif;">Read the full interactive guide and benchmarks on <a href="${postUrl}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;">ZyroxLab</a>.</p>`;

        const fullHtml = `${banner}${html}${footer}`;
        const safeHtml = fullHtml.replace(/\]\]>/g, ']]&gt;');

        const categoryXml = `<category domain="category" nicename="${slug}"><![CDATA[${category}]]></category>`;
        const tagXml = tags
            .map((t) => `    <category domain="post_tag" nicename="${t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}"><![CDATA[${t}]]></category>`)
            .join('\n');

        return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${postUrl}</link>
      <pubDate>${new Date(data.date || Date.now()).toUTCString()}</pubDate>
      <dc:creator><![CDATA[${author}]]></dc:creator>
      <guid isPermaLink="false">${postUrl}</guid>
      <description></description>
      <content:encoded><![CDATA[${safeHtml}]]></content:encoded>
      <excerpt:encoded><![CDATA[${data.meta_description || ''}]]></excerpt:encoded>
      <wp:post_id>${index + 100}</wp:post_id>
      <wp:post_date><![CDATA[${datePublished}]]></wp:post_date>
      <wp:post_date_gmt><![CDATA[${datePublished}]]></wp:post_date_gmt>
      <wp:post_modified><![CDATA[${datePublished}]]></wp:post_modified>
      <wp:post_modified_gmt><![CDATA[${datePublished}]]></wp:post_modified_gmt>
      <wp:comment_status><![CDATA[open]]></wp:comment_status>
      <wp:ping_status><![CDATA[open]]></wp:ping_status>
      <wp:post_name><![CDATA[${slug}]]></wp:post_name>
      <wp:status><![CDATA[publish]]></wp:status>
      <wp:post_parent>0</wp:post_parent>
      <wp:menu_order>0</wp:menu_order>
      <wp:post_type><![CDATA[post]]></wp:post_type>
      <wp:post_password><![CDATA[]]></wp:post_password>
      <wp:is_sticky>0</wp:is_sticky>
      ${categoryXml}
${tagXml}
    </item>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">
  <channel>
    <title>Zyrox Blog</title>
    <link>${baseUrl}</link>
    <description>PC Hardware Guides</description>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <language>en</language>
    <wp:wxr_version>1.2</wp:wxr_version>
    <wp:base_site_url>${baseUrl}</wp:base_site_url>
    <wp:base_blog_url>${baseUrl}</wp:base_blog_url>
${items.join('\n')}
  </channel>
</rss>`;
}

// Generate files
const bloggerFull = generateBloggerAtom(postFiles);
fs.writeFileSync(path.join(root, 'blogger-import.xml'), bloggerFull, 'utf8');
fs.writeFileSync(path.join(root, 'feed.atom'), bloggerFull, 'utf8');
console.log(`✓ Blogger XML & feed.atom created`);

const wpFull = generateWordPressWxr(postFiles);
fs.writeFileSync(path.join(root, 'wordpress-import.xml'), wpFull, 'utf8');
console.log(`✓ WordPress WXR import file created: wordpress-import.xml`);

const testBlogger = generateBloggerAtom([postFiles[0]]);
fs.writeFileSync(path.join(root, 'blogger-test-1post.xml'), testBlogger, 'utf8');
console.log(`✓ Blogger 1-post test file created: blogger-test-1post.xml`);
