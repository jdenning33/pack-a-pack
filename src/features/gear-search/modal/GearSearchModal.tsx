import React, { ReactNode, useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/ui/dialog';
import { GearSearchProvider, useGearSearch } from '../GearSearchProvider';
import { GearSearchBar } from '../components/GearSearchBar';

export const GearSearchModalContext = React.createContext<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onGearSelected?: (gear: Gear) => void;
} | null>(null);

export function useGearSearchModalContext() {
    const context = React.useContext(GearSearchModalContext);
    if (!context) {
        throw new Error(
            'useGearSearchModal must be used within a GearSearchModalProvider'
        );
    }
    return context;
}

export const GearSearchModal = ({
    children,
    isOpen: isOpenProp = false,
    onIsOpenChange,
    onGearSelected,
}: {
    children?: ReactNode;
    isOpen?: boolean;
    onIsOpenChange?: (isOpen: boolean) => void;
    onGearSelected?: (gear: Gear) => void;
}) => {
    const [isOpen, setIsOpen] = useState(isOpenProp);

    // enable control the modal open state through props
    useEffect(() => {
        setIsOpen(isOpenProp);
    }, [isOpenProp]);

    // inform the parent component when the modal is closed
    useEffect(() => {
        onIsOpenChange?.(isOpen);
    }, [isOpen, onIsOpenChange]);

    return (
        <GearSearchModalContext.Provider
            value={{
                isOpen,
                setIsOpen,
                onGearSelected,
            }}
        >
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {children}
                <DialogContent className='max-w-3xl'>
                    <GearSearchProvider>
                        <GearSearchBar />
                        <ScrollableGearList />
                    </GearSearchProvider>
                </DialogContent>
            </Dialog>
        </GearSearchModalContext.Provider>
    );
};

export function ScrollableGearList() {
    const { gear } = useGearSearch();
    const { onGearSelected } = useGearSearchModalContext();
    return (
        <ScrollArea className='overflow-auto h-[75svh] border rounded-md p-2 bg-muted pr-3'>
            <div className='grid gap-2 grid-cols-[repeat(auto-fill,minmax(9rem,1fr))]'>
                {gear.map((gear) => (
                    <AlternateGearCard
                        key={gear.id}
                        gear={gear}
                        onSelected={
                            onGearSelected && (() => onGearSelected(gear))
                        }
                    />
                ))}
            </div>
        </ScrollArea>
    );
}

import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/ui/scroll-area';
import { Gear } from '@/lib/appTypes';
import { AlternateGearCard } from '@/features/gear/components/card/AlternateGearCard';

interface GearSearchModalTriggerProps
    extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    children: React.ReactNode;
    asChild?: boolean;
    allowPropagation?: boolean;
}

export const GearSearchModalTrigger = React.forwardRef<
    HTMLElement,
    GearSearchModalTriggerProps
>(
    (
        {
            className,
            children,
            asChild = false,
            allowPropagation = false,
            onClick,
            ...props
        },
        ref
    ) => {
        const { setIsOpen } = useGearSearchModalContext();
        const Comp = asChild ? Slot : 'div';

        return (
            <Comp
                ref={ref as React.LegacyRef<HTMLDivElement>}
                className={cn('cursor-pointer', className)}
                onClick={(e) => {
                    if (!allowPropagation) {
                        e.stopPropagation();
                    }
                    setIsOpen(true);
                    onClick?.(e);
                }}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);
GearSearchModalTrigger.displayName = 'GearSearchModalTrigger';
