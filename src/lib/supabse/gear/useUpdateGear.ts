import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { appToSupabaseGear } from '../supabaseTypes';
import { Gear } from '@/lib/appTypes';

// Update existing gear

export function useUpdateGear() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (gear: Gear) => {
            const supabaseGear = appToSupabaseGear(gear);
            const { error } = await supabase
                .from('gear')
                .update(supabaseGear)
                .eq('id', gear.id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['gear']);
        },
    });
}
