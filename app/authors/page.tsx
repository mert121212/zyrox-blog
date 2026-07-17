import Link from 'next/link';
import { getAllAuthors } from '@/lib/authors';
import { getPostsByAuthor } from '@/lib/posts';

export const metadata = {
    title: 'Editorial Team',
    description: 'The editorial team behind Zyrox — hardware specialists producing independent, experience-driven PC guides.',
    alternates: { canonical: '/authors' },
};

export default function AuthorsPage() {
    const authors = getAllAuthors();

    return (
        <main className="page-shell">
            <div className="container">
                <p className="hero__eyebrow">The editorial team</p>
                <h1>Editorial Team</h1>
                <p style={{ color: 'var(--muted)', marginBottom: '2rem', maxWidth: '640px' }}>
                    Every article on Zyrox is written by an editor who specializes in the topic they cover. Our team focuses on hands-on testing and independent analysis, and our editorial decisions are not influenced by manufacturer relationships. See our <Link href="/editorial-policy" className="post-link" style={{ display: 'inline', marginTop: 0 }}>Editorial Policy</Link> for details.
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
                                    <p className="author-bio-short">{author.department}</p>
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
