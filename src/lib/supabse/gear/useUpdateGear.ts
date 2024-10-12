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
                        return { ...i, gear: gear, gearId: gear.id };
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

            queryClient
                .getQueriesData({ queryKey: ['items'] })
                .forEach(([key, items]) => {
                    if (!Array.isArray(items)) return;
                    if (items.some((i: Item) => i.gearId === gear.id)) {
                        queryClient.invalidateQueries(key);
                    }
                });
        },
    });
}
