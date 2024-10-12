import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { appToSupabaseItem } from '../supabaseTypes';
import { Item } from '@/lib/appTypes';

export function useAddItem(packId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (item: Omit<Item, 'id'>) => {
            const supabaseItem = appToSupabaseItem(item);
            const { data, error } = await supabase
                .from('items')
                .insert(supabaseItem)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['items', packId]);
        },
    });
}
