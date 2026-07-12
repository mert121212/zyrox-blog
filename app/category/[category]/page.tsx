import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getPostsByCategory } from '@/lib/posts';

export function generateStaticParams() {
    return getCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    return {
        title: `${category} Articles`,
        description: `Browse ${category} articles on Zyrox.`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const posts = getPostsByCategory(category);
    if (!posts.length) notFound();

    return (
        <main className="page-shell">
            <div className="container">
                <h1>{category}</h1>
                <p>Practical articles focused on {category.toLowerCase()}.</p>
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
