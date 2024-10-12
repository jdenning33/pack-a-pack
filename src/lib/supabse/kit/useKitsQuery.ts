import { useQuery } from 'react-query';
import { supabase } from '../supabaseClient';
import { Kit } from '@/lib/appTypes';
import { supabaseToAppKit } from '../supabaseTypes';

// Fetch kits for a pack

export function useKitsQuery(packId: string) {
    return useQuery<Kit[]>({
        queryKey: ['kits', packId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('kits')
                .select('*')
                .eq('pack_id', packId);

            if (error) throw error;
            return data.map((d) => supabaseToAppKit(d));
        },
    });
}
