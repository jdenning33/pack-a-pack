import { useQuery } from 'react-query';
import { supabase } from '../supabseClient';
import { Pack } from '@/lib/appTypes';

export function usePackQuery(packId: string) {
    return useQuery<Pack>({
        queryKey: ['pack', packId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('packs')
                .select(
                    `
          *,
          kits:kits(
            *,
            items:items(*)
          )
        `
                )
                .eq('id', packId)
                .single();

            if (error) throw error;
            return data;
        },
    });
}
