import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllAuthors, getAuthorBySlug } from '@/lib/authors';
import { getPostsByAuthor } from '@/lib/posts';
import { AuthorCard } from '@/components/author-card';

export function generateStaticParams() {
    return getAllAuthors().map((author) => ({ slug: author.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const author = getAuthorBySlug(params.slug);
    if (!author) return {};
    return {
        title: `${author.name} — ${author.role} | Zyrox`,
        description: author.bio,
        alternates: { canonical: `/authors/${params.slug}/` },
        openGraph: {
            title: `${author.name} — ${author.role} | Zyrox`,
            description: author.bio,
            type: 'profile',
            images: [
                {
                    url: 'https://zyroxlab.com/images/og-default.png',
                    width: 1200,
                    height: 630,
                    alt: `${author.name} — Zyrox Hardware Editorial Team`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${author.name} — ${author.role}`,
            description: author.bio,
            images: ['https://zyroxlab.com/images/og-default.png'],
        },
    };
}

export default function AuthorPage({ params }: { params: { slug: string } }) {
    const author = getAuthorBySlug(params.slug);
    if (!author) notFound();

    const posts = getPostsByAuthor(author.slug);

    const profileJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        dateCreated: '2026-06-27T00:00:00.000Z',
        mainEntity: {
            '@type': 'Person',
            name: author.name,
            jobTitle: author.role,
            description: author.bio,
            knowsAbout: author.expertise,
            worksFor: {
                '@type': 'Organization',
                name: 'Zyrox',
                url: 'https://zyroxlab.com',
            },
            url: `https://zyroxlab.com/authors/${author.slug}/`,
            sameAs: author.social.twitter ? [author.social.twitter] : [],
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
                name: 'Authors',
                item: 'https://zyroxlab.com/authors/',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: author.name,
                item: `https://zyroxlab.com/authors/${author.slug}/`,
            },
        ],
    };

    return (
        <main className="page-shell">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <div className="container">
                <div className="author-page-header card" style={{ marginBottom: '2rem' }}>
                    <p className="hero__eyebrow" style={{ marginBottom: '1.25rem' }}>Editorial Team</p>
                    <AuthorCard author={author} articleCount={posts.length} variant="full" />
                </div>

                {posts.length > 0 && (
                    <section>
                        <h2 className="author-articles-heading">
                            Articles by {author.name}
                        </h2>
                        <div className="grid" style={{ marginTop: '1.2rem' }}>
                            {posts.map((post) => (
                                <article key={post.slug} className="post-card">
                                    <div className="post-meta">{post.date}</div>
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <Link href={`/posts/${post.slug}/`} className="post-link">
                                        Read article →
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                <div style={{ marginTop: '2rem' }}>
                    <Link href="/authors/" className="post-link">← All editorial team</Link>
                </div>
            </div>
        </main>
    );
}
