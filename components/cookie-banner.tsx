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
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'var(--card-bg)',
            borderTop: '1px solid var(--border)',
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 9999,
            boxShadow: '0 -4px 12px rgba(0,0,0,0.1)'
        }} className="cookie-banner-container">
            <div style={{ maxWidth: '800px' }}>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                    We use cookies and third-party tracking technologies (like Google AdSense) to serve personalized ads and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies as described in our{' '}
                    <Link href="/privacy-policy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Privacy Policy</Link>.
                </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexShrink: 0, marginLeft: '2rem' }}>
                <button
                    onClick={acceptCookies}
                    style={{
                        backgroundColor: 'var(--accent)',
                        color: 'var(--background)',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    Accept
                </button>
            </div>
        </div>
    );
}
