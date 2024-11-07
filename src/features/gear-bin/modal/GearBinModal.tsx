import React, { ReactNode } from 'react';
import { Dialog, DialogContent } from '@/ui/dialog';
import { usePropDrivenState } from '@/lib/utils';

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
    const [isOpen, setIsOpen] = usePropDrivenState(isOpenProp, onIsOpenChange);
    const [isEditing, setIsEditing] = usePropDrivenState(
        isEditingProp,
        onIsEditingChange
    );

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
            </Dialog>
        </GearBinModalContext.Provider>
    );
};

export const GearBinModalContent = DialogContent;

export const GearBinModalEditContents = ({
    children,
}: {
    children: ReactNode;
}) => {
    const { isEditing } = useGearBinModalContext();
    return isEditing ? <>{children}</> : null;
};

export const GearBinModalViewContents = ({
    children,
}: {
    children: ReactNode;
}) => {
    const { isEditing } = useGearBinModalContext();
    return isEditing ? null : <>{children}</>;
};
