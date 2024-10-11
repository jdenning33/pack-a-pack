'use client';
import { Gear } from '@/lib/appTypes';
import { createContext, useContext } from 'react';

export interface GearContract {
    gear: Gear[];
    isLoading: boolean;
    isError: boolean;
    error: Error | unknown | null;
    kitFilter: string;
    setKitFilter: (kitFilter: string) => void;
    itemFilter: string;
    setItemFilter: (searchTag: string) => void;
    searchText: string;
    setSearchText: (searchText: string) => void;
    addGear: (gear: Omit<Gear, 'id'>) => Promise<void>;
    updateGear: (gear: Gear) => Promise<void>;
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
