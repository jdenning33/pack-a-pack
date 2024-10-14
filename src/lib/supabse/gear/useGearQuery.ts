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
                .select(
                    `
                        *,
                        user_gear (
                            user_id
                        )
                    `
                )
                .eq('is_deleted', false);

            console.log('queryParams', queryParams);

            if (queryParams.searchText) {
                const searchText = queryParams.searchText.replace(/\s/g, '%');
                query = query.like('name', `%${searchText}%`);
            }

            if (queryParams.gearType === 'user') {
                console.log('yup');
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
