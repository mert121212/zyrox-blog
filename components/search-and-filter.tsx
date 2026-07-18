'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Post } from '@/lib/posts';
import { authors } from '@/lib/authors';

type SortOption = 'newest' | 'oldest' | 'az';

const SORT_LABELS: Record<SortOption, string> = {
    newest: 'Newest first',
    oldest: 'Oldest first',
    az: 'A – Z',
};

const TAG_VISIBLE_INITIAL = 12;

// Static lookup maps — built once at module level, never change
const AUTHOR_NAME: Record<string, string> = Object.fromEntries(
    authors.map((a) => [a.slug, a.name]),
);
const AUTHOR_AVATAR: Record<string, string> = Object.fromEntries(
    authors.map((a) => [a.slug, a.avatar]),
);

export function SearchAndFilter({ posts }: { posts: Post[] }) {
    // ── ALL hooks must be called unconditionally at the top ───
    const [query, setQuery] = useState('');
    const [activeTag, setActiveTag] = useState('All');
    const [sort, setSort] = useState<SortOption>('newest');
    const [visibleCount, setVisibleCount] = useState(12);
    const [showAllTags, setShowAllTags] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setVisibleCount(12);
    }, [activeTag, query, sort]);

    const allTags = useMemo(
        () => Array.from(new Set(posts.flatMap((p) => p.tags))).sort(),
        [posts],
    );

    const filteredPosts = useMemo(() => {
        const q = query.trim().toLowerCase();
        let result = posts.filter((post) => {
            const haystack = `${post.title} ${post.meta_description} ${post.tags.join(' ')} ${AUTHOR_NAME[post.author] ?? ''}`.toLowerCase();
            const matchesQuery = !q || haystack.includes(q);
            const matchesTag = activeTag === 'All' || post.tags.includes(activeTag);
            return matchesQuery && matchesTag;
        });
        if (sort === 'oldest') result = [...result].reverse();
        else if (sort === 'az') result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        return result;
    }, [activeTag, posts, query, sort]);

    // ── Derived values (not hooks) ────────────────────────────
    const visibleTags = showAllTags ? allTags : allTags.slice(0, TAG_VISIBLE_INITIAL);
    const hasHiddenTags = allTags.length > TAG_VISIBLE_INITIAL;
    const visiblePosts = filteredPosts.slice(0, visibleCount);
    const hasMorePosts = filteredPosts.length > visiblePosts.length;
    const activeFilterCount = [
        activeTag !== 'All',
        query.trim() !== '',
        sort !== 'newest',
    ].filter(Boolean).length;

    function clearAll() {
        setQuery('');
        setActiveTag('All');
        setSort('newest');
        inputRef.current?.focus();
    }

    return (
        <>
            {/* ── Search panel ───────────────────────────────── */}
            <div className="search-panel">

                {/* Search row */}
                <div className="search-row">
                    <div className="search-input-wrap">
                        <svg className="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
                            <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        <input
                            ref={inputRef}
                            id="site-search"
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search articles — try NVMe, cooling, PSU…"
                            aria-label="Search articles"
                            autoComplete="off"
                            spellCheck={false}
                        />
                        {query && (
                            <button
                                type="button"
                                className="search-clear"
                                onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                                aria-label="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="sort-wrap">
                        <label htmlFor="sort-select" className="sr-only">Sort by</label>
                        <select
                            id="sort-select"
                            className="sort-select"
                            value={sort}
                            onChange={(e) => setSort(e.target.value as SortOption)}
                        >
                            {(Object.keys(SORT_LABELS) as SortOption[]).map((k) => (
                                <option key={k} value={k}>{SORT_LABELS[k]}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Tag filters temporarily removed */}

                {/* Active filters bar */}
                {activeFilterCount > 0 && (
                    <div className="active-filters-bar">
                        <span className="active-filters-label">
                            {activeFilterCount > 0 && `Filters active: `}
                            {query && <span className="active-filter-chip">"{query}"</span>}
                            {sort !== 'newest' && <span className="active-filter-chip">{SORT_LABELS[sort]}</span>}
                        </span>
                        <button type="button" className="clear-filters-btn" onClick={clearAll}>
                            Clear all
                        </button>
                    </div>
                )}
            </div>

            {/* ── Results meta ───────────────────────────────── */}
            <p className="results-meta">
                {filteredPosts.length === 0
                    ? 'No articles match.'
                    : `${filteredPosts.length} article${filteredPosts.length === 1 ? '' : 's'} found`}
                {filteredPosts.length > 0 && visiblePosts.length < filteredPosts.length &&
                    ` — showing ${visiblePosts.length}`}
            </p>

            {/* ── Article grid ───────────────────────────────── */}
            {filteredPosts.length > 0 ? (
                <>
                    <div className="grid">
                        {visiblePosts.map((post) => (
                            <article key={post.slug} className="post-card">
                                <div className="post-meta">{post.date}</div>
                                <h3>{post.title}</h3>
                                <p>{post.excerpt}</p>
                                <div className="post-card-footer">
                                    {AUTHOR_NAME[post.author] && (
                                        <Link
                                            href={`/authors/${post.author}`}
                                            className="post-card-author"
                                            onClick={(e) => e.stopPropagation()}
                                            aria-label={`Articles by ${AUTHOR_NAME[post.author]}`}
                                        >
                                            <span className="post-card-avatar" aria-hidden="true">
                                                {AUTHOR_AVATAR[post.author]}
                                            </span>
                                            <span>{AUTHOR_NAME[post.author]}</span>
                                        </Link>
                                    )}
                                    <Link href={`/posts/${post.slug}`} className="post-link">
                                        Read →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {hasMorePosts && (
                        <div className="load-more-wrap">
                            <button
                                type="button"
                                className="btn btn--secondary"
                                onClick={() => setVisibleCount((c) => c + 12)}
                            >
                                Show 12 more
                                <span className="load-more-count">
                                    ({filteredPosts.length - visibleCount} remaining)
                                </span>
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="post-card empty-state">
                    <h3>No articles match.</h3>
                    <p>
                        Try a broader search term, or clear the active filter.
                        {' '}<button type="button" className="inline-reset-btn" onClick={clearAll}>Reset all filters</button>
                    </p>
                </div>
            )}
        </>
    );
}
