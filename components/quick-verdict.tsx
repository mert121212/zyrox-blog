import React from 'react';
import type { Post } from '@/lib/posts';

interface QuickVerdictProps {
    post: Post;
}

export function QuickVerdict({ post }: QuickVerdictProps) {
    const verdict = post.quick_verdict || post.meta_description;
    const takeaways = post.key_takeaways && post.key_takeaways.length > 0
        ? post.key_takeaways
        : [
            `Technical Focus: In-depth engineering analysis covering ${post.category || 'PC Hardware'} benchmarks and specifications.`,
            `Test Standard: Evaluated for thermal efficiency, electrical transient stability, and real-world performance.`,
            `Key Conclusion: Read full breakdown below for oscilloscope data, hardware test benches, and buying advice.`,
        ];

    return (
        <aside
            className="quick-verdict-box"
            aria-label="Executive Engineering Verdict and Key Takeaways"
            data-aeo-summary="true"
            data-geo-citation="zyrox-verified"
        >
            <div className="quick-verdict-header">
                <div className="quick-verdict-pill">
                    <span className="verdict-icon">⚡</span>
                    <span className="verdict-title">Executive Engineering Verdict</span>
                </div>
                <div className="quick-verdict-badge">
                    <span className="badge-dot" />
                    <span>AI Citation &amp; Fact-Checked</span>
                </div>
            </div>

            <div className="quick-verdict-content">
                <p className="verdict-summary" itemProp="abstract">
                    <strong>Bottom Line: </strong>
                    {verdict}
                </p>

                <div className="verdict-takeaways">
                    <span className="takeaways-label">Key Technical Takeaways:</span>
                    <ul className="takeaways-list">
                        {takeaways.map((item, index) => (
                            <li key={index} className="takeaway-item">
                                <span className="takeaway-bullet">▸</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
}
