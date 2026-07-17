'use client';

import Link from 'next/link';
import { useReadingList } from '@/lib/engagement/use-engagement';

export function ReadingListBadge() {
    const { items, hydrated } = useReadingList();

    if (!hydrated) return null;

    const count = items.length;

    return (
        <Link
            href="/reading-list"
            className="rl-badge"
            aria-label={`Reading list, ${count} saved article${count === 1 ? '' : 's'}`}
        >
            <span aria-hidden="true">📚</span>
            <span>List</span>
            <span className="rl-badge-count">({count})</span>
        </Link>
    );
}
