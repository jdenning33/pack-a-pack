'use client';
import { Pack, Kit, Item } from '@/lib/appTypes';
import { createContext, useContext } from 'react';

export interface PackContract {
    pack: Pack;
    isReadOnly: boolean;
    addKit: (kit: Omit<Kit, 'id'>) => Promise<void>;
    updateKit: (kit: Kit) => Promise<void>;
    deleteKit: (kit: Kit) => Promise<void>;
    addItem: (item: Omit<Item, 'id'>) => Promise<void>;
    updateItem: (item: Item) => Promise<void>;
    deleteItem: (item: Item) => Promise<void>;
    toggleItemPacked: (itemId: string) => Promise<void>;
}

export const PackContext = createContext<PackContract | undefined>(undefined);

export const usePack = (): PackContract => {
    const context = useContext(PackContext);
    if (context === undefined) {
        throw new Error('usePack must be used within a PackProvider');
    }
    return context;
};
