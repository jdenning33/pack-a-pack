// File: src/lib/supabase/clients.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

// Validate environment variables
if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
    throw new Error('Missing Supabase environment variables');
}

// For client components
export const createClient = () => {
    // By default, looks for the NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables
    return createClientComponentClient();
};
