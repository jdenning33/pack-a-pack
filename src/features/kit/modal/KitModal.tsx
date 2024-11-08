import React, { ReactNode, useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/ui/dialog';
import { cn } from '@/lib/utils';
import { useKitContext } from '../useKitContext';
import { KitModalContent } from './KitModalContent';
import { EditKitModalContent } from './EditKitModalContent';
import { Item } from '@/lib/appTypes';

export const KitModalContext = React.createContext<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    setSelectedItemId: (itemId: string | undefined) => void;
    selectedItem: Item | undefined;
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
    const [selectedItemId, setSelectedItemId] = useState<string | undefined>();
    const selectedItem = kit?.items.find((item) => item.id === selectedItemId);

    useEffect(() => {
        setIsOpen(isOpenProp);
    }, [isOpenProp]);
    useEffect(() => {
        onIsOpenChange?.(isOpen);
        if (!isOpen) {
            setSelectedItemId(undefined);
            setIsEditing(false);
        }
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
            value={{
                isOpen,
                setIsOpen,
                isEditing,
                setIsEditing,
                setSelectedItemId,
                selectedItem,
            }}
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

export function KitModalTrigger({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    const { setIsOpen, setIsEditing } = useKitModalContext();
    return (
        <div
            className={cn('cursor-pointer', className)}
            onClick={(_) => {
                setIsOpen(true);
                setIsEditing(false);
            }}
        >
            {children}
        </div>
    );
}
