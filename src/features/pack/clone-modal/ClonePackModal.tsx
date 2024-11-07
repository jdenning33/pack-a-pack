'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/ui/dialog';
import { usePack } from '../usePack';
import { Button } from '@/ui/button';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { useRouter } from 'next/navigation';
import { Pack } from '@/lib/appTypes';

export const ClonePackModalContext = React.createContext<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
} | null>(null);

export function useClonePackModalContext() {
    const context = React.useContext(ClonePackModalContext);
    if (!context) {
        throw new Error('usePackModal must be used within a PackModalProvider');
    }
    return context;
}

export const ClonePackModal = ({
    children,
    isOpen: isOpenProp = false,
    onIsOpenChange,
}: {
    children?: ReactNode;
    isOpen?: boolean;
    onIsOpenChange?: (isOpen: boolean) => void;
    isEditing?: boolean;
    onIsEditingChange?: (isEditing: boolean) => void;
}) => {
    const { pack } = usePack();
    const { clonePack: clonePack2 } = useAppMutations();
    const [isOpen, setIsOpen] = useState(isOpenProp);
    const [isWorking, setIsWorking] = useState(false);
    const router = useRouter();

    async function clonePack(pack: Pack, withGear: boolean) {
        setIsWorking(true);
        const newPackId = await clonePack2(pack, withGear);
        router.push(`/packs/${newPackId}`);
    }

    useEffect(() => {
        setIsOpen(isOpenProp);
    }, [isOpenProp]);
    useEffect(() => {
        onIsOpenChange?.(isOpen);
    }, [isOpen, onIsOpenChange]);

    if (!pack) return null;
    return (
        <ClonePackModalContext.Provider
            value={{
                isOpen,
                setIsOpen,
            }}
        >
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {children}
                <DialogContent>
                    {isWorking && (
                        <div className='!absolute inset-0 bg-white bg-opacity-50' />
                    )}
                    <DialogHeader>
                        <DialogTitle>Clone Pack</DialogTitle>
                        <DialogDescription>
                            This will create a copy of all the kits and items in
                            the pack under your account. If you choose to
                            &quot;Clone With Gear&quot;, then all gear in this
                            pack will also be added to your gear closet.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className='!justify-start'>
                        <Button onClick={() => clonePack(pack, false)}>
                            Clone
                        </Button>
                        <Button
                            variant='outline'
                            onClick={() => clonePack(pack, true)}
                        >
                            Clone With Gear
                        </Button>
                        <Button
                            variant='ghost'
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ClonePackModalContext.Provider>
    );
};

import { Slot } from '@radix-ui/react-slot';

export const ClonePackModalTrigger = ({
    children,
    asChild = false,
}: {
    children: ReactNode;
    asChild?: boolean;
}) => {
    const { setIsOpen } = useClonePackModalContext();
    const Comp = asChild ? Slot : 'div';

    return <Comp onClick={() => setIsOpen(true)}>{children}</Comp>;
};
