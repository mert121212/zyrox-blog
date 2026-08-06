import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.resolve(__dirname, '..', 'app', 'posts');

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

// AI detection patterns - common phrases that AI detectors flag
const aiPatterns = [
    /\bdelve\b/gi,
    /\bin today's world\b/gi,
    /\bin the realm of\b/gi,
    /\bit'?s worth noting\b/gi,
    /\bit is worth noting\b/gi,
    /\bultimately\b/gi,
    /\bfurthermore\b/gi,
    /\bmoreover\b/gi,
    /\bin conclusion\b/gi,
    /\bembark\b/gi,
    /\bnavigating the\b/gi,
    /\bunlocking\b/gi,
    /\bharnessing\b/gi,
    /\beverchanging\b/gi,
    /\bever-evolving\b/gi,
    /\blandscape\b/gi,
    /\bseamless(ly)?\b/gi,
    /\bleverag(e|ing)\b/gi,
    /\brobust\b/gi,
    /\bcomprehensive\b/gi,
    /\bensure\b/gi,
    /\butilize\b/gi,
    /\bfacilitate\b/gi,
    /\boptimize\b/gi,
    /\bstreamline\b/gi,
    /\bpivotal\b/gi,
    /\bparamount\b/gi,
    /\bmyriad\b/gi,
    /\bplethora\b/gi,
    /\baforementioned\b/gi,
    /\bmeticulous(ly)?\b/gi,
    /\bintricate\b/gi,
    /\bcommenc(e|ing)\b/gi,
    /\bempowering\b/gi,
    /\bcutting-edge\b/gi,
    /\bnotwithstanding\b/gi,
    /\btransformative\b/gi,
    /\bin this article\b/gi,
    /\blet's dive\b/gi,
    /\blet us dive\b/gi,
    /\bwithout further ado\b/gi,
    /\bgame-?changer\b/gi,
    /\btake(s)? it to the next level\b/gi,
    /\bat the end of the day\b/gi,
    /\brest assured\b/gi,
];

// Positive human signals
const humanPatterns = [
    /\bI\b/g,  // first person
    /\bmy\b/gi,
    /\bI've\b/gi,
    /\bI'd\b/gi,
    /\bI'm\b/gi,
    /\bwe've\b/gi,
    /\byou'll\b/gi,
    /\byou've\b/gi,
    /\bfrankly\b/gi,
    /\bhonestly\b/gi,
    /\bspoiler\b/gi,
    /\blook,\b/gi,
    /\bin my experience\b/gi,
    /\bhere's the thing\b/gi,
    /\bdon't\b/gi,
    /\bcan't\b/gi,
    /\bwon't\b/gi,
    /\bisn't\b/gi,
    /\bdoesn't\b/gi,
];

const results = [];

for (const file of files) {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const { data, content } = matter(raw);
    
    // Word count (body only, no frontmatter)
    const words = content.trim().split(/\s+/).filter(w => w.length > 0).length;
    
    // Count AI pattern matches
    let aiHits = [];
    for (const pat of aiPatterns) {
        const matches = content.match(pat);
        if (matches) {
            aiHits.push({ pattern: pat.source.replace(/\\b/g,''), count: matches.length });
        }
    }
    
    // Count human pattern matches
    let humanHits = 0;
    for (const pat of humanPatterns) {
        const matches = content.match(pat);
        if (matches) humanHits += matches.length;
    }
    
    // Check SEO elements
    const hasH2 = (content.match(/^## /gm) || []).length;
    const hasH3 = (content.match(/^### /gm) || []).length;
    const hasTables = (content.match(/\|.*\|/g) || []).length > 2;
    const hasLists = (content.match(/^- /gm) || []).length + (content.match(/^\d+\. /gm) || []).length;
    const hasBold = (content.match(/\*\*[^*]+\*\*/g) || []).length;
    const hasLinks = (content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []).length;
    const hasHR = (content.match(/^---$/gm) || []).length;
    const hasFAQ = /\bfaq\b|common questions|frequently asked/i.test(content) || /\bQ:\b/.test(content);
    
    // Calculate AI risk score (0-100)
    // Higher = more likely flagged as AI
    const totalAiHitCount = aiHits.reduce((sum, h) => sum + h.count, 0);
    const aiDensity = (totalAiHitCount / words) * 1000; // per 1000 words
    
    // Sentence variety check
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const sentLengths = sentences.map(s => s.trim().split(/\s+/).length);
    const avgSentLen = sentLengths.reduce((a,b) => a+b, 0) / sentLengths.length;
    const sentVariance = sentLengths.reduce((a,b) => a + Math.pow(b - avgSentLen, 2), 0) / sentLengths.length;
    const sentStdDev = Math.sqrt(sentVariance);
    
    // Low variance = more robotic/AI-like
    const varianceScore = sentStdDev < 4 ? 15 : sentStdDev < 6 ? 5 : 0;
    
    // AI risk calculation
    let aiRisk = Math.min(100, Math.round(
        aiDensity * 8 +                    // AI buzzword density
        varianceScore +                      // sentence monotony
        (humanHits < 5 ? 15 : humanHits < 10 ? 8 : 0) + // lack of personal voice
        (words < 800 ? 10 : 0) +            // too short
        (avgSentLen > 22 ? 10 : 0)          // overly long sentences
    ));
    
    // Cap and floor
    aiRisk = Math.max(5, Math.min(85, aiRisk));
    
    // Frontmatter checks
    const hasMeta = !!data.meta_description;
    const hasKeywords = !!(data.keywords && data.keywords.length > 0);
    const hasTags = !!(data.tags && data.tags.length > 0);
    const hasAuthor = !!data.author;
    const hasCategory = !!data.category;
    
    results.push({
        file: file.replace('.md', ''),
        title: data.title || 'NO TITLE',
        words,
        h2Count: hasH2,
        h3Count: hasH3,
        hasTables,
        listItems: hasLists,
        boldItems: hasBold,
        externalLinks: hasLinks,
        hasFAQ,
        hasMeta,
        hasKeywords,
        hasTags,
        hasAuthor,
        hasCategory,
        aiHitCount: totalAiHitCount,
        aiTopHits: aiHits.sort((a,b) => b.count - a.count).slice(0, 5),
        humanHits,
        avgSentLen: Math.round(avgSentLen * 10) / 10,
        sentStdDev: Math.round(sentStdDev * 10) / 10,
        aiRisk,
        date: data.date,
    });
}

// Sort by AI risk descending
results.sort((a, b) => b.aiRisk - a.aiRisk);

// Output report
console.log('\n========================================');
console.log('ZYROX BLOG - FULL ARTICLE AUDIT REPORT');
console.log('========================================\n');

// Summary stats
const totalPosts = results.length;
const avgWords = Math.round(results.reduce((s, r) => s + r.words, 0) / totalPosts);
const shortPosts = results.filter(r => r.words < 1000);
const highRisk = results.filter(r => r.aiRisk >= 50);
const medRisk = results.filter(r => r.aiRisk >= 30 && r.aiRisk < 50);
const lowRisk = results.filter(r => r.aiRisk < 30);
const noKeywords = results.filter(r => !r.hasKeywords);
const noFAQ = results.filter(r => !r.hasFAQ);
const noTables = results.filter(r => !r.hasTables);

console.log(`Total Articles: ${totalPosts}`);
console.log(`Average Word Count: ${avgWords}`);
console.log(`Articles Under 1000 Words: ${shortPosts.length}`);
console.log(`AI Risk HIGH (>=50%): ${highRisk.length}`);
console.log(`AI Risk MEDIUM (30-49%): ${medRisk.length}`);
console.log(`AI Risk LOW (<30%): ${lowRisk.length}`);
console.log(`Missing Keywords: ${noKeywords.length}`);
console.log(`Missing FAQ Section: ${noFAQ.length}`);
console.log(`Missing Tables: ${noTables.length}`);
console.log('');

// Detailed per-article
console.log('=== DETAILED ARTICLE REPORT (sorted by AI risk, highest first) ===\n');

for (const r of results) {
    const riskLabel = r.aiRisk >= 50 ? '🔴 HIGH' : r.aiRisk >= 30 ? '🟡 MEDIUM' : '🟢 LOW';
    const wordLabel = r.words < 800 ? '🔴 TOO SHORT' : r.words < 1000 ? '🟡 BORDERLINE' : '✅ OK';
    
    console.log(`📄 ${r.title}`);
    console.log(`   File: ${r.file}.md`);
    console.log(`   Words: ${r.words} ${wordLabel}`);
    console.log(`   AI Risk: ${r.aiRisk}% ${riskLabel}`);
    console.log(`   H2: ${r.h2Count} | H3: ${r.h3Count} | Tables: ${r.hasTables ? 'Yes' : 'No'} | Lists: ${r.listItems} | Bold: ${r.boldItems} | Links: ${r.externalLinks}`);
    console.log(`   FAQ: ${r.hasFAQ ? 'Yes' : 'No'} | Meta: ${r.hasMeta ? 'Yes' : 'No'} | Keywords: ${r.hasKeywords ? 'Yes' : 'No'} | Tags: ${r.hasTags ? 'Yes' : 'No'}`);
    console.log(`   Avg Sentence Length: ${r.avgSentLen} words | Sentence Variety: ${r.sentStdDev}`);
    if (r.aiTopHits.length > 0) {
        console.log(`   AI Flagged Words: ${r.aiTopHits.map(h => `"${h.pattern}"(${h.count})`).join(', ')}`);
    }
    console.log(`   Human Voice Signals: ${r.humanHits}`);
    console.log('');
}

// Articles that need immediate attention
console.log('=== ARTICLES NEEDING IMMEDIATE ATTENTION ===\n');

if (shortPosts.length > 0) {
    console.log('⚠️  SHORT ARTICLES (under 1000 words):');
    for (const r of shortPosts) {
        console.log(`   - ${r.file}.md (${r.words} words)`);
    }
    console.log('');
}

if (highRisk.length > 0) {
    console.log('⚠️  HIGH AI RISK ARTICLES (>=50%):');
    for (const r of highRisk) {
        console.log(`   - ${r.file}.md (${r.aiRisk}% risk, flagged: ${r.aiTopHits.map(h => h.pattern).join(', ')})`);
    }
    console.log('');
}

if (noKeywords.length > 0) {
    console.log('⚠️  MISSING KEYWORDS FRONTMATTER:');
    for (const r of noKeywords) {
        console.log(`   - ${r.file}.md`);
    }
    console.log('');
}
