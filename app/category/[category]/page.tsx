import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getPostsByCategory } from '@/lib/posts';

export function generateStaticParams() {
    // Encode category names that contain spaces or special characters
    // so the dynamic segment matches the URL the browser navigates to.
    return getCategories().map((category) => ({
        category: encodeURIComponent(category),
    }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
    const decoded = decodeURIComponent(params.category);
    return {
        title: `${decoded} Articles`,
        description: `Browse ${decoded} articles on Zyrox.`,
        alternates: { canonical: `/category/${encodeURIComponent(decoded)}` },
    };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
    // URL segments are URL-encoded by Next.js — decode so we can match
    // the raw category string stored in frontmatter (e.g. "Hardware Troubleshooting").
    const category = decodeURIComponent(params.category);
    const posts = getPostsByCategory(category);
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
