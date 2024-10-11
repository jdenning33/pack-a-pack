'use client';
import { createContext, useContext } from 'react';

// This represents a product that can be purchased to satisfy the Item it is attributed to
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

export interface ProductsContract {
    products: Gear[];
    searchTag: string;
    setSearchTag: (searchTag: string) => void;
    searchText: string;
    setSearchText: (searchText: string) => void;
    addProduct: (product: Omit<Gear, 'id'>) => Promise<void>;
    updateProduct: (product: Gear) => Promise<void>;
    removeProduct: (product: Gear) => Promise<void>;
}

export const ProductsContext = createContext<ProductsContract | undefined>(
    undefined
);

export const useProducts = (): ProductsContract => {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
};
