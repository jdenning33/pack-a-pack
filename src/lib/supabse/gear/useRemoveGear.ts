import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';

// Remove gear

export function useRemoveGear() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (gearId: string) => {
            const { error } = await supabase
                .from('gear')
                .delete()
                .eq('id', gearId);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['gear']);
        },
    });
}
