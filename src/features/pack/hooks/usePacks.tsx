'use client';
import { createContext, useContext } from 'react';
import { Pack } from './usePack';

export type PackSummary = Omit<Pack, 'kits'>;

interface PacksContextType {
    packs: PackSummary[];
    addPack: (name: string, description: string) => void;
    deletePack: (id: string) => void;
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
