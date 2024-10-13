import { useQuery } from 'react-query';
import { supabaseToAppGear } from '../supabaseTypes';
import { Gear } from '@/lib/appTypes';
import { supabase } from '../supabaseClient';
import { GearQueryParams } from '@/features/gear/useGear';

export function useGearQuery(queryParams: GearQueryParams) {
    return useQuery<Gear[]>({
        queryKey: ['gear', queryParams],
        queryFn: async () => {
            let query = supabase
                .from('gear')
                .select('*')
                .eq('is_deleted', false);

            console.log('queryParams', queryParams);

            if (queryParams.searchText) {
                const searchText = queryParams.searchText.replace(/\s/g, '%'); // replace spaces with % for ilike query
                // query = query.or(
                //     `name.ilike.%${searchText}%,description.ilike.%${searchText}%,brand.ilike.%${searchText}%`
                // );
                query = query.like('name', `%${searchText}%`);
            }
            console.log('query', query);

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
