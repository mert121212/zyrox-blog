export type Author = {
    slug: string;
    name: string;
    role: string;
    department: string;
    bio: string;
    longBio: string;
    avatar: string; // initials-based, no image needed
    expertise: string[];
    social: {
        twitter?: string;
    };
};

export const authors: Author[] = [
    {
        slug: 'marcus-holt',
        name: 'Marcus Holt',
        role: 'Senior Hardware Editor',
        department: 'CPUs, Motherboards & Performance',
        bio: 'Senior Hardware Editor covering CPUs, motherboards, memory, and system-level performance for Zyrox.',
        longBio: `At Zyrox, our CPU and platform coverage is led by an editor who has spent more than a decade building, benchmarking, and stress-testing PCs. Coverage focuses on real-world performance rather than marketing claims, with an emphasis on giving readers the information they need to make confident decisions about their next platform.

Articles in this department are produced with a standard test methodology: identical memory timings, fresh Windows installations, current chipset drivers, and at least three runs per benchmark to filter out single-run noise. Where manufacturer claims do not match observed results, the difference is called out in the article.`,
        avatar: 'MH',
        expertise: ['CPUs', 'Motherboards', 'Memory', 'Overclocking', 'System Performance'],
        social: {
            twitter: 'https://twitter.com/zyrox',
        },
    },
    {
        slug: 'sara-vance',
        name: 'Sara Vance',
        role: 'Storage & Display Editor',
        department: 'SSDs, HDDs, Monitors & Ergonomics',
        bio: 'Storage & Display Editor covering SSDs, HDDs, monitors, and workstation ergonomics for Zyrox.',
        longBio: `Storage and display coverage at Zyrox is handled by an editor with a background in software development and a long track record of testing hundreds of drives and panels across price tiers. The editorial focus is sustained, real-world reliability rather than launch-day benchmarks, with an emphasis on how hardware holds up under everyday conditions.

Display reviews on Zyrox are produced using colorimeters and professional reference patterns; storage reviews use standardized workloads, sustained-write tests, and thermal logging. Recommendations are independent of manufacturer relationships.`,
        avatar: 'SV',
        expertise: ['SSDs', 'HDDs', 'Monitors', 'Displays', 'Ergonomics', 'Productivity'],
        social: {
            twitter: 'https://twitter.com/zyrox',
        },
    },
    {
        slug: 'daniel-osei',
        name: 'Daniel Osei',
        role: 'Cooling & Power Editor',
        department: 'CPU Cooling, Airflow & Power Supplies',
        bio: 'Cooling & Power Editor covering CPU coolers, case airflow, and PSU reliability for Zyrox.',
        longBio: `Cooling and power-delivery coverage at Zyrox is led by an editor who has spent years testing coolers, fans, and power supplies under real thermal and electrical load. The focus is long-term component reliability: how a system holds up after months of daily use, not just how it performs in a launch-day review.

PSU coverage on Zyrox uses oscilloscope-based testing, transient load evaluation, and sustained thermals, not just the 80 PLUS rating printed on the side of the unit. CPU cooler reviews measure noise, temperature, and clearance against realistic chassis constraints.`,
        avatar: 'DO',
        expertise: ['CPU Cooling', 'Case Airflow', 'Power Supplies', 'Thermal Management', 'Build Reliability'],
        social: {
            twitter: 'https://twitter.com/zyrox',
        },
    },
    {
        slug: 'rachel-kim',
        name: 'Rachel Kim',
        role: 'Windows & Troubleshooting Editor',
        department: 'Windows, Laptops & Upgrade Planning',
        bio: 'Windows & Troubleshooting Editor covering Windows, system troubleshooting, and practical upgrade advice for Zyrox.',
        longBio: `Windows and troubleshooting coverage at Zyrox is handled by an editor with a background in IT support and system administration, which informs an approach that prioritizes clarity and reproducibility. Articles are written to be followed by readers without a technical background, with step-by-step instructions and screenshots where helpful.

Coverage spans Windows performance, update problems, blue-screen errors, driver issues, laptop upgrade paths, and battery optimization. Recommendations are based on testing across multiple Windows builds and hardware configurations.`,
        avatar: 'RK',
        expertise: ['Windows', 'Troubleshooting', 'Laptops', 'Upgrade Planning', 'System Optimization'],
        social: {
            twitter: 'https://twitter.com/zyrox',
        },
    },
];

export function getAuthorBySlug(slug: string): Author | null {
    return authors.find((a) => a.slug === slug) ?? null;
}

export function getAllAuthors(): Author[] {
    return authors;
}
