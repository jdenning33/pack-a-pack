import React, { ReactNode, useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/ui/dialog';
import { cn } from '@/lib/utils';
import { useKitContext } from '../../useKitContext';
import { KitModalContent } from './KitModalContent';
import { EditKitModalContent } from './EditKitModalContent';

export const KitModalContext = React.createContext<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
} | null>(null);

export function useKitModalContext() {
    const context = React.useContext(KitModalContext);
    if (!context) {
        throw new Error('useKitModal must be used within a KitModalProvider');
    }
    return context;
}

export const KitModal = ({
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
    const { kit } = useKitContext();
    const [isOpen, setIsOpen] = useState(isOpenProp);
    const [isEditing, setIsEditing] = useState(isEditingProp);

    useEffect(() => {
        setIsOpen(isOpenProp);
    }, [isOpenProp]);
    useEffect(() => {
        onIsOpenChange?.(isOpen);
    }, [isOpen, onIsOpenChange]);

    const kitExists = !!kit;
    useEffect(() => {
        setIsEditing(isEditingProp || !kitExists);
    }, [isEditingProp, kitExists]);
    useEffect(() => {
        onIsEditingChange?.(isEditing);
    }, [isEditing, onIsEditingChange]);

    return (
        <KitModalContext.Provider
            value={{ isOpen, setIsOpen, isEditing, setIsEditing }}
        >
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {children}
                <DialogContent
                    className={cn(
                        isEditing
                            ? ''
                            : 'min-h-[30rem] h-[40rem] max-h-svh max-w-4xl',
                        'p-0 flex flex-col gap-0'
                    )}
                >
                    {isEditing ? <EditKitModalContent /> : <KitModalContent />}
                </DialogContent>
            </Dialog>
        </KitModalContext.Provider>
    );
};

export function KitModalTrigger({ children }: { children: ReactNode }) {
    const { setIsOpen } = useKitModalContext();
    return (
        <div className='cursor-pointer' onClick={(_) => setIsOpen(true)}>
            {children}
        </div>
    );
}
