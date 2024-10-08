'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Product, ProductsContext, ProductsContract } from './useProducts';

const PRODUCTS_STORAGE_KEY = 'productsMap';

interface ProductMap {
    [key: string]: Product;
}

const SimpleProductsProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [productMap, setProductMap] = useState<ProductMap>({});
    const [searchTag, setSearchTag] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        // Load products from localStorage on component mount
        const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
        if (storedProducts) {
            setProductMap(JSON.parse(storedProducts));
        }
    }, []);

    const products = useMemo(() => {
        return Object.values(productMap)
            .filter((product) => {
                const tagMatch =
                    searchTag !== '' &&
                    Object.keys(product.tagMap).includes(searchTag);
                const textMatch =
                    searchText !== '' &&
                    product.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase());
                return (searchText === '' && tagMatch) || textMatch;
            })
            .sort(
                (a, b) =>
                    //sort by matching tag value
                    b.tagMap[searchTag] - a.tagMap[searchTag]
            );
    }, [productMap, searchTag, searchText]);

    const saveProducts = (updatedProductMap: ProductMap) => {
        setProductMap(updatedProductMap);
        localStorage.setItem(
            PRODUCTS_STORAGE_KEY,
            JSON.stringify(updatedProductMap)
        );
    };

    const addProduct = async (
        product: Omit<Product, 'id' | 'tagMap'>
    ): Promise<void> => {
        const newProduct: Product = {
            ...product,
            id: Date.now().toString(), // Simple ID generation
            tagMap: {},
        };
        const updatedProductMap = {
            ...productMap,
            [newProduct.id]: newProduct,
        };
        saveProducts(updatedProductMap);
    };

    const updateProduct = async (updatedProduct: Product): Promise<void> => {
        const updatedProductMap = {
            ...productMap,
            [updatedProduct.id]: updatedProduct,
        };
        saveProducts(updatedProductMap);
    };

    const removeProduct = async (productToRemove: Product): Promise<void> => {
        const { [productToRemove.id]: _, ...updatedProductMap } = productMap;
        saveProducts(updatedProductMap);
    };

    const updateProductTag = async (
        productId: string,
        tagName: string,
        increment: boolean
    ): Promise<void> => {
        const product = productMap[productId];
        if (!product) return;

        const updatedTagMap = { ...product.tagMap };
        if (tagName in updatedTagMap) {
            if (increment) {
                updatedTagMap[tagName] += 1;
            } else {
                updatedTagMap[tagName] -= 1;
                if (updatedTagMap[tagName] <= 0) {
                    delete updatedTagMap[tagName];
                }
            }
        } else if (increment) {
            updatedTagMap[tagName] = 1;
        }

        const updatedProduct = { ...product, tagMap: updatedTagMap };
        await updateProduct(updatedProduct);
    };

    const incrementProductTag = async (
        productId: string,
        tag: string
    ): Promise<void> => {
        await updateProductTag(productId, tag, true);
    };

    const decrementProductTag = async (
        productId: string,
        tag: string
    ): Promise<void> => {
        await updateProductTag(productId, tag, false);
    };

    const providerValue: ProductsContract = {
        products,
        searchTag,
        setSearchTag,
        searchText,
        setSearchText,
        addProduct,
        updateProduct,
        removeProduct,
        incrementProductTag,
        decrementProductTag,
    };

    return (
        <ProductsContext.Provider value={providerValue}>
            {children}
        </ProductsContext.Provider>
    );
};

export default SimpleProductsProvider;
