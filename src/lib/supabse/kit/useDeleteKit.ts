import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { Kit } from '@/lib/appTypes';

export function useDeleteKit(packId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (kit: Kit) => {
            const { error } = await supabase
                .from('kits')
                .delete()
                .eq('id', kit.id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['kits', packId]);
        },
    });
}
