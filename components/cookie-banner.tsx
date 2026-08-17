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
        <div className="cookie-banner-container">
            <div className="cookie-banner-content">
                <p className="cookie-banner-text">
                    We use cookies to improve your experience and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies as described in our{' '}
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
    );
}
