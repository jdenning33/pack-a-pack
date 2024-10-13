import { usePacksQuery } from '@/lib/supabse/pack/usePacksQuery';
import React, { ReactNode, useState } from 'react';
import { PacksContext } from './usePacks';
import { Pack } from '@/lib/appTypes';
import { PackSearchOptions } from './usePacks';
import { useUpsertPack } from '@/lib/supabse/pack/useUpsertPack';

export const SupabasePacksProvider: React.FC<{
    children: ReactNode;
    searchDefaults?: Partial<PackSearchOptions>;
}> = ({ children, searchDefaults = {} }) => {
    const [searchParams, setSearchParams] = useState(searchDefaults);

    const packsQuery = usePacksQuery(searchParams);
    const upsertPackMutation = useUpsertPack();

    const value = {
        packs: packsQuery.data?.packs || [],
        searchParams,
        setSearchParams,
        addPack: (pack: Omit<Pack, 'id'>) => upsertPackMutation.mutate(pack),
        deletePack: (pack: Pack) =>
            upsertPackMutation.mutate({ ...pack, isDeleted: true }),
    };

    return (
        <PacksContext.Provider value={value}>{children}</PacksContext.Provider>
    );
};
