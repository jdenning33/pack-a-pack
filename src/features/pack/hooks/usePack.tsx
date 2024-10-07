'use client';
import React, { createContext, useContext } from 'react';
import { usePacksStore } from './usePacksStore';

// This represents a backpack and it's contents for a single trip, it may be cloned for a new trip
export interface Pack {
    id: string;
    name: string;
    description: string;
    categories: Category[];
}

// This represents a category of items in the backpack. For example, "Clothing Kit" or "Toiletries Kit"
export interface Category {
    id: string;
    name: string;
    description: string;
    items: PackItem[];
}

// This represents a single item in this pack. For example, "T-shirt" or "Toothbrush"
export interface PackItem {
    id: string;
    categoryId: string;
    item: Item;
    name: string;
    description: string;
    quantity: number;
    selectedProduct?: Product;
    prospectiveProducts: Product[];
    isPacked: boolean;
    notes: string;
}

// This represents a generic piece of gear that can be added to a pack
export interface Item {
    id: string;
    name: string;
    description: string;
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
    addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
    updateCategory: (category: Category) => Promise<void>;
    removeCategory: (category: Category) => Promise<void>;
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
        addCategory,
        updateCategory,
        addItem,
        updateItem,
        removeItem,
        removeCategory,
    } = usePacksStore();

    let pack = packs.find((pack) => pack.id === packId) || null;
    if (!pack) {
        return <div>Pack not found</div>;
    }

    let packContract: PackContract = {
        pack: pack,
        addCategory: async (category) => addCategory(packId, category),
        updateCategory: async (category: Category) =>
            updateCategory(packId, category),
        removeCategory: async (category: Category) =>
            removeCategory(packId, category),
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
