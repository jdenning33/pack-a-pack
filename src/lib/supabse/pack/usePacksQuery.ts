import { useQuery } from 'react-query';
import { createClient } from '@/lib/supabse/supabaseClient';
import { PackSummary } from '@/lib/appTypes';
import { SupabasePack, supabaseToAppPack } from '../supabaseTypes';

interface PacksQueryParams {
    packId?: string;
    searchText?: string;
    excludePublicPacks?: boolean;
    excludePrivatePacks?: boolean;
    packUserId?: string;
    limit?: number;
    page?: number;
    orderBy?: keyof SupabasePack;
    orderDirection?: 'asc' | 'desc';
}

export function usePacksQuery({
    packId,
    searchText,
    excludePublicPacks,
    excludePrivatePacks,
    packUserId,
    limit = 10,
    page = 1,
    orderBy = 'name',
    orderDirection = 'asc',
}: PacksQueryParams) {
    return useQuery<{ packs: PackSummary[]; total: number }>({
        queryKey: [
            'packs',
            {
                packId,
                searchText,
                excludePublicPacks,
                excludePrivatePacks,
                packUserId,
                limit,
                page,
                orderBy,
                orderDirection,
            },
        ],
        queryFn: async () => {
            const supabase = createClient();
            let query = supabase
                .from('packs')
                .select('*,user:profiles!packs_user_id_fkey(id,username)', {
                    count: 'exact',
                })
                .eq('is_deleted', false);

            if (packId) {
                query = query.eq('id', packId);
            }

            if (searchText) {
                query = query.or(
                    `name.ilike.%${searchText}%,description.ilike.%${searchText}%`
                );
            }

            if (excludePublicPacks && excludePrivatePacks) {
                throw new Error('Cannot exclude both public and private packs');
            } else if (excludePublicPacks) {
                query = query.eq('is_public', false);
            } else if (excludePrivatePacks) {
                query = query.eq('is_public', true);
            }

            if (packUserId) {
                query = query.eq('user_id', packUserId);
            }

            query = query
                .order(orderBy, { ascending: orderDirection === 'asc' })
                .range((page - 1) * limit, page * limit - 1);

            const { data, error, count } = await query;

            if (error) throw error;

            const packs = data.map((p) => supabaseToAppPack(p));
            return { packs, total: count || 0 };
        },
    });
}
