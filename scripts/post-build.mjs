/**
 * Post-build script executed after `next build`
 * 1. Synchronizes generated static files from public/ to out/
 * 2. Automatically pings Google WebSub Hub and Superfeedr
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const outDir = path.join(root, 'out');

// 1. Copy critical files to out/
if (fs.existsSync(outDir)) {
    const filesToSync = [
        'sitemap.xml',
        'news-sitemap.xml',
        'rss.xml',
        'atom.xml',
        'feed.atom',
        '8A0ADD438eA44836B3D590977FA78A2B.txt',
    ];

    for (const file of filesToSync) {
        const src = path.join(publicDir, file);
        const dst = path.join(outDir, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dst);
            console.log(`✓ Synchronized ${file} to out/`);
        }
    }
}

// 2. Ping Google & Search Engine Hubs
console.log('\n📡 Sending post-build WebSub pings to Google & search engines...');
const BASE_URL = 'https://zyroxlab.com';
const RSS_URL = `${BASE_URL}/rss.xml`;
const ATOM_URL = `${BASE_URL}/feed.atom`;

async function pingHub(hubUrl, feedUrl) {
    try {
        const params = new URLSearchParams();
        params.append('hub.mode', 'publish');
        params.append('hub.url', feedUrl);

        const res = await fetch(hubUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
        });

        if (res.ok || res.status === 204) {
            console.log(`✅ WebSub Ping: ${hubUrl} for ${feedUrl}`);
        } else {
            console.log(`⚠️ WebSub Ping status ${res.status}: ${hubUrl}`);
        }
    } catch (err) {
        console.warn(`Could not ping ${hubUrl}: ${err.message}`);
    }
}

try {
    await pingHub('https://pubsubhubbub.appspot.com/publish', RSS_URL);
    await pingHub('https://pubsubhubbub.appspot.com/publish', ATOM_URL);
    await pingHub('https://pubsubhubbub.superfeedr.com/publish', RSS_URL);
    console.log('✨ Post-build automation completed successfully.\n');
} catch (e) {
    console.warn('Post-build ping notice:', e.message);
}
