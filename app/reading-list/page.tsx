import type { Metadata } from 'next';
import { ReadingListView } from '@/components/reading-list-view';

export const metadata: Metadata = {
    title: 'Reading List',
    description: 'Articles you saved for later.',
    alternates: { canonical: '/reading-list' },
    robots: { index: false, follow: false },
};

export default function ReadingListPage() {
    return (
        <main className="page-shell">
            <div className="container">
                <p className="hero__eyebrow">Your saved articles</p>
                <h1>Reading List</h1>
                <p style={{ color: 'var(--muted)', marginBottom: '2rem', maxWidth: '640px' }}>
                    Articles you starred stay on this device, in your browser&apos;s local storage.
                    They never leave your computer and they aren&apos;t shared with anyone.
                </p>
                <ReadingListView />
            </div>
        </main>
    );
}
