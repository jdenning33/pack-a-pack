import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabseClient';
import { Kit } from '@/lib/appTypes';
import { appToSupabaseKit } from '../supabaseTypes';

export function useUpdateKit(packId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (kit: Kit) => {
            const supabaseKit = appToSupabaseKit(kit, packId);
            const { error } = await supabase
                .from('kits')
                .update(supabaseKit)
                .eq('id', kit.id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['pack', packId]);
        },
    });
}
