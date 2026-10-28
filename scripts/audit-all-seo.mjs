#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const postsDir = path.join(rootDir, 'app', 'posts');
const qgScript = path.join(rootDir, '.agents', 'skills', 'seo-expert', 'scripts', 'quality-gate.mjs');

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

console.log(`Scanning ${files.length} posts with SEO Quality Gate...\n`);

const results = [];

for (const file of files) {
  const filePath = path.join(postsDir, file);
  try {
    const rawOutput = execSync(`node "${qgScript}" "${filePath}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'], // ignore stderr human logs
      maxBuffer: 10 * 1024 * 1024
    });
    const json = JSON.parse(rawOutput.trim());
    results.push({
      file,
      slug: file.replace('.md', ''),
      score: json.overall_score,
      pass: json.pass,
      readability: json.checks.readability.score,
      seo: json.checks.seo.score,
      content: json.checks.content.score,
      wordCount: json.checks.content.checks.find(c => c.name === 'Word Count')?.value || 0,
      hasFaq: json.checks.content.checks.find(c => c.name === 'FAQ Section')?.pass || false,
      titleLength: json.checks.seo.checks.find(c => c.name === 'Title Length')?.value || 0,
      warningsCount: json.warnings.length,
      topWarnings: json.warnings.slice(0, 3)
    });
  } catch (err) {
    console.error(`Error scanning ${file}: ${err.message}`);
  }
}

results.sort((a, b) => a.score - b.score);

const avgScore = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length);
const passCount = results.filter(r => r.pass).length;
const faqCount = results.filter(r => r.hasFaq).length;
const thinCount = results.filter(r => r.wordCount < 1000).length;

console.log('='.repeat(60));
console.log(`TOTAL POSTS AUDITED: ${results.length}`);
console.log(`AVERAGE SEO SCORE: ${avgScore}/100`);
console.log(`PASSING (>=70): ${passCount} / ${results.length} (${Math.round(passCount/results.length*100)}%)`);
console.log(`HAVE FAQ SECTION: ${faqCount} / ${results.length}`);
console.log(`THIN CONTENT (<1000 words): ${thinCount} / ${results.length}`);
console.log('='.repeat(60));

console.log('\n--- 10 LOWEST SCORING POSTS (CRITICAL TO IMPROVE) ---');
results.slice(0, 10).forEach((r, i) => {
  console.log(`${i+1}. [${r.score}/100] ${r.file} (Words: ${r.wordCount}, FAQ: ${r.hasFaq ? 'YES' : 'NO'})`);
  r.topWarnings.forEach(w => console.log(`   - ${w}`));
});

console.log('\n--- 5 HIGHEST SCORING POSTS ---');
results.slice(-5).reverse().forEach((r, i) => {
  console.log(`${i+1}. [${r.score}/100] ${r.file} (Words: ${r.wordCount}, FAQ: ${r.hasFaq ? 'YES' : 'NO'})`);
});

// Write summary to JSON for programmatic access
fs.writeFileSync(path.join(rootDir, 'scripts', 'seo-audit-summary.json'), JSON.stringify({
  date: new Date().toISOString(),
  total: results.length,
  avgScore,
  passCount,
  faqCount,
  thinCount,
  results
}, null, 2));

console.log(`\nDetailed report saved to: scripts/seo-audit-summary.json`);
