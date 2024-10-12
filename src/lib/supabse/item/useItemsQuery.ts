import { useQuery } from 'react-query';
import { supabase } from '../supabaseClient';
import { Item } from '@/lib/appTypes';
import { supabaseToAppItem } from '../supabaseTypes';

// Fetch items for a kit

export function useItemsQuery(pack_id: string) {
    return useQuery<Item[]>({
        queryKey: ['items', pack_id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('items')
                .select('*,gear(*)')
                .eq('pack_id', pack_id);

            if (error) throw error;
            const appItems = data.map((d) => supabaseToAppItem(d));
            return appItems;
        },
    });
}
