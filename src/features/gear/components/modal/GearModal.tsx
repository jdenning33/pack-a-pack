import React, { createContext, useContext, useState } from 'react';
import { Dialog, DialogContent } from '@/ui/dialog';
import { GearModalContent } from './GearModalContent';
import { EditGearModalContent } from './EditGearModalContent';
import { usePropDrivenState } from '@/lib/utils';

// Define the context type
type GearModalContextType = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
};

// Create the context
const GearModalContext = createContext<GearModalContextType | undefined>(
    undefined
);

// Create the hook for consuming the context
export const useGearModal = () => {
    const context = useContext(GearModalContext);
    if (context === undefined) {
        throw new Error('useGearModal must be used within a GearModalProvider');
    }
    return context;
};

// GearModal component with context provider
export const GearModal = ({
    isOpen: propIsOpen = false,
    onIsOpenChange,
    children,
}: {
    children?: React.ReactNode;
    isOpen?: boolean;
    onIsOpenChange?: (isOpen: boolean) => void;
}) => {
    const [isOpen, setIsOpen] = usePropDrivenState(propIsOpen, onIsOpenChange);
    const [isEditing, setIsEditing] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) setIsEditing(false);
    };

    const contextValue: GearModalContextType = {
        isOpen,
        setIsOpen,
        isEditing,
        setIsEditing,
    };

    return (
        <GearModalContext.Provider value={contextValue}>
            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                {children}
                <DialogContent>
                    {isEditing ? (
                        <EditGearModalContent />
                    ) : (
                        <GearModalContent />
                    )}
                </DialogContent>
            </Dialog>
        </GearModalContext.Provider>
    );
};
