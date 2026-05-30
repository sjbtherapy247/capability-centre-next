import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const pubKey = process.env.NEXT_PUBLIC_SUPABASE_PUB_KEY || ''

export const supabase = url && pubKey ? createClient(url, pubKey) : null
