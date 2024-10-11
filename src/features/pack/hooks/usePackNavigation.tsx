import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Kit, Item, usePack } from './usePack'; // Adjust this import based on your actual types file

interface PackNavigationContextType {
    selectedKit: Kit | null;
    setSelectedKitId: (kitId: string | null) => void;
    selectedItem: Item | null;
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
    const [selectedKitId, _setSelectedKitId] = useState<string | null>(null);
    const setSelectedKitId = (kitId: string | null) => {
        _setSelectedKitId(kitId);
        setSelectedItemId(null);
    };
    const selectedKit =
        pack.kits.find((kit) => kit.id === selectedKitId) || null;

    const [selectedItemId, _setSelectedItemId] = useState<string | null>(null);
    const setSelectedItemId = (itemId: string | null) => {
        _setSelectedItemId(itemId);
        setIsEditingProductDetails(false);
    };
    const selectedItem =
        selectedKit?.items.find((item) => item.id === selectedItemId) || null;

    const [isEditingProductDetails, setIsEditingProductDetails] =
        useState(false);

    return (
        <PackNavigationContext.Provider
            value={{
                selectedKit: selectedKit,
                setSelectedKitId: setSelectedKitId,
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
