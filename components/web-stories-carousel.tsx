import Link from 'next/link';

interface StoryItem {
    slug: string;
    title: string;
    tag: string;
    image: string;
    gradient: string;
}

const STORIES: StoryItem[] = [
    {
        slug: 'best-gpu-1440p',
        title: 'Best 1440p GPUs',
        tag: 'Gaming',
        image: '/images/posts/best-gpu-for-1440p-gaming.jpg',
        gradient: 'from-blue-500 to-indigo-600',
    },
    {
        slug: 'budget-gaming-pc',
        title: '$600 Fast PC Build',
        tag: 'PC Build',
        image: '/images/posts/how-to-build-a-budget-gaming-pc.jpg',
        gradient: 'from-emerald-500 to-teal-600',
    },
    {
        slug: 'speed-up-windows-11',
        title: 'Speed Up Win 11',
        tag: 'Windows',
        image: '/images/posts/how-to-speed-up-a-slow-windows-11-pc.jpg',
        gradient: 'from-sky-500 to-blue-600',
    },
    {
        slug: 'best-cpu-cooler-7800x3d',
        title: '7800X3D Coolers',
        tag: 'Cooling',
        image: '/images/posts/best-cpu-cooler-for-ryzen-7-7800x3d.jpg',
        gradient: 'from-red-500 to-orange-600',
    },
    {
        slug: 'ssd-vs-hdd-2026',
        title: 'SSD vs HDD Battle',
        tag: 'Storage',
        image: '/images/posts/ssd-vs-hdd-which-should-you-buy-in-2026.jpg',
        gradient: 'from-purple-500 to-pink-600',
    },
    {
        slug: 'pc-wont-boot',
        title: 'PC Won\'t Boot Fix',
        tag: 'Diagnostic',
        image: '/images/posts/what-to-check-first-when-a-pc-wont-boot.jpg',
        gradient: 'from-amber-500 to-yellow-600',
    },
    {
        slug: 'choose-right-psu',
        title: 'Choose Right PSU',
        tag: 'Power',
        image: '/images/posts/how-to-choose-the-right-psu-for-your-build.jpg',
        gradient: 'from-cyan-500 to-blue-600',
    },
];

export function WebStoriesCarousel() {
    return (
        <section className="section stories-section" aria-label="Web Stories">
            <div className="container">
                <div className="section-header stories-header">
                    <div className="stories-header__title">
                        <span className="stories-badge">
                            <span className="stories-badge-bolt">⚡</span>
                            <span>Google Web Stories</span>
                        </span>
                        <h2>Visual Stories</h2>
                    </div>
                    <p>Snackable, full-screen interactive hardware guides designed for mobile.</p>
                </div>

                <div className="stories-scroll">
                    <div className="stories-track">
                        {STORIES.map((story) => (
                            <a
                                key={story.slug}
                                href={`/stories/${story.slug}/`}
                                className="story-card"
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Open ${story.title} Story`}
                            >
                                <div className="story-card__ring">
                                    <div
                                        className="story-card__thumb"
                                        style={{ backgroundImage: `url(${story.image})` }}
                                    >
                                        <div className="story-card__overlay"></div>
                                        <span className="story-card__tag">{story.tag}</span>
                                        <h3 className="story-card__title">{story.title}</h3>
                                        <span className="story-card__action">Tap to view</span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
