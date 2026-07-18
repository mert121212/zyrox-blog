// Engagement adapter contract — shared by the localStorage implementation
// and any future serverless / analytics-backed adapter (Plausible, Netlify
// Blobs KV, Supabase, etc.). UI code talks only to this interface.

export type Vote = 'up' | 'down' | null;

export interface ReadingListItem {
    slug: string;
    title: string;
    category?: string; // optional — kept for back-compat with items saved before category UI was removed
    addedAt: number; // epoch ms
}

export type EngagementEventType = 'vote' | 'reading-list-add' | 'reading-list-remove';

export interface EngagementEvent {
    type: EngagementEventType;
    slug: string;
    payload?: unknown;
    ts: number;
}

export interface EngagementAdapter {
    recordVote(slug: string, vote: Vote): void;
    getVote(slug: string): Vote;

    addToReadingList(item: ReadingListItem): void;
    removeFromReadingList(slug: string): void;
    isInReadingList(slug: string): boolean;
    getReadingList(): ReadingListItem[];

    onChange(handler: () => void): () => void;
}
