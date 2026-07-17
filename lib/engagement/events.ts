import type { EngagementEvent } from './types';

// Event bus for engagement actions. In dev we surface events to the console
// so the adapter swap point is obvious. In production this is a no-op unless
// a real analytics pipeline is plugged in (e.g. plausible.track, fetch to a
// /api/engagement endpoint, etc.). UI code never imports this directly —
// adapters call it as they mutate state.

export function dispatchEngagementEvent(event: EngagementEvent): void {
    if (typeof window === 'undefined') return;

    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.debug('[zyrox engagement]', event.type, event.slug, event.payload ?? '');
    }

    // Future hook point:
    // if (window.plausible) window.plausible('Engagement: ' + event.type, { props: { slug: event.slug } });
}
