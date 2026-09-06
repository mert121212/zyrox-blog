import Link from 'next/link';
import type { Post } from '@/lib/posts';

interface RelatedPostsProps {
    currentPost: Post;
    allPosts: Post[];
    limit?: number;
}

import { getRelevanceScore } from '@/lib/internal-links';

export function RelatedPosts({ currentPost, allPosts, limit = 4 }: RelatedPostsProps) {
    const scored = allPosts
        .filter(post => post.slug !== currentPost.slug)
        .map(post => ({
            post,
            score: getRelevanceScore(post, currentPost),
        }))
        .sort((a, b) => {
            // Primary: relevance score
            if (b.score !== a.score) return b.score - a.score;
            // Secondary: recency
            return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
        })
        .slice(0, limit);

    if (scored.length === 0) return null;

    return (
        <section className="related-posts-section">
            <h2 className="related-posts-heading">Related Articles</h2>
            <div className="related-posts-grid">
                {scored.map(({ post }) => (
                    <Link
                        key={post.slug}
                        href={`/posts/${post.slug}/`}
                        className="related-post-card"
                    >
                        <div className="related-post-meta">
                            <span>{post.date}</span>
                            <span className="related-post-category">{post.category}</span>
                        </div>
                        <h3 className="related-post-title">{post.title}</h3>
                        <p className="related-post-excerpt">{post.excerpt}</p>
                        <span className="related-post-link">Read article →</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
