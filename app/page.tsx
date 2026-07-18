import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getAllPosts } from '../lib/posts';

const SearchAndFilter = dynamic(
    () => import('../components/search-and-filter').then((m) => ({ default: m.SearchAndFilter })),
    { ssr: false },
);

export default function HomePage() {
    const posts = getAllPosts();

    return (
        <main className="home-main">
            {/* Premium Hero Section */}
            <section className="premium-hero">
                <div className="premium-hero__bg">
                    <div className="premium-hero__glow"></div>
                </div>
                <div className="container premium-hero__inner">
                    <div className="premium-hero__content">
                        <div className="premium-hero__badge">
                            <span className="premium-hero__badge-dot"></span>
                            <span>Next-Gen Hardware Insights</span>
                        </div>
                        <h1 className="premium-hero__title">
                            Build, Tune, and <span className="text-gradient">Dominate</span>
                        </h1>
                        <p className="premium-hero__desc">
                            Authoritative, data-driven guides for PC enthusiasts. From finding the perfect RTX 5080 power supply to mastering AM5 memory timings, we cut through the marketing noise to bring you the truth.
                        </p>
                        <div className="premium-hero__actions">
                            <Link href="#latest" className="btn btn--primary btn--glow">
                                Explore Guides
                            </Link>
                            <Link href="/about" className="btn btn--secondary btn--glass">
                                About Our Lab
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="section featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Editor's Picks</h2>
                        <p>The hardware that defines 2026.</p>
                    </div>
                    
                    <div className="featured-grid">
                        {posts.filter(p => p.slug === 'best-gpu-for-1440p-gaming' || p.slug === 'best-cpu-cooler-for-ryzen-7-7800x3d').map(post => (
                            <Link href={`/posts/${post.slug}`} key={post.slug} className="featured-card">
                                <div className="featured-card__content">
                                    <span className="featured-card__category">{post.category}</span>
                                    <h3>{post.title}</h3>
                                    <p>{post.meta_description}</p>
                                    <span className="featured-card__read">Read Full Analysis →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* All Articles Section with Search */}
            <section id="latest" className="section archive-section">
                <div className="container">
                    <div className="section-header">
                        <h2>All Archives</h2>
                        <p>Search our complete database of hardware deep-dives.</p>
                    </div>
                    <SearchAndFilter posts={posts} />
                </div>
            </section>
        </main>
    );
}
