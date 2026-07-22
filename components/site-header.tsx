import Link from 'next/link';
import dynamic from 'next/dynamic';

// ReadingListBadge reads localStorage — must be client-only, no SSR
const ReadingListBadge = dynamic(
    () => import('./reading-list-badge').then((m) => ({ default: m.ReadingListBadge })),
    { ssr: false },
);

// Navbar cleaned for minimal UI

export function SiteHeader() {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <Link href="/" className="site-header__brand" aria-label="Zyrox home" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src="/logo.png" alt="Zyrox Logo" width="32" height="32" style={{ borderRadius: '6px' }} />
                    Zyrox
                </Link>
                <nav aria-label="Primary navigation">
                    <ReadingListBadge />
                </nav>
            </div>
        </header>
    );
}
