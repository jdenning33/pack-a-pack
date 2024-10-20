import { useQuery } from 'react-query';
import { supabase } from '../supabaseClient';
import { Item } from '@/lib/appTypes';
import { supabaseToAppItem } from '../supabaseTypes';
import { useAuth } from '@/features/auth/useAuth';

// Fetch items for a kit

export function useItemsQuery(pack_id: string) {
    const { user } = useAuth();
    return useQuery<Item[]>({
        queryKey: ['items', pack_id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('items')
                .select('*,user_gear(*,gear(*,user_gear(*)))')
                .eq('pack_id', pack_id)
                .eq('is_deleted', false)
                .order('created_at', { ascending: true });

            if (error) throw error;
            const appItems = data.map((d) =>
                supabaseToAppItem(d, user?.id || '')
            );
            return appItems;
        },
    });
}
