import { useAddPack } from '@/lib/supabse/pack/useAddPack';
import { useDeletePack } from '@/lib/supabse/pack/useDeletePack';
import { usePacksQuery } from '@/lib/supabse/pack/usePacksQuery';
import React, { ReactNode, use } from 'react';
import { PacksContext } from './usePacks';
import { Pack } from '@/lib/appTypes';

type SearchOptions = {
    searchText: string;
    orderBy: 'name' | 'created_at' | 'updated_at' | 'user_id';
    orderDirection: 'asc' | 'desc';
    limit: number;
    page: number;
    excludePublicPacks: boolean;
    excludePrivatePacks: boolean;
    packId: string;
    packUserId: string;
};
export const SupabasePacksProvider: React.FC<{
    children: ReactNode;
    searchDefaults?: Partial<SearchOptions>;
}> = ({ children, searchDefaults = {} }) => {
    const packsQuery = usePacksQuery(searchDefaults);
    const addPackMutation = useAddPack();
    const deletePackMutation = useDeletePack();

    const value = {
        packs: packsQuery.data?.packs || [],
        addPack: (pack: Omit<Pack, 'id'>) => addPackMutation.mutate(pack),
        deletePack: (id: string) => deletePackMutation.mutate(id),
    };

    return (
        <PacksContext.Provider value={value}>{children}</PacksContext.Provider>
    );
};
