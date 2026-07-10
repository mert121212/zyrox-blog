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
        title: `${author.name} — ${author.role}`,
        description: author.bio,
        alternates: { canonical: `/authors/${params.slug}` },
        openGraph: {
            title: `${author.name} | Zyrox`,
            description: author.bio,
            type: 'profile',
        },
    };
}

export default function AuthorPage({ params }: { params: { slug: string } }) {
    const author = getAuthorBySlug(params.slug);
    if (!author) notFound();

    const posts = getPostsByAuthor(author.slug);

    return (
        <main className="page-shell">
            <div className="container">
                <div className="author-page-header card" style={{ marginBottom: '2rem' }}>
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
                                    <div className="post-meta">{post.category} • {post.date}</div>
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <Link href={`/posts/${post.slug}`} className="post-link">
                                        Read article →
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                <div style={{ marginTop: '2rem' }}>
                    <Link href="/authors" className="post-link">← All authors</Link>
                </div>
            </div>
        </main>
    );
}
