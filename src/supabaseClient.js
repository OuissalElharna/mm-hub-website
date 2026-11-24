import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gjcotpkrxpvztfcxrizp.supabase.co';
const supabaseAnonKey = 'sb_publishable_1AeeoNG-03dsUOwyHPGtYA_xQxu5o_b';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);