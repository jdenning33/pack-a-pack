import { Gear } from '@/lib/appTypes';
import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { appToSupabaseGear } from '../supabaseTypes';

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
            return data.id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['gear']);
        },
    });
}
