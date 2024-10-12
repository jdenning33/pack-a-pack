import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { Kit } from '@/lib/appTypes';
import { appToSupabaseKit } from '../supabaseTypes';
import { optimisticUpdateHandler } from '../optimisticUpdateHandler';

export function useUpdateKit(packId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (kit: Kit) => {
            const supabaseKit = appToSupabaseKit(kit, packId);
            const { error } = await supabase
                .from('kits')
                .update(supabaseKit)
                .eq('id', kit.id);
            if (error) throw error;
        },
        onMutate: async (kit) => {
            const rollbackData = await optimisticUpdateHandler(
                queryClient,
                { queryKey: ['kits'], exact: false },
                kit
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
            queryClient.invalidateQueries(['kits', packId]);
        },
    });
}
