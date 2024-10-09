'use client';
import React, { createContext, useContext } from 'react';
import { usePacksStore } from './usePacksStore';

// This represents a backpack and it's contents for a single trip, it may be cloned for a new trip
export interface Pack {
    id: string;
    name: string;
    description: string;
    createdByName: string;
    kits: PackKit[];
}

// This represents a kit of items in the backpack. For example, "Clothing Kit" or "Toiletries Kit"
export interface PackKit {
    id: string;
    name: string;
    description: string;
    items: PackItem[];
}

// This represents a single item in this pack. For example, "T-shirt" or "Toothbrush"
export interface PackItem {
    id: string;
    kitId: string;
    name: string;
    quantity: number;
    description: string;
    isPacked: boolean;
    notes: string;
    productId?: string;
    productName?: string;
    productDescription?: string;
    productBrand?: string;
    productImage?: string;
    productWeight?: number;
    productPrice?: number;
}

// This represents a product that can be purchased to satisfy the Item it is attributed to
export interface Product {
    id: string;
    name: string;
    description: string;
    brand: string;
    image: string;
    weight: number;
    price: number;
}

export interface PackContract {
    pack: Pack;
    addKit: (kit: Omit<PackKit, 'id'>) => Promise<void>;
    updateKit: (kit: PackKit) => Promise<void>;
    removeKit: (kit: PackKit) => Promise<void>;
    addItem: (item: Omit<PackItem, 'id'>) => Promise<void>;
    updateItem: (item: PackItem) => Promise<void>;
    removeItem: (item: PackItem) => Promise<void>;
}

const PackContext = createContext<PackContract | undefined>(undefined);

export const PackProvider: React.FC<{
    children: React.ReactNode;
    packId: string;
}> = ({ children, packId }) => {
    let {
        packs,
        addKit,
        updateKit,
        addItem,
        updateItem,
        removeItem,
        removeKit,
    } = usePacksStore();

    let pack = packs.find((pack) => pack.id === packId) || null;
    if (!pack) {
        return <div>Pack not found</div>;
    }

    let packContract: PackContract = {
        pack: pack,
        addKit: async (kit) => addKit(packId, kit),
        updateKit: async (kit: PackKit) => updateKit(packId, kit),
        removeKit: async (kit: PackKit) => removeKit(packId, kit),
        addItem: async (item: Omit<PackItem, 'id'>) => addItem(packId, item),
        updateItem: async (item: PackItem) => updateItem(packId, item),
        removeItem: async (item: PackItem) => removeItem(packId, item),
    };

    return (
        <PackContext.Provider value={packContract}>
            {children}
        </PackContext.Provider>
    );
};

export const usePack = (): PackContract => {
    const context = useContext(PackContext);
    if (context === undefined) {
        throw new Error('usePack must be used within a PackProvider');
    }
    return context;
};
