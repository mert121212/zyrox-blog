import Link from 'next/link';
import type { Author } from '@/lib/authors';

type AuthorCardProps = {
    author: Author;
    articleCount?: number;
    variant?: 'compact' | 'full';
};

export function AuthorCard({ author, articleCount, variant = 'compact' }: AuthorCardProps) {
    if (variant === 'full') {
        return (
            <div className="author-card author-card--full">
                <div className="author-avatar author-avatar--lg" aria-hidden="true">
                    {author.avatar}
                </div>
                <div className="author-info">
                    <p className="author-role">{author.role}</p>
                    <h1 className="author-name-lg">{author.name}</h1>
                    <p className="author-department" style={{ color: 'var(--accent)', fontWeight: 600, marginTop: '-0.4rem', marginBottom: '0.8rem', fontSize: '0.95rem' }}>
                        {author.department}
                    </p>
                    <p className="author-bio">{author.longBio}</p>
                    <div className="author-expertise">
                        {author.expertise.map((item) => (
                            <span key={item} className="pill">
                                {item}
                            </span>
                        ))}
                    </div>
                    {articleCount !== undefined && (
                        <p className="author-stats">
                            <strong>{articleCount}</strong> article{articleCount === 1 ? '' : 's'} published
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="author-card author-card--compact">
            <Link href={`/authors/${author.slug}`} className="author-avatar" aria-label={`View ${author.name}'s profile`}>
                {author.avatar}
            </Link>
            <div className="author-info">
                <p className="author-label">Written by the {author.department} team</p>
                <Link href={`/authors/${author.slug}`} className="author-name">
                    {author.name}
                </Link>
                <p className="author-role">{author.role}</p>
            </div>
        </div>
    );
}
