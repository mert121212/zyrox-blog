import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Visual Web Stories | Zyrox',
    description: 'Bite-sized, full-screen interactive hardware guides, PC build blueprints, and troubleshooting walkthroughs optimized for mobile.',
    alternates: {
        canonical: '/stories/',
    },
    openGraph: {
        title: 'Visual Web Stories | Zyrox',
        description: 'Interactive full-screen hardware guides and PC building visual stories.',
        url: '/stories/',
        images: ['https://zyroxlab.com/images/og-default.png'],
    },
};

interface StoryCardData {
    slug: string;
    title: string;
    description: string;
    tag: string;
    image: string;
    articleUrl: string;
    date: string;
}

const STORIES_LIST: StoryCardData[] = [
    {
        slug: 'best-gpu-1440p',
        title: 'Best GPU for 1440p Gaming in 2026',
        description: 'Find the sweet spot between FPS, VRAM, and price. Why 12GB+ is the new baseline for 2K gaming.',
        tag: 'Gaming',
        image: '/images/posts/best-gpu-for-1440p-gaming.jpg',
        articleUrl: '/posts/best-gpu-for-1440p-gaming/',
        date: 'Aug 2026',
    },
    {
        slug: 'budget-gaming-pc',
        title: 'How to Build a $600 Fast Budget Gaming PC',
        description: 'Stop buying overpriced prebuilts. Learn exactly where to invest and where to cut corners.',
        tag: 'PC Build',
        image: '/images/posts/how-to-build-a-budget-gaming-pc.jpg',
        articleUrl: '/posts/how-to-build-a-budget-gaming-pc/',
        date: 'Jul 2026',
    },
    {
        slug: 'speed-up-windows-11',
        title: 'Speed Up Windows 11 in Under 30 Minutes',
        description: 'Tame Windows 11 sluggishness. Disable background telemetry, startup bloat, and animation lag.',
        tag: 'Windows',
        image: '/images/posts/how-to-speed-up-a-slow-windows-11-pc.jpg',
        articleUrl: '/posts/how-to-speed-up-a-slow-windows-11-pc-in-under-30-minutes/',
        date: 'Aug 2026',
    },
    {
        slug: 'best-cpu-cooler-7800x3d',
        title: 'Best CPU Cooler for Ryzen 7 7800X3D',
        description: 'Do you really need an expensive 360mm liquid AIO? Real thermal data and 80W power limits.',
        tag: 'Cooling',
        image: '/images/posts/best-cpu-cooler-for-ryzen-7-7800x3d.jpg',
        articleUrl: '/posts/best-cpu-cooler-for-ryzen-7-7800x3d/',
        date: 'Aug 2026',
    },
    {
        slug: 'ssd-vs-hdd-2026',
        title: 'SSD vs HDD: Is the Hard Drive Officially Dead?',
        description: 'Comparing NVMe PCIe 4.0 speed vs 3.5" HDDs for modern gaming, video editing, and backups.',
        tag: 'Storage',
        image: '/images/posts/ssd-vs-hdd-which-should-you-buy-in-2026.jpg',
        articleUrl: '/posts/ssd-vs-hdd-which-should-you-buy-in-2026/',
        date: 'Aug 2026',
    },
    {
        slug: 'pc-wont-boot',
        title: 'What to Check First When a PC Won\'t Boot',
        description: 'Black screen? Don\'t panic. 9 out of 10 boot failures are simple RAM or CMOS fixes.',
        tag: 'Diagnostics',
        image: '/images/posts/what-to-check-first-when-a-pc-wont-boot.jpg',
        articleUrl: '/posts/what-to-check-first-when-a-pc-wont-boot/',
        date: 'Jul 2026',
    },
    {
        slug: 'choose-right-psu',
        title: 'How to Choose the Right PSU for Your Build',
        description: 'Never cheap out on your power supply. Wattage calculation, 80 Plus ratings, and ATX 3.0 spikes.',
        tag: 'Power',
        image: '/images/posts/how-to-choose-the-right-psu-for-your-build.jpg',
        articleUrl: '/posts/how-to-choose-the-right-psu-for-your-build/',
        date: 'Jul 2026',
    },
];

export default function StoriesPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Visual Web Stories | Zyrox',
        url: 'https://zyroxlab.com/stories/',
        description: 'Interactive visual stories covering PC hardware guides, builds, and troubleshooting.',
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: STORIES_LIST.map((story, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: story.title,
                url: `https://zyroxlab.com/stories/${story.slug}/`,
                image: `https://zyroxlab.com${story.image}`,
            })),
        },
    };

    return (
        <main className="stories-hub-main">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="stories-hub-hero">
                <div className="container">
                    <div className="stories-hub-badge">
                        <span className="stories-hub-bolt">⚡</span>
                        <span>Google Discover & AMP Stories</span>
                    </div>
                    <h1 className="stories-hub-title">
                        Visual <span className="text-gradient">Stories</span>
                    </h1>
                    <p className="stories-hub-desc">
                        Full-screen, snackable hardware guides and diagnostic checklists designed for mobile screens. Tap any story card to launch the interactive experience.
                    </p>
                </div>
            </section>

            <section className="section stories-hub-grid-section">
                <div className="container">
                    <div className="stories-hub-grid">
                        {STORIES_LIST.map((story) => (
                            <div key={story.slug} className="stories-hub-card">
                                <a
                                    href={`/stories/${story.slug}/`}
                                    className="stories-hub-card__visual"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={`Launch ${story.title} Story`}
                                >
                                    <div
                                        className="stories-hub-card__thumb"
                                        style={{ backgroundImage: `url(${story.image})` }}
                                    >
                                        <div className="stories-hub-card__overlay"></div>
                                        <span className="stories-hub-card__tag">{story.tag}</span>
                                        <div className="stories-hub-card__play">
                                            <span>▶</span>
                                        </div>
                                    </div>
                                </a>

                                <div className="stories-hub-card__content">
                                    <div className="stories-hub-card__meta">
                                        <span className="stories-hub-card__date">{story.date}</span>
                                        <span className="stories-hub-card__pill">Tap-Through</span>
                                    </div>
                                    <h2 className="stories-hub-card__title">
                                        <a href={`/stories/${story.slug}/`} target="_blank" rel="noopener noreferrer">
                                            {story.title}
                                        </a>
                                    </h2>
                                    <p className="stories-hub-card__desc">{story.description}</p>
                                    <div className="stories-hub-card__actions">
                                        <a
                                            href={`/stories/${story.slug}/`}
                                            className="btn-story-launch"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            ⚡ Open Story
                                        </a>
                                        <Link href={story.articleUrl} className="btn-story-article">
                                            Read Article →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
