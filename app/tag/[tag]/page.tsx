import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByTag, getTags } from '@/lib/posts';

export function generateStaticParams() {
    return getTags().map((tag) => ({ tag }));
}

export function generateMetadata({ params }: { params: { tag: string } }) {
    return {
        title: `#${params.tag} Articles`,
        description: `Browse articles tagged ${params.tag} on Zyrox.`,
    };
}

export default function TagPage({ params }: { params: { tag: string } }) {
    const posts = getPostsByTag(params.tag);
    if (!posts.length) notFound();

    return (
        <main className="page-shell">
            <div className="container">
                <h1>#{params.tag}</h1>
                <p>Articles related to {params.tag}.</p>
                <div className="grid" style={{ marginTop: '1.4rem' }}>
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
            </div>
        </main>
    );
}
