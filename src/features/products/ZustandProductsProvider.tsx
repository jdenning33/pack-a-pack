'use client';
import { usePackStore } from '@/lib/zustandStore';
import React, { ReactNode, useState, useCallback, useMemo } from 'react';
import { Gear, ProductsContext, ProductsContract } from './useProducts';

interface ProductsProviderProps {
    children: ReactNode;
}

export const ZustandProductsProvider: React.FC<ProductsProviderProps> = ({
    children,
}) => {
    const packStore = usePackStore();
    const [searchTag, setSearchTag] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');

    const filteredProducts = useMemo(() => {
        return packStore.gear.filter((product) => {
            const matchesTag = !searchTag || true;
            const matchesText =
                !searchText ||
                product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                product.description
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
            return matchesTag && matchesText;
        });
    }, [packStore.gear, searchTag, searchText]);

    const addProduct = useCallback(
        async (product: Omit<Gear, 'id'>) => {
            packStore.addGear(product);
        },
        [packStore]
    );

    const updateProduct = useCallback(
        async (product: Gear) => {
            packStore.updateGear(product);
        },
        [packStore]
    );

    const removeProduct = useCallback(
        async (product: Gear) => {
            packStore.deleteGear(product.id);
        },
        [packStore]
    );

    const productsContract: ProductsContract = {
        products: filteredProducts,
        searchTag,
        setSearchTag,
        searchText,
        setSearchText,
        addProduct,
        updateProduct,
        removeProduct,
    };

    return (
        <ProductsContext.Provider value={productsContract}>
            {children}
        </ProductsContext.Provider>
    );
};
