'use client';

import Link from 'next/link';
import type { Post } from '@/lib/posts';

interface PostTagsProps {
    post: Post;
}

export function PostTags({ post }: PostTagsProps) {
    if (!post.tags || post.tags.length === 0) return null;

    return (
        <div className="post-tags">
            <span className="post-tags__label">Topics:</span>
            <div className="post-tags__list">
                {post.tags.map((tag) => (
                    <Link
                        key={tag}
                        href={`/#latest`}
                        className="post-tags__tag"
                        title={`Browse more articles about ${tag}`}
                    >
                        {tag}
                    </Link>
                ))}
                {post.category && (
                    <Link
                        href={`/#topics`}
                        className="post-tags__tag post-tags__tag--category"
                        title={`Browse ${post.category} category`}
                    >
                        {post.category}
                    </Link>
                )}
            </div>
        </div>
    );
}
