/**
 * Schema helpers — extract structured data from post markdown at render time.
 * No article files are modified; everything is derived from existing content.
 */

// ── Reading Time ──────────────────────────────────────────────
export function calculateReadingTime(content: string): number {
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 230)); // ~230 wpm average
}

// ── FAQ Schema ────────────────────────────────────────────────
// Extracts question-like H2/H3 headings and uses the first paragraph
// after each heading as the answer. Works great for "What is…", "Why…",
// "How…", "Can you…", "Is it…", "Should I…", "Do I…" style headings.

interface FAQItem {
    question: string;
    answer: string;
}

const QUESTION_PATTERNS = [
    /^what\s/i,
    /^why\s/i,
    /^how\s/i,
    /^can\s(you|i|we)\s/i,
    /^is\s(it|there|this)\s/i,
    /^should\s(i|you|we)\s/i,
    /^do\s(i|you|we)\s/i,
    /^does\s/i,
    /^which\s/i,
    /^when\s/i,
    /^where\s/i,
    /\?$/,
];

function isQuestionLike(heading: string): boolean {
    return QUESTION_PATTERNS.some((pattern) => pattern.test(heading.trim()));
}

export function extractFAQItems(markdownContent: string): FAQItem[] {
    const lines = markdownContent.split('\n');
    const faqs: FAQItem[] = [];
    let currentQuestion: string | null = null;
    let currentAnswerLines: string[] = [];

    for (const line of lines) {
        const headingMatch = line.match(/^#{2,3}\s+(.+)$/);
        if (headingMatch) {
            // Save previous Q&A if it exists
            if (currentQuestion && currentAnswerLines.length > 0) {
                const answer = currentAnswerLines
                    .join(' ')
                    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // strip markdown links
                    .replace(/[*_`~]/g, '') // strip formatting
                    .trim();
                if (answer.length > 20) {
                    faqs.push({ question: currentQuestion, answer });
                }
            }

            const heading = headingMatch[1].trim();
            if (isQuestionLike(heading)) {
                currentQuestion = heading.endsWith('?') ? heading : heading + '?';
                currentAnswerLines = [];
            } else {
                currentQuestion = null;
                currentAnswerLines = [];
            }
        } else if (currentQuestion) {
            const trimmed = line.trim();
            // Only grab the first paragraph (stop at blank line or next heading)
            if (trimmed === '' && currentAnswerLines.length > 0) {
                // End of first paragraph — finalize this answer
                const answer = currentAnswerLines
                    .join(' ')
                    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                    .replace(/[*_`~]/g, '')
                    .trim();
                if (answer.length > 20) {
                    faqs.push({ question: currentQuestion, answer });
                }
                currentQuestion = null;
                currentAnswerLines = [];
            } else if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('|') && !trimmed.startsWith('![')) {
                currentAnswerLines.push(trimmed);
            }
        }
    }

    // Catch trailing Q&A
    if (currentQuestion && currentAnswerLines.length > 0) {
        const answer = currentAnswerLines
            .join(' ')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/[*_`~]/g, '')
            .trim();
        if (answer.length > 20) {
            faqs.push({ question: currentQuestion, answer });
        }
    }

    return faqs.slice(0, 10); // Google recommends max ~10 FAQ items
}

export function buildFAQSchema(faqs: FAQItem[]) {
    if (faqs.length === 0) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

// ── HowTo Schema ──────────────────────────────────────────────
// For posts whose title starts with "How to", extracts numbered
// or heading-based steps.

interface HowToStep {
    name: string;
    text: string;
}

export function extractHowToSteps(markdownContent: string): HowToStep[] {
    const lines = markdownContent.split('\n');
    const steps: HowToStep[] = [];
    let currentStepName: string | null = null;
    let currentStepText: string[] = [];

    for (const line of lines) {
        const headingMatch = line.match(/^#{2,3}\s+(.+)$/);
        if (headingMatch) {
            // Save previous step
            if (currentStepName && currentStepText.length > 0) {
                steps.push({
                    name: currentStepName,
                    text: currentStepText
                        .join(' ')
                        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                        .replace(/[*_`~]/g, '')
                        .trim(),
                });
            }

            const heading = headingMatch[1].trim();
            // Skip generic headings like "Conclusion", "Final Thoughts", etc.
            if (!/^(conclusion|final\s+thoughts|wrap.?up|summary|tldr|tl;dr|bottom\s+line)/i.test(heading)) {
                currentStepName = heading;
                currentStepText = [];
            } else {
                currentStepName = null;
                currentStepText = [];
            }
        } else if (currentStepName) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('![')) {
                currentStepText.push(trimmed);
            }
        }
    }

    // Catch trailing step
    if (currentStepName && currentStepText.length > 0) {
        steps.push({
            name: currentStepName,
            text: currentStepText
                .join(' ')
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                .replace(/[*_`~]/g, '')
                .trim(),
        });
    }

    return steps;
}

export function buildHowToSchema(title: string, description: string, steps: HowToStep[], readingMinutes: number) {
    if (steps.length < 2) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: title,
        description: description,
        totalTime: `PT${readingMinutes}M`,
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text.slice(0, 500), // Keep steps concise for schema
        })),
    };
}
