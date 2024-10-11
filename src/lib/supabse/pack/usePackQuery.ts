import { useQuery } from 'react-query';
import { supabase } from '../supabaseClient';
import { Pack } from '@/lib/appTypes';
import { convertNestedSupabasePack } from '../supabaseTypes';

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
            items:items(
              *,
              gear:gear(*)
            )
          )
        `
                )
                .eq('id', packId)
                .single();

            if (error) throw error;
            return convertNestedSupabasePack(data);
        },
    });
}
