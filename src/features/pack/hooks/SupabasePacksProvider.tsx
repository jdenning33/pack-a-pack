import { usePacksQuery } from '@/lib/supabse/pack/usePacksQuery';
import React, { ReactNode, useState } from 'react';
import { PacksContext, PacksContextType } from './usePacks';
import { Pack, PackSummary } from '@/lib/appTypes';
import { PackSearchOptions } from './usePacks';
import { useUpsertPack } from '@/lib/supabse/pack/useUpsertPack';

export const SupabasePacksProvider: React.FC<{
    children: ReactNode;
    searchDefaults?: Partial<PackSearchOptions>;
}> = ({ children, searchDefaults = {} }) => {
    const [searchParams, setSearchParams] = useState(searchDefaults);

    const packsQuery = usePacksQuery(searchParams);
    const upsertPackMutation = useUpsertPack();

    const value: PacksContextType = {
        packs: packsQuery.data?.packs || [],
        searchParams,
        setSearchParams,
        upsertPack: (pack: Omit<Pack | PackSummary, 'id'>) =>
            upsertPackMutation.mutateAsync(pack),
        deletePack: (pack: Pack | PackSummary) =>
            upsertPackMutation.mutateAsync({ ...pack, isDeleted: true }),
    };

    return (
        <PacksContext.Provider value={value}>{children}</PacksContext.Provider>
    );
};
