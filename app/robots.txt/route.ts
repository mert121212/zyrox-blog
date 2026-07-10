export async function GET() {
    const body = `User-agent: *
Allow: /
Sitemap: https://zyroxnet.netlify.app/sitemap.xml`;

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}
