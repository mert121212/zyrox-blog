import Link from 'next/link';
import { getAllAuthors } from '@/lib/authors';

export const metadata = {
    title: 'About Zyrox',
    description: 'Zyrox is an independent PC hardware publication focused on practical build advice, honest reviews, and real-world troubleshooting guides.',
    alternates: { canonical: '/about' },
};

export default function AboutPage() {
    const authors = getAllAuthors();

    return (
        <main className="page-shell">
            <div className="container about-page">

                <section className="about-section">
                    <p className="hero__eyebrow">About the publication</p>
                    <h1>We write about PC hardware the way it should be written.</h1>
                    <p>
                        Zyrox is an independent hardware publication. We cover CPUs, GPUs, storage, cooling, power supplies, displays, and Windows — not with press-release enthusiasm, but with the kind of direct, measured perspective that comes from actually using the hardware day to day.
                    </p>
                    <p>
                        We started this site because too much hardware writing is either surface-level or driven by affiliate clicks. We wanted something different: a place where the advice is grounded in real experience, the conclusions are explained rather than asserted, and readers leave knowing more than when they arrived.
                    </p>
                </section>

                <section className="about-section">
                    <h2>What we cover</h2>
                    <div className="about-topics-grid">
                        <div className="about-topic-card card">
                            <h3>Build Guides</h3>
                            <p>Practical advice for every budget and use case, from compact home systems to dedicated workstations.</p>
                        </div>
                        <div className="about-topic-card card">
                            <h3>Component Selection</h3>
                            <p>Honest guidance on CPUs, GPUs, motherboards, RAM, SSDs, coolers, and power supplies without the hype.</p>
                        </div>
                        <div className="about-topic-card card">
                            <h3>Troubleshooting</h3>
                            <p>Step-by-step guides for diagnosing and fixing common hardware and software problems.</p>
                        </div>
                        <div className="about-topic-card card">
                            <h3>Upgrade Planning</h3>
                            <p>Help deciding when to upgrade, what to upgrade, and how to get the most out of your existing hardware.</p>
                        </div>
                        <div className="about-topic-card card">
                            <h3>Performance Tuning</h3>
                            <p>Guides on BIOS settings, Windows optimisation, thermals, and fan tuning for better real-world results.</p>
                        </div>
                        <div className="about-topic-card card">
                            <h3>Buying Guides</h3>
                            <p>Research-backed purchasing guides that help readers make confident decisions at every price point.</p>
                        </div>
                    </div>
                </section>

                <section className="about-section">
                    <h2>Our editorial approach</h2>
                    <p>
                        Every article on Zyrox is written by a named author with real expertise in the topic they cover. We do not publish content that exists only to fill a slot or tick an SEO box. If an article is here, it is because we believe it genuinely helps someone make a better decision.
                    </p>
                    <p>
                        We are transparent about what we test, how we test it, and what our conclusions are based on. When we recommend a component or approach, we explain why, and we acknowledge tradeoffs honestly.
                    </p>
                    <p>
                        We do not accept payment for coverage, and our editorial decisions are not influenced by manufacturer relationships. Our only obligation is to the reader.
                    </p>
                </section>

                <section className="about-section">
                    <h2>The team</h2>
                    <p style={{ marginBottom: '1.4rem', color: 'var(--muted)' }}>
                        Zyrox is a small team of hardware specialists. Each writer covers the topics they know best.
                    </p>
                    <div className="about-authors-grid">
                        {authors.map((author) => (
                            <Link key={author.slug} href={`/authors/${author.slug}`} className="about-author-card card">
                                <div className="author-avatar" aria-hidden="true">{author.avatar}</div>
                                <div>
                                    <strong className="author-name">{author.name}</strong>
                                    <p className="author-role">{author.role}</p>
                                    <p className="author-bio-short">{author.bio}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div style={{ marginTop: '1.25rem' }}>
                        <Link href="/authors" className="post-link">View all authors →</Link>
                    </div>
                </section>

                <section className="about-section">
                    <h2>Site information & Contact</h2>
                    <p>
                        Zyrox publishes original content focused on PC hardware for a global English-speaking audience. The site is updated regularly as hardware evolves and new guides are completed.
                    </p>
                    <p>
                        <strong>Contact us:</strong> For general inquiries, business, or support, please reach out to us at <a href="mailto:zyroxlabcom@gmail.com" className="post-link" style={{ display: 'inline', marginTop: 0 }}>zyroxlabcom@gmail.com</a>.
                    </p>
                    <p>
                        For site-related legal information, see our{' '}
                        <Link href="/privacy-policy" className="post-link" style={{ display: 'inline', marginTop: 0 }}>Privacy Policy</Link>{' '}
                        and{' '}
                        <Link href="/terms" className="post-link" style={{ display: 'inline', marginTop: 0 }}>Terms of Use</Link>.
                    </p>
                </section>

            </div>
        </main>
    );
}
