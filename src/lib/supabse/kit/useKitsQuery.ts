import { useQuery } from 'react-query';
import { createClient } from '@/lib/supabse/supabaseClient';
import { Kit } from '@/lib/appTypes';
import { supabaseToAppKit } from '../supabaseTypes';

// Fetch kits for a pack

export function useKitsQuery(packId: string) {
    return useQuery<Kit[]>({
        queryKey: ['kits', packId],
        queryFn: async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('kits')
                .select('*')
                .eq('is_deleted', false)
                .eq('pack_id', packId);

            if (error) throw error;
            return data.map((d) => supabaseToAppKit(d));
        },
    });
}
