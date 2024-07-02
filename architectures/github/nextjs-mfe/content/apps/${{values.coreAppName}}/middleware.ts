import { NextRequest, NextResponse } from 'next/server';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const envConfig = require('@environments');

export function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    const remoteAppUrls = [envConfig.${{values.remoteAppName}}Url];

    const imgSrcs = ['self', 'blob:', 'data:', 'https://source.unsplash.com', 'https://images.unsplash.com', ...remoteAppUrls];

    const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' ${remoteAppUrls.join(' ')};
    style-src 'self' 'unsafe-inline' ${remoteAppUrls.join(' ')};
    img-src ${imgSrcs.join(' ')};
    font-src 'self' ${remoteAppUrls.join(' ')};
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;

    // Replace newline characters and spaces
    const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);

    requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
    response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

    return response;
}

// ignoring matching prefetches (from next/link) and static assets that don't need the CSP header.
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
};
