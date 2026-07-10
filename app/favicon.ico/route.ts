// Redirect favicon requests to an inline SVG served as PNG-equivalent.
// This prevents 404 errors while keeping the setup dependency-free.
export async function GET() {
    // A minimal 1x1 transparent ICO (prevents 404, browsers cache it)
    const ico = Buffer.from(
        '000001000100' + // ICO header: 1 image
        '01010000010020002800000016000000' + // image entry: 1x1, 32bpp
        '28000000010000000200000001002000' + // BITMAPINFOHEADER
        '000000000000000000000000' +
        '00000000000000000000000000000000', // pixels: transparent
        'hex',
    );

    return new Response(ico, {
        headers: {
            'Content-Type': 'image/x-icon',
            'Cache-Control': 'public, max-age=86400',
        },
    });
}
