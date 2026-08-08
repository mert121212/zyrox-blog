'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem('zyrox-cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('zyrox-cookie-consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <>
            <style>{`
                .cookie-banner-container {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: var(--card-bg, #ffffff);
                    border-top: 1px solid var(--border, #eaeaea);
                    padding: 1.5rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 9999;
                    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.1);
                    gap: 1.5rem;
                }
                .cookie-banner-text {
                    max-width: 800px;
                    margin: 0;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: var(--foreground, #333);
                }
                .cookie-banner-actions {
                    display: flex;
                    gap: 1rem;
                    flex-shrink: 0;
                }
                .cookie-banner-btn {
                    background-color: var(--accent, #0070f3);
                    color: var(--background, #fff);
                    border: none;
                    padding: 0.75rem 2rem;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
                    box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
                }
                .cookie-banner-btn:hover {
                    opacity: 0.9;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
                }
                .cookie-link {
                    color: var(--accent, #0070f3);
                    text-decoration: underline;
                    font-weight: 600;
                    transition: opacity 0.2s ease;
                }
                .cookie-link:hover {
                    opacity: 0.8;
                }
                @media (max-width: 768px) {
                    .cookie-banner-container {
                        flex-direction: column;
                        align-items: stretch;
                        padding: 1.25rem;
                        gap: 1.25rem;
                        border-top-left-radius: 12px;
                        border-top-right-radius: 12px;
                    }
                    .cookie-banner-actions {
                        width: 100%;
                    }
                    .cookie-banner-btn {
                        width: 100%;
                        text-align: center;
                        padding: 1rem;
                    }
                    .cookie-banner-text {
                        font-size: 0.9rem;
                        text-align: center;
                    }
                }
            `}</style>
            <div className="cookie-banner-container">
                <div className="cookie-banner-content">
                    <p className="cookie-banner-text">
                        We use cookies and third-party tracking technologies (like Google AdSense) to serve personalized ads and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies as described in our{' '}
                        <Link href="/privacy-policy" className="cookie-link">Privacy Policy</Link>.
                    </p>
                </div>
                <div className="cookie-banner-actions">
                    <button onClick={acceptCookies} className="cookie-banner-btn">
                        Accept
                    </button>
                </div>
            </div>
        </>
    );
}
