'use client';
import { Gear } from '@/features/products/useProducts';
import { createContext, useContext } from 'react';

// This represents a backpack and it's contents for a single trip, it may be cloned for a new trip
export interface Pack {
    id: string;
    name: string;
    description: string;
    isPublic: boolean;
    isGearLocker: boolean;
    kits: Kit[];
}

// This represents a kit of items in the backpack. For example, "Clothing Kit" or "Toiletries Kit"
export interface Kit {
    id: string;
    packId: string;
    name: string;
    description: string;
    items: Item[];
}

// This represents a single item in this pack. For example, "T-shirt" or "Toothbrush"
export interface Item {
    id: string;
    kitId: string;
    name: string;
    quantity: number;
    isPacked: boolean;
    notes: string;
    gearId?: string;
    gear?: Gear;
}

export interface PackContract {
    pack: Pack;
    addKit: (kit: Omit<Kit, 'id'>) => Promise<void>;
    updateKit: (kit: Kit) => Promise<void>;
    deleteKit: (kit: Kit) => Promise<void>;
    addItem: (item: Omit<Item, 'id'>) => Promise<void>;
    updateItem: (item: Item) => Promise<void>;
    deleteItem: (item: Item) => Promise<void>;
    toggleItemPacked: (itemId: string) => Promise<Item>;
}

export const PackContext = createContext<PackContract | undefined>(undefined);

export const usePack = (): PackContract => {
    const context = useContext(PackContext);
    if (context === undefined) {
        throw new Error('usePack must be used within a PackProvider');
    }
    return context;
};
