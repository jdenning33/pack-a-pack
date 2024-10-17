import { createContext, useContext } from 'react';
import { Item, Kit } from '@/lib/appTypes';

export type KitContextType = {
    packId: string;
    kit?: Kit;
    isReadOnly: boolean;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    afterKitUpdated: (kit: Kit) => void;
    selectedItem: Item | null;
    setSelectedItemId: (itemId: string | null) => void;
};
// Context
export const KitContext = createContext<KitContextType | null>(null);

export const useKitContext = () => {
    const context = useContext(KitContext);
    if (!context) {
        throw new Error('useKitContext must be used within a Kit component');
    }
    return context;
};
