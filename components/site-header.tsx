import Link from 'next/link';
import dynamic from 'next/dynamic';

// ReadingListBadge reads localStorage — must be client-only, no SSR
const ReadingListBadge = dynamic(
    () => import('./reading-list-badge').then((m) => ({ default: m.ReadingListBadge })),
    { ssr: false },
);

// Navbar with primary navigation

export function SiteHeader() {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <Link href="/" className="site-header__brand" aria-label="Zyrox home" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src="/logo.png" alt="Zyrox Logo" width="32" height="32" style={{ borderRadius: '6px' }} />
                    Zyrox
                </Link>
                <nav aria-label="Primary navigation" className="site-header__nav">
                    <Link href="/tag/gaming" className="site-header__link">Gaming</Link>
                    <Link href="/tag/cooling" className="site-header__link">Cooling</Link>
                    <Link href="/tag/storage" className="site-header__link">Storage</Link>
                    <Link href="/tag/windows" className="site-header__link">Windows</Link>
                    <Link href="/about" className="site-header__link">About</Link>
                    <Link href="/contact" className="site-header__link">Contact</Link>
                    <ReadingListBadge />
                </nav>
            </div>
        </header>
    );
}

