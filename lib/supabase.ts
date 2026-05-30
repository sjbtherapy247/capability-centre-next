import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
// Conventional name first, then accept the older `_PUB_KEY` env var for
// backward compatibility during the env rename.
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUB_KEY ||
  ''

export const supabase = url && anonKey ? createClient(url, anonKey) : null
