import Link from 'next/link';
import type { Post } from '@/lib/posts';

interface RelatedPostsProps {
    currentPost: Post;
    allPosts: Post[];
    limit?: number;
}

export function RelatedPosts({ currentPost, allPosts, limit = 3 }: RelatedPostsProps) {
    const finalPosts = allPosts
        .filter(post => post.slug !== currentPost.slug && post.category === currentPost.category)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);

    if (finalPosts.length < limit) {
        const fallbackPosts = allPosts
            .filter(post => post.slug !== currentPost.slug && !finalPosts.some(fp => fp.slug === post.slug))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, limit - finalPosts.length);
        finalPosts.push(...fallbackPosts);
    }

    if (finalPosts.length === 0) return null;

    return (
        <section className="related-posts-section">
            <h2 className="related-posts-heading">Related Articles</h2>
            <div className="related-posts-grid">
                {finalPosts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/posts/${post.slug}`}
                        className="related-post-card"
                    >
                        <div className="related-post-meta">{post.date}</div>
                        <h3 className="related-post-title">{post.title}</h3>
                        <p className="related-post-excerpt">{post.excerpt}</p>
                        <span className="related-post-link">Read article →</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
