'use client';
import { Pack, Kit, Item } from '@/lib/appTypes';
import { createContext, useContext } from 'react';

export interface PackContract {
    pack: Pack;
    isReadOnly: boolean;
    addKit: (kit: Omit<Kit, 'id'>) => Promise<string>;
    updateKit: (kit: Kit) => Promise<string>;
    deleteKit: (kit: Kit) => Promise<string>;
    addItem: (item: Omit<Item, 'id'>) => Promise<string>;
    updateItem: (item: Item) => Promise<string>;
    deleteItem: (item: Item) => Promise<string>;
    toggleItemPacked: (itemId: string) => Promise<string>;
}

export const PackContext = createContext<PackContract | undefined>(undefined);

export const usePack = (): PackContract => {
    const context = useContext(PackContext);
    if (context === undefined) {
        throw new Error('usePack must be used within a PackProvider');
    }
    return context;
};
