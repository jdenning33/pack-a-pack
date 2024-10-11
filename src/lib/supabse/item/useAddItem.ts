import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabseClient';
import { appToSupabaseItem } from '../supabaseTypes';
import { Item } from '@/lib/appTypes';

export function useAddItem(packId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (item: Omit<Item, 'id'>) => {
            console.log(item);
            const supabaseItem = appToSupabaseItem(item);
            console.log(supabaseItem);
            const { data, error } = await supabase
                .from('items')
                .insert(supabaseItem)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['pack', packId]);
        },
    });
}
