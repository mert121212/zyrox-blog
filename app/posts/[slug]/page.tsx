import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import dynamic from 'next/dynamic';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { getAuthorBySlug } from '@/lib/authors';
import { AuthorCard } from '@/components/author-card';
import { Breadcrumb } from '@/components/breadcrumb';
import { RelatedPosts } from '@/components/related-posts';
import { injectMidArticleAd } from '@/lib/ads';

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

export async function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);
    if (!post) return {};

    const author = getAuthorBySlug(post.author);

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
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.meta_description,
            site: '@zyrox',
            creator: '@zyrox',
        },
        authors: author ? [{ name: author.name }] : undefined,
    };
}

export default function PostPage({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);
    if (!post) notFound();

    const author = getAuthorBySlug(post.author);
    const rawHtml = marked.parse(post.content);
    // Inject a mid-article ad after the 4th paragraph
    const contentHtml = injectMidArticleAd(rawHtml as string, 4);
    const allPosts = getAllPosts();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.meta_description,
        author: author
            ? {
                '@type': 'Person',
                name: author.name,
                url: `https://zyroxlab.com/authors/${author.slug}/`,
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

                            {/* Article body with mid-article ad injected after 4th paragraph */}
                            <div className="article-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />
                            <MidArticleAdInjector />

                            {/* Ad 3: bottom of article */}
                            <AdBanner />

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
                        {/* Ad: sidebar */}
                        <div style={{ marginTop: '2rem' }}>
                            <AdBanner dataAdFormat="rectangle" />
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
