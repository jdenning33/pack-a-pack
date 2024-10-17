import React, { useState, useEffect } from 'react';
import { Gear } from '@/lib/appTypes';
import { cn } from '@/lib/utils';
import { GearContextType, GearContext } from './useGearContext';

// Main Gear component
export const GearProvider: React.FC<{
    className?: string;
    gear?: Gear;
    afterGearUpdated?: (gear: Gear) => void;
    onIsEditingChanged?: (isEditing: boolean) => void;
    children: React.ReactNode;
    useModal?: boolean;
    closeModalOnSave?: boolean;
}> = ({
    className,
    gear,
    afterGearUpdated,
    onIsEditingChanged,
    children,
    useModal = true,
    closeModalOnSave = true,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [newGear, setNewGear] = useState<Gear | undefined>(gear);

    useEffect(() => {
        onIsEditingChanged?.(isEditing);
    }, [isEditing, onIsEditingChanged]);

    useEffect(() => {
        setNewGear(undefined);
    }, [isModalOpen]);

    const contextValue: GearContextType = {
        gear: gear || newGear,
        isEditing,
        setIsEditing,
        afterGearUpdated: (gear) => {
            afterGearUpdated?.(gear);
            if (closeModalOnSave) setIsModalOpen(false);
            else setNewGear(gear);
        },
        isModalOpen: useModal ? isModalOpen : false,
        setIsModalOpen,
    };

    return (
        <GearContext.Provider value={contextValue}>
            <div className={cn('relative group', className)}>{children}</div>
        </GearContext.Provider>
    );
};
