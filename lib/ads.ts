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

    // Determine insertion point: exactly 1 non-intrusive mid-article slot
    const insertAfter: number[] = [];
    if (totalParagraphs >= 6) {
        insertAfter.push(4); // Natural reading break around middle of initial sections
    } else {
        insertAfter.push(3);
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
