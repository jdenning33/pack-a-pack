import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { usePackModalContext } from './PackModal';

export function PackModalTrigger({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    const { setIsOpen, setIsEditing } = usePackModalContext();
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
