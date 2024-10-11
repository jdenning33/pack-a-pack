import { useQuery } from 'react-query';
import { supabaseToAppGear } from '../supabaseTypes';
import { Gear } from '@/lib/appTypes';
import { supabase } from '../supabaseClient';

export function useGearQuery({
    searchText,
    kitFilter: kitName,
    itemFilter: itemName,
    tags,
}: {
    searchText?: string;
    kitFilter?: string;
    itemFilter?: string;
    tags?: string[];
}) {
    return useQuery<Gear[]>({
        queryKey: ['gear', searchText, kitName, itemName, tags],
        queryFn: async () => {
            let query = supabase.from('gear').select('*');

            if (searchText) {
                query = query.or(
                    `name.ilike.%${searchText}%,description.ilike.%${searchText}%,brand.ilike.%${searchText}%`
                );
            }

            // if (kitName) {
            //     query = query.eq('kit_name', kitName);
            // }

            // if (itemName) {
            //     query = query.eq('item_name', itemName);
            // }

            // if (tags && tags.length > 0) {
            //     query = query.contains('tags', tags);
            // }

            const { data, error } = await query;
            if (error) throw error;
            return data.map(supabaseToAppGear);
        },
    });
}
