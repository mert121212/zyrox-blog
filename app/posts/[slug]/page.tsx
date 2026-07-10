import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { getAuthorBySlug } from '@/lib/authors';
import { AuthorCard } from '@/components/author-card';

export async function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
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
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.meta_description,
        },
        authors: author ? [{ name: author.name }] : undefined,
    };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);
    if (!post) notFound();

    const author = getAuthorBySlug(post.author);
    const contentHtml = marked.parse(post.content);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.meta_description,
        author: author
            ? {
                '@type': 'Person',
                name: author.name,
                url: `https://zyrox.com/authors/${author.slug}`,
            }
            : {
                '@type': 'Organization',
                name: 'Zyrox',
            },
        publisher: {
            '@type': 'Organization',
            name: 'Zyrox',
        },
        datePublished: post.date,
        keywords: post.tags.join(', '),
        articleSection: post.category,
    };

    return (
        <main className="article-content">
            <div className="container">
                <article className="article-card">
                    <div className="post-meta">{post.category} • {post.date}</div>
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

                    <div className="article-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />

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
            </div>
        </main>
    );
}
