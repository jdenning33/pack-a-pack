import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { appToSupabaseGear } from '../supabaseTypes';
import { Gear, Item } from '@/lib/appTypes';
import { optimisticUpdateHandler } from '../optimisticUpdateHandler';
import { toast } from 'sonner';

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
            console.log('supabaseGear', supabaseGear);
            const { data, error } = await supabase
                .from('gear')
                .update(supabaseGear)
                .eq('id', gear.id)
                .select()
                .single();
            if (error) throw error;

            const { data: _userGearData, error: userGearError } = await supabase
                .from('user_gear')
                .upsert({
                    gear_id: data.id,
                    user_id: gear.createdById,
                });
            if (userGearError) throw userGearError;

            return data.id;
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
            toast.error('Failed to update gear.', {
                description:
                    JSON.stringify(err, null, 2) || 'An error occurred',
            });
        },

        onSuccess: async (_newGear, gear, _context) => {
            queryClient.invalidateQueries({ queryKey: ['gear'] });

            queryClient
                .getQueriesData({ queryKey: ['items'] })
                .forEach(([key, items]) => {
                    if (!Array.isArray(items)) return;
                    if (items.some((i: Item) => i.gearId === gear.id)) {
                        queryClient.invalidateQueries(key);
                    }
                });

            toast.success('Gear updated successfully');
        },
    });
}
