'use client';

import { useHelpfulVote } from '@/lib/engagement/use-engagement';

interface Props {
    slug: string;
}

export function HelpfulVote({ slug }: Props) {
    const { vote, hydrated, submit } = useHelpfulVote(slug);

    if (!hydrated) {
        return <div className="helpful-vote-bar" aria-hidden="true" style={{ minHeight: 120 }} />;
    }

    if (vote === 'up') {
        return (
            <div className="helpful-vote-bar" role="status" aria-live="polite">
                <p className="helpful-vote-thanks">✓ Glad this was useful — thanks for the feedback.</p>
            </div>
        );
    }

    if (vote === 'down') {
        return (
            <div className="helpful-vote-bar" role="status" aria-live="polite">
                <p className="helpful-vote-thanks">Feedback recorded. We&apos;ll work on improving this one.</p>
            </div>
        );
    }

    return (
        <div className="helpful-vote-bar">
            <h3>Was this article useful?</h3>
            <p>One quick tap — your feedback helps us prioritize what to write next.</p>
            <div className="helpful-vote-buttons">
                <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => submit('up')}
                    aria-label="Yes, this article was useful"
                >
                    👍 Useful
                </button>
                <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => submit('down')}
                    aria-label="No, this article was not useful"
                >
                    👎 Not really
                </button>
            </div>
        </div>
    );
}
