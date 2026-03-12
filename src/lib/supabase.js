import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qnaaxjuebasonjjamwfs.supabase.co';
const supabaseKey = 'sb_publishable_BygGi-dt1WD-NZcLC2otvA_hr7PwIbp';

export const supabase = createClient(supabaseUrl, supabaseKey);
