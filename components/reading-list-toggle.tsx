'use client';

import { useReadingList } from '@/lib/engagement/use-engagement';

interface Props {
    slug: string;
    title: string;
}

export function ReadingListToggle({ slug, title }: Props) {
    const { hydrated, has, toggle } = useReadingList();

    if (!hydrated) {
        // Reserve space so the post header doesn't jump after hydration.
        return <span className="rl-toggle" aria-hidden="true" style={{ visibility: 'hidden' }}>☆</span>;
    }

    const active = has(slug);

    return (
        <button
            type="button"
            className="rl-toggle"
            data-active={active}
            onClick={() => toggle({ slug, title })}
            aria-pressed={active}
            aria-label={active ? 'Remove from reading list' : 'Save to reading list'}
        >
            <span className="star" aria-hidden="true">{active ? '★' : '☆'}</span>
            <span>{active ? 'Saved' : 'Save'}</span>
        </button>
    );
}
