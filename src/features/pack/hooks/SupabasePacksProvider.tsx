import { useAddPack } from '@/lib/supabse/pack/useAddPack';
import { useDeletePack } from '@/lib/supabse/pack/useDeletePack';
import { usePacksQuery } from '@/lib/supabse/pack/usePacksQuery';
import React, { ReactNode, useState } from 'react';
import { PacksContext } from './usePacks';
import { Pack } from '@/lib/appTypes';
import { PackSearchOptions } from './usePacks';

export const SupabasePacksProvider: React.FC<{
    children: ReactNode;
    searchDefaults?: Partial<PackSearchOptions>;
}> = ({ children, searchDefaults = {} }) => {
    const [searchParams, setSearchParams] = useState(searchDefaults);

    const packsQuery = usePacksQuery(searchParams);
    const addPackMutation = useAddPack();
    const deletePackMutation = useDeletePack();

    const value = {
        packs: packsQuery.data?.packs || [],
        searchParams,
        setSearchParams,
        addPack: (pack: Omit<Pack, 'id'>) => addPackMutation.mutate(pack),
        deletePack: (id: string) => deletePackMutation.mutate(id),
    };

    return (
        <PacksContext.Provider value={value}>{children}</PacksContext.Provider>
    );
};
