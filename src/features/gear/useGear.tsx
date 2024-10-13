'use client';
import { Gear } from '@/lib/appTypes';
import { createContext, useContext } from 'react';

export type GearQueryParams = Partial<{
    kitFilter: string;
    itemFilter: string;
    searchText: string;
    excludePrivateGear: boolean;
    gearForUserId: string;
}>;
export interface GearContract {
    gear: Gear[];
    isLoading: boolean;
    isError: boolean;
    error: Error | unknown | null;
    searchParams: GearQueryParams;
    setSearchParams: (
        setter: (prev: GearQueryParams) => GearQueryParams
    ) => void;
    addGear: (gear: Omit<Gear, 'id'>) => Promise<string>;
    updateGear: (gear: Gear) => Promise<string>;
    removeGear: (gear: Gear) => Promise<void>;
}

export const GearContext = createContext<GearContract | undefined>(undefined);

export const useGear = (): GearContract => {
    const context = useContext(GearContext);
    if (context === undefined) {
        throw new Error('useGear must be used within a GearProvider');
    }
    return context;
};
