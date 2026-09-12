import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getAllPosts, type Post } from '../lib/posts';
import { SearchAndFilter } from '../components/search-and-filter';
import { TopicDirectory } from '../components/topic-directory';

const AdBanner = dynamic(
    () => import('../components/ad-banner').then((m) => ({ default: m.AdBanner })),
    { ssr: false },
);

export const metadata = {
    alternates: { canonical: '/' },
};

export default function HomePage() {
    const posts = getAllPosts();

    const featuredSlugs = [
        'best-gpu-for-1440p-gaming',
        'best-cpu-cooler-for-ryzen-7-7800x3d',
        'best-ssd-for-gaming-2026',
        'best-ram-for-ryzen-7000',
    ];
    const featuredPosts = featuredSlugs
        .map((slug) => posts.find((p) => p.slug === slug))
        .filter((p): p is Post => Boolean(p));

    return (
        <main className="home-main">
            {/* Professional Hero Section */}
            <section className="premium-hero">
                <div className="premium-hero__bg">
                    <div className="premium-hero__glow"></div>
                </div>
                <div className="container premium-hero__inner">
                    <div className="premium-hero__content">
                        <div className="premium-hero__badge">
                            <span className="premium-hero__badge-dot"></span>
                            <span>INDEPENDENT PC HARDWARE BENCHMARKS & GUIDES</span>
                        </div>
                        <h1 className="premium-hero__title">
                            Real Hardware Advice. <br />
                            <span className="text-gradient">Zero Marketing Fluff.</span>
                        </h1>
                        <p className="premium-hero__desc">
                            In-depth, real-world guides on PC building, cooling thermals, BIOS tuning, and troubleshooting — written for enthusiasts who care about actual performance over hype.
                        </p>
                        <div className="premium-hero__actions">
                            <Link href="#latest" className="btn btn--primary btn--glow">
                                Explore Guides →
                            </Link>
                            <Link href="#topics" className="btn btn--secondary btn--glass">
                                Browse by Component
                            </Link>
                        </div>
                        <div className="premium-hero__highlights">
                            <div className="premium-hero__highlight-item">
                                <span className="premium-hero__highlight-num">75+</span>
                                <span className="premium-hero__highlight-label">Technical Guides</span>
                            </div>
                            <div className="premium-hero__highlight-divider"></div>
                            <div className="premium-hero__highlight-item">
                                <span className="premium-hero__highlight-num">100%</span>
                                <span className="premium-hero__highlight-label">Independent Advice</span>
                            </div>
                            <div className="premium-hero__highlight-divider"></div>
                            <div className="premium-hero__highlight-item">
                                <span className="premium-hero__highlight-num">2026</span>
                                <span className="premium-hero__highlight-label">Current Platforms</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Hardware Deep-Dives */}
            <section className="section featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Featured Hardware Deep-Dives</h2>
                        <p>Our top-recommended component guides and architectural teardowns.</p>
                    </div>

                    <div className="featured-grid">
                        {featuredPosts.map((post) => (
                            <Link href={`/posts/${post.slug}/`} key={post.slug} className="featured-card">
                                <div className="featured-card__thumb-wrap">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="featured-card__thumb"
                                        loading="lazy"
                                    />
                                    <span className="featured-card__category-badge">{post.category}</span>
                                </div>
                                <div className="featured-card__content">
                                    <div className="featured-card__meta">
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="featured-card__title">{post.title}</h3>
                                    <p className="featured-card__desc">{post.meta_description}</p>
                                    <span className="featured-card__read">Read Full Guide →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ad: between featured and archives */}
            <div className="container">
                <AdBanner />
            </div>

            {/* All Articles Section with Search */}
            <section id="latest" className="section archive-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Latest Guides & Tutorials</h2>
                        <p>Search, filter, and explore our complete database of hardware teardowns and fixes.</p>
                    </div>
                    <SearchAndFilter posts={posts} />
                </div>
            </section>

            {/* Ad: between archives and topics */}
            <div className="container">
                <AdBanner />
            </div>

            {/* Topic Directory - 100% Crawlable Pillar Clusters */}
            <TopicDirectory posts={posts} />
        </main>
    );
}
