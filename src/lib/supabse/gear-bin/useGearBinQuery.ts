import { useQuery } from 'react-query';
import { supabase } from '../supabaseClient';
import { UserGearBin } from '@/lib/appTypes';
import { supabaseToAppUserGearBin } from '../supabaseTypes';
import { UserGearBinSearchOptions } from '@/features/gear-bin-search/useGearBinSearch';

// Fetch bins for a pack

export function useGearBinQuery(searchParams: UserGearBinSearchOptions) {
    return useQuery<UserGearBin[]>({
        queryKey: ['user_gear_bins', searchParams],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('user_gear_bins')
                .select('*')
                .eq('is_deleted', false)
                .eq('user_id', searchParams.userId);

            if (error) throw error;
            return data.map((d) => supabaseToAppUserGearBin(d));
        },
    });
}
