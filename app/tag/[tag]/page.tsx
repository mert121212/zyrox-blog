import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByTag, getTags } from '@/lib/posts';

export function generateStaticParams() {
    return getTags().map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export function generateMetadata({ params }: { params: { tag: string } }) {
    const decoded = decodeURIComponent(params.tag);
    return {
        title: `#${decoded} Articles`,
        description: `Browse articles tagged ${decoded} on Zyrox.`,
        alternates: { canonical: `/tag/${encodeURIComponent(decoded)}` },
    };
}

export default function TagPage({ params }: { params: { tag: string } }) {
    const tag = decodeURIComponent(params.tag);
    const posts = getPostsByTag(tag);
    if (!posts.length) notFound();

    return (
        <main className="page-shell">
            <div className="container">
                <h1>#{tag}</h1>
                <p>Articles related to {tag}.</p>
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
