'use client';
import React, { createContext, useContext } from 'react';

// This represents a product that can be purchased to satisfy the Item it is attributed to
export interface Product {
    id: string;
    name: string;
    description: string;
    brand: string;
    image: string;
    weight: number;
    price: number;
    tagMap: { [key: string]: number };
}

export interface ProductTag {
    id: string;
    name: string;
    count: number;
}

export interface ProductsContract {
    products: Product[];
    searchTag: string;
    setSearchTag: (searchTag: string) => void;
    searchText: string;
    setSearchText: (searchText: string) => void;
    addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
    updateProduct: (product: Product) => Promise<void>;
    removeProduct: (product: Product) => Promise<void>;
    incrementProductTag: (productId: string, tag: string) => Promise<void>;
    decrementProductTag: (productId: string, tag: string) => Promise<void>;
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
