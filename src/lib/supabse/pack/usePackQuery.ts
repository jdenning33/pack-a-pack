import { useQuery } from 'react-query';
import { supabase } from '../supabaseClient';
import { Pack } from '@/lib/appTypes';
import { supabaseToAppPack } from '../supabaseTypes';
import { useMemo } from 'react';
import { useItemsQuery } from '../item/useItemsQuery';
import { useKitsQuery } from '../kit/useKitsQuery';

// Fetch pack data (without kits)
export function usePackQueryShallow(packId: string) {
    return useQuery<Pack>({
        queryKey: ['pack', packId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('packs')
                .select('*')
                .eq('id', packId)
                .order('created_at', { ascending: true })
                .single();

            if (error) throw error;
            return supabaseToAppPack(data);
        },
    });
}

// Composite hook to fetch all data
export function usePackQuery(packId: string) {
    const packQuery = usePackQueryShallow(packId);
    const kitsQuery = useKitsQuery(packId);
    const itemQueries = useItemsQuery(packId);
    // const gearQueries = useGearQuery(packId);

    const fullPack: Pack | undefined = useMemo(() => {
        if (packQuery.data && kitsQuery.data && itemQueries.data) {
            return {
                ...packQuery.data,
                kits: kitsQuery.data.map((kit) => ({
                    ...kit,
                    items: itemQueries.data.filter(
                        (item) => item.kitId === kit.id
                    ),
                })),
            };
        }
    }, [packQuery.data, kitsQuery.data, itemQueries.data]);

    return {
        pack: fullPack,
        isLoading: packQuery.isLoading,
    };
}
