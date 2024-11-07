import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { useGearBinModalContext } from './GearBinModal';

interface GearBinModalTriggerProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    children: React.ReactNode;
    isEditing?: boolean;
    asChild?: boolean;
    allowPropagation?: boolean;
}

export const GearBinModalTrigger = React.forwardRef<
    HTMLElement,
    GearBinModalTriggerProps
>(
    (
        {
            className,
            children,
            isEditing = false,
            asChild = false,
            allowPropagation = false,
            onClick,
            ...props
        },
        ref
    ) => {
        const { setIsOpen, setIsEditing } = useGearBinModalContext();
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
                    setIsEditing(isEditing);
                    onClick?.(e);
                }}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);
GearBinModalTrigger.displayName = 'GearBinModalTrigger';
