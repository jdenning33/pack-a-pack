import { Gear } from '@/lib/appTypes';
import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { appToSupabaseGear } from '../supabaseTypes';
import { toast } from 'sonner';

export function useAddGear() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (gear: Omit<Gear, 'id'>) => {
            const supabaseGear = appToSupabaseGear(gear);
            const { data, error } = await supabase
                .from('gear')
                .insert(supabaseGear)
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
        onError: (err: unknown) => {
            console.log('onError', err);
            toast.error('Failed to add gear.', {
                description:
                    JSON.stringify(err, null, 2) || 'An error occurred',
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gear'] });
            toast.success('Gear added successfully');
        },
    });
}
