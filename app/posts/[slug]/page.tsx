import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { getAuthorBySlug } from '@/lib/authors';
import { AuthorCard } from '@/components/author-card';
import { ReadingProgress } from '@/components/reading-progress';
import { RelatedPosts } from '@/components/related-posts';
import { Breadcrumb } from '@/components/breadcrumb';
import { TableOfContents } from '@/components/table-of-contents';
import { HelpfulVote } from '@/components/helpful-vote';
import { ReadingListToggle } from '@/components/reading-list-toggle';

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
            canonical: `/posts/${params.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.meta_description,
            type: 'article',
            url: `/posts/${params.slug}`,
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
    const contentHtml = marked.parse(post.content);
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
                url: `https://zyroxnet.netlify.app/authors/${author.slug}`,
            }
            : {
                '@type': 'Organization',
                name: 'Zyrox',
            },
        publisher: {
            '@type': 'Organization',
            name: 'Zyrox',
            url: 'https://zyroxnet.netlify.app',
            logo: {
                '@type': 'ImageObject',
                url: 'https://zyroxnet.netlify.app/logo.png',
            },
        },
        datePublished: post.date,
        dateModified: post.updated,
        keywords: post.tags.join(', '),
        articleSection: post.category,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://zyroxnet.netlify.app/posts/${params.slug}`,
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
                item: 'https://zyroxnet.netlify.app',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: post.category,
                item: `https://zyroxnet.netlify.app/category/${post.category}`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://zyroxnet.netlify.app/posts/${params.slug}`,
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
                                { name: post.category, href: `/category/${encodeURIComponent(post.category)}` },
                                { name: post.title, href: `/posts/${params.slug}` }
                            ]}
                        />
                        <article className="article-card">
                    <div className="post-meta post-meta-row">
                        <span>
                            {post.category} • Published {post.date}
                            {post.updated !== post.date && ` • Updated ${post.updated}`}
                        </span>
                        <ReadingListToggle slug={params.slug} title={post.title} category={post.category} />
                    </div>
                    <h1>{post.title}</h1>
                    <p className="article-excerpt">{post.meta_description}</p>

                    {author && (
                        <div className="article-author-byline">
                            <Link href={`/authors/${author.slug}`} className="byline-avatar" aria-label={`View ${author.name}'s profile`}>
                                {author.avatar}
                            </Link>
                            <div>
                                <span className="byline-label">By </span>
                                <Link href={`/authors/${author.slug}`} className="byline-name">
                                    {author.name}
                                </Link>
                                <span className="byline-role"> · {author.role}</span>
                            </div>
                        </div>
                    )}

                    <div className="pill-row" style={{ marginBottom: '1.5rem' }}>
                        {post.tags.map((tag) => (
                            <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`} className="pill">
                                {tag}
                            </Link>
                        ))}
                    </div>

                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                    />

                    <div className="article-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />

                    <HelpfulVote slug={params.slug} />

                    <hr className="article-divider" />

                    {author && (
                        <div className="article-author-box">
                            <AuthorCard author={author} variant="compact" />
                        </div>
                    )}

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
