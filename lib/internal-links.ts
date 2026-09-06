import type { Post } from '@/lib/posts';

export function getRelevanceScore(post: Post, currentPost: Post): number {
    let score = 0;

    // Category match
    if (post.category === currentPost.category) {
        score += 5;
    }

    // Tag overlap
    const currentTags = new Set(currentPost.tags.map((t) => t.toLowerCase()));
    for (const tag of post.tags) {
        if (currentTags.has(tag.toLowerCase())) {
            score += 2;
        }
    }

    // Keyword overlap
    const currentKeywords = new Set(currentPost.keywords.map((k) => k.toLowerCase()));
    for (const keyword of post.keywords) {
        if (currentKeywords.has(keyword.toLowerCase())) {
            score += 3;
        }
    }

    return score;
}

export function getTopRelatedPost(currentPost: Post, allPosts: Post[]): Post | null {
    const candidates = allPosts
        .filter((p) => p.slug !== currentPost.slug)
        .map((p) => ({ post: p, score: getRelevanceScore(p, currentPost) }))
        .sort((a, b) => b.score - a.score);

    return candidates.length > 0 && candidates[0].score > 0 ? candidates[0].post : null;
}

/**
 * Injects a contextual "Recommended Guide" link callout directly into the HTML body
 * of an article. Placed after paragraph 5 (between Ad 1 at p3 and Ad 2 at p8).
 * This establishes in-content contextual internal links (highest PageRank weight in Google).
 */
export function injectContextualInternalLink(
    html: string,
    currentPost: Post,
    allPosts: Post[]
): string {
    if (!html) return '';

    const topRelated = getTopRelatedPost(currentPost, allPosts);
    if (!topRelated) return html;

    // Count paragraphs
    let totalParagraphs = 0;
    let searchIdx = 0;
    while (true) {
        const found = html.indexOf('</p>', searchIdx);
        if (found === -1) break;
        totalParagraphs++;
        searchIdx = found + 4;
    }

    // Target paragraph 5 if at least 7 paragraphs, or paragraph 2 if between 4-6
    let targetP = 0;
    if (totalParagraphs >= 7) {
        targetP = 5;
    } else if (totalParagraphs >= 4) {
        targetP = 2;
    } else {
        return html; // Don't crowd very short content
    }

    const calloutHtml = `
<aside class="inline-guide-callout" aria-label="Recommended reading">
    <span class="inline-guide-callout__eyebrow">⚡ Related In-Depth Guide</span>
    <a href="/posts/${topRelated.slug}/" class="inline-guide-callout__title">
        ${topRelated.title} →
    </a>
    <p class="inline-guide-callout__desc">${topRelated.meta_description}</p>
</aside>
`.trim();

    let count = 0;
    let idx = 0;
    while (true) {
        const found = html.indexOf('</p>', idx);
        if (found === -1) break;
        count++;
        if (count === targetP) {
            const insertAt = found + 4;
            return html.slice(0, insertAt) + '\n' + calloutHtml + '\n' + html.slice(insertAt);
        }
        idx = found + 4;
    }

    return html;
}
