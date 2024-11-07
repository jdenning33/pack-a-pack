import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';
import { optimisticUpdateHandler } from '../optimisticUpdateHandler';
import { Gear } from '@/lib/appTypes';

export function useUpsertUserGear(userId: string | undefined) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            gearId,
            isRetired = false,
            userGearBinId = undefined,
            order = undefined,
        }: {
            gearId: string;
            isRetired: boolean;
            userGearBinId: string | null | undefined;
            order: number | undefined;
        }): Promise<string> => {
            if (!userId) {
                throw new Error('You must be signed in to save items.');
            }

            const supabaseUserGear = {
                gear_id: gearId,
                user_id: userId,
                is_retired: isRetired,
                order: order,
                user_gear_bin_id: userGearBinId,
            };

            console.log('supabaseUserGear:', supabaseUserGear);

            const { data: userGear, error: userGearError } = await supabase
                .from('user_gear')
                .upsert(supabaseUserGear)
                .select()
                .single();
            if (userGearError) throw userGearError;
            return userGear?.id;
        },
        onMutate: async (userGear) => {
            const gear = {
                id: userGear.gearId,
                order: userGear.order,
                userGearBinId: userGear.userGearBinId,
            } satisfies Partial<Gear>;

            // Optimistically update the cache with the new or updated gear
            const rollbackData = await optimisticUpdateHandler(
                queryClient,
                { queryKey: ['gear'], exact: false },
                gear
            );

            return { rollbackData };
        },
        onError: (err, _item, context) => {
            console.error('Failed to save user gear:', err);
            // Rollback all affected queries
            context?.rollbackData.forEach(({ queryKey, previousData }) => {
                queryClient.setQueryData(queryKey, previousData);
            });
            toast.error('Failed to update user gear.', {
                description:
                    (err as { message: string }).message ||
                    JSON.stringify(err, null, 2),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gear'] });
            toast.success('User gear saved.');
        },
    });
}
