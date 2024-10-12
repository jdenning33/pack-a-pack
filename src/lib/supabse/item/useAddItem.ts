import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { appToSupabaseItem } from '../supabaseTypes';
import { Item } from '@/lib/appTypes';

export function useAddItem(packId: string, userId?: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (item: Omit<Item, 'id'>) => {
            if (!userId) throw new Error('userId is required');

            let userGearId;
            if (item.gearId) {
                const userGear = await supabase
                    .from('user_gear')
                    .upsert({
                        gear_id: item.gearId,
                        user_id: userId,
                    })
                    .select()
                    .single();
                userGearId = userGear.data?.id;
            }

            const supabaseItem = appToSupabaseItem(item);
            const { data, error } = await supabase
                .from('items')
                .insert(supabaseItem)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['items', packId]);
        },
    });
}
