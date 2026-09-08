import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? '✓ Loaded' : '✗ Missing');
console.log('Supabase Anon Key:', supabaseAnonKey ? '✓ Loaded' : '✗ Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Warning: SUPABASE_URL or SUPABASE_ANON_KEY is not defined in environment variables. Database connections will fail.');
}

// Create a single supabase client instance for sharing across the application.
// Note: In production, you would handle this gracefully if keys are missing.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

// Test Supabase connection on startup
if (supabaseUrl && supabaseAnonKey) {
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection test failed:', error.message);
    } else {
      console.log('✓ Supabase connection successful');
    }
  }).catch((err) => {
    console.error('Supabase connection test error:', err);
  });
}
