import { NextRequest } from 'next/server';
import { proxy } from '@/proxy';
import { supabase } from '@/lib/supabase';

jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: jest.fn()
    }
  }
}));

describe('Admin middleware enforcement', () => {
  const createRequest = (path: string, cookiesObj?: Record<string, string>, headersObj?: Record<string, string>) => {
    const req = new NextRequest(`http://localhost${path}`);
    if (cookiesObj) {
      Object.entries(cookiesObj).forEach(([key, val]) => {
        req.cookies.set(key, val);
      });
    }
    if (headersObj) {
      Object.entries(headersObj).forEach(([key, val]) => {
        req.headers.set(key, val);
      });
    }
    return req;
  };

  test('Unauthenticated request to /admin/version returns 401', async () => {
    const response = await proxy(createRequest('/admin/version'));
    expect(response.status).toBe(401);
    const text = await response.text();
    expect(text).toBe('Unauthorized');
  });

  test('Unauthenticated request to administrative API /api/audit_logs returns 401', async () => {
    const response = await proxy(createRequest('/api/audit_logs'));
    expect(response.status).toBe(401);
    const text = await response.text();
    expect(text).toBe('Unauthorized');
  });

  test('Unauthenticated request to public API /api/contact is allowed (returns 200)', async () => {
    const response = await proxy(createRequest('/api/contact'));
    expect(response.status).toBe(200);
  });

  test('Authenticated non-admin to /admin/version returns 403', async () => {
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: { role: 'user', app_metadata: {}, user_metadata: {} } },
      error: null
    });
    const response = await proxy(
      createRequest('/admin/version', {
        'sb-access-token': 'mock-token'
      })
    );
    expect(response.status).toBe(403);
    const text = await response.text();
    expect(text).toBe('Forbidden');
  });

  test('Authenticated non-admin to administrative API /api/audit_logs returns 403', async () => {
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: { role: 'user', app_metadata: {}, user_metadata: {} } },
      error: null
    });
    const response = await proxy(
      createRequest('/api/audit_logs', {
        'sb-access-token': 'mock-token'
      })
    );
    expect(response.status).toBe(403);
    const text = await response.text();
    expect(text).toBe('Forbidden');
  });

  test('Authenticated admin to /admin/version returns NextResponse.next (200)', async () => {
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: { role: 'super_admin', app_metadata: {}, user_metadata: {} } },
      error: null
    });
    const response = await proxy(
      createRequest('/admin/version', {
        'sb-access-token': 'mock-token'
      })
    );
    expect(response.status).toBe(200);
  });

  test('Authenticated admin to administrative API /api/audit_logs returns NextResponse.next (200)', async () => {
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: { role: 'super_admin', app_metadata: {}, user_metadata: {} } },
      error: null
    });
    const response = await proxy(
      createRequest('/api/audit_logs', {
        'sb-access-token': 'mock-token'
      })
    );
    expect(response.status).toBe(200);
  });

  test('Bearer token authenticated admin to administrative API /api/audit_logs returns NextResponse.next (200)', async () => {
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: { role: 'super_admin', app_metadata: {}, user_metadata: {} } },
      error: null
    });
    const response = await proxy(
      createRequest('/api/audit_logs', undefined, {
        'authorization': 'Bearer mock-bearer-token'
      })
    );
    expect(response.status).toBe(200);
  });
});



