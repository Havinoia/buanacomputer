import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Gunakan URL placeholder hanya agar createClient tidak crash saat inisialisasi awal.
// Ini memungkinkan UI tetap bisa di-render meskipun Supabase belum dikonfigurasi.
const finalUrl = (supabaseUrl && supabaseUrl !== 'your-supabase-url') 
  ? supabaseUrl 
  : 'https://placeholder.supabase.co';

const finalKey = (supabaseAnonKey && supabaseAnonKey !== 'your-supabase-anon-key') 
  ? supabaseAnonKey 
  : 'placeholder-key';

if (!supabaseUrl || supabaseUrl === 'your-supabase-url') {
  console.warn('⚠️ Supabase credentials are missing or placeholders. Please add real ones to .env.local.');
}

export const supabase = createClient(finalUrl, finalKey);
