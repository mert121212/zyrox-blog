import Link from 'next/link';
import type { Post } from '@/lib/posts';

const TOPIC_GROUPS: { name: string; icon: string; match: (category: string) => boolean }[] = [
    {
        name: 'Storage & SSDs',
        icon: '💾',
        match: (c) => ['Storage'].includes(c),
    },
    {
        name: 'CPUs, Memory & Motherboards',
        icon: '⚡',
        match: (c) => ['Motherboards', 'Memory', 'Overclocking', 'Hardware'].includes(c),
    },
    {
        name: 'Graphics, Displays & Gaming',
        icon: '🎮',
        match: (c) => ['Gaming', 'Displays'].includes(c),
    },
    {
        name: 'Cooling, Power & Cases',
        icon: '❄️',
        match: (c) => ['Cooling', 'Power', 'Power Supply', 'Cases'].includes(c),
    },
    {
        name: 'Diagnostics & Troubleshooting',
        icon: '🔧',
        match: (c) => ['Troubleshooting', 'Hardware Troubleshooting'].includes(c),
    },
    {
        name: 'Windows, Maintenance & Upgrades',
        icon: '🚀',
        match: (c) => ['Windows', 'Maintenance', 'Upgrades', 'Battery', 'Productivity', 'Buying Guides', 'Performance', 'Networking'].includes(c),
    },
];

export function TopicDirectory({ posts }: { posts: Post[] }) {
    const grouped = TOPIC_GROUPS.map((group) => {
        const groupPosts = posts.filter((p) => group.match(p.category));
        return {
            ...group,
            posts: groupPosts,
        };
    }).filter((g) => g.posts.length > 0);

    return (
        <section className="topic-directory-section" id="topics">
            <div className="container">
                <div className="section-header">
                    <h2>Complete Topic Directory</h2>
                    <p>Explore all {posts.length} hardware guides and troubleshooting analyses by category.</p>
                </div>

                <div className="topic-directory-grid">
                    {grouped.map((group) => (
                        <div key={group.name} className="topic-cluster-card">
                            <div className="topic-cluster-header">
                                <span className="topic-cluster-icon" aria-hidden="true">{group.icon}</span>
                                <div>
                                    <h3 className="topic-cluster-title">{group.name}</h3>
                                    <span className="topic-cluster-count">{group.posts.length} in-depth guides</span>
                                </div>
                            </div>
                            <ul className="topic-cluster-list">
                                {group.posts.map((post) => (
                                    <li key={post.slug} className="topic-cluster-item">
                                        <Link href={`/posts/${post.slug}/`} className="topic-cluster-link">
                                            {post.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
