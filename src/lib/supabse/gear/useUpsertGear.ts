import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { appToSupabaseGear } from '../supabaseTypes';
import { Gear, Item } from '@/lib/appTypes';
import { optimisticUpdateHandler } from '../optimisticUpdateHandler';
import { toast } from 'sonner';
import { Optional } from '@/lib/utils';

export function useUpsertGear() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (gear: Optional<Gear, 'id'>) => {
            const supabaseGear = appToSupabaseGear(gear);
            const { data, error } = await supabase
                .from('gear')
                .upsert(supabaseGear)
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
            // Optimistically update the cache with the new or updated gear
            const rollbackData = await optimisticUpdateHandler(
                queryClient,
                { queryKey: ['gear'], exact: false },
                gear
            );

            queryClient
                .getQueriesData({ queryKey: ['items'] })
                .forEach(([key, items]) => {
                    if (!Array.isArray(items)) return;
                    queryClient.setQueryData(
                        key,
                        items.map((i: Item) => {
                            if (i.gearId !== gear.id) return i;
                            return { ...i, gear: gear, gearId: gear.id };
                        })
                    );
                });

            return { rollbackData };
        },
        onError: (err, _gear, context) => {
            console.error('Failed to save gear:', err);
            // Rollback all affected queries
            context?.rollbackData.forEach(({ queryKey, previousData }) => {
                queryClient.setQueryData(queryKey, previousData);
            });
            toast.error('Failed to save gear.', {
                description: JSON.stringify(err, null, 2),
            });
        },
        onSuccess: async (_newGearId, gear) => {
            queryClient.invalidateQueries({ queryKey: ['gear'] });

            queryClient
                .getQueriesData({ queryKey: ['items'] })
                .forEach(([key, items]) => {
                    if (
                        Array.isArray(items) &&
                        items.some((i: Item) => i.gearId === gear.id)
                    ) {
                        queryClient.invalidateQueries(key);
                    }
                });

            toast.success('Gear saved successfully');
        },
    });
}
