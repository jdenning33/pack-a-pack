import React, { useState, useEffect } from 'react';
import { Kit } from '@/lib/appTypes';
import { cn } from '@/lib/utils';
import { KitContextType, KitContext } from './useKitContext';

// Main Kit component
export const KitProvider: React.FC<{
    className?: string;
    kit?: Kit;
    packId: string;
    isReadOnly: boolean;
    afterKitUpdated?: (kit: Kit) => void;
    onIsEditingChanged?: (isEditing: boolean) => void;
    children: React.ReactNode;
    useModal?: boolean;
    closeModalOnSave?: boolean;
}> = ({
    className,
    kit,
    packId,
    isReadOnly,
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

    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const selectedItem =
        kit?.items.find((item) => item.id === selectedItemId) || null;

    const contextValue: KitContextType = {
        kit: kit || newKit,
        packId,
        isReadOnly,
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
    };

    return (
        <KitContext.Provider value={contextValue}>
            <div className={cn('relative group', className)}>{children}</div>
        </KitContext.Provider>
    );
};
