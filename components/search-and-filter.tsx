'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Post } from '@/lib/posts';

export function SearchAndFilter({ posts }: { posts: Post[] }) {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeTag, setActiveTag] = useState('All');
    const [visibleCount, setVisibleCount] = useState(10);

    const categories = useMemo(
        () => ['All', ...Array.from(new Set(posts.map((post) => post.category)))],
        [posts],
    );

    const tags = useMemo(
        () => ['All', ...Array.from(new Set(posts.flatMap((post) => post.tags)))],
        [posts],
    );

    const filteredPosts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return posts.filter((post) => {
            const haystack = `${post.title} ${post.meta_description} ${post.content} ${post.tags.join(' ')}`.toLowerCase();
            const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
            const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
            const matchesTag = activeTag === 'All' || post.tags.includes(activeTag);

            return matchesQuery && matchesCategory && matchesTag;
        });
    }, [activeCategory, activeTag, posts, query]);

    const visiblePosts = filteredPosts.slice(0, visibleCount);
    const hasMorePosts = filteredPosts.length > visiblePosts.length;

    useEffect(() => {
        setVisibleCount(10);
    }, [activeCategory, activeTag, query]);

    return (
        <>
            <div className="search-panel">
                <label className="search-box" htmlFor="site-search">
                    <span>Search articles</span>
                    <input
                        id="site-search"
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Try NVMe, cooling, PSU, BIOS..."
                    />
                </label>

                <div className="filter-group">
                    <p className="filter-label">Categories</p>
                    <div className="pill-row">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                className={`pill ${activeCategory === category ? 'pill--active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <p className="filter-label">Tags</p>
                    <div className="pill-row">
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                className={`pill ${activeTag === tag ? 'pill--active' : ''}`}
                                onClick={() => setActiveTag(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <p className="results-meta">Showing {visiblePosts.length} of {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}.</p>

            {filteredPosts.length > 0 ? (
                <>
                    <div className="grid">
                        {visiblePosts.map((post) => (
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

                    {hasMorePosts && (
                        <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                            <button
                                type="button"
                                className="btn btn--secondary"
                                onClick={() => setVisibleCount((count) => count + 10)}
                            >
                                Show 10 more
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="post-card empty-state">
                    <h3>No articles match that filter.</h3>
                    <p>Try a broader search term or clear one of the active filters.</p>
                </div>
            )}
        </>
    );
}
