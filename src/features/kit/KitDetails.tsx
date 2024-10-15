import React, { createContext, useContext, useState, useEffect } from 'react';
import { Item, Kit } from '@/lib/appTypes';
import { cn } from '@/lib/utils';

type KitContextType = {
    kit?: Kit;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    afterKitUpdated: (kit: Kit) => void;
    selectedItem: Item | null;
    setSelectedItemId: (itemId: string | null) => void;
    isEditingGearDetails: boolean;
    setIsEditingGearDetails: (isEditingGearDetails: boolean) => void;
};

// Context
const KitContext = createContext<KitContextType | null>(null);

export const useKitContext = () => {
    const context = useContext(KitContext);
    if (!context) {
        throw new Error('useKitContext must be used within a Kit component');
    }
    return context;
};

// Main Kit component
export const KitDetails: React.FC<{
    className?: string;
    kit?: Kit;
    afterKitUpdated?: (kit: Kit) => void;
    onIsEditingChanged?: (isEditing: boolean) => void;
    children: React.ReactNode;
    useModal?: boolean;
    closeModalOnSave?: boolean;
}> = ({
    className,
    kit,
    afterKitUpdated,
    onIsEditingChanged,
    children,
    useModal = true,
    closeModalOnSave = false,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [newKit, setNewKit] = useState<Kit | undefined>(kit);

    useEffect(() => {
        onIsEditingChanged?.(isEditing);
    }, [isEditing, onIsEditingChanged]);

    useEffect(() => {
        setNewKit(undefined);
    }, [isModalOpen]);

    const [selectedItemId, _setSelectedItemId] = useState<string | null>(null);
    const setSelectedItemId = (itemId: string | null) => {
        _setSelectedItemId(itemId);
        setIsEditingGearDetails(false);
    };
    const selectedItem =
        kit?.items.find((item) => item.id === selectedItemId) || null;

    const [isEditingGearDetails, setIsEditingGearDetails] = useState(false);

    const contextValue: KitContextType = {
        kit: kit || newKit,
        isEditing,
        setIsEditing,
        afterKitUpdated: (kit) => {
            afterKitUpdated?.(kit);
            if (closeModalOnSave) setIsModalOpen(false);
            else setNewKit(kit);
        },
        isModalOpen: useModal ? isModalOpen : false,
        setIsModalOpen,
        selectedItem: selectedItem,
        setSelectedItemId: setSelectedItemId,
        isEditingGearDetails: isEditingGearDetails,
        setIsEditingGearDetails: setIsEditingGearDetails,
    };

    return (
        <KitContext.Provider value={contextValue}>
            <div className={cn('relative group', className)}>{children}</div>
        </KitContext.Provider>
    );
};
