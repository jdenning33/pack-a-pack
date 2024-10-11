import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { Item } from '@/lib/appTypes';
import { appToSupabaseItem } from '../supabaseTypes';

export function useUpdateItem(packId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (item: Item) => {
            const supabaseItem = appToSupabaseItem(item);
            console.log('supabaseItem', supabaseItem);
            const { error } = await supabase
                .from('items')
                .update(supabaseItem)
                .eq('id', item.id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['pack', packId]);
        },
    });
}
