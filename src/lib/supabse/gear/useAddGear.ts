import { Gear } from '@/lib/appTypes';
import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { appToSupabaseGear } from '../supabaseTypes';

export function useAddGear() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (gear: Omit<Gear, 'id'>) => {
            const supabaseGear = appToSupabaseGear(gear);
            const { error } = await supabase.from('gear').insert(supabaseGear);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['gear']);
        },
    });
}
