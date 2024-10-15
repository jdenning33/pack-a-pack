'use client';
import { Gear } from '@/lib/appTypes';
import { createContext, useContext } from 'react';

export type GearQueryParams = Partial<{
    kitFilter: string;
    itemFilter: string;
    searchText: string;
    gearType: 'all' | 'user' | 'public';
    gearUserId: string;
}>;

export interface GearSearchContract {
    gear: Gear[];
    isLoading: boolean;
    isError: boolean;
    error: Error | unknown | null;
    searchParams: GearQueryParams;
    setSearchParams: (
        setter: (prev: GearQueryParams) => GearQueryParams
    ) => void;
}

export const GearSearchContext = createContext<GearSearchContract | undefined>(
    undefined
);

export const useGearSearch = (): GearSearchContract => {
    const context = useContext(GearSearchContext);
    if (context === undefined) {
        throw new Error(
            'useGearSearch must be used within a GearSearchProvider'
        );
    }
    return context;
};
