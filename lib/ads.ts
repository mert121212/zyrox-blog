/**
 * Safely injects an ad placeholder into article HTML after the Nth paragraph.
 * Uses index search to avoid malformed HTML tag splitting.
 */
export function injectMidArticleAd(html: string, afterParagraph: number = 4): string {
    if (!html) return '';
    const adHtml = `<div id="mid-article-ad-placeholder"></div>`;

    let count = 0;
    let index = 0;
    let targetIndex = -1;

    // Count total <p> closures and find the target paragraph
    while (index !== -1) {
        index = html.indexOf('</p>', index);
        if (index !== -1) {
            count++;
            if (count === afterParagraph) {
                targetIndex = index + 4; // right after '</p>'
                break;
            }
            index += 4;
        }
    }

    if (targetIndex !== -1) {
        return html.slice(0, targetIndex) + adHtml + html.slice(targetIndex);
    }

    // If there are fewer paragraphs than afterParagraph, but at least 2, place at midpoint
    if (count >= 2) {
        const midTarget = Math.floor(count / 2);
        let midCount = 0;
        let midIdx = 0;
        while (midIdx !== -1) {
            midIdx = html.indexOf('</p>', midIdx);
            if (midIdx !== -1) {
                midCount++;
                if (midCount === midTarget) {
                    const insertAt = midIdx + 4;
                    return html.slice(0, insertAt) + adHtml + html.slice(insertAt);
                }
                midIdx += 4;
            }
        }
    }

    return html;
}
