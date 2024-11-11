import React, { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { usePackModalContext } from './PackModal';

interface PackModalTriggerProps {
    className?: string;
    defaultEditing?: boolean;
    children: ReactNode;
    asChild?: boolean;
}

export function PackModalTrigger({
    className,
    defaultEditing = false,
    children,
    asChild = false,
}: PackModalTriggerProps) {
    const { setIsOpen, setIsEditing } = usePackModalContext();
    const Comp = asChild ? Slot : 'div';

    return (
        <Comp
            className={asChild ? undefined : cn('cursor-pointer', className)}
            onClick={(_e) => {
                setIsOpen(true);
                setIsEditing(defaultEditing);
            }}
        >
            {children}
        </Comp>
    );
}
