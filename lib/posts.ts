import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'app', 'posts');

function normalizeDate(value: unknown): string {
    if (typeof value === 'string') return value;
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    return 'Unknown date';
}

export type Post = {
    slug: string;
    title: string;
    meta_description: string;
    date: string;
    category: string;
    tags: string[];
    keywords: string[];
    excerpt: string;
    content: string;
    author: string; // author slug
};

export function getAllPosts(): Post[] {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames
        .filter((file) => file.endsWith('.md'))
        .map((fileName) => {
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug: fileName.replace(/\.md$/, ''),
                title: data.title,
                meta_description: data.meta_description,
                date: normalizeDate(data.date),
                category: data.category,
                tags: data.tags || [],
                keywords: data.keywords || data.tags || [],
                excerpt: data.meta_description,
                content,
                author: data.author || 'marcus-holt',
            } as Post;
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title,
        meta_description: data.meta_description,
        date: normalizeDate(data.date),
        category: data.category,
        tags: data.tags || [],
        keywords: data.keywords || data.tags || [],
        excerpt: data.meta_description,
        content,
        author: data.author || 'marcus-holt',
    } as Post;
}

export function getPostsByCategory(category: string): Post[] {
    return getAllPosts().filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): Post[] {
    return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getCategories(): string[] {
    return Array.from(new Set(getAllPosts().map((post) => post.category))).sort();
}

export function getTags(): string[] {
    return Array.from(new Set(getAllPosts().flatMap((post) => post.tags))).sort();
}

export function getPostsByAuthor(authorSlug: string): Post[] {
    return getAllPosts().filter((post) => post.author === authorSlug);
}
