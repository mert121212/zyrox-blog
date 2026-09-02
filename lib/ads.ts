/**
 * Injects ad placeholders into article HTML after specific paragraphs.
 * Places two mid-article ads: one after the 3rd paragraph and one after the 8th.
 * Uses index search to avoid malformed HTML tag splitting.
 */
export function injectMidArticleAds(html: string): string {
    if (!html) return '';

    // Count total </p> tags first
    let totalParagraphs = 0;
    let searchIdx = 0;
    while (true) {
        const found = html.indexOf('</p>', searchIdx);
        if (found === -1) break;
        totalParagraphs++;
        searchIdx = found + 4;
    }

    // Need at least 4 paragraphs to inject anything
    if (totalParagraphs < 4) return html;

    // Determine insertion points
    const insertAfter: number[] = [];

    if (totalParagraphs >= 8) {
        // Long article: insert after 3rd and 8th paragraph
        insertAfter.push(3, 8);
    } else if (totalParagraphs >= 5) {
        // Medium article: insert after 3rd paragraph only
        insertAfter.push(3);
    } else {
        // Short article (4 paragraphs): insert after 2nd
        insertAfter.push(2);
    }

    // Insert from last to first to preserve indices
    const sortedDesc = [...insertAfter].sort((a, b) => b - a);

    let result = html;
    for (let i = 0; i < sortedDesc.length; i++) {
        const afterP = sortedDesc[i];
        const placeholderId = `mid-article-ad-placeholder-${i}`;
        const adHtml = `<div id="${placeholderId}"></div>`;

        let count = 0;
        let idx = 0;
        while (true) {
            const found = result.indexOf('</p>', idx);
            if (found === -1) break;
            count++;
            if (count === afterP) {
                const insertAt = found + 4;
                result = result.slice(0, insertAt) + adHtml + result.slice(insertAt);
                break;
            }
            idx = found + 4;
        }
    }

    return result;
}
