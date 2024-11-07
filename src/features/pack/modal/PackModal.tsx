import React, { ReactNode, useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/ui/dialog';
import { usePack } from '../usePack';
import { EditPackModalContent } from './EditPackModalContent';
import { PackModalContent } from './PackModalContent';

export const PackModalContext = React.createContext<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
} | null>(null);

export function usePackModalContext() {
    const context = React.useContext(PackModalContext);
    if (!context) {
        throw new Error('usePackModal must be used within a PackModalProvider');
    }
    return context;
}

export const PackModal = ({
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
    const { pack } = usePack();
    const [isOpen, setIsOpen] = useState(isOpenProp);
    const [isEditing, setIsEditing] = useState(isEditingProp);

    useEffect(() => {
        setIsOpen(isOpenProp);
    }, [isOpenProp]);
    useEffect(() => {
        onIsOpenChange?.(isOpen);
        if (!isOpen) {
            setIsEditing(false);
        }
    }, [isOpen, onIsOpenChange]);

    const packExists = !!pack;
    useEffect(() => {
        setIsEditing(isEditingProp || !packExists);
    }, [isEditingProp, packExists]);
    useEffect(() => {
        onIsEditingChange?.(isEditing);
    }, [isEditing, onIsEditingChange]);

    return (
        <PackModalContext.Provider
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
                        <EditPackModalContent />
                    ) : (
                        <PackModalContent />
                    )}
                </DialogContent>
            </Dialog>
        </PackModalContext.Provider>
    );
};
