import type {
    EngagementAdapter,
    ReadingListItem,
    Vote,
} from './types';
import { dispatchEngagementEvent } from './events';

const VOTES_KEY = 'zyrox:votes';
const READING_LIST_KEY = 'zyrox:reading-list';

type VoteMap = Record<string, Vote>;

function safeParse<T>(raw: string | null, fallback: T): T {
    if (!raw) return fallback;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return fallback;
    }
}

export class LocalStorageAdapter implements EngagementAdapter {
    private listeners = new Set<() => void>();

    // ---- helpers ----

    private readVotes(): VoteMap {
        return safeParse<VoteMap>(window.localStorage.getItem(VOTES_KEY), {});
    }

    private writeVotes(votes: VoteMap): void {
        window.localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
    }

    private readList(): ReadingListItem[] {
        const list = safeParse<ReadingListItem[]>(
            window.localStorage.getItem(READING_LIST_KEY),
            [],
        );
        return Array.isArray(list) ? list : [];
    }

    private writeList(list: ReadingListItem[]): void {
        window.localStorage.setItem(READING_LIST_KEY, JSON.stringify(list));
    }

    private emit(): void {
        this.listeners.forEach((fn) => fn());
    }

    // ---- votes ----

    recordVote(slug: string, vote: Vote): void {
        const votes = this.readVotes();
        if (vote === null) {
            delete votes[slug];
        } else {
            votes[slug] = vote;
        }
        this.writeVotes(votes);
        dispatchEngagementEvent({ type: 'vote', slug, payload: { vote }, ts: Date.now() });
        this.emit();
    }

    getVote(slug: string): Vote {
        const votes = this.readVotes();
        return votes[slug] ?? null;
    }

    // ---- reading list ----

    addToReadingList(item: ReadingListItem): void {
        const list = this.readList();
        if (list.some((it) => it.slug === item.slug)) return;
        list.unshift(item);
        this.writeList(list);
        dispatchEngagementEvent({ type: 'reading-list-add', slug: item.slug, ts: item.addedAt });
        this.emit();
    }

    removeFromReadingList(slug: string): void {
        const list = this.readList();
        const next = list.filter((it) => it.slug !== slug);
        if (next.length === list.length) return;
        this.writeList(next);
        dispatchEngagementEvent({ type: 'reading-list-remove', slug, ts: Date.now() });
        this.emit();
    }

    isInReadingList(slug: string): boolean {
        return this.readList().some((it) => it.slug === slug);
    }

    getReadingList(): ReadingListItem[] {
        return this.readList();
    }

    onChange(handler: () => void): () => void {
        this.listeners.add(handler);
        return () => {
            this.listeners.delete(handler);
        };
    }
}
