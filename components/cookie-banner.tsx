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

    const declineCookies = () => {
        localStorage.setItem('zyrox-cookie-consent', 'false');
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
                    background: linear-gradient(180deg, rgba(16, 22, 44, 0.97), rgba(12, 17, 33, 0.98));
                    backdrop-filter: blur(16px);
                    border-top: 1px solid var(--border);
                    padding: 1.5rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 9999;
                    box-shadow: var(--shadow);
                    gap: 1.5rem;
                }
                .cookie-banner-text {
                    max-width: 800px;
                    margin: 0;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: var(--muted);
                }
                .cookie-banner-actions {
                    display: flex;
                    gap: 1rem;
                    flex-shrink: 0;
                }
                .cookie-banner-btn {
                    padding: 0.75rem 2rem;
                    border-radius: 999px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: transform 180ms ease, opacity 180ms ease;
                }
                .cookie-banner-btn:hover {
                    transform: translateY(-1px);
                    opacity: 0.9;
                }
                .cookie-banner-btn-primary {
                    background: linear-gradient(90deg, var(--accent), var(--accent-2));
                    color: white;
                    border: none;
                }
                .cookie-banner-btn-secondary {
                    background: rgba(255, 255, 255, 0.04);
                    color: var(--text);
                    border: 1px solid var(--border);
                }
                .cookie-link {
                    color: var(--accent);
                    text-decoration: none;
                    font-weight: 600;
                    transition: opacity 180ms ease;
                }
                .cookie-link:hover {
                    opacity: 0.8;
                    text-decoration: underline;
                }
                @media (max-width: 768px) {
                    .cookie-banner-container {
                        flex-direction: column;
                        align-items: stretch;
                        padding: 1.25rem;
                        gap: 1.25rem;
                        border-top-left-radius: 20px;
                        border-top-right-radius: 20px;
                    }
                    .cookie-banner-actions {
                        flex-direction: column;
                        width: 100%;
                    }
                    .cookie-banner-btn {
                        width: 100%;
                        text-align: center;
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
                    <button onClick={declineCookies} className="cookie-banner-btn cookie-banner-btn-secondary">
                        Decline
                    </button>
                    <button onClick={acceptCookies} className="cookie-banner-btn cookie-banner-btn-primary">
                        Accept
                    </button>
                </div>
            </div>
        </>
    );
}
