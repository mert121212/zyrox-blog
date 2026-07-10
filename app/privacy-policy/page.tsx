import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for Zyrox — how we collect, use, and protect your information.',
    alternates: { canonical: '/privacy-policy' },
    robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
    const lastUpdated = 'July 1, 2026';

    return (
        <main className="page-shell">
            <div className="container prose-page">
                <h1>Privacy Policy</h1>
                <p className="prose-meta">Last updated: {lastUpdated}</p>

                <p>
                    This Privacy Policy explains how Zyrox ("we", "us", or "our") collects, uses, and shares information when you visit our website. We are committed to being straightforward about our data practices.
                </p>

                <h2>Information We Collect</h2>
                <h3>Information collected automatically</h3>
                <p>
                    When you visit Zyrox, our hosting provider and any analytics services we use may automatically collect certain technical information, including:
                </p>
                <ul>
                    <li>Your IP address (usually truncated or anonymised)</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent on each page</li>
                    <li>Referring URL (the page you came from)</li>
                    <li>Device type</li>
                </ul>
                <p>
                    This information is used in aggregate form to understand how readers use the site, which articles are most helpful, and how to improve the content and user experience.
                </p>

                <h3>Information you provide voluntarily</h3>
                <p>
                    Zyrox does not currently operate a newsletter, comment system, or user account system. We do not ask you to submit personal information directly.
                </p>

                <h2>Cookies</h2>
                <p>
                    We may use cookies and similar tracking technologies to understand site usage and improve the experience for returning visitors. These cookies do not contain personally identifiable information.
                </p>
                <p>
                    You can control cookie behaviour through your browser settings. Disabling cookies may affect some site functionality, but the core reading experience will remain intact.
                </p>

                <h2>Advertising</h2>
                <p>
                    Zyrox may display advertisements through third-party advertising networks, including Google AdSense. These networks may use cookies and web beacons to serve ads based on your prior visits to this and other websites. You can opt out of personalised advertising by visiting{' '}
                    <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>{' '}
                    or by using the{' '}
                    <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">NAI opt-out tool</a>.
                </p>
                <p>
                    Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.
                </p>

                <h2>Third-Party Services</h2>
                <p>
                    We may use third-party services to analyse site traffic and improve performance. These services have their own privacy policies governing how they use data:
                </p>
                <ul>
                    <li>
                        <strong>Google Analytics / Google AdSense:</strong>{' '}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>
                    </li>
                </ul>
                <p>
                    We do not sell or share your personal information with third parties for their own marketing purposes.
                </p>

                <h2>Links to External Sites</h2>
                <p>
                    Zyrox articles may link to external websites for reference or further reading. We are not responsible for the privacy practices of those sites and encourage you to review their policies independently.
                </p>

                <h2>Children's Privacy</h2>
                <p>
                    Zyrox is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has submitted personal information to us, please contact us and we will take steps to remove it.
                </p>

                <h2>Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of the page. Continued use of the site after changes are posted constitutes your acceptance of the updated policy.
                </p>

                <h2>Contact</h2>
                <p>
                    If you have questions about this Privacy Policy or our data practices, you can reach us through the contact information on our site. We aim to respond to privacy-related enquiries within a reasonable timeframe.
                </p>
            </div>
        </main>
    );
}
