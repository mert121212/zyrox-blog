'use client';

import { useState } from 'react';

interface SocialShareProps {
    title: string;
    url: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
    const [copied, setCopied] = useState(false);

    const fullUrl = typeof window !== 'undefined' ? window.location.href : `https://zyroxlab.com${url}`;
    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedTitle = encodeURIComponent(title);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            // fallback
        }
    };

    return (
        <div className="social-share-wrap" aria-label="Share this guide">
            <span className="social-share-label">Share:</span>
            <div className="social-share-buttons">
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=zyrox`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn share-btn--twitter"
                    aria-label="Share on X (Twitter)"
                    title="Share on X"
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>Post</span>
                </a>

                <a
                    href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn share-btn--whatsapp"
                    aria-label="Share via WhatsApp"
                    title="Share on WhatsApp"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.073-2.146-.527-1.727-.714-2.822-2.484-2.909-2.599-.086-.115-.694-.925-.694-1.764 0-.84.436-1.25.592-1.423.156-.172.34-.216.455-.216.114 0 .229.001.328.006.104.005.244-.04.382.291.144.347.491 1.2.534 1.288.043.088.072.19.014.305-.058.115-.087.187-.173.289l-.26.309c-.087.097-.179.203-.077.378.102.175.453.748.972 1.211.669.596 1.233.78 1.408.868.175.088.277.073.379-.044.103-.117.437-.509.553-.683.116-.174.233-.146.39-.088.158.058 1.002.472 1.175.559.173.087.288.13.331.203.043.073.043.421-.101.826z" />
                    </svg>
                    <span>Share</span>
                </a>

                <a
                    href={`https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn share-btn--reddit"
                    aria-label="Share on Reddit"
                    title="Share on Reddit"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701z" />
                    </svg>
                    <span>Reddit</span>
                </a>

                <button
                    type="button"
                    onClick={handleCopy}
                    className={`share-btn share-btn--copy ${copied ? 'copied' : ''}`}
                    aria-label="Copy article link"
                    title="Copy Link"
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
            </div>
        </div>
    );
}
