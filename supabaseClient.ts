
import { createClient } from '@supabase/supabase-js';

// Prioriza as variáveis de ambiente para o deploy, mas usa valores fixos como fallback para facilitar o desenvolvimento local.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://isdqtptsolphakidwvcb.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_oCTbgq5XI4vGhO5epu61hg_M_0IYls-';

if (!supabaseUrl || !supabaseAnonKey) {
  // Este erro só ocorrerá se tanto as variáveis de ambiente quanto os fallbacks falharem.
  throw new Error('As variáveis de ambiente do Supabase não puderam ser carregadas.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);