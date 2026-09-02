/**
 * Injects an ad unit into article HTML content after approximately the Nth paragraph.
 * This is used to insert mid-article ads without needing React components inside
 * dangerouslySetInnerHTML content.
 */
export function injectMidArticleAd(html: string, afterParagraph: number = 4): string {
    const adHtml = `<div id="mid-article-ad-placeholder"></div>`;

    // Split by closing </p> tags and inject after the Nth one
    const parts = html.split('</p>');
    if (parts.length <= afterParagraph) {
        // Not enough paragraphs, inject before the last one
        const midPoint = Math.floor(parts.length / 2);
        if (midPoint === 0) return html; // Too short
        parts.splice(midPoint, 0, '</p>' + adHtml);
        return parts.join('</p>');
    }

    parts.splice(afterParagraph, 0, '</p>' + adHtml);
    return parts.join('</p>');
}
