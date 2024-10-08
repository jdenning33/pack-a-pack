import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Category, Pack, PackItem, Product, usePack } from './usePack'; // Adjust this import based on your actual types file

interface PackNavigationContextType {
    selectedCategory: Category | null;
    setSelectedCategoryId: (categoryId: string | null) => void;
    selectedItem: PackItem | null;
    setSelectedItemId: (itemId: string | null) => void;
    isEditingProductDetails: boolean;
    setIsEditingProductDetails: (isEditingProductDetails: boolean) => void;
}

const PackNavigationContext = createContext<
    PackNavigationContextType | undefined
>(undefined);

export const usePackNavigation = () => {
    const context = useContext(PackNavigationContext);
    if (context === undefined) {
        throw new Error(
            'usePackNavigation must be used within a PackNavigationProvider'
        );
    }
    return context;
};

export const PackNavigationProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { pack } = usePack();
    const [selectedCategoryId, _setSelectedCategoryId] = useState<
        string | null
    >(null);
    const setSelectedCategoryId = (categoryId: string | null) => {
        _setSelectedCategoryId(categoryId);
        setSelectedItemId(null);
    };
    const selectedCategory =
        pack.categories.find(
            (category) => category.id === selectedCategoryId
        ) || null;

    const [selectedItemId, _setSelectedItemId] = useState<string | null>(null);
    const setSelectedItemId = (itemId: string | null) => {
        _setSelectedItemId(itemId);
        setIsEditingProductDetails(false);
    };
    const selectedItem =
        selectedCategory?.items.find((item) => item.id === selectedItemId) ||
        null;

    const [isEditingProductDetails, setIsEditingProductDetails] =
        useState(false);

    return (
        <PackNavigationContext.Provider
            value={{
                selectedCategory: selectedCategory,
                setSelectedCategoryId: setSelectedCategoryId,
                selectedItem: selectedItem,
                setSelectedItemId: setSelectedItemId,
                isEditingProductDetails: isEditingProductDetails,
                setIsEditingProductDetails: setIsEditingProductDetails,
            }}
        >
            {children}
        </PackNavigationContext.Provider>
    );
};
