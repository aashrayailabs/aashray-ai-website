import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getServerSession() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    return { data: { session: null }, error: null };
  }
  
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from Server Component - safe to ignore
          }
        },
      },
    });
    return supabase.auth.getSession();
  } catch (e) {
    return { data: { session: null }, error: e };
  }
}

export async function verifyAdminSession(): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    return false;
  }
  
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from Server Component - safe to ignore
          }
        },
      },
    });
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return false;
    
    const roles = user.role || user.app_metadata?.role || user.user_metadata?.role || [];
    const hasRole = Array.isArray(roles) ? roles.includes('super_admin') : roles === 'super_admin';
    return hasRole;
  } catch (e) {
    return false;
  }
}
