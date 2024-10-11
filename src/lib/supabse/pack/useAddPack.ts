import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';

export function useAddPack() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            name,
            description,
        }: {
            name: string;
            description: string;
        }) => {
            const { data, error } = await supabase
                .from('packs')
                .insert({
                    name,
                    description,
                    is_public: false,
                    is_gear_locker: false,
                })
                .select();

            if (error) throw error;
            return data[0];
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['packs'] });
        },
    });
}
