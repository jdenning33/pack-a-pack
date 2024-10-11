import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabseClient';
import { Item } from '@/lib/appTypes';

export function useDeleteItem(packId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (item: Item) => {
            const { error } = await supabase
                .from('items')
                .delete()
                .eq('id', item.id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['pack', packId]);
        },
    });
}
