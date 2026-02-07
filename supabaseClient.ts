import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://isdqtptsolphakidwvcb.supabase.co';
const supabaseAnonKey = 'sb_publishable_oCTbgq5XI4vGhO5epu61hg_M_0IYls-';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
