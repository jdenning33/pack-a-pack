import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { appToSupabaseGear } from '../supabaseTypes';
import { Gear, Item } from '@/lib/appTypes';
import { optimisticUpdateHandler } from '../optimisticUpdateHandler';

// Update existing gear

export function useUpdateGear() {
    const queryClient = useQueryClient();

    function optimisticUpdateRelatedItemQueries(gear: Gear) {
        queryClient
            .getQueriesData({ queryKey: ['items'] })
            .forEach(([key, items]) => {
                if (!Array.isArray(items)) return;
                queryClient.setQueryData(
                    key,
                    items.map((i: Item) => {
                        if (i.gearId !== gear.id) return i;
                        if (i.id !== i.id) return i;
                        return { ...i, gear: gear };
                    })
                );
            });
    }

    return useMutation({
        mutationFn: async (gear: Gear) => {
            const supabaseGear = appToSupabaseGear(gear);
            const { error } = await supabase
                .from('gear')
                .update(supabaseGear)
                .eq('id', gear.id);
            if (error) throw error;
            queryClient.invalidateQueries(['gear']);
        },
        onMutate: async (gear) => {
            // Optimistically update the cache with the new gear
            const rollbackData = await optimisticUpdateHandler(
                queryClient,
                { queryKey: ['gear'], exact: false },
                gear
            );
            optimisticUpdateRelatedItemQueries(gear);
            return { rollbackData };
        },
        onError: (err, _gear, context) => {
            console.log('onError', err);
            // Rollback all affected queries
            context?.rollbackData.forEach(({ queryKey, previousData }) => {
                queryClient.setQueryData(queryKey, previousData);
            });
        },

        onSuccess: async (_newGear, gear, _context) => {
            queryClient.invalidateQueries(['gear']);
            const items = await supabase
                .from('items')
                .select('id,pack_id')
                .eq('gear_id', gear.id);
            if (items.error) throw items.error;
            const keys = items.data.map((item) => ['items', item.pack_id]);

            queryClient.invalidateQueries(keys[0]);
        },
    });
}
