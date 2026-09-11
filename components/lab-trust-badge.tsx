import Link from 'next/link';

interface LabTrustBadgeProps {
    category?: string;
}

export function LabTrustBadge({ category }: LabTrustBadgeProps) {
    return (
        <div className="lab-trust-badge" role="region" aria-label="Editorial & Testing Guarantee">
            <div className="lab-trust-badge__icon">
                <span>🔬</span>
            </div>
            <div className="lab-trust-badge__content">
                <div className="lab-trust-badge__header">
                    <strong>Zyrox In-House Lab Tested</strong>
                    <span className="lab-trust-badge__pill">Verified Editorial</span>
                </div>
                <p className="lab-trust-badge__text">
                    All hardware advice, thermals, and benchmarks are tested on our dedicated test benches. We accept zero manufacturer payments for positive conclusions.
                </p>
            </div>
            <Link href="/about/" className="lab-trust-badge__link">
                Testing Policy →
            </Link>
        </div>
    );
}
