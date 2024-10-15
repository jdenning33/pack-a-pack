import React, { useState, useEffect } from 'react';
import { Kit } from '@/lib/appTypes';
import { cn } from '@/lib/utils';
import { KitContextType, KitContext } from './useKitContext';

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
