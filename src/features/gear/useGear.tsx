'use client';
import { createContext, useContext } from 'react';

// This represents a gear that can be purchased to satisfy the Item it is attributed to
export interface Gear {
    id: string;
    name: string;
    description: string;
    brand: string;
    image: string;
    weight: number;
    price: number;
    isPublic: boolean;
    purchaseLinks: string[];
}

export interface GearContract {
    gear: Gear[];
    searchTag: string;
    setSearchTag: (searchTag: string) => void;
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
