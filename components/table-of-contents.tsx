'use client';

import { useEffect, useState } from 'react';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        // Parse headings from markdown content
        const headingRegex = /^(#{1,3})\s+(.+.+)$/gm;
        const matches = Array.from(content.matchAll(headingRegex));
        
        const tocItems: TocItem[] = matches.map((match, index) => {
            const level = match[1].length;
            const text = match[2].trim();
            const id = `heading-${index}`;
            return { id, text, level };
        });

        setHeadings(tocItems);

        // Add IDs to headings in the DOM
        const addIdsToHeadings = () => {
            const articleBody = document.querySelector('.article-body');
            if (!articleBody) return;

            const headingElements = articleBody.querySelectorAll('h1, h2, h3');
            headingElements.forEach((heading, index) => {
                heading.id = `heading-${index}`;
            });
        };

        // Wait for content to be rendered
        setTimeout(addIdsToHeadings, 100);

        // Intersection Observer for active heading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -70% 0px' }
        );

        const observeHeadings = () => {
            const headingElements = document.querySelectorAll('.article-body h1, .article-body h2, .article-body h3');
            headingElements.forEach((heading) => observer.observe(heading));
        };

        setTimeout(observeHeadings, 200);

        return () => observer.disconnect();
    }, [content]);

    if (headings.length === 0) return null;

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Header height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <aside className="table-of-contents">
            <h3 className="toc-heading">Table of Contents</h3>
            <ul className="toc-list">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={`toc-item toc-item--${heading.level} ${
                            activeId === heading.id ? 'toc-item--active' : ''
                        }`}
                    >
                        <button
                            onClick={() => scrollToHeading(heading.id)}
                            className="toc-link"
                        >
                            {heading.text}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
