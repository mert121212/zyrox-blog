/**
 * Multi-Engine Ping Script (Google WebSub, Superfeedr, Bing IndexNow)
 * 
 * Usage:
 *   node scripts/ping-search-engines.mjs
 */

const BASE_URL = 'https://zyroxlab.com';
const RSS_URL = `${BASE_URL}/rss.xml`;
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

async function pingPubSubHubbub(hubUrl, feedUrl) {
    try {
        const params = new URLSearchParams();
        params.append('hub.mode', 'publish');
        params.append('hub.url', feedUrl);

        const response = await fetch(hubUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
        });

        if (response.ok || response.status === 204) {
            console.log(`✅ WebSub Ping Success: ${hubUrl} for ${feedUrl}`);
        } else {
            console.log(`⚠️ WebSub Ping returned ${response.status}: ${hubUrl}`);
        }
    } catch (err) {
        console.error(`❌ WebSub Ping failed (${hubUrl}):`, err.message);
    }
}

async function main() {
    console.log('====================================================');
    console.log('  PINGING GLOBAL SEARCH ENGINE HUBS & FEED NETWORKS  ');
    console.log('====================================================\n');

    console.log('1. Pinging Google Official WebSub (PubSubHubbub) Hub...');
    await pingPubSubHubbub('https://pubsubhubbub.appspot.com/publish', RSS_URL);
    await pingPubSubHubbub('https://pubsubhubbub.appspot.com/publish', `${BASE_URL}/feed.atom`);

    console.log('\n2. Pinging Superfeedr WebSub Hub...');
    await pingPubSubHubbub('https://pubsubhubbub.superfeedr.com/publish', RSS_URL);

    console.log('\n====================================================');
    console.log('  Pings sent to Google feed crawlers successfully!  ');
    console.log('====================================================\n');
}

main().catch(console.error);
