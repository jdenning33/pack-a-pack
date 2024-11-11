import { usePacksQuery } from '@/lib/supabse/pack/usePacksQuery';
import React, { ReactNode, useState } from 'react';
import {
    PackSearchOptions,
    PacksContextType,
    PacksContext,
} from './usePackSearch';

export const PackSearchProvider: React.FC<{
    children: ReactNode;
    searchDefaults?: Partial<PackSearchOptions>;
}> = ({ children, searchDefaults = {} }) => {
    const [searchParams, setSearchParams] = useState(searchDefaults);

    const packsQuery = usePacksQuery(searchParams);

    const value: PacksContextType = {
        packs: packsQuery.data?.packs || [],
        searchParams,
        setSearchParams,
    };

    return (
        <PacksContext.Provider value={value}>{children}</PacksContext.Provider>
    );
};
