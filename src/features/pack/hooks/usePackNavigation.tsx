import React, { createContext, useContext, useState, ReactNode } from 'react';
import { usePack } from './usePack'; // Adjust this import based on your actual types file
import { Kit, Item } from '@/lib/appTypes';

interface PackNavigationContextType {
    selectedKit: Kit | null;
    setSelectedKitId: (kitId: string | null) => void;
    selectedItem: Item | null;
    setSelectedItemId: (itemId: string | null) => void;
    isEditingGearDetails: boolean;
    setIsEditingGearDetails: (isEditingGearDetails: boolean) => void;
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
        setIsEditingGearDetails(false);
    };
    const selectedItem =
        selectedKit?.items.find((item) => item.id === selectedItemId) || null;

    const [isEditingGearDetails, setIsEditingGearDetails] = useState(false);

    return (
        <PackNavigationContext.Provider
            value={{
                selectedKit: selectedKit,
                setSelectedKitId: setSelectedKitId,
                selectedItem: selectedItem,
                setSelectedItemId: setSelectedItemId,
                isEditingGearDetails: isEditingGearDetails,
                setIsEditingGearDetails: setIsEditingGearDetails,
            }}
        >
            {children}
        </PackNavigationContext.Provider>
    );
};
