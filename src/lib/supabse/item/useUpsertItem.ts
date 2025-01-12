import { useMutation, useQueryClient } from 'react-query';
import { createClient } from '@/lib/supabse/supabaseClient';
import { Item } from '@/lib/appTypes';
import { appToSupabaseItem } from '../supabaseTypes';
import { optimisticUpdateHandler } from '../optimisticUpdateHandler';
import { toast } from 'sonner';
import { Optional } from '@/lib/utils';

export function useUpsertItem(userId: string | undefined) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (item: Optional<Item, 'id'>): Promise<string> => {
            if (!userId) {
                throw new Error('You must be signed in to save items.');
            }

            const supabase = createClient();

            let userGearId;
            if (item.gearId) {
                const { data: userGear, error: userGearError } = await supabase
                    .from('user_gear')
                    .upsert({
                        gear_id: item.gearId,
                        user_id: userId,
                    })
                    .select()
                    .single();
                if (userGearError) throw userGearError;
                userGearId = userGear?.id;
            }

            const supabaseItem = appToSupabaseItem(item, userGearId);
            console.log('supabaseItem', supabaseItem);
            const { data, error } = await supabase
                .from('items')
                .upsert(supabaseItem)
                .select()
                .single();
            if (error) throw error;
            return data.id;
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
            console.error('Failed to save item:', err);
            // Rollback all affected queries
            context?.rollbackData.forEach(({ queryKey, previousData }) => {
                queryClient.setQueryData(queryKey, previousData);
            });
            toast.error('Failed to save item.', {
                description:
                    (err as { message: string }).message ||
                    JSON.stringify(err, null, 2),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
            toast.success('Item saved.');
        },
    });
}
