import Link from 'next/link';

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/authors', label: 'Authors' },
    { href: '/about', label: 'About' },
    { href: '/rss.xml', label: 'RSS' },
];

export function SiteHeader() {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <Link href="/" className="site-header__brand" aria-label="Zyrox home">
                    Zyrox
                </Link>
                <nav aria-label="Primary navigation">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
