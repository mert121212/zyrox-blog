import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import dynamic from 'next/dynamic';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { getAuthorBySlug } from '@/lib/authors';
import { AuthorCard } from '@/components/author-card';
import { Breadcrumb } from '@/components/breadcrumb';
import { RelatedPosts } from '@/components/related-posts';
import { injectMidArticleAds } from '@/lib/ads';
import {
    calculateReadingTime,
    extractFAQItems,
    buildFAQSchema,
    extractHowToSteps,
    buildHowToSchema,
} from '@/lib/schema-helpers';
import { PostTags } from '@/components/post-tags';
import { injectContextualInternalLink } from '@/lib/internal-links';

function slugifyHeading(raw: string): string {
    return (raw || '')
        .toLowerCase()
        .replace(/<[^>]+>/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

// Ensure all internal links rendered from markdown have trailing slashes,
// matching the trailingSlash: true config. Prevents 301 redirects that
// waste Googlebot's crawl budget on a new domain.
const renderer = new marked.Renderer();
renderer.link = function (href: string, title: string | null, text: string) {
    // Internal links (starting with /) get a trailing slash if missing
    if (typeof href === 'string' && href.startsWith('/') && !href.endsWith('/')) {
        // Preserve any hash fragment (e.g. /about#editorial-policy → /about/#editorial-policy)
        const hashIndex = href.indexOf('#');
        if (hashIndex !== -1) {
            const path = href.slice(0, hashIndex);
            const hash = href.slice(hashIndex);
            href = (path.endsWith('/') ? path : path + '/') + hash;
        } else {
            href = href + '/';
        }
    }
    const titleAttr = title ? ` title="${title}"` : '';
    return `<a href="${href}"${titleAttr}>${text}</a>`;
};

// SEO: Generate semantic IDs for headings so Google generates "Jump to" sitelinks in SERPs
renderer.heading = function (text: string, level: number, raw: string) {
    const slug = slugifyHeading(raw || text);
    return `<h${level} id="${slug}">${text}</h${level}>\n`;
};

const STORY_MAP: Record<string, string> = {
    'best-gpu-for-1440p-gaming': 'best-gpu-1440p',
    'how-to-build-a-budget-gaming-pc': 'budget-gaming-pc',
    'how-to-speed-up-a-slow-windows-11-pc-in-under-30-minutes': 'speed-up-windows-11',
    'best-cpu-cooler-for-ryzen-7-7800x3d': 'best-cpu-cooler-7800x3d',
    'ssd-vs-hdd-which-should-you-buy-in-2026': 'ssd-vs-hdd-2026',
    'what-to-check-first-when-a-pc-wont-boot': 'pc-wont-boot',
    'how-to-choose-the-right-psu-for-your-build': 'choose-right-psu',
};

// Google Knowledge Graph Entities for Entity-Based Discover Ranking
const HARDWARE_ENTITIES: { name: string; sameAs: string; matchRegex: RegExp }[] = [
    { name: 'NVIDIA GeForce', sameAs: 'https://en.wikipedia.org/wiki/GeForce', matchRegex: /\b(nvidia|geforce|rtx|gtx)\b/i },
    { name: 'AMD Ryzen', sameAs: 'https://en.wikipedia.org/wiki/Ryzen', matchRegex: /\b(amd|ryzen|am4|am5|7800x3d|5800x3d)\b/i },
    { name: 'Graphics Processing Unit (GPU)', sameAs: 'https://en.wikipedia.org/wiki/Graphics_processing_unit', matchRegex: /\b(gpu|graphics card|vram|1440p|rasterization|ray tracing)\b/i },
    { name: 'Central Processing Unit (CPU)', sameAs: 'https://en.wikipedia.org/wiki/Central_processing_unit', matchRegex: /\b(cpu|processor|cores|threads|tdp|clock speed)\b/i },
    { name: 'Solid-State Drive (SSD)', sameAs: 'https://en.wikipedia.org/wiki/Solid-state_drive', matchRegex: /\b(ssd|nvme|pcie 4\.0|pcie 5\.0|sata ssd|m\.2)\b/i },
    { name: 'Hard Disk Drive (HDD)', sameAs: 'https://en.wikipedia.org/wiki/Hard_disk_drive', matchRegex: /\b(hdd|hard drive|spinning disk|seagate|western digital)\b/i },
    { name: 'Power Supply Unit (PSU)', sameAs: 'https://en.wikipedia.org/wiki/Power_supply_unit_(computer)', matchRegex: /\b(psu|power supply|wattage|80 plus|atx 3\.0|12vhpwr)\b/i },
    { name: 'Motherboard', sameAs: 'https://en.wikipedia.org/wiki/Motherboard', matchRegex: /\b(motherboard|chipset|vrm|b650|x670|z790|bios|cmos)\b/i },
    { name: 'Computer Cooling', sameAs: 'https://en.wikipedia.org/wiki/Computer_cooling', matchRegex: /\b(cooler|aio|liquid cooling|heatpipe|thermal paste|thermals)\b/i },
    { name: 'Windows 11', sameAs: 'https://en.wikipedia.org/wiki/Windows_11', matchRegex: /\b(windows 11|microsoft windows|operating system|task manager)\b/i },
];

function getRelevantEntities(text: string) {
    return HARDWARE_ENTITIES.filter((entity) => entity.matchRegex.test(text)).map((entity) => ({
        '@type': 'Thing',
        name: entity.name,
        sameAs: entity.sameAs,
    }));
}

function extractKeyTakeaways(content: string, description: string): string[] {
    const takeaways: string[] = [];
    const bulletMatches = content.slice(0, 3000).match(/^[*-]\s+(.+)$/gm);
    if (bulletMatches && bulletMatches.length >= 3) {
        for (const b of bulletMatches.slice(0, 3)) {
            const clean = b.replace(/^[*-]\s+/, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
            if (clean.length > 20 && clean.length < 160) {
                takeaways.push(clean);
            }
        }
    }
    if (takeaways.length < 3) {
        const sentences = description.split(/\.\s+/).filter((s) => s.trim().length > 15);
        for (const s of sentences) {
            if (takeaways.length < 3) takeaways.push(s.trim().replace(/\.$/, ''));
        }
    }
    if (takeaways.length < 3) {
        const headingMatches = content.match(/^##\s+(.+)$/gm);
        if (headingMatches) {
            for (const h of headingMatches.slice(0, 3 - takeaways.length)) {
                takeaways.push(h.replace(/^##\s+/, '').trim());
            }
        }
    }
    return takeaways.slice(0, 3);
}

// Image SEO & LCP: Eager load primary hero images for fast LCP (Google Discover score), lazy load subsequent images
renderer.image = function (href: string, title: string | null, text: string) {
    const titleAttr = title ? ` title="${title}"` : '';
    const isHero = href.includes('/images/posts/') || href.includes('default-hero') || (text && text.toLowerCase().includes('hero'));
    if (isHero) {
        return `<img src="${href}" alt="${text || 'Zyrox Hardware Guide'}"${titleAttr} fetchpriority="high" loading="eager" decoding="async" width="1200" height="675" />`;
    }
    return `<img src="${href}" alt="${text || 'Zyrox Hardware Guide'}"${titleAttr} loading="lazy" decoding="async" />`;
};

marked.use({ renderer });

// Client-only components — must not SSR (they use localStorage or browser APIs)
const ReadingProgress = dynamic(
    () => import('@/components/reading-progress').then((m) => ({ default: m.ReadingProgress })),
    { ssr: false },
);
const TableOfContents = dynamic(
    () => import('@/components/table-of-contents').then((m) => ({ default: m.TableOfContents })),
    { ssr: false },
);
const HelpfulVote = dynamic(
    () => import('@/components/helpful-vote').then((m) => ({ default: m.HelpfulVote })),
    { ssr: false },
);
const ReadingListToggle = dynamic(
    () => import('@/components/reading-list-toggle').then((m) => ({ default: m.ReadingListToggle })),
    { ssr: false },
);
const AdBanner = dynamic(
    () => import('@/components/ad-banner').then((m) => ({ default: m.AdBanner })),
    { ssr: false },
);
const MidArticleAdInjector = dynamic(
    () => import('@/components/ad-banner').then((m) => ({ default: m.MidArticleAdInjector })),
    { ssr: false },
);

function toAbsoluteImageUrl(imagePath?: string): string {
    if (!imagePath) return 'https://zyroxlab.com/images/og-default.png';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `https://zyroxlab.com${cleanPath}`;
}

export async function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);
    if (!post) return {};

    const author = getAuthorBySlug(post.author);
    const imageUrl = toAbsoluteImageUrl(post.image);
    const storySlug = STORY_MAP[params.slug];

    return {
        title: post.title,
        description: post.meta_description,
        keywords: post.keywords,
        alternates: {
            canonical: `/posts/${params.slug}/`,
        },
        other: storySlug
            ? {
                amphtml: `https://zyroxlab.com/stories/${storySlug}/`,
            }
            : undefined,
        openGraph: {
            title: post.title,
            description: post.meta_description,
            type: 'article',
            url: `/posts/${params.slug}/`,
            siteName: 'Zyrox',
            publishedTime: post.date,
            modifiedTime: post.updated,
            authors: author ? [author.name] : ['Zyrox Editorial Team'],
            section: post.category,
            tags: post.tags,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 675,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.meta_description,
            site: '@zyrox',
            creator: '@zyrox',
            images: [imageUrl],
        },
        authors: author ? [{ name: author.name }] : undefined,
    };
}

export default function PostPage({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);
    if (!post) notFound();

    const author = getAuthorBySlug(post.author);
    const allPosts = getAllPosts();

    // Image SEO: Dynamically replace generic "Hero Image" alt text with keyword-rich post title
    const heroAlt = `${post.title} — Zyrox Hardware Guide`;
    const processedMarkdown = post.content.replace(
        /!\[(Hero Image|hero image|Hero)\]\(([^)]+)\)/g,
        `![${heroAlt}]($2)`
    );

    const rawHtml = marked.parse(processedMarkdown);
    // Inject contextual internal guide link (highest PageRank weight in Google)
    const withInternalLink = injectContextualInternalLink(rawHtml as string, post, allPosts);
    // Inject mid-article ads
    const contentHtml = injectMidArticleAds(withInternalLink);

    // SEO: Reading time calculation
    const readingTime = calculateReadingTime(post.content);

    // SEO: FAQ Schema — extract question-like headings from content
    const faqItems = extractFAQItems(post.content);
    const faqSchema = buildFAQSchema(faqItems);

    // SEO: HowTo Schema — only for "How to" titled posts
    const isHowTo = /^how\s+to\s/i.test(post.title);
    const howToSteps = isHowTo ? extractHowToSteps(post.content) : [];
    const howToSchema = isHowTo ? buildHowToSchema(post.title, post.meta_description, howToSteps, readingTime) : null;

    const imageUrl = toAbsoluteImageUrl(post.image);
    const entities = getRelevantEntities(`${post.title} ${post.meta_description} ${post.keywords.join(' ')}`);
    const keyTakeaways = extractKeyTakeaways(post.content, post.meta_description);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.meta_description,
        image: [imageUrl],
        about: entities.slice(0, 3),
        mentions: entities.slice(3, 6),
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.article-excerpt', '.key-takeaways-list'],
        },
        author: author
            ? {
                '@type': 'Person',
                name: author.name,
                jobTitle: author.role,
                url: `https://zyroxlab.com/authors/${author.slug}/`,
                knowsAbout: author.expertise,
            }
            : {
                '@type': 'Organization',
                name: 'Zyrox',
            },
        publisher: {
            '@type': 'Organization',
            name: 'Zyrox',
            url: 'https://zyroxlab.com',
            logo: {
                '@type': 'ImageObject',
                url: 'https://zyroxlab.com/logo.png',
            },
        },
        datePublished: post.date,
        dateModified: post.updated,
        keywords: post.keywords.join(', '),
        articleSection: post.category,
        wordCount: post.content.trim().split(/\s+/).length,
        timeRequired: `PT${readingTime}M`,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://zyroxlab.com/posts/${params.slug}/`,
        },
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://zyroxlab.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: post.title,
                item: `https://zyroxlab.com/posts/${params.slug}/`,
            },
        ],
    };

    return (
        <main className="article-content">
            <ReadingProgress />
            <div className="container">
                <div className="article-layout">
                    <div className="article-main">
                        <Breadcrumb
                            items={[
                                { name: 'Home', href: '/' },
                                { name: post.title, href: `/posts/${params.slug}/` }
                            ]}
                        />
                        <article className="article-card">
                            <div className="post-meta post-meta-row">
                                <span>
                                    Published {post.date}
                                    {post.updated !== post.date && ` • Updated ${post.updated}`}
                                    {' • '}
                                    <span className="reading-time-badge">{readingTime} min read</span>
                                </span>
                                <ReadingListToggle slug={params.slug} title={post.title} />
                            </div>
                            {STORY_MAP[params.slug] && (
                                <div className="web-story-banner">
                                    <a
                                        href={`/stories/${STORY_MAP[params.slug]}/`}
                                        className="web-story-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="View interactive Google Web Story"
                                    >
                                        <span className="web-story-icon">⚡</span>
                                        <span className="web-story-text">
                                            <strong>Visual Story Available:</strong> Tap to view the full-screen interactive story
                                        </span>
                                        <span className="web-story-arrow">Open Story →</span>
                                    </a>
                                </div>
                            )}
                            <h1>{post.title}</h1>
                            <p className="article-excerpt">{post.meta_description}</p>

                            {author && (
                                <div className="article-author-byline">
                                    <Link href={`/authors/${author.slug}/`} className="byline-avatar" aria-label={`View ${author.name}'s profile`}>
                                        {author.avatar}
                                    </Link>
                                    <div>
                                        <span className="byline-label">By </span>
                                        <Link href={`/authors/${author.slug}/`} className="byline-name">
                                            {author.name}
                                        </Link>
                                        <span className="byline-role"> · {author.role}</span>
                                    </div>
                                </div>
                            )}

                            {keyTakeaways.length > 0 && (
                                <div className="key-takeaways-box">
                                    <div className="key-takeaways-header">
                                        <span className="key-takeaways-icon">⚡</span>
                                        <strong>Key Takeaways</strong>
                                    </div>
                                    <ul className="key-takeaways-list">
                                        {keyTakeaways.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Ad 1: top of article */}
                            <AdBanner />

                            <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                            />
                            <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                            />
                            {faqSchema && (
                                <script
                                    type="application/ld+json"
                                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                                />
                            )}
                            {howToSchema && (
                                <script
                                    type="application/ld+json"
                                    dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
                                />
                            )}

                            {/* Article body with mid-article ad injected after 4th paragraph */}
                            <div className="article-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />
                            <MidArticleAdInjector />

                            {/* Ad 3: bottom of article */}
                            <AdBanner />

                            {/* SEO: Clickable tags for internal linking */}
                            <PostTags post={post} />

                            <HelpfulVote slug={params.slug} />

                            <hr className="article-divider" />

                            {author && (
                                <div className="article-author-box">
                                    <AuthorCard author={author} variant="compact" />
                                </div>
                            )}

                            {/* Ad 4: after author box */}
                            <AdBanner />

                            <Link href="/" className="post-link" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
                                ← Back to home
                            </Link>
                        </article>

                        <RelatedPosts currentPost={post} allPosts={allPosts} />
                    </div>
                    <aside className="article-sidebar">
                        <TableOfContents content={post.content} />
                    </aside>
                </div>
            </div>
        </main>
    );
}
