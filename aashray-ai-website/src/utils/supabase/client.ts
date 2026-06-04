import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // During build/SSG, env vars may not be available.
  // Return null gracefully so pages can render static fallbacks.
  if (!url || !key) {
    return null
  }

  return createBrowserClient(url, key)
}
