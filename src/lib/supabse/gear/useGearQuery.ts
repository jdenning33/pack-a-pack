import { useQuery } from 'react-query';
import { supabaseToAppGear } from '../supabaseTypes';
import { Gear } from '@/lib/appTypes';
import { supabase } from '../supabaseClient';
import { GearQueryParams } from '@/features/gear-search/useGearSearch';

export function useGearQuery(queryParams: GearQueryParams) {
    return useQuery<Gear[]>({
        queryKey: ['gear', queryParams],
        queryFn: async () => {
            let query = supabase
                .from('gear')
                .select(
                    `
                        *,
                        user_gear!inner (
                            user_id
                        ),
                        user:profiles!gear_created_by_id_fkey (username)
                    `
                )
                .eq('is_deleted', false)
                .order('name', { ascending: false });

            console.log('queryParams', queryParams);

            if (queryParams.searchText) {
                const searchText = queryParams.searchText.replace(/\s/g, '%');
                query = query.like('name', `%${searchText}%`);
            }

            if (queryParams.gearType === 'user') {
                query = query.eq('user_gear.user_id', queryParams.gearUserId);
            } else {
                query = query.eq('is_public', true);
            }

            const { data, error } = await query;
            if (error) throw error;
            return data.map(supabaseToAppGear);
        },
    });
}
