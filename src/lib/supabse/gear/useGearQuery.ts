import { useQuery } from 'react-query';
import { supabaseToAppGear } from '../supabaseTypes';
import { Gear } from '@/lib/appTypes';
import { supabase } from '../supabaseClient';
import { GearQueryParams } from '@/features/gear-search/useGearSearch';
import { useAuth } from '@/features/auth/useAuth';

export function useGearQuery(queryParams: GearQueryParams) {
    const { user } = useAuth();
    return useQuery<Gear[]>({
        queryKey: ['gear', queryParams],
        queryFn: async () => {
            let query = supabase
                .from('gear')
                .select(
                    `
                        *,
                        user_gear!inner (
                            *
                        ),
                        user:profiles!gear_created_by_id_fkey (username)
                    `
                )
                .eq('is_deleted', false)
                .order('name', { ascending: false });

            if (queryParams.searchText) {
                const searchText = queryParams.searchText.replace(/\s/g, '%');
                query = query.or(
                    `name.ilike.%${searchText}%,description.ilike.%${searchText}%`
                );
            }

            if (queryParams.gearType === 'user') {
                query = query
                    .eq('user_gear.user_id', queryParams.gearUserId)
                    .eq('user_gear.is_retired', false);
            } else {
                query = query.eq('is_public', true);
            }

            const { data, error } = await query;
            if (error) throw error;
            return data.map((d) => supabaseToAppGear(d, user?.id || ''));
        },
    });
}
