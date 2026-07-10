import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getPostsByCategory } from '@/lib/posts';

export function generateStaticParams() {
    return getCategories().map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
    return {
        title: `${params.category} Articles`,
        description: `Browse ${params.category} articles on Zyrox.`,
    };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
    const posts = getPostsByCategory(params.category);
    if (!posts.length) notFound();

    return (
        <main className="page-shell">
            <div className="container">
                <h1>{params.category}</h1>
                <p>Practical articles focused on {params.category.toLowerCase()}.</p>
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
