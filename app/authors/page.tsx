import Link from 'next/link';
import { getAllAuthors } from '@/lib/authors';
import { getPostsByAuthor } from '@/lib/posts';

export const metadata = {
    title: 'Our Authors',
    description: 'Meet the writers behind Zyrox — hardware specialists focused on practical, experience-driven PC guides.',
    alternates: { canonical: '/authors' },
};

export default function AuthorsPage() {
    const authors = getAllAuthors();

    return (
        <main className="page-shell">
            <div className="container">
                <p className="hero__eyebrow">The team</p>
                <h1>Our Authors</h1>
                <p style={{ color: 'var(--muted)', marginBottom: '2rem', maxWidth: '640px' }}>
                    Every article on Zyrox is written by a specialist with hands-on experience. No filler, no AI slop — just honest, practical hardware knowledge from people who actually use this stuff.
                </p>

                <div className="authors-grid">
                    {authors.map((author) => {
                        const postCount = getPostsByAuthor(author.slug).length;
                        return (
                            <Link
                                key={author.slug}
                                href={`/authors/${author.slug}`}
                                className="author-profile-card"
                                aria-label={`View ${author.name}'s profile`}
                            >
                                <div className="author-avatar author-avatar--lg" aria-hidden="true">
                                    {author.avatar}
                                </div>
                                <div>
                                    <p className="author-role">{author.role}</p>
                                    <h2 className="author-name">{author.name}</h2>
                                    <p className="author-bio-short">{author.bio}</p>
                                    <div className="author-expertise" style={{ marginTop: '0.75rem' }}>
                                        {author.expertise.slice(0, 3).map((item) => (
                                            <span key={item} className="pill">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="author-stats" style={{ marginTop: '0.75rem' }}>
                                        <strong>{postCount}</strong> article{postCount === 1 ? '' : 's'} published
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
