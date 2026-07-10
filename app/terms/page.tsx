import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Use',
    description: 'Terms of Use for Zyrox — the rules and conditions for using our website and content.',
    alternates: { canonical: '/terms' },
    robots: { index: true, follow: true },
};

export default function TermsPage() {
    const lastUpdated = 'July 1, 2026';

    return (
        <main className="page-shell">
            <div className="container prose-page">
                <h1>Terms of Use</h1>
                <p className="prose-meta">Last updated: {lastUpdated}</p>

                <p>
                    By accessing and using Zyrox ("this website", "the site"), you accept and agree to be bound by the following Terms of Use. If you do not agree with any part of these terms, please do not use the site.
                </p>

                <h2>Use of Content</h2>
                <p>
                    All content published on Zyrox — including articles, guides, comparisons, and other written material — is protected by copyright. You may read, share links to, and quote brief excerpts from our content for personal, non-commercial purposes, provided you give clear attribution and link back to the original article.
                </p>
                <p>
                    You may not reproduce, redistribute, or republish substantial portions of our content without prior written permission. This includes copying articles to other websites, AI training datasets, or content aggregation services.
                </p>

                <h2>Accuracy of Information</h2>
                <p>
                    We make every reasonable effort to ensure the accuracy and relevance of the information published on Zyrox. However, the PC hardware landscape changes rapidly. Prices, availability, compatibility, and performance characteristics can change over time. Always verify critical purchasing or technical decisions with up-to-date sources.
                </p>
                <p>
                    Zyrox does not guarantee that the information on this site is complete, current, or free of errors. We accept no liability for decisions made based on information published here.
                </p>

                <h2>Affiliate Links and Advertising</h2>
                <p>
                    Some articles on Zyrox may contain affiliate links. If you make a purchase through an affiliate link, we may earn a small commission at no additional cost to you. This does not influence our editorial decisions or recommendations.
                </p>
                <p>
                    We also display third-party advertisements through services such as Google AdSense. These are clearly distinguishable from editorial content. We do not endorse the products or services advertised.
                </p>

                <h2>Technical Advice Disclaimer</h2>
                <p>
                    Hardware and software guides on Zyrox are provided for informational purposes. Following any technical advice on this site is done at your own risk. We are not responsible for damage to hardware, data loss, or other consequences that may arise from following guides or recommendations published here.
                </p>
                <p>
                    Before making significant changes to your system — including BIOS modifications, storage repartitioning, or hardware installation — back up your data and ensure you understand the risks involved.
                </p>

                <h2>External Links</h2>
                <p>
                    Zyrox may link to third-party websites for reference or additional information. These links are provided for convenience and do not imply endorsement. We have no control over the content or availability of external sites and accept no responsibility for them.
                </p>

                <h2>User Conduct</h2>
                <p>
                    You agree not to use this site in any way that is unlawful, harmful, or disruptive. You may not attempt to gain unauthorised access to any part of the site or its underlying systems.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                    To the fullest extent permitted by applicable law, Zyrox and its authors shall not be liable for any indirect, incidental, or consequential damages arising from your use of this site or reliance on its content.
                </p>

                <h2>Changes to These Terms</h2>
                <p>
                    We reserve the right to update these Terms of Use at any time. Changes will be effective when posted to this page, with the "Last updated" date revised accordingly. Your continued use of the site after changes are posted constitutes your acceptance of the revised terms.
                </p>

                <h2>Governing Law</h2>
                <p>
                    These terms are governed by applicable law. Any disputes arising from the use of this site shall be subject to the jurisdiction determined by applicable legal requirements.
                </p>

                <h2>Contact</h2>
                <p>
                    If you have questions about these Terms of Use, you can reach us through the contact information available on this site.
                </p>
            </div>
        </main>
    );
}
