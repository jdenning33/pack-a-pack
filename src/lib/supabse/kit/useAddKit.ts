import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { Kit } from '@/lib/appTypes';
import { appToSupabaseKit } from '../supabaseTypes';

export function useAddKit(packId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (kit: Omit<Kit, 'id'>) => {
            const supabaseKit = appToSupabaseKit(kit, packId);
            const { data, error } = await supabase
                .from('kits')
                .insert(supabaseKit)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['pack', packId]);
        },
    });
}
