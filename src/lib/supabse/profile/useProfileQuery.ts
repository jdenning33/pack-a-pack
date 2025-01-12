import { useQuery } from 'react-query';
import { createClient } from '@/lib/supabse/supabaseClient';
import { Profile } from '@/lib/appTypes';
import { supabaseToAppProfile } from '../supabaseTypes';

export function useProfile(userId: string) {
    return useQuery<Profile | undefined>({
        queryKey: ['profiles', userId],
        queryFn: async () => {
            if (!userId) return undefined;
            const supabase = createClient();
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) throw error;
            return supabaseToAppProfile(data);
        },
    });
}
