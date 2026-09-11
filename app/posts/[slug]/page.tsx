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

// Image SEO: Automatic lazy loading, async decoding, and descriptive alt fallback
renderer.image = function (href: string, title: string | null, text: string) {
    const titleAttr = title ? ` title="${title}"` : '';
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

    return {
        title: post.title,
        description: post.meta_description,
        keywords: post.keywords,
        alternates: {
            canonical: `/posts/${params.slug}/`,
        },
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

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.meta_description,
        image: [imageUrl],
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
