import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { Item } from '@/lib/appTypes';
import { appToSupabaseItem } from '../supabaseTypes';
import { optimisticUpdateHandler } from '../optimisticUpdateHandler';

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
        onMutate: async (item) => {
            const rollbackData = await optimisticUpdateHandler(
                queryClient,
                { queryKey: ['items'], exact: false },
                item
            );
            return { rollbackData };
        },
        onError: (err, _item, context) => {
            console.log('onError', err);
            // Rollback all affected queries
            context?.rollbackData.forEach(({ queryKey, previousData }) => {
                queryClient.setQueryData(queryKey, previousData);
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['items', packId]);
        },
    });
}
