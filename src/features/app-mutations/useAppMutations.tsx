'use client';
import { createContext, useContext } from 'react';
import { Pack, PackSummary, Kit, Item, Gear } from '@/lib/appTypes';

export interface AppMutationsContextType {
    // Pack mutations
    upsertPack: (pack: Omit<Pack | PackSummary, 'id'>) => Promise<string>;
    deletePack: (pack: Pack | PackSummary) => void;
    clonePack: (pack: Pack, withGear: boolean) => Promise<string>;

    // Kit mutations
    addKit: (kit: Omit<Kit, 'id'>) => Promise<string>;
    updateKit: (kit: Kit) => Promise<string>;
    deleteKit: (kit: Kit) => Promise<string>;

    // Item mutations
    addItem: (item: Omit<Item, 'id'>) => Promise<string>;
    updateItem: (item: Item) => Promise<string>;
    deleteItem: (item: Item) => Promise<string>;

    // Gear mutations
    addGear: (gear: Omit<Gear, 'id'>) => Promise<string>;
    updateGear: (gear: Gear) => Promise<string>;
    removeGear: (gear: Gear) => Promise<void>;

    addGearToUser: (gearId: string) => Promise<void>;
    removeGearFromUser: (gearId: string) => Promise<void>;

    uploadGearImageFromFile: (file: File) => Promise<string>;
    uploadGearImageFromUrl: (url: string) => Promise<string>;
}

export const AppMutationsContext = createContext<
    AppMutationsContextType | undefined
>(undefined);

export const useAppMutations = (): AppMutationsContextType => {
    const context = useContext(AppMutationsContext);
    if (context === undefined) {
        throw new Error('useMutations must be used within a MutationsProvider');
    }
    return context;
};
