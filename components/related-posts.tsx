import Link from 'next/link';
import type { Post } from '@/lib/posts';

interface RelatedPostsProps {
    currentPost: Post;
    allPosts: Post[];
    limit?: number;
}

export function RelatedPosts({ currentPost, allPosts, limit = 3 }: RelatedPostsProps) {
    const currentTags = new Set(currentPost.tags);

    const relatedPosts = allPosts
        .filter(post => post.slug !== currentPost.slug)
        .map(post => ({
            post,
            overlap: post.tags.filter(tag => currentTags.has(tag)).length,
        }))
        .filter(({ overlap }) => overlap > 0)
        .sort((a, b) => {
            // Önce tag kesişim sayısına göre, eşitse en yeni kazanır
            if (a.overlap !== b.overlap) return b.overlap - a.overlap;
            return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
        })
        .slice(0, limit)
        .map(({ post }) => post);

    // Fallback: tag overlap yoksa en yeni yazıları öner
    const finalPosts = relatedPosts.length > 0
        ? relatedPosts
        : allPosts
            .filter(post => post.slug !== currentPost.slug)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, limit);

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
