/**
 * Google Indexing API Automation Script (Native Node.js, zero external dependencies)
 * 
 * Submits all 75+ site URLs directly to Google's real-time indexing pipeline.
 * 
 * Usage:
 *   1. Place your Google Cloud Service Account JSON file as 'service-account.json' in the project root.
 *   2. Run: node scripts/google-indexing.mjs
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const postsDir = path.join(root, 'app', 'posts');
const serviceAccountPath = path.join(root, 'service-account.json');

const HOST = 'zyroxlab.com';
const BASE_URL = `https://${HOST}`;

// ── Collect all URLs ─────────────────────────────────────────
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

    const urls = [
        ...staticRoutes.map((route) => `${BASE_URL}${route}`),
        ...postSlugs.map((slug) => `${BASE_URL}/posts/${slug}/`),
        ...authorSlugs.map((slug) => `${BASE_URL}/authors/${slug}/`),
    ];

    return urls;
}

// ── Base64URL Helper ──────────────────────────────────────────
function base64UrlEncode(str) {
    return Buffer.from(str)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

// ── Generate Google OAuth2 Access Token using Service Account ─
async function getAccessToken(serviceAccount) {
    const now = Math.floor(Date.now() / 1000);
    const header = {
        alg: 'RS256',
        typ: 'JWT',
    };

    const payload = {
        iss: serviceAccount.client_email,
        scope: 'https://www.googleapis.com/auth/indexing',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    const unsignedToken = `${encodedHeader}.${encodedPayload}`;

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(unsignedToken);
    signer.end();
    const signature = signer.sign(serviceAccount.private_key);
    const encodedSignature = signature
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    const jwt = `${unsignedToken}.${encodedSignature}`;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: jwt,
        }),
    });

    if (!tokenRes.ok) {
        const errText = await tokenRes.text();
        throw new Error(`Failed to obtain Google access token (${tokenRes.status}): ${errText}`);
    }

    const data = await tokenRes.json();
    return data.access_token;
}

// ── Submit URL to Google Indexing API ──────────────────────────
async function submitUrlToGoogle(url, accessToken) {
    const endpoint = 'https://indexing.googleapis.com/v1/urlNotifications:publish';
    const body = {
        url: url,
        type: 'URL_UPDATED',
    };

    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
    });

    if (res.ok) {
        const json = await res.json();
        return { success: true, notifyTime: json.urlNotificationMetadata?.latestUpdate?.notifyTime };
    } else {
        const errText = await res.text();
        return { success: false, status: res.status, error: errText };
    }
}

// ── Main Runner ───────────────────────────────────────────────
async function main() {
    console.log('====================================================');
    console.log('  ZYROX — GOOGLE REAL-TIME INDEXING PUSH TOOL      ');
    console.log('====================================================\n');

    if (!fs.existsSync(serviceAccountPath)) {
        console.error('❌ "service-account.json" not found in the project root directory!');
        console.log('\n📖 TO SETUP IN 3 MINUTES:');
        console.log('  1. Go to Google Cloud Console (https://console.cloud.google.com/)');
        console.log('  2. Create a project and Enable "Web Search Indexing API"');
        console.log('  3. Go to "Credentials" -> "Create Credentials" -> "Service Account"');
        console.log('  4. Click on the created service account -> "Keys" tab -> "Add Key" -> "JSON"');
        console.log('  5. Rename downloaded file to "service-account.json" and put it in this folder.');
        console.log('  6. Copy the service account email (e.g. your-bot@project.iam.gserviceaccount.com)');
        console.log('  7. Go to Google Search Console (https://search.google.com/search-console) -> Settings -> Users & Permissions');
        console.log('  8. Add that email as "Owner" (Sahip).');
        console.log('  9. Run: npm run index:google\n');
        process.exit(1);
    }

    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    console.log(`🔑 Service Account: ${serviceAccount.client_email}`);
    console.log('⏳ Generating OAuth2 token...');

    let accessToken;
    try {
        accessToken = await getAccessToken(serviceAccount);
        console.log('✅ Access Token generated successfully!\n');
    } catch (err) {
        console.error('❌ Authentication failed:', err.message);
        process.exit(1);
    }

    const urls = getAllUrls();
    console.log(`🚀 Sending ${urls.length} URLs to Google Indexing API...\n`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        process.stdout.write(`[${i + 1}/${urls.length}] ${url} ... `);
        
        try {
            const result = await submitUrlToGoogle(url, accessToken);
            if (result.success) {
                console.log('✅ NOTIFIED');
                successCount++;
            } else {
                console.log(`❌ ERROR ${result.status}`);
                failCount++;
            }
        } catch (err) {
            console.log(`❌ FAILED (${err.message})`);
            failCount++;
        }

        // Slight pause to avoid hitting aggressive rate limits
        await new Promise((resolve) => setTimeout(resolve, 150));
    }

    console.log('\n====================================================');
    console.log(`  COMPLETED: ${successCount} successful, ${failCount} failed`);
    console.log('====================================================');
    console.log('Googlebot will begin crawling these URLs in near real-time.');
}

main().catch((err) => {
    console.error('Unexpected error:', err);
    process.exit(1);
});
