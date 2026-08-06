import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with the Zyrox editorial team for questions, feedback, business inquiries, or content suggestions.',
    alternates: { canonical: '/contact' },
    robots: { index: true, follow: true },
};

export default function ContactPage() {
    return (
        <main className="page-shell">
            <div className="container prose-page">
                <h1>Contact Us</h1>
                <p>
                    We appreciate hearing from our readers. Whether you have a question about an article, want to suggest a topic, or need to reach us for business purposes, we are happy to help.
                </p>

                <h2>General Inquiries</h2>
                <p>
                    For questions about our content, hardware recommendations, or general feedback, send us an email at{' '}
                    <a href="mailto:zyroxlabcom@gmail.com" className="post-link" style={{ display: 'inline', marginTop: 0 }}>
                        zyroxlabcom@gmail.com
                    </a>.
                    We read every message and aim to respond within 48 hours on business days.
                </p>

                <h2>Content Suggestions</h2>
                <p>
                    Have a hardware topic you would like us to cover? A comparison you have been searching for but cannot find a good answer to? We are always looking for ideas that would genuinely help readers. Let us know what you need and we will consider it for our editorial calendar.
                </p>

                <h2>Business & Partnerships</h2>
                <p>
                    For advertising inquiries, media partnerships, or professional collaboration, please reach out to us at{' '}
                    <a href="mailto:zyroxlabcom@gmail.com" className="post-link" style={{ display: 'inline', marginTop: 0 }}>
                        zyroxlabcom@gmail.com
                    </a>{' '}
                    with the subject line <strong>"Business Inquiry"</strong>. Please include a brief description of your proposal and how it relates to our audience.
                </p>

                <h2>Corrections & Updates</h2>
                <p>
                    If you spot an error in one of our articles — whether it is an incorrect specification, an outdated price, or a factual mistake — please let us know. We take accuracy seriously and will issue corrections promptly. Include the article URL and a description of the issue in your email.
                </p>

                <h2>Response Times</h2>
                <p>
                    We are a small editorial team, so response times may vary. For general inquiries, expect a reply within <strong>1–2 business days</strong>. For business-related emails, please allow up to <strong>3–5 business days</strong> for a detailed response.
                </p>

                <h2>Other Ways to Reach Us</h2>
                <div className="about-topics-grid" style={{ marginTop: '1rem' }}>
                    <div className="about-topic-card card">
                        <h3>📧 Email</h3>
                        <p>
                            <a href="mailto:zyroxlabcom@gmail.com" style={{ color: 'var(--accent)' }}>zyroxlabcom@gmail.com</a>
                        </p>
                    </div>
                    <div className="about-topic-card card">
                        <h3>📍 Based In</h3>
                        <p>Online publication serving a global English-speaking audience.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
