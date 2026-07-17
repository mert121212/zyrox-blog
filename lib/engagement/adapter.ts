import type {
    EngagementAdapter,
    ReadingListItem,
    Vote,
} from './types';
import { LocalStorageAdapter } from './local-storage-adapter';

// Server-side stub: every method is a no-op. The real adapter is created
// lazily in the browser; hooks must therefore gate UI on a `hydrated` flag.
const noopAdapter: EngagementAdapter = {
    recordVote: () => {},
    getVote: () => null,
    addToReadingList: () => {},
    removeFromReadingList: () => {},
    isInReadingList: () => false,
    getReadingList: () => [],
    onChange: () => () => {},
};

let cached: EngagementAdapter | null = null;

export function getAdapter(): EngagementAdapter {
    if (typeof window === 'undefined') return noopAdapter;
    if (!cached) cached = new LocalStorageAdapter();
    return cached;
}

// Convenience: typed payload for reading list additions.
export function buildReadingListItem(args: {
    slug: string;
    title: string;
    category: string;
}): ReadingListItem {
    return { slug: args.slug, title: args.title, category: args.category, addedAt: Date.now() };
}

// Re-export so consumers can `import { Vote } from '@/lib/engagement/adapter'`.
export type { Vote };
