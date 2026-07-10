export type Author = {
    slug: string;
    name: string;
    role: string;
    bio: string;
    longBio: string;
    avatar: string; // initials-based, no image needed
    expertise: string[];
    social: {
        twitter?: string;
        github?: string;
        linkedin?: string;
    };
    joinedYear: number;
};

export const authors: Author[] = [
    {
        slug: 'marcus-holt',
        name: 'Marcus Holt',
        role: 'Senior Hardware Writer',
        bio: 'Marcus has been building and benchmarking PC hardware for over a decade. He focuses on CPUs, motherboards, and system performance.',
        longBio: `Marcus Holt has spent the better part of twelve years pulling apart computers, stress-testing components, and writing about what he finds. He started building systems in his early teens out of necessity — parts from eBay, secondhand cases, and a budget that forced him to make smart decisions. That background shaped how he thinks about hardware: practically, without hype.

Today Marcus focuses on CPUs, motherboards, memory, and system-level performance. He is especially interested in the gap between what components promise in marketing and what they deliver in daily use. His reviews tend to be direct and measurement-focused, with an emphasis on giving readers the information they need to make confident purchasing decisions.

Outside of hardware coverage, Marcus has contributed to several enthusiast communities, runs stress tests obsessively, and keeps a small lab of machines in various states of assembly. He believes that good advice is simple, honest, and based on real results.`,
        avatar: 'MH',
        expertise: ['CPUs', 'Motherboards', 'Memory', 'Overclocking', 'System Performance'],
        social: {
            twitter: 'https://twitter.com',
        },
        joinedYear: 2022,
    },
    {
        slug: 'sara-vance',
        name: 'Sara Vance',
        role: 'Storage & Displays Editor',
        bio: 'Sara covers storage, monitors, and ergonomics. She approaches hardware from a productivity and long-term reliability standpoint.',
        longBio: `Sara Vance came to hardware writing from a background in software development, which gave her a different lens on storage and display technology. She cares deeply about how hardware holds up over time, not just in launch-day benchmarks but in the sustained, everyday conditions that most users actually experience.

Her coverage at Zyrox focuses primarily on SSDs, HDDs, monitors, and the ergonomics of modern workstation setups. She has tested hundreds of drives and displays over the years, building a strong instinct for what matters in real-world conditions versus what only shows up in synthetic tests.

Sara is a firm believer that storage and display choices have a bigger impact on daily satisfaction than most people realize. A great monitor can transform how a computer feels to use. A reliable SSD can make the difference between a productive day and a frustrating one. Her goal is to help readers make those calls with clarity.`,
        avatar: 'SV',
        expertise: ['SSDs', 'HDDs', 'Monitors', 'Displays', 'Ergonomics', 'Productivity'],
        social: {
            twitter: 'https://twitter.com',
        },
        joinedYear: 2022,
    },
    {
        slug: 'daniel-osei',
        name: 'Daniel Osei',
        role: 'Cooling & Power Specialist',
        bio: 'Daniel specializes in thermal management, PSU reliability, and power delivery. He writes with a focus on long-term build health.',
        longBio: `Daniel Osei's interest in cooling and power systems started when an underpowered PSU destroyed a GPU he had saved months to buy. That experience pushed him to understand exactly how power delivery, thermals, and component interaction work — not just in theory, but in the real conditions of an actual system under load.

He now covers CPU coolers, case airflow, power supplies, and everything related to how heat and electricity move through a build. His approach is methodical: he tests quietly, documents precisely, and writes in a way that assumes readers want to understand the why, not just the what.

Daniel is particularly interested in long-term component reliability, the real cost of cheap power supplies, and the thermal behaviour of builds over time. He has a strong opinion that most builders underinvest in cooling and power, and much of his writing is aimed at correcting that.`,
        avatar: 'DO',
        expertise: ['CPU Cooling', 'Case Airflow', 'Power Supplies', 'Thermal Management', 'Build Reliability'],
        social: {
            twitter: 'https://twitter.com',
        },
        joinedYear: 2023,
    },
    {
        slug: 'rachel-kim',
        name: 'Rachel Kim',
        role: 'Windows & Troubleshooting Writer',
        bio: 'Rachel covers Windows, system troubleshooting, and practical upgrade advice. She focuses on making complex problems approachable.',
        longBio: `Rachel Kim has a background in IT support and system administration, which means she has spent years diagnosing problems that other people could not explain. She joined Zyrox to write about Windows, performance tuning, and the kind of practical troubleshooting that does not require a degree to follow.

Her articles tend to focus on the questions that real people actually search for: why is my PC slow, what is causing this reboot, how do I fix this update problem. She believes that technical writing should reduce stress, not add to it, and that the best guides are the ones that get to the answer quickly and clearly.

Rachel also writes about laptops, upgrade planning, and the human side of hardware decisions — when it makes sense to repair, when to replace, and how to get the most out of what you already have. She brings a grounded, no-nonsense perspective to every topic she covers.`,
        avatar: 'RK',
        expertise: ['Windows', 'Troubleshooting', 'Laptops', 'Upgrade Planning', 'System Optimization'],
        social: {
            twitter: 'https://twitter.com',
        },
        joinedYear: 2023,
    },
];

export function getAuthorBySlug(slug: string): Author | null {
    return authors.find((a) => a.slug === slug) ?? null;
}

export function getAllAuthors(): Author[] {
    return authors;
}
