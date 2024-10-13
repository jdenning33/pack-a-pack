import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { Pack } from '@/lib/appTypes';
import { appToSupabasePack, supabaseToAppPack } from '../supabaseTypes';

export function useAddPack() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (pack: Omit<Pack, 'id'>) => {
            const supabasePack = appToSupabasePack(pack);
            const { data, error } = await supabase
                .from('packs')
                .insert(supabasePack)
                .select()
                .single();

            if (error) throw error;
            return supabaseToAppPack(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['packs'] });
        },
    });
}
