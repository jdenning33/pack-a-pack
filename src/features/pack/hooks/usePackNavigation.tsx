import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Category, Pack, PackItem, usePack } from './usePack'; // Adjust this import based on your actual types file

interface PackNavigationContextType {
    selectedCategory: Category | null;
    setSelectedCategoryId: (categoryId: string | null) => void;
    selectedItem: PackItem | null;
    setSelectedItemId: (itemId: string | null) => void;
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
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        null
    );
    const selectedCategory =
        pack.categories.find(
            (category) => category.id === selectedCategoryId
        ) || null;

    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const selectedItem =
        selectedCategory?.items.find((item) => item.id === selectedItemId) ||
        null;

    return (
        <PackNavigationContext.Provider
            value={{
                selectedCategory: selectedCategory,
                setSelectedCategoryId: setSelectedCategoryId,
                selectedItem: selectedItem,
                setSelectedItemId: setSelectedItemId,
            }}
        >
            {children}
        </PackNavigationContext.Provider>
    );
};
