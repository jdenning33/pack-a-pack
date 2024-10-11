import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabseClient';

export function useUpdateItem(packId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (item: Item) => {
            const { error } = await supabase
                .from('items')
                .update(item)
                .eq('id', item.id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['pack', packId]);
        },
    });
}
