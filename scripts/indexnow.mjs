/**
 * IndexNow URL Submission Script for Bing and other search engines
 * 
 * Usage:
 *   node scripts/indexnow.mjs                 # Submits all site URLs
 *   node scripts/indexnow.mjs <url1> <url2>   # Submits specific URLs
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const postsDir = path.join(root, 'app', 'posts');

const HOST = 'zyroxlab.com';
const BASE_URL = `https://${HOST}`;
const API_KEY = '2B0eB64F21D54Fe8A6A9DD15C59FD067';
const KEY_LOCATION = `${BASE_URL}/${API_KEY}.txt`;

// Gather URLs
function getAllUrls() {
    const staticRoutes = [
        '/',
        '/about/',
        '/authors/',
        '/privacy-policy/',
        '/terms/',
        '/contact/',
        '/disclaimer/',
    ];

    const authorSlugs = ['marcus-holt', 'sara-vance', 'daniel-osei', 'rachel-kim'];

    const postSlugs = fs
        .readdirSync(postsDir)
        .filter((f) => f.endsWith('.md') && !f.includes('['))
        .map((f) => f.replace(/\.md$/, ''));

    const storyRoutes = [
        '/stories/best-gpu-1440p/',
        '/stories/budget-gaming-pc/',
        '/stories/speed-up-windows-11/',
        '/stories/best-cpu-cooler-7800x3d/',
        '/stories/ssd-vs-hdd-2026/',
        '/stories/pc-wont-boot/',
        '/stories/choose-right-psu/',
    ];

    const urls = [
        ...staticRoutes.map((route) => `${BASE_URL}${route}`),
        ...storyRoutes.map((route) => `${BASE_URL}${route}`),
        ...postSlugs.map((slug) => `${BASE_URL}/posts/${slug}/`),
        ...authorSlugs.map((slug) => `${BASE_URL}/authors/${slug}/`),
    ];

    return urls;
}

async function submitToIndexNow(urls) {
    const payload = {
        host: HOST,
        key: API_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
    };

    console.log(`\n🚀 Submitting ${urls.length} URLs to Bing IndexNow...`);
    console.log(`Key: ${API_KEY}`);
    console.log(`Key Location: ${KEY_LOCATION}`);

    const endpoints = [
        'https://api.indexnow.org/indexnow',
        'https://www.bing.com/indexnow',
    ];

    for (const endpoint of endpoints) {
        try {
            console.log(`\nSending request to: ${endpoint}`);
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log(`✓ Success (${response.status} ${response.statusText}) from ${endpoint}`);
            } else {
                const errorText = await response.text().catch(() => '');
                console.warn(`⚠ ${endpoint} returned status ${response.status}: ${errorText}`);
            }
        } catch (err) {
            console.error(`✗ Error connecting to ${endpoint}:`, err.message);
        }
    }
}

// Check if specific URLs were passed in CLI arguments
const cliUrls = process.argv.slice(2);
const targetUrls = cliUrls.length > 0 ? cliUrls : getAllUrls();

await submitToIndexNow(targetUrls);
