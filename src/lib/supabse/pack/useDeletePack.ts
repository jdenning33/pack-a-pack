import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';

export function useDeletePack() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('packs')
                .delete()
                .match({ id });

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['packs'] });
        },
    });
}
