import { useQuery } from 'react-query';
import { supabase } from '../supabseClient';
import { PackSummary } from '@/lib/appTypes';

export function usePacksQuery() {
    return useQuery<PackSummary[]>({
        queryKey: ['packs'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('packs')
                .select('id, name, description, is_public, is_gear_locker')
                .order('name');

            if (error) throw error;

            return data.map((pack) => ({
                id: pack.id,
                name: pack.name,
                description: pack.description,
                isPublic: pack.is_public,
                isGearLocker: pack.is_gear_locker,
            }));
        },
    });
}
