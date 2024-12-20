'use client';
import { createContext, useContext } from 'react';
import { PackSummary } from '@/lib/appTypes';

export type PackSearchOptions = Partial<{
    searchText: string;
    orderBy: 'name' | 'created_at' | 'updated_at' | 'user_id';
    orderDirection: 'asc' | 'desc';
    limit: number;
    page: number;
    excludePublicPacks: boolean;
    excludePrivatePacks: boolean;
    packId: string;
    packUserId: string;
}>;

export interface PacksContextType {
    packs: PackSummary[];
    searchParams: PackSearchOptions;
    setSearchParams: (
        setter: (prev: PackSearchOptions) => PackSearchOptions
    ) => void;
}

export const PacksContext = createContext<PacksContextType | undefined>(
    undefined
);

export const usePacks = (): PacksContextType => {
    const context = useContext(PacksContext);
    if (context === undefined) {
        throw new Error('usePacks must be used within a PacksProvider');
    }
    return context;
};
