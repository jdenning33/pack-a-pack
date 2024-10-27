import React, { ReactNode, useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/ui/dialog';
import { cn } from '@/lib/utils';
import { GearBinModalContent } from './GearBinModalContent';
import { EditGearBinModalContent } from './EditGearBinModalContent';

export const GearBinModalContext = React.createContext<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
} | null>(null);

export function useGearBinModalContext() {
    const context = React.useContext(GearBinModalContext);
    if (!context) {
        throw new Error(
            'useGearBinModal must be used within a GearBinModalProvider'
        );
    }
    return context;
}

export const GearBinModal = ({
    children,
    isOpen: isOpenProp = false,
    onIsOpenChange,
    isEditing: isEditingProp = false,
    onIsEditingChange,
}: {
    children?: ReactNode;
    isOpen?: boolean;
    onIsOpenChange?: (isOpen: boolean) => void;
    isEditing?: boolean;
    onIsEditingChange?: (isEditing: boolean) => void;
}) => {
    const [isOpen, setIsOpen] = useState(isOpenProp);
    const [isEditing, setIsEditing] = useState(isEditingProp);

    // enable control the modal open state through props
    useEffect(() => {
        setIsOpen(isOpenProp);
    }, [isOpenProp]);

    // inform the parent component when the modal is closed
    useEffect(() => {
        onIsOpenChange?.(isOpen);
    }, [isOpen, onIsOpenChange]);

    // enable control the modal editing state through props
    useEffect(() => {
        setIsEditing(isEditingProp);
    }, [isEditingProp]);

    // inform the parent component when the modal editing state is changed
    useEffect(() => {
        onIsEditingChange?.(isEditing);
    }, [isEditing, onIsEditingChange]);

    return (
        <GearBinModalContext.Provider
            value={{
                isOpen,
                setIsOpen,
                isEditing,
                setIsEditing,
            }}
        >
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {children}
                <DialogContent>
                    {isEditing ? (
                        <EditGearBinModalContent />
                    ) : (
                        <GearBinModalContent />
                    )}
                </DialogContent>
            </Dialog>
        </GearBinModalContext.Provider>
    );
};
