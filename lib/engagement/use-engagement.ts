'use client';

import { useCallback, useEffect, useState } from 'react';
import { buildReadingListItem, getAdapter } from './adapter';
import type { ReadingListItem, Vote } from './types';

// ---- Helpful vote ----

export interface UseHelpfulVote {
    vote: Vote;
    hydrated: boolean;
    submit: (next: Exclude<Vote, null>) => void;
}

export function useHelpfulVote(slug: string): UseHelpfulVote {
    const [vote, setVote] = useState<Vote>(null);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const adapter = getAdapter();
        setVote(adapter.getVote(slug));
        setHydrated(true);
        return adapter.onChange(() => setVote(adapter.getVote(slug)));
    }, [slug]);

    const submit = useCallback(
        (next: Exclude<Vote, null>) => {
            if (vote) return; // single-shot per post
            getAdapter().recordVote(slug, next);
        },
        [slug, vote],
    );

    return { vote, hydrated, submit };
}

// ---- Reading list ----

export interface UseReadingList {
    items: ReadingListItem[];
    hydrated: boolean;
    has: (slug: string) => boolean;
    toggle: (item: { slug: string; title: string; category?: string }) => void;
    add: (item: { slug: string; title: string; category?: string }) => void;
    remove: (slug: string) => void;
    clear: () => void;
}

export function useReadingList(): UseReadingList {
    const [items, setItems] = useState<ReadingListItem[]>([]);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const adapter = getAdapter();
        setItems(adapter.getReadingList());
        setHydrated(true);
        return adapter.onChange(() => setItems(adapter.getReadingList()));
    }, []);

    const has = useCallback((slug: string) => items.some((it) => it.slug === slug), [items]);

    const add = useCallback((item: { slug: string; title: string; category?: string }) => {
        getAdapter().addToReadingList(buildReadingListItem(item));
    }, []);

    const remove = useCallback((slug: string) => {
        getAdapter().removeFromReadingList(slug);
    }, []);

    const toggle = useCallback(
        (item: { slug: string; title: string; category?: string }) => {
            const adapter = getAdapter();
            if (adapter.isInReadingList(item.slug)) {
                adapter.removeFromReadingList(item.slug);
            } else {
                adapter.addToReadingList(buildReadingListItem(item));
            }
        },
        [],
    );

    const clear = useCallback(() => {
        const list = getAdapter().getReadingList();
        list.forEach((it) => getAdapter().removeFromReadingList(it.slug));
    }, []);

    return { items, hydrated, has, toggle, add, remove, clear };
}
