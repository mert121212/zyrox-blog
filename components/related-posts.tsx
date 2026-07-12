import Link from 'next/link';
import type { Post } from '@/lib/posts';

interface RelatedPostsProps {
    currentPost: Post;
    allPosts: Post[];
    limit?: number;
}

export function RelatedPosts({ currentPost, allPosts, limit = 3 }: RelatedPostsProps) {
    const relatedPosts = allPosts
        .filter(post => 
            post.slug !== currentPost.slug && 
            (post.category === currentPost.category || 
             post.tags.some(tag => currentPost.tags.includes(tag)))
        )
        .sort((a, b) => {
            // Önce aynı kategoridekileri önceliklendir
            if (a.category === currentPost.category && b.category !== currentPost.category) return -1;
            if (b.category === currentPost.category && a.category !== currentPost.category) return 1;
            // Sonra tarihe göre sırala
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        .slice(0, limit);

    if (relatedPosts.length === 0) return null;

    return (
        <section className="related-posts-section">
            <h2 className="related-posts-heading">Related Articles</h2>
            <div className="related-posts-grid">
                {relatedPosts.map((post) => (
                    <Link 
                        key={post.slug} 
                        href={`/posts/${post.slug}`} 
                        className="related-post-card"
                    >
                        <div className="related-post-meta">{post.category} • {post.date}</div>
                        <h3 className="related-post-title">{post.title}</h3>
                        <p className="related-post-excerpt">{post.excerpt}</p>
                        <span className="related-post-link">Read article →</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
