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
        <main>
            <section className="hero">
                <div className="container hero__inner">
                    <div>
                        <p className="hero__eyebrow">PC hardware • systems • performance</p>
                        <h1>Practical PC hardware guides built for real search intent and real-world decisions.</h1>
                        <p>
                            Zyrox publishes clear, experience-driven articles on storage, cooling, GPUs, motherboards, Windows, and upgrade planning that help readers choose, build, troubleshoot, and maintain their systems with confidence.
                        </p>
                        <div className="hero__actions">
                            <Link href="#latest" className="btn btn--primary">Explore articles</Link>
                            <Link href="/about" className="btn btn--secondary">About the site</Link>
                        </div>
                    </div>
                    <div className="hero__stats">
                        <div className="stat-card">
                            <strong>{posts.length}+</strong>
                            <span>Articles</span>
                        </div>
                        <div className="stat-card">
                            <strong>100%</strong>
                            <span>Practical</span>
                        </div>
                        <div className="stat-card">
                            <strong>SEO</strong>
                            <span>Ready</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="card intro-card">
                        <p className="hero__eyebrow">Editorial focus</p>
                        <h2>Clear advice for builds, repairs, upgrades, and everyday PC decisions.</h2>
                        <p>
                            The archive is structured around practical topic clusters such as SSDs, cooling, power supplies, motherboards, gaming performance, and Windows troubleshooting so readers can find exactly what they need quickly and return for deeper guidance.
                        </p>
                    </div>
                </div>
            </section>

            <section id="latest" className="section">
                <div className="container">
                    <SearchAndFilter posts={posts} />
                </div>
            </section>
        </main>
    );
}
