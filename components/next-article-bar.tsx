'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NextArticleBarProps {
    nextPost: {
        slug: string;
        title: string;
        category: string;
    };
}

export function NextArticleBar({ nextPost }: NextArticleBarProps) {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        if (dismissed) return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                const progress = scrollY / docHeight;
                // Show after 30% scroll, hide near footer (92%)
                if (progress > 0.3 && progress < 0.92) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [dismissed]);

    if (dismissed || !visible) return null;

    return (
        <aside className="next-article-bar" aria-label="Next recommended article">
            <div className="next-article-bar__inner">
                <div className="next-article-bar__info">
                    <div className="next-article-bar__meta">
                        <span className="next-article-bar__pill">Up Next</span>
                        <span className="next-article-bar__cat">{nextPost.category}</span>
                    </div>
                    <Link
                        href={`/posts/${nextPost.slug}/`}
                        className="next-article-bar__title"
                    >
                        {nextPost.title}
                    </Link>
                </div>

                <div className="next-article-bar__actions">
                    <Link
                        href={`/posts/${nextPost.slug}/`}
                        className="next-article-bar__btn"
                    >
                        Read Next →
                    </Link>
                    <button
                        type="button"
                        onClick={() => setDismissed(true)}
                        className="next-article-bar__close"
                        aria-label="Close suggestion"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </aside>
    );
}
