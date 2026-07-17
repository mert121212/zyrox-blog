'use client';

import Link from 'next/link';
import { useReadingList } from '@/lib/engagement/use-engagement';

export function ReadingListView() {
    const { items, hydrated, remove, clear } = useReadingList();

    if (!hydrated) {
        return <div className="rl-empty">Loading your reading list…</div>;
    }

    if (items.length === 0) {
        return (
            <div className="rl-empty">
                <p style={{ marginBottom: '0.4rem' }}>You haven&apos;t saved any articles yet.</p>
                <p style={{ marginBottom: '1.2rem' }}>
                    Tap the <span className="rl-toggle" data-active="false" style={{ pointerEvents: 'none' }}>
                        <span className="star" aria-hidden="true">☆</span><span>Save</span>
                    </span> button on any article to add it here.
                </p>
                <Link href="/" className="post-link">← Browse all articles</Link>
            </div>
        );
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <p style={{ color: 'var(--muted)', margin: 0 }}>
                    {items.length} saved article{items.length === 1 ? '' : 's'}
                </p>
                <button
                    type="button"
                    onClick={clear}
                    className="inline-reset-btn"
                    aria-label="Clear reading list"
                >
                    Clear all
                </button>
            </div>
            <div className="rl-grid">
                {items.map((item) => (
                    <article key={item.slug} className="post-card">
                        <div className="post-meta">{item.category}</div>
                        <h2 style={{ fontSize: '1.1rem', margin: '0.3rem 0 0.5rem' }}>
                            <Link href={`/posts/${item.slug}`} style={{ color: 'var(--text)' }}>
                                {item.title}
                            </Link>
                        </h2>
                        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', margin: 0 }}>
                            Saved {new Date(item.addedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                        <div className="post-card-footer" style={{ marginTop: '0.8rem' }}>
                            <Link href={`/posts/${item.slug}`} className="post-link">Read article →</Link>
                            <button
                                type="button"
                                onClick={() => remove(item.slug)}
                                className="inline-reset-btn"
                                aria-label={`Remove ${item.title} from reading list`}
                            >
                                Remove
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </>
    );
}
