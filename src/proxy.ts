import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';

// In-memory store for rate limiting
const ipCache = new Map<string, number[]>();

function cleanupCache(now: number, windowMs: number) {
  for (const [ip, timestamps] of ipCache.entries()) {
    const validTimestamps = timestamps.filter(t => now - t < windowMs);
    if (validTimestamps.length === 0) {
      ipCache.delete(ip);
    } else {
      ipCache.set(ip, validTimestamps);
    }
  }
}

function isRateLimited(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (Math.random() < 0.05) {
    cleanupCache(now, windowMs);
  }

  const timestamps = ipCache.get(ip) || [];
  const recentTimestamps = timestamps.filter(t => now - t < windowMs);
  
  if (recentTimestamps.length >= limit) {
    return true;
  }
  
  recentTimestamps.push(now);
  ipCache.set(ip, recentTimestamps);
  return false;
}

function applySecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co; frame-ancestors 'none';");
  return res;
}

// Proxy to protect admin routes (Next.js 16.2.6 forward compatible)
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Rate Limiting Check
  const ip = (request as any).ip || request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  const isApi = pathname.startsWith('/api/');

  const rateLimit = isApi ? 60 : 100;
  const windowMs = 60000;

  if (isRateLimited(ip, rateLimit, windowMs)) {
    const res = new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Content-Type': 'text/plain',
        'Retry-After': '60',
      },
    });
    return applySecurityHeaders(res);
  }

  // 2. Authorization Gating
  const protectedPatterns = [
    /^\/admin\/.*$/,
    /^\/dashboard\/admin\/.*$/,
    /^\/api\/(?!contact)(.*)$/,
  ];

  const isProtected = protectedPatterns.some((re) => re.test(pathname));
  if (!isProtected) {
    return applySecurityHeaders(NextResponse.next());
  }

  // Verify token and retrieve user role securely from Supabase Auth API
  const accessToken = request.cookies.get('sb-access-token')?.value || request.headers.get('authorization')?.split('Bearer ')?.[1];

  if (!accessToken) {
    const res = new NextResponse('Unauthorized', { status: 401 });
    return applySecurityHeaders(res);
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      const res = new NextResponse('Unauthorized', { status: 401 });
      return applySecurityHeaders(res);
    }

    const roles = user.role || user.app_metadata?.role || user.user_metadata?.role || [];
    const hasRole = Array.isArray(roles) ? roles.includes('super_admin') : roles === 'super_admin';
    if (!hasRole) {
      const res = new NextResponse('Forbidden', { status: 403 });
      return applySecurityHeaders(res);
    }
  } catch (err) {
    console.error('Proxy Auth Exception:', err);
    const res = new NextResponse('Unauthorized', { status: 401 });
    return applySecurityHeaders(res);
  }

  return applySecurityHeaders(NextResponse.next());
}


export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
  ],
};

