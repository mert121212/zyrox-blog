import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer',
    description: 'Important disclaimers about content accuracy, affiliate relationships, and technical advice on Zyrox.',
    alternates: { canonical: '/disclaimer' },
    robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
    return (
        <main className="page-shell">
            <div className="container prose-page">
                <h1>Disclaimer</h1>
                <p className="prose-meta">Last updated: August 1, 2026</p>

                <p>
                    The information provided on Zyrox is for general informational and educational purposes only. While we strive for accuracy in every article, guide, and review we publish, please read and understand the following disclaimers before acting on our content.
                </p>

                <h2>No Professional Advice</h2>
                <p>
                    The content on this website does not constitute professional technical advice, financial advice, or any other form of professional recommendation. Always consult a qualified professional before making decisions that could affect your hardware, data, or finances.
                </p>

                <h2>Accuracy of Information</h2>
                <p>
                    PC hardware specifications, prices, availability, and compatibility can change rapidly. While we update our articles regularly, some information may become outdated between revisions. We recommend verifying critical details — especially prices and compatibility — with the manufacturer or retailer before making a purchase.
                </p>

                <h2>Affiliate Disclosure</h2>
                <p>
                    Some articles on Zyrox may contain affiliate links to products and services. When you click on an affiliate link and make a purchase, we may receive a small commission at no additional cost to you. This helps support the site and allows us to continue producing independent content.
                </p>
                <p>
                    <strong>Important:</strong> Affiliate relationships never influence our editorial decisions. Our recommendations are based on research, testing, and honest evaluation. We recommend products because we believe they are genuinely good options for our readers, not because of commission rates.
                </p>

                <h2>Technical Advice and Risk</h2>
                <p>
                    Guides involving hardware modification, BIOS settings, overclocking, thermal paste application, or software configuration are provided as educational content. Following these guides is done entirely at your own risk. Zyrox and its authors are not responsible for any damage to hardware, data loss, voided warranties, or other negative outcomes resulting from following our guides.
                </p>
                <p>
                    Always back up your data before making system changes. If you are unsure about a procedure, seek assistance from a qualified technician.
                </p>

                <h2>Third-Party Content and Links</h2>
                <p>
                    Zyrox may link to third-party websites, products, and services for reference or additional information. These links do not imply endorsement, and we have no control over the content, accuracy, or availability of external websites. We encourage readers to review the terms and privacy policies of any third-party site they visit.
                </p>

                <h2>Product Reviews and Opinions</h2>
                <p>
                    Product reviews and comparisons published on Zyrox reflect the honest opinions and test results of our editorial team at the time of writing. Individual experiences with products may vary based on configuration, use case, environment, and other factors. Our reviews should be considered one data point among many when making purchasing decisions.
                </p>

                <h2>Advertising</h2>
                <p>
                    Zyrox displays advertisements through third-party advertising networks, including Google AdSense. These advertisements are clearly distinguishable from editorial content. We do not endorse the products or services shown in third-party ads unless explicitly stated otherwise.
                </p>

                <h2>Changes to This Disclaimer</h2>
                <p>
                    We reserve the right to update this Disclaimer at any time. Changes become effective immediately upon posting. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the updated disclaimer.
                </p>

                <h2>Contact</h2>
                <p>
                    If you have questions about this Disclaimer, please reach out to us at{' '}
                    <a href="mailto:zyroxlabcom@gmail.com" className="post-link" style={{ display: 'inline', marginTop: 0 }}>
                        zyroxlabcom@gmail.com
                    </a>.
                </p>
            </div>
        </main>
    );
}
