import React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { useGearModal } from './GearModal';

export const GearModalTrigger = ({
    className,
    children,
    defaultEditing = false,
    asChild = false,
}: {
    className?: string;
    defaultEditing?: boolean;
    asChild?: boolean;
    children: React.ReactNode;
}) => {
    const { setIsOpen, setIsEditing } = useGearModal();
    const Comp = asChild ? Slot : 'div';

    return (
        <Comp
            onClick={() => {
                setIsOpen(true);
                setIsEditing?.(defaultEditing);
            }}
            className={
                asChild
                    ? undefined
                    : cn(
                          'cursor-pointer hover:scale-[99%] transition-all',
                          className
                      )
            }
        >
            {children}
        </Comp>
    );
};
